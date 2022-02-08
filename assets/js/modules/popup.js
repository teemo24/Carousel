
//POPUP
let popup_container = document.querySelector('.popup_container');
if(popup_container){
    let close = popup_container.querySelector('.popup_close');
    let content = popup_container.querySelector('.popup_content');
    close.addEventListener('click', ()=>{
        popup_container.style.display = "none";
        content.innerHTML = "";
        stopVideo(document);
    });
    content.addEventListener('click', (e)=>{
        e.stopPropagation();
    })
    popup_container.addEventListener('click', (e)=>{
        popup_container.style.display = "none";
        content.innerHTML = "";
    });
    loadPopupContent = (el)=>{
        content.innerHTML = el.nextElementSibling.innerHTML;
        popup_container.style.display = "flex"
    }
}