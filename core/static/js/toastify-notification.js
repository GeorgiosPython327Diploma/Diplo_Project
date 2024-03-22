document.addEventListener("DOMContentLoaded", function() {
    var notification = document.getElementById('notification');

    // Показываем уведомление
    function showNotification(sender) {
        notification.innerText = `У вас новые сообщения от ${sender}!`;
        notification.style.display = 'block';
    }

    // Скрываем уведомление
    function hideNotification() {
        notification.style.display = 'none';
    }

    // Функция для обновления счетчика непрочитанных сообщений и отображения уведомления
    function updateUnreadCountAndNotification() {
        fetch('/accounts/unread_message_count/') // Используйте абсолютный путь к вашему представлению
            .then(response => response.json())
            .then(data => {
                var unreadCount = data.unread_count;
                var sender = data.sender || "Анонимный отправитель"; // Если sender не определен, используйте альтернативное значение
                if (unreadCount > 0) {
                    showNotification(sender); // Показываем уведомление с именем отправителя, если есть непрочитанные сообщения
                } else {
                    hideNotification(); // Скрываем уведомление, если нет непрочитанных сообщений
                }
            })
            .catch(error => {
                console.error('Error fetching unread message count:', error);
            });
    }

    // Первоначальное обновление счетчика непрочитанных сообщений и отображение уведомления
    updateUnreadCountAndNotification();

    // Повторяем обновление счетчика и отображение уведомления каждые 5 секунд
    setInterval(updateUnreadCountAndNotification, 5000);
});