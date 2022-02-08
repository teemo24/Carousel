// Header Wizard Form
const form = document.getElementById("header_form");
if(form){
    const text_inputs = form.querySelectorAll(".input_text input");
    let text_section = form.querySelector('.input_text');
    let radio_section = form.querySelector('.input_radio_checkbox');
    let progress_line = form.querySelector('.progress_line');
    let prev_btn = form.querySelector('.prev_button');
    let submit_btn = form.querySelector('.submit_button');
    let next_btn = form.querySelector('.next_button');
    let realtoken = document.getElementById('captcha');
    let input_captcha = document.getElementById('captcha_token');
    next_btn.addEventListener('click', ()=>{
        let validity = true;
        for(let i=0;i < text_inputs.length; ++i){
            if(!text_inputs[i].checkValidity()){
                validity = false;
                break;
            }
        }
        if(validity){
            progress_line.style.width = "100%";
            text_section.classList.toggle("d_none");
            text_section.classList.toggle("form_transition");
            radio_section.classList.toggle("d_none");
            radio_section.classList.toggle("form_transition");
            next_btn.classList.toggle("d_none");
            prev_btn.classList.toggle("d_none");
            submit_btn.classList.toggle("d_none");
            //captcha
            input_captcha.value = realtoken.value;
        }else{
            form.reportValidity()
        }
    })
    prev_btn.addEventListener('click', ()=>{
        progress_line.style.width = "50%";
        text_section.classList.toggle("d_none");
        text_section.classList.toggle("form_transition");
        radio_section.classList.toggle("d_none");
        radio_section.classList.toggle("form_transition");
        next_btn.classList.toggle("d_none");
        prev_btn.classList.toggle("d_none");
        submit_btn.classList.toggle("d_none");
    })
}
