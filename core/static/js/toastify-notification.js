document.addEventListener("DOMContentLoaded", function() {
    // Получаем ссылку на элемент уведомления и сообщение
    let notification = document.getElementById('notification');
    let messageElement = document.getElementById('message');

    // Функция для отображения уведомления
    function showNotification(sender) {
        // Устанавливаем текст сообщения с указанием отправителя
        messageElement.innerText = `Сообщение от ${sender}!!!`;
        // Показываем уведомление
        notification.style.display = 'block';

        // Анимация появления уведомления с использованием GSAP
        gsap.to(notification, { duration: 1, y: -70, ease: "power2.out" });

        // Запускаем таймер для скрытия уведомления через 1.5 секунды
        setTimeout(function() {
            hideNotification();
        }, 1500);
    }

    // Функция для скрытия уведомления
    function hideNotification() {
        // Анимация скрытия уведомления с использованием GSAP
        gsap.to(notification, { duration: 0.5, y: 100, ease: "power2.in", onComplete: () => {
            // По завершению анимации скрытия скрываем уведомление
            notification.style.display = 'none';
        }});
    }

    // Функция для обновления счетчика непрочитанных сообщений и отображения уведомления
    function updateUnreadCountAndNotification() {
        // Выполняем запрос к серверу для получения информации о непрочитанных сообщениях
        fetch('/accounts/unread_message_count/')
            .then(response => response.json())
            .then(data => {
                // Получаем количество непрочитанных сообщений и отправителя последнего сообщения
                let unreadCount = data.unread_count;
                let sender = data.sender || "Анонимный отправитель";
                // Если есть непрочитанные сообщения, отображаем уведомление, иначе скрываем
                if (unreadCount > 0) {
                    showNotification(sender);
                } else {
                    hideNotification();
                }
            })
            .catch(error => {
                // В случае ошибки выводим сообщение об ошибке в консоль
                console.error('Error fetching unread message count:', error);
            });
    }

    // Вызываем функцию для обновления счетчика и отображения уведомления
    updateUnreadCountAndNotification();
});