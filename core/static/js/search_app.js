// Функция для обрезки текста до определенного количества слов
function truncateText(text, maxWords) {
    const words = text.split(' ');

    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }

    return text;
}

// После загрузки документа выполняем функцию
$(document).ready(function () {
    // Находим поле ввода для поиска
    const searchInput = $("#search-input");
    // Находим контейнер результатов поиска
    const resultsContainer = $(".container");
    // Сохраняем изначальный URL для статей
    const originalArticlesUrl = "/";

    // Добавляем обработчик события ввода текста в поле поиска
    searchInput.on("input", function () {
        // Получаем текст из поля ввода
        const query = $(this).val();

        // Если запрос не пустой, скрываем список статей
        if (query.trim() !== "") {
            resultsContainer.find(".article-list").hide();
        } else {
            resultsContainer.find(".article-list").show();
        }

        // Очищаем контейнер результатов
        resultsContainer.empty();

        // Отправляем AJAX-запрос для поиска статей
        $.ajax({
            type: "GET",
            url: "/articles/search/",
            data: { query: query },
            success: function (data) {
                // Если найдены результаты
                if (data.results.length > 0) {
                    // Добавляем класс для отображения результатов
                    resultsContainer.addClass("has-results");

                    // Проходимся по каждому результату
                    data.results.forEach(function (result) {
                        // Обрезаем содержимое статьи до определенного количества слов
                        const truncatedContent = truncateText(result.content, 40);

                        // Создаем элемент статьи
                        const articleItem = $(`
                            <li class="article-item">
                                <a class="open_review" href="#" data-pk="${result.id}">
                                    <h3>${result.title}</h3>
                                </a>
                                ${result.photo ? `<img class="image-article" src="${result.photo}" alt="${result.title || 'Изображение статьи'}">` : ''}
                                <p class="content-article">${truncatedContent}</p>
                            </li>
                        `);

                        // Устанавливаем начальные стили элемента с помощью GSAP
                        gsap.set(articleItem, {
                            'text-align': 'center',
                            'margin': '116px auto -60px',
                            'opacity': 0,
                            'width': '60%',
                            'transform': 'translateY(-100px)',
                        });

                        gsap.set(articleItem.find('h3'), {
                            'color': 'rgba(88, 87, 87, 0.74)',
                            'font-weight': '600',
                            'font-family': 'Play, serif',
                            'font-size': '1.6em',
                        });

                        gsap.set(articleItem.find('a'), {
                            'text-decoration': 'none',
                            'color': 'inherit',
                        });

                        gsap.set(articleItem.find('p'), {
                            'font-family': 'Spectral SC, serif',
                            'font-weight': '400',
                            'font-size': '1em',
                            'color': 'rgb(82, 82, 80)',
                        });

                        // Анимация появления элемента с помощью GSAP
                        gsap.to(articleItem, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });

                        // Добавляем обработчик события клика для открытия обзора статьи
                        articleItem.find('.open_review').on('click', function (event) {
                            event.preventDefault();
                            const pk = $(this).data('pk');
                            window.location.href = `${pk}/review/`;
                        });

                        // Добавляем элемент статьи в контейнер результатов
                        resultsContainer.append(articleItem);
                    });

                    // Устанавливаем стили для контейнера результатов
                    resultsContainer.css({
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'grid',
                        overflow: 'scroll',
                        height: '790',
                        listStyleType: 'none',
                    });
                } else {
                    // Если результаты не найдены, перенаправляем на исходную базовую страницу
                    resultsContainer.removeClass("has-results");
                    resultsContainer.hide();
                    window.location.href = originalArticlesUrl;
                }
            },
            error: function () {
                console.log("Ошибка поиска.");
            },
        });
    });
});