document.addEventListener("DOMContentLoaded", function () {
    const categoriesList = document.querySelector('.categories-article ul');
    const categoriesItems = document.querySelectorAll('.categories-article li');
    const shape = document.querySelector('.shape');
    let isOpen = false;

    const openMenu = () => {
        gsap.to('.categories-article', {
            x: 100,
            duration: 0.5,
            ease: 'power1.inOut',
        });

        categoriesItems.forEach((item, index) => {
            gsap.to(item, {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power1.inOut',
                delay: index * 0.1
            });
        });
    };

    const closeMenu = () => {
        gsap.to('.categories-article', {
            x: -100,
            duration: 0.5,
            ease: 'power1.inOut',
        });

        categoriesItems.forEach((item, index) => {
            gsap.to(item, {
                x: 0,
                opacity: 0,
                duration: 0.5,
                ease: 'power1.inOut',
            });
        });
    };

    const toggleMenu = () => {
        if (!isOpen) {
            openMenu();
        } else {
            closeMenu();
        }
        isOpen = !isOpen;
    };

    openMenu();

    shape.addEventListener("click", toggleMenu);

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