document.addEventListener("DOMContentLoaded", function () {
    let animatedBorders = document.querySelectorAll(".animated-border");

    animatedBorders.forEach(function (animatedLi) {
        animatedLi.addEventListener("mouseenter", function () {
            this.classList.add("border-hover");
        });

        animatedLi.addEventListener("mouseleave", function () {
            this.classList.remove("border-hover");
        });
    });
});