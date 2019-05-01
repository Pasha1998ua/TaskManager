window.onscroll = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("pageHeader").classList.add("halfTransparentBlackBackground");
    } else {
        document.getElementById("pageHeader").classList.remove("halfTransparentBlackBackground");
    }
};