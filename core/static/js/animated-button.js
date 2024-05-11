document.addEventListener('DOMContentLoaded', function () {
    // Находим кнопку с классом "animated_bt" и сохраняем ее в переменную
    const button = document.querySelector('.animated_bt');
    // Создаем анимацию кнопки с помощью GSAP, которая будет повторяться бесконечно и будет использовать эффект "yoyo"
    const buttonAnimation = gsap.timeline({ repeat: -1, yoyo: true });

    // Добавляем к анимации изменение координат кнопки, создавая эффект "подпрыгивания"
    buttonAnimation.to(button, { x: 1, y: -1, x: 1, y: 1, duration: 0.1, ease: 'bounce.inOut' });

    // Функция для запуска анимации кнопки
    function playButtonAnimation() {
        // Перезапускаем анимацию кнопки
        buttonAnimation.restart();
        // Устанавливаем таймер для остановки анимации через 2 секунды
        setTimeout(stopButtonAnimation, 2000);
    }

    // Функция для остановки анимации кнопки
    function stopButtonAnimation() {
        // Приостанавливаем анимацию кнопки
        buttonAnimation.pause();
        // Устанавливаем таймер для повторного запуска анимации через 11 секунд
        setTimeout(playButtonAnimation, 11000);
    }

    // Запускаем анимацию кнопки
    playButtonAnimation();
});