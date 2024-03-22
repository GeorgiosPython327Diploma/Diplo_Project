document.addEventListener("DOMContentLoaded", function() {
    let notification = document.getElementById('notification');

    function showNotification() {
        notification.style.display = 'block';
    }

    function hideNotification() {
        notification.style.display = 'none';
    }

    function updateUnreadCount() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/accounts/unread_message_count/', true);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                let data = JSON.parse(xhr.responseText);
                let unreadCount = data.unread_count;
                if (unreadCount > 0) {
                    showNotification();
                } else {
                    hideNotification();
                }
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        };
        xhr.onerror = function() {
            console.error('Request failed');
        };
        xhr.send();
    }

    updateUnreadCount();

    setInterval(updateUnreadCount, 5000);
});