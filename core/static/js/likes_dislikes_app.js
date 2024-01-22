// Получаем CSRF-токен из куки
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Ищем куку с нужным именем
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

// Добавляем CSRF-токен к каждому AJAX-запросу
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

    $(document).ready(function () {
    $('.like-button').on('click', function () {
        let articleId = $(this).data('article-id');
        let likeCountElement = $('#likes-count-' + articleId);

        $.ajax({
            type: 'POST',
            url: '/articles/' + articleId + '/like/',
            data: { article_id: articleId },
            success: function (data) {
                // Обновляем текст лайков после успешного запроса
                likeCountElement.text(data.likes);
            },
            error: function () {
                console.log('Error liking article.');
            }
        });
    });

    $('.dislike-button').on('click', function () {
        let articleId = $(this).data('article-id');
        let dislikeCountElement = $('#dislikes-count-' + articleId);

        $.ajax({
            type: 'POST',
            url: '/articles/' + articleId + '/dislike/',
            data: { article_id: articleId },
            success: function (data) {
                // Обновляем текст дизлайков после успешного запроса
                dislikeCountElement.text(data.dislikes);
            },
            error: function () {
                console.log('Error disliking article.');
            }
        });
    });
});

