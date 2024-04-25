document.addEventListener("DOMContentLoaded", function () {
    const categoriesList = document.querySelector('.categories-article ul');
    const categoriesItems = document.querySelectorAll('.categories-article li');
    const maxTranslateX = 0.7;
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function(event) {
        const currentScrollY = window.scrollY;
        const direction = currentScrollY > lastScrollY ? 'forward' : 'backward';

        if (direction === 'forward') {
            categoriesItems.forEach((item, index) => {
                let parallaxValue = (currentScrollY / (document.body.scrollHeight - window.innerHeight)) * 100 * (index + 1) / 100;
                parallaxValue = Math.min(parallaxValue, maxTranslateX);

                gsap.to(item, {
                    x: parallaxValue * 100,
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power1.inOut',
                });
            });
        } else {
            gsap.to(categoriesItems, {
                x: -100,
                opacity: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power1.inOut',
            });
        }

        lastScrollY = currentScrollY;
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