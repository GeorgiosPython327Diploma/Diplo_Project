// Функция для получения значения куки по имени
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        // Разделяем строку куки на отдельные куки
        const cookies = document.cookie.split(';');
        // Проходим по каждой куки
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Если имя куки совпадает с заданным и значением куки не пустое
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                // Декодируем и сохраняем значение куки
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue; // Возвращаем значение куки
}

// Получаем значение куки 'csrftoken'
const csrftoken = getCookie('csrftoken');

// Настройка AJAX-запросов для отправки CSRF-токена
$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        // Если тип запроса не является безопасным и запрос не кросс-доменный
        if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
            // Устанавливаем заголовок 'X-CSRFToken' с полученным CSRF-токеном
            xhr.setRequestHeader('X-CSRFToken', csrftoken);
        }
    }
});

// Когда документ полностью загружен и готов к работе
$(document).ready(function () {
    // Обработчик события 'click' для кнопок "like" и "dislike"
    $('.like-button, .dislike-button').on('click', function () {
        // Получаем id статьи, тип действия, количество лайков/дизлайков, а также текущее состояние "лайкнуто" или "дизлайкнуто"
        let articleId = $(this).data('article-id');
        let actionType = $(this).hasClass('like-button') ? 'like' : 'dislike';
        let countElement = $('#' + actionType + 's-count-' + articleId);
        let isLiked = $(this).data('is-liked');
        let isDisliked = $(this).data('is-disliked');

        // Если выполнены определенные условия для выполнения действия (лайка/дизлайка)
        if ((actionType === 'like' && (!isLiked || isDisliked)) || (actionType === 'dislike' && (!isLiked && !isDisliked))) {
            // Отправляем AJAX-запрос на сервер для выполнения действия (лайка/дизлайка)
            $.ajax({
                type: 'POST', // Тип запроса - POST
                url: '/articles/' + articleId + '/' + actionType + '/', // URL для запроса
                data: { article_id: articleId }, // Данные для передачи на сервер
                success: function (data) { // Обработка успешного ответа от сервера
                    // Обновляем количество лайков/дизлайков на странице
                    countElement.text(data[actionType + 's']);

                    // Обновляем данные о состоянии "лайкнуто" и "дизлайкнуто" для текущей статьи
                    $('.like-button[data-article-id=' + articleId + ']').data('is-liked', data.is_liked);
                    $('.like-button[data-article-id=' + articleId + ']').data('is-disliked', data.is_disliked);
                    $('.dislike-button[data-article-id=' + articleId + ']').data('is-liked', data.is_liked);
                    $('.dislike-button[data-article-id=' + articleId + ']').data('is-disliked', data.is_disliked);

                    // Удаляем класс 'active' у кнопок "like" и "dislike"
                    $('.like-button[data-article-id=' + articleId + ']').removeClass('active');
                    $('.dislike-button[data-article-id=' + articleId + ']').removeClass('active');

                    // Добавляем класс 'active' к кнопке "like" или "dislike" в зависимости от текущего состояния
                    if (data.is_liked) {
                        $('.like-button[data-article-id=' + articleId + ']').addClass('active');
                    } else if (data.is_disliked) {
                        $('.dislike-button[data-article-id=' + articleId + ']').addClass('active');
                    }
                },
                error: function () { // Обработка ошибки
                    console.log('Ошибка ' + actionType + 'ов.'); // Вывод сообщения об ошибке в консоль
                }
            });
        }
    });

    // Для каждой кнопки "like" и "dislike"
    $('.like-button, .dislike-button').each(function () {
        let articleId = $(this).data('article-id');
        // Получаем состояние лайка/дизлайка из localStorage
        const likeDislikeStateString = localStorage.getItem('likeDislikeState_' + articleId);

        // Если состояние было сохранено в localStorage
        if (likeDislikeStateString) {
            const likeDislikeState = JSON.parse(likeDislikeStateString);
            // Обновляем данные о состоянии "лайкнуто" и "дизлайкнуто" для текущей статьи
            $('.like-button[data-article-id=' + articleId + ']').data('is-liked', likeDislikeState.isLiked);
            $('.like-button[data-article-id=' + articleId + ']').data('is-disliked', likeDislikeState.isDisliked);
            $('.dislike-button[data-article-id=' + articleId + ']').data('is-liked', likeDislikeState.isLiked);
            $('.dislike-button[data-article-id=' + articleId + ']').data('is-disliked', likeDislikeState.isDisliked);
        }
    });
});