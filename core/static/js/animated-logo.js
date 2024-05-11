document.addEventListener('DOMContentLoaded', function () {
    // Находим контейнер изображения с id "logo_animated" и сохраняем его в переменную
    const imageContainer = document.getElementById('logo_animated');
    let logoAnimation; // Переменная для хранения анимации логотипа

    // Создаем временную шкалу анимации для логотипа с помощью GSAP, которая будет повторяться бесконечно и будет использовать эффект "yoyo"
    const logoAnimationTimeline = gsap.timeline({ repeat: -1, yoyo: true });

    // Добавляем к анимации логотипа вращение по оси Y на -360 градусов за 1 секунду с эффектом "power1.inOut"
    logoAnimationTimeline.to(imageContainer, { rotationY: -360, duration: 1, ease: 'power1.inOut' });

    // Функция для запуска анимации логотипа
    function playLogoAnimation() {
        // Запускаем анимацию и сохраняем объект анимации в переменную
        logoAnimation = logoAnimationTimeline.restart();
        // Устанавливаем таймер для остановки анимации через 1 секунду
        setTimeout(stopLogoAnimation, 1000);
    }

    // Функция для остановки анимации логотипа
    function stopLogoAnimation() {
        // Приостанавливаем анимацию логотипа
        logoAnimation.pause();
        // Устанавливаем таймер для повторного запуска анимации через 20 секунд
        setTimeout(playLogoAnimation, 20000);
    }

    // Запускаем анимацию логотипа
    playLogoAnimation();
});