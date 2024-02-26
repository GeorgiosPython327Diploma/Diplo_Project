document.addEventListener("DOMContentLoaded", function () {
    const categoriesList = document.querySelector('.categories-article ul');
    const categoriesItems = document.querySelectorAll('.categories-article li');
    const maxTranslateX = 0.7;

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {
        const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        const direction = window.scrollY > lastScrollY ? 'forward' : 'backward';

        categoriesItems.forEach((item, index) => {
            let parallaxValue = (scrollPercentage * (index + 1)) / 100;

            parallaxValue = Math.min(parallaxValue, maxTranslateX);

            gsap.to(item, {
                x: parallaxValue * 100,
                opacity: direction === 'backward' ? 0 : 1,
                duration: 0.3,
                ease: 'power1.inOut',
            });
        });

        lastScrollY = window.scrollY;

        if (direction === 'backward') {
            gsap.to(categoriesItems, {
                x: -100,
                opacity: 0,
                duration: 0.3,
                ease: 'power1.inOut',
            });
        }
    });
});