import {carousel}  from './modules/carousel.js'
carousel({
    // css classe to hide item
    hideClass: "d_none",
    // css classe to display item
    showClass: "d_block",
    //classe css to translate between slides to next
    translateNext: "translate_next_slide",
    //classe css to translate between slides to prev
    translatePrev: "translate_prev_slide"
});

