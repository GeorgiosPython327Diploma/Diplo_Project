function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader('X-CSRFToken', csrftoken);
        }
    }
});

$(document).ready(function () {
    $('.like-button, .dislike-button').on('click', function () {
        let articleId = $(this).data('article-id');
        let actionType = $(this).hasClass('like-button') ? 'like' : 'dislike';
        let countElement = $('#' + actionType + 's-count-' + articleId);
        let isLiked = $(this).data('is-liked');
        let isDisliked = $(this).data('is-disliked');

        if ((actionType === 'like' && (!isLiked || isDisliked)) || (actionType === 'dislike' && (!isLiked && !isDisliked))) {
            $.ajax({
                type: 'POST',
                url: '/articles/' + articleId + '/' + actionType + '/',
                data: { article_id: articleId },
                success: function (data) {
                    countElement.text(data[actionType + 's']);

                    $('.like-button[data-article-id=' + articleId + ']').data('is-liked', data.is_liked);
                    $('.like-button[data-article-id=' + articleId + ']').data('is-disliked', data.is_disliked);
                    $('.dislike-button[data-article-id=' + articleId + ']').data('is-liked', data.is_liked);
                    $('.dislike-button[data-article-id=' + articleId + ']').data('is-disliked', data.is_disliked);

                    $('.like-button[data-article-id=' + articleId + ']').removeClass('active');
                    $('.dislike-button[data-article-id=' + articleId + ']').removeClass('active');

                    if (data.is_liked) {
                        $('.like-button[data-article-id=' + articleId + ']').addClass('active');
                    } else if (data.is_disliked) {
                        $('.dislike-button[data-article-id=' + articleId + ']').addClass('active');
                    }
                },
                error: function () {
                    console.log('Ошибка ' + actionType + 'ов.');
                }
            });
        }
    });

    $('.like-button, .dislike-button').each(function () {
        let articleId = $(this).data('article-id');
        const likeDislikeStateString = localStorage.getItem('likeDislikeState_' + articleId);

        if (likeDislikeStateString) {
            const likeDislikeState = JSON.parse(likeDislikeStateString);
            $('.like-button[data-article-id=' + articleId + ']').data('is-liked', likeDislikeState.isLiked);
            $('.like-button[data-article-id=' + articleId + ']').data('is-disliked', likeDislikeState.isDisliked);
            $('.dislike-button[data-article-id=' + articleId + ']').data('is-liked', likeDislikeState.isLiked);
            $('.dislike-button[data-article-id=' + articleId + ']').data('is-disliked', likeDislikeState.isDisliked);
        }
    });
});