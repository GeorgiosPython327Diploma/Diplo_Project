document.addEventListener("DOMContentLoaded", function() {
    // Находим ссылку на compose
    let composeMessageLink = document.getElementById('compose-message-link');

    // Применяем анимацию с использованием GSAP для появления ссылки на compose
    gsap.from(composeMessageLink, {
        opacity: 0, // Начальное значение непрозрачности (0 - полностью прозрачно)
        duration: 1, // Продолжительность анимации в секундах
        delay: 1, // Задержка перед началом анимации в секундах
        ease: "back.out" // Тип эффекта анимации ("back.out" - с эффектом "отскока")
    });
});