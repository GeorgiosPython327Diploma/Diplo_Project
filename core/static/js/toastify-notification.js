document.addEventListener("DOMContentLoaded", function() {
    let notification = document.getElementById('notification');

    function showNotification(sender) {
        notification.innerText = `У вас новые сообщения от ${sender}!`;
        notification.style.display = 'block';

        setTimeout(function() {
            hideNotification();
        }, 7000);
    }

    function hideNotification() {
        notification.style.display = 'none';
    }

    function updateUnreadCountAndNotification() {
        fetch('/accounts/unread_message_count/')
            .then(response => response.json())
            .then(data => {
                let unreadCount = data.unread_count;
                let sender = data.sender || "Анонимный отправитель";
                if (unreadCount > 0) {
                    showNotification(sender);
                } else {
                    hideNotification();
                }
            })
            .catch(error => {
                console.error('Error fetching unread message count:', error);
            });
    }

    updateUnreadCountAndNotification();
});