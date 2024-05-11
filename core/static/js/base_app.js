document.addEventListener('DOMContentLoaded', function () {
    // Находим элемент с классом "shape" и сохраняем его в переменную
    const shape = document.querySelector('.shape');
    // Создаем временную шкалу анимации с помощью GSAP, которая будет повторяться бесконечно и будет использовать эффект "yoyo"
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });

    // Устанавливаем начальные значения ширины и высоты для элемента "shape"
    shape.style.width = '20px';
    shape.style.height = '20px';

    // Добавляем в анимацию изменение радиуса скругления углов, масштабирование, вращение и продолжительность 1 секунда
    timeline.to(shape, {
        borderRadius: '25%',
        scale: 1,
        duration: 1,
        ease: 'power1.inOut',
        rotation: 360,
    });

    // Добавляем в анимацию изменение масштаба, вращение в обратную сторону и обработчик завершения анимации
    timeline.to(shape, {
        scale: 0.8,
        duration: 1,
        ease: 'power1.inOut',
        rotation: -360,
        onComplete: function () {
            // По завершении анимации возвращаем начальные значения масштаба и вращения
            gsap.to(shape, {
                scale: 1,
                duration: 0,
                rotation: 0,
            });
        },
    });

    // Добавляем анимацию появления для элемента "body" с изменением прозрачности за 0.6 секунды с эффектом "power3.inOut"
    gsap.to('body', {
        opacity: 1,
        duration: 0.6,
        ease: 'power3.inOut',
    });

    // Находим элемент с классом "category-list"
    let categoryList = document.querySelector('.category-list');
    if (categoryList) {
        // Если элемент найден, добавляем обработчик события "click"
        categoryList.addEventListener('click', function(event) {
            let target = event.target;
            if (target.tagName === 'LI') {
                // Если клик произошел по элементу "LI", находим вложенный элемент "a" и перенаправляем на его адрес
                let link = target.querySelector('a');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
    } else {
        // Если элемент не найден, выводим сообщение об ошибке в консоль
        console.error("Элемент не найден");
    }
});