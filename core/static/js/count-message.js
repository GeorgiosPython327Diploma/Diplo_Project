// Функция для обновления количества непрочитанных сообщений
function updateUnreadMessageCount() {
    // Получаем URL для запроса из атрибута данных элемента с id "unread-message-url"
    let url = $('#unread-message-url').data('url');
    // Отправляем AJAX-запрос на сервер
    $.ajax({
        url: url, // URL для запроса
        type: 'GET', // Тип запроса - GET
        success: function(response) {
            // При успешном выполнении запроса обновляем количество непрочитанных сообщений на странице
            $('#unread-message-count').text(response.unread_count); // Обновляем текст элемента с id "unread-message-count"
        },
        error: function(xhr, status, error) {
            // В случае ошибки выводим сообщение об ошибке в консоль браузера
            console.error('Ошибка счетчика', error);
        }
    });
}

// Когда документ полностью загружен и готов к работе
$(document).ready(function() {
    // Вызываем функцию обновления количества непрочитанных сообщений сразу после загрузки страницы
    updateUnreadMessageCount();
    // Устанавливаем интервал для периодического обновления количества непрочитанных сообщений (раз в 60 секунд)
    setInterval(updateUnreadMessageCount, 60000);
});