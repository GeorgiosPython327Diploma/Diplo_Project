document.addEventListener("DOMContentLoaded", function () {
    // Находим список категорий статей, элементы категорий и форму
    const categoriesList = document.querySelector('.categories-article ul');
    const categoriesItems = document.querySelectorAll('.categories-article li');
    const shape = document.querySelector('.shape');
    // Флаг для отслеживания состояния открытия/закрытия меню
    let isOpen = false;

    // Функция для открытия меню
    const openMenu = () => {
        // Анимация сдвига меню вправо
        gsap.to('.categories-article', {
            x: 100,
            duration: 0.5,
            ease: 'power1.inOut',
        });

        // Анимация появления элементов категорий
        categoriesItems.forEach((item, index) => {
            gsap.to(item, {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power1.inOut',
                delay: index * 0.1 // Задержка для последовательного появления категорий
            });
        });
    };

    // Функция для закрытия меню
    const closeMenu = () => {
        // Анимация сдвига меню влево
        gsap.to('.categories-article', {
            x: -100,
            duration: 0.5,
            ease: 'power1.inOut',
        });

        // Анимация исчезновения элементов категорий
        categoriesItems.forEach((item, index) => {
            gsap.to(item, {
                x: 0,
                opacity: 0,
                duration: 0.5,
                ease: 'power1.inOut',
            });
        });
    };

    // Функция для переключения меню (открытия/закрытия)
    const toggleMenu = () => {
        // Если меню закрыто, открываем его, иначе закрываем
        if (!isOpen) {
            openMenu();
        } else {
            closeMenu();
        }
        // Инвертируем значение флага
        isOpen = !isOpen;
    };

    // Открываем меню по умолчанию
    openMenu();

    // Добавляем обработчик события клика для элемента "shape" (формы)
    shape.addEventListener("click", toggleMenu);

    // Добавляем обработчики событий для элементов категорий при наведении мыши
    categoriesItems.forEach(item => {
        // При наведении мыши увеличиваем масштаб элемента
        item.addEventListener("mouseenter", function () {
            gsap.to(item, {
                scale: 1.04,
                duration: 0.3,
                ease: 'power3.inOut',
            });
        });
        // При уходе мыши возвращаем обычный масштаб элемента
        item.addEventListener("mouseleave", function () {
            gsap.to(item, {
                scale: 1,
                duration: 0.3,
                ease: 'power1.inOut',
            });
        });
    });
});