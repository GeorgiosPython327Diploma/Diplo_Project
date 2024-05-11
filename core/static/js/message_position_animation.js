document.addEventListener("DOMContentLoaded", function () {
    // Находим элемент, который будет изменять свою позицию
    const messagePosition = document.getElementById('messagePosition');
    // Флаг для отслеживания состояния открытия/закрытия
    let isOpen = false;

    // Функция для переключения позиции контейнера сообщений
    function toggleMessagePosition() {
        // Если контейнер  закрыт (не открыт)
        if (!isOpen) {
            // Анимация открытия контейнера сообщений с перемещением влево
            gsap.to(messagePosition, { duration: 0.5, x: '-83%', ease: 'power2.inOut' });
            // Устанавливаем флаг как открыто
            isOpen = true;
        } else {
            // Если контейнер открыт
            // Анимация закрытия контейнера с перемещением вправо
            gsap.to(messagePosition, { duration: 0.5, x: '1%', ease: 'power2.inOut' });
            // Устанавливаем флаг как закрыто
            isOpen = false;
        }
    }

    // Задержка перед автоматическим открытием/закрытием контейнера сообщений
    setTimeout(function() {
        toggleMessagePosition(); // Вызываем функцию для открытия/закрытия контейнера сообщений
    }, 1000);

    // Добавляем обработчик события клика для элемента контейнера сообщений
    messagePosition.addEventListener('click', function() {
        toggleMessagePosition(); // Вызываем функцию для открытия/закрытия контейнера сообщений
    });
});