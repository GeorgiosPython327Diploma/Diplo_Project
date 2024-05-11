$(document).ready(function() {
    // Отправляем AJAX-запрос для получения количества лайков и дизлайков
    $.ajax({
        url: '/get_like_dislike_count/', // URL-адрес, на который отправляется запрос
        type: 'GET', // Тип запроса (GET)
        dataType: 'json', // Ожидаемый тип данных в ответе (JSON)
        success: function(response) { // Функция, которая будет выполнена при успешном ответе от сервера
            // Обновляем текстовые поля с количеством лайков и дизлайков
            $('#total-likes').text(response.total_likes); // Устанавливаем количество лайков
            $('#total-dislikes').text(response.total_dislikes); // Устанавливаем количество дизлайков
        },
        error: function(error) { // Функция, которая будет выполнена при ошибке запроса
            console.error('Error:', error); // Выводим сообщение об ошибке в консоль браузера
        }
    });
});