window.onload = function() {
    // Устанавливаем начальное положение для элементов с классами '.login-menu', '.register-menu', '.change-password-menu', '.add-article-container', '.edit-container-article', '#bio-text-container', '#bio-container', '.static-bio'
    gsap.set([".login-menu", ".register-menu", ".change-password-menu", ".add-article-container", ".edit-container-article", "#bio-text-container", "#bio-container", ".static-bio"], {
        x: -100, // Смещение по оси X на -100 пикселей
        y: 100 // Смещение по оси Y на 100 пикселей
    });

    // Анимация для элементов с классами '.login-menu', '.register-menu', '.change-password-menu', '.add-article-container', '.edit-container-article'
    gsap.to([".login-menu", ".register-menu", ".change-password-menu", ".add-article-container", ".edit-container-article"], {
        duration: 0.1, // Продолжительность анимации 0.1 секунды
        y: 0, // Конечное положение по оси Y: 0 пикселей
        x: 0, // Конечное положение по оси X: 0 пикселей
        ease: "power2.out" // Тип анимации (эффект ease)
    });

    // Анимация для элементов с идентификаторами '#bio-text-container', '#bio-container', '.static-bio'
    gsap.to(["#bio-text-container", "#bio-container", ".static-bio"], {
        duration: 0.3, // Продолжительность анимации 0.3 секунды
        x: 0, // Конечное положение по оси X: 0 пикселей
        y: 0, // Конечное положение по оси Y: 0 пикселей
        ease: "bounce.inOut" // Тип анимации (эффект ease)
    });
};