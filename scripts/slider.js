var slides = document.querySelectorAll('.slider .slide');
const localStyles = getStyleClassList("localStyles");
var currentSlide = 0;
var flag = false;

const stateSwiper = (el, newstate, oldstate) => new Promise((resolve, reject) => {
    const style = getComputedStyle(el);
    var props = style.transition.split(" ").map((_, i) => { if (!(i % 4)) { return _ } }).filter((el) => el !== undefined);

    if (oldstate === null) { console.log("Old state is not defined"); }

    if (newstate === null) { console.log("New state is not defined"); }

    if (oldstate !== null && newstate !== null) {
        el.classList.remove(oldstate);
        el.classList.add(newstate);
        props = props.filter((_) => getStyleClass(localStyles, newstate).style.getPropertyValue(_) !== getStyleClass(localStyles, oldstate).style.getPropertyValue(_));
    }

    el.addEventListener('transitionend', function (e) {
        props = props.filter((_) => _ !== e.propertyName);
        if (props.length === 0) {
            e.target.removeEventListener(e.type, arguments.callee);
            resolve(newstate);
        }
    });
});

function getStyleClass(classesList, className) {
    for (let i = 0; i < classesList.length; i++) {
        if (classesList[i].type === 1) {
            if (classesList[i].selectorText == "." + className) {
                return classesList[i];
            }
        } else if(classesList[i].type === 3) {
            let res = getStyleClass(classesList[i].styleSheet.rules, className);
            if(res !== undefined) {
                return res;
            }
        }
    }
}

function getStyleClassList(title){
    let styleShts = document.styleSheets;
    for (let i = 0; i < styleShts.length; i++) {
        if(styleShts[i].title === title) {
            return styleShts[i].rules;
        }
    }
}

async function slide(el, first, second, third) {
    try {
        await stateSwiper(el, second, first);
        await stateSwiper(el, third, second);
    } catch (error) {
        console.log(error);
    }
}

async function slideFromRightToLeft() {
    if (!flag) {
        flag = true;
        slide(slides[currentSlide], "current", "beforeCurrent", "default");
        currentSlide = (currentSlide + 1) % slides.length;
        await slide(slides[currentSlide], "default", "afterCurrent", "current");
        console.log("slideFromRightToLeft done");
        flag = false;
    }
}

async function slideFromLeftToRight() {
    if (!flag) {
        flag = true;
        slide(slides[currentSlide], "current", "afterCurrent", "default");
        currentSlide = (currentSlide !== 0) ? (currentSlide - 1) % slides.length : slides.length - 1;
        await slide(slides[currentSlide], "default", "beforeCurrent", "current");
        console.log("slideFromLeftToRight done");
        flag = false;
    }
}