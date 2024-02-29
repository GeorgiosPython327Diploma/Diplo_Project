document.addEventListener("DOMContentLoaded", function () {
        let animatedLi = document.getElementById("animated-border");

        animatedLi.addEventListener("mouseenter", function () {
            this.classList.add("border-hover");
        });

        animatedLi.addEventListener("mouseleave", function () {
            this.classList.remove("border-hover");
        });
    });