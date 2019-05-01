/*var slides = document.querySelectorAll('.slider .slide');
var currentSlide = 0;
var flag = false;


function slideFromRightToLeft() {
    if (!flag) {
        flag = true;
        slides[currentSlide].classList.remove("current");
        slides[currentSlide].classList.add("preCurrent");
        slides[currentSlide].addEventListener('transitionend', function (e) {
            e.target.removeEventListener(e.type, arguments.callee);
            e.target.classList.add("noTransition");
            e.target.classList.remove("preCurrent");
            e.target.offsetHeight;//flushing the CSS changes
            e.target.classList.remove("noTransition");
            flag = false;
        });
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("current");
    }
}

function slideFromLeftToRight() {
    if (!flag) {
        flag = true;
        slides[currentSlide].classList.remove("current");
        currentSlide = (currentSlide !== 0 ) ? (currentSlide - 1) % slides.length : slides.length - 1;
        slides[currentSlide].classList.add("noTransition");
        slides[currentSlide].classList.add("preCurrent");
        slides[currentSlide].offsetHeight;//flushing the CSS changes
        slides[currentSlide].classList.remove("noTransition");
        slides[currentSlide].classList.remove("preCurrent");
        slides[currentSlide].classList.add("current");
        slides[currentSlide].addEventListener('transitionend', function (e) {
            e.target.removeEventListener(e.type, arguments.callee);
            flag = false;
        });
    }
}*/