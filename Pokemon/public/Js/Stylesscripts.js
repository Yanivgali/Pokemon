window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
})
var loader = document.getElementById("preloader");
var body = document.querySelector("body");
var siteheader = document.getElementById("site-header");
window.addEventListener("load", function () {
    setTimeout(() => {
        loader.style.display = "none";
        siteheader.style.display = "flex";
        body.style.overflow = "auto";
    }, 2000);
});