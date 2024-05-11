document.addEventListener("DOMContentLoaded", function () {
    // Находим все элементы статьи
    let articleItems = document.querySelectorAll(".article-item");
    // Устанавливаем точку срабатывания для проверки видимости элемента
    let triggerPoint = window.innerHeight * 0.3;

    // Проверяем, есть ли статьи на странице
    if (articleItems.length > 0) {
        // Проходимся по каждой статье
        articleItems.forEach(function (articleItem) {
            // Устанавливаем CSS-переходы для плавных анимаций
            articleItem.style.transition = "transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out";

            // Переменная для идентификатора таймера
            let timeoutId;

            // Добавляем обработчик события скролла окна
            window.addEventListener("scroll", function () {
                // Очищаем предыдущий таймер, чтобы избежать множественных вызовов функции
                clearTimeout(timeoutId);

                // Устанавливаем новый таймер для оптимизации производительности
                timeoutId = setTimeout(function () {
                    // Получаем границы элемента
                    let rect = articleItem.getBoundingClientRect();
                    // Проверяем, виден ли элемент в окне браузера с учетом точки срабатывания
                    let isVisible = (rect.top >= -triggerPoint && rect.bottom <= window.innerHeight + triggerPoint);

                    // Если элемент виден
                    if (isVisible) {
                        // Увеличиваем масштаб и добавляем тень
                        articleItem.style.transform = "scale(1.03)";
                        articleItem.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
                    } else {
                        // Возвращаем обычный масштаб и убираем тень
                        articleItem.style.transform = "scale(1)";
                        articleItem.style.boxShadow = "0 0 0 rgba(0, 0, 0, 0)";
                    }
                }, 50); // Задержка перед проверкой видимости элемента
            });
        });
    }
});