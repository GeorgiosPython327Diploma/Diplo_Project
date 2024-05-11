document.addEventListener("DOMContentLoaded", function () {
    // Находим элементы в DOM
    const inboxMessage = document.querySelector('.inbox-message');
    const composeMessage = document.querySelector('.compose-message');
    const backProfileLink = document.querySelector('.back-profile');
    const delBut = document.querySelector('.del-messages-but, .back-user-menu');

    // Устанавливаем начальные значения для элементов с помощью GSAP
    gsap.set(backProfileLink, { opacity: 0, y: '50%' });
    gsap.set(delBut, { opacity: 0, y: '50%' });

    // Анимация появления ссылки "назад" и кнопки "удалить" с изменением прозрачности и положения
    gsap.to(backProfileLink, { opacity: 1, y: '0%', duration: 1, ease: 'power1.inOut', delay: 0.5 });
    gsap.to(delBut, { opacity: 1, y: '0%', duration: 1, ease: 'bounce.inOut', delay: 1 });

    // Устанавливаем начальные значения и анимируем появление элементов "inboxMessage" и "composeMessage"
    gsap.set(inboxMessage, { opacity: 0, y: '100%' });
    gsap.set(composeMessage, { opacity: 0, y: '100%' });
    gsap.to(inboxMessage, { opacity: 1, y: '0%', duration: 1, ease: 'power1.inOut' });
    gsap.to(composeMessage, { opacity: 1, y: '0%', duration: 1, ease: 'power1.inOut' });
});