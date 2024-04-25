document.addEventListener("DOMContentLoaded", function () {
    const categoriesList = document.querySelector('.categories-article ul');
    const categoriesItems = document.querySelectorAll('.categories-article li');
    const maxTranslateX = 0.7;

    let lastScrollY = window.scrollY;

    window.addEventListener("wheel", function(event) {
        const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        const direction = event.deltaY > 0 ? 'forward' : 'backward';

        categoriesItems.forEach((item, index) => {
            let parallaxValue = (scrollPercentage * (index + 1)) / 100;

            parallaxValue = Math.min(parallaxValue, maxTranslateX);

            gsap.to(item, {
                x: parallaxValue * 100,
                opacity: direction === 'backward' ? 0 : 1,
                duration: 0.2,
                ease: 'power1.inOut',
            });
        });

        lastScrollY = window.scrollY;

        if (direction === 'backward') {
            gsap.to(categoriesItems, {
                x: -100,
                opacity: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power1.inOut',
            });
        }
    });

    categoriesItems.forEach(item => {
        item.addEventListener("mouseenter", function () {
            gsap.to(item, {
                scale: 1.04,
                duration: 0.3,
                ease: 'power3.inOut',
            });
        });

        item.addEventListener("mouseleave", function () {
            gsap.to(item, {
                scale: 1,
                duration: 0.3,
                ease: 'power1.inOut',
            });
        });
    });
});