document.addEventListener("DOMContentLoaded", function () {
    // Находим все элементы с классами "animated-border" и "about_project" и сохраняем их в переменную
    let animatedBorders = document.querySelectorAll(".animated-border, .about_project");

    // Для каждого найденного элемента добавляем обработчики событий
    animatedBorders.forEach(function (animatedLi) {
        // Добавляем обработчик события "mouseenter" для каждого элемента
        animatedLi.addEventListener("mouseenter", function () {
            // Добавляем класс "border-hover" при наведении курсора мыши
            this.classList.add("border-hover");
        });

        // Добавляем обработчик события "mouseleave" для каждого элемента
        animatedLi.addEventListener("mouseleave", function () {
            // Удаляем класс "border-hover" при уходе курсора мыши
            this.classList.remove("border-hover");
        });
    });
});