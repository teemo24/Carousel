import {Carousel}  from './modules/carousel.js';

new Carousel({
    // Define selectors
    carouselWrap: ".carousel_wrap",
    carousel: ".carousel",
    carouselChildItem: ".carousel_item",
    carouselActionElement: ".carousel_action",

    // Define css classe names
    hideClass: "d_none",
    showClass: "d_block",
    //classe css to translate between slides to next
    translateNext: "translate_next_slide",
    //classe css to translate between slides to prev
    translatePrev: "translate_prev_slide"
});

new Carousel({
    carouselWrap: "#c"
})

