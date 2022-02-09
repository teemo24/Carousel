const $ = (selector, event, callback) =>{
    let selectors = document.querySelectorAll(selector);
    let len = selectors.length;
    for(let i=0; i<len; ++i){
        if(event){
            selectors[i].addEventListener(event, (e)=>callback(e, selectors[i]));
        }else{
            callback(selectors[i]);
        }
    }
}

const carousel = (options = null)=>{
    $('.carousel_wrap', null, (carousel_wrap)=>{
        // For each Carousel in the DOM
        const carousel = carousel_wrap.querySelector('.carousel');
        const carousel_item = options.carouselChildItem || "carousel_item";
        const carousel_action = carousel_wrap.querySelectorAll('.carousel_action');

        // Settings
        carousel.style.overflow = "hidden";
        carousel.dataset.currentslide = "1";
        const show = options.showClass || "d_block";
        const hide = options.hideClass || "d_none";
        const translate_next_slide = options.translateNext || "translate_next_slide";
        const translate_prev_slide = options.translatePrev || "translate_prev_slide";

        let items_per_slide = carousel.dataset.desktop || "1";
        if (window.matchMedia('screen and (max-width: 768px)').matches) {
            items_per_slide = carousel.dataset.mobile || "1";
        }
        let items = carousel.querySelectorAll(':scope .'+carousel_item);
        const itemslen = items.length;
        if(!itemslen) console.log("Error: There is no items under carousel");
        //Generate and associate each item to own slide
        let counter = 0;
        let first_slide = 1;
        let items_counter = first_slide;
        for(let i =0; i < itemslen; ++i){
            // Create numbring slides dataset depends on settings
            items[i].dataset.slide = items_counter;
            if(++counter == items_per_slide){
                ++items_counter;
                counter = 0;
            }
            //Specify which slide will appear first
            if(items[i].dataset.slide == first_slide){
                items[i].classList.add(show);             
            }else{
                items[i].classList.add(hide);             
            }      
        }

        const last_slide = items[itemslen-1].dataset.slide;  

        if(!carousel) return console.log("Error carousel not exist");
        if(!carousel_action) return console.log("Error carousel action not exist: carousel must have an action trigger");
        if(!carousel.dataset.currentslide) return console.log('Error: the current slide dataset must be defined in carousel');    
        const sliding = (slide_number, type = "button")=>{
            slide_number = parseInt(slide_number);
            let current_slide = parseInt(carousel.dataset.currentslide);
            let translate_slide;
            if(type == "button"){
                current_slide += slide_number;
                translate_slide = slide_number == 1 ? translate_next_slide: 
                                    slide_number == -1 ? translate_prev_slide:
                                    null;
            }
            if(type == "number"){
                translate_slide = slide_number > current_slide ? translate_next_slide: 
                                slide_number < current_slide ? translate_prev_slide:
                                null;
                current_slide = slide_number;
            }  
                if(current_slide <= last_slide && current_slide >= first_slide){
                    carousel.dataset.currentslide = current_slide;
                    for(let i =0; i < itemslen; ++i){
                        if(items[i].dataset.slide == current_slide){
                            items[i].classList.remove(hide, translate_next_slide, translate_prev_slide);             
                            items[i].classList.add(show, translate_slide);             
                        }else{
                            items[i].classList.remove(show, translate_next_slide, translate_prev_slide);             
                            items[i].classList.add(hide);             
                        } 
                    }
                }
        }
        
        for(let index = 0; index < carousel_action.length;++index){
            carousel_action[index].addEventListener('click', ()=>{
                const action = carousel_action[index].dataset.action;
                if(action == "next"){
                    sliding(1);
                }else if(action == "previous"){
                    sliding(-1);
                }else if(!isNaN(action)){
                    sliding(action, 'number');
                }else{
                    return console.log("Error carousel action containes wrong parameters: must have action to 'next' or 'previous' or 'number'");
                }
            });
        }

        let ts, te;
        carousel.addEventListener('touchstart', (e, el)=>{
            ts = e.changedTouches[0].clientX;
        });
        carousel.addEventListener('touchend', (e, el)=>{
            te = e.changedTouches[0].clientX;
            if(ts > te){
                sliding(1);
            }else if(ts < te){
                sliding(-1);
            }
        });

    });
}
export {carousel};