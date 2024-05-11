document.addEventListener('DOMContentLoaded', function() {
    // Находим кнопки просмотра сообщений, модальное окно, контент модального окна, кнопку закрытия модального окна,
    // сообщение во входящих сообщениях, кнопку удаления сообщений и ссылку "назад" в профиль
    const viewMessageBtns = document.querySelectorAll('.view-message-btn');
    const modal = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModalBtn');
    const inboxMessage = document.querySelector('.inbox-message');
    const delMessagesBtn = document.querySelector('.del-messages-but');
    const backProfileLink = document.querySelector('.back-profile');

    // Функция для отображения модального окна
    function showModal() {
        modal.style.display = 'block';

        modal.classList.remove('modal-enter', 'modal-enter-active');

        modal.classList.add('modal-enter');

        setTimeout(() => {
            modal.classList.add('modal-enter-active');
        }, 300);
    }

    // Функция для скрытия модального окна
    function hideModal() {
        modal.classList.remove('modal-enter-active');

        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
    }

    // Функция для скрытия элементов страницы (входящего сообщения, кнопки удаления и ссылки "назад" в профиль)
    function hideElements() {
        gsap.to([inboxMessage, delMessagesBtn, backProfileLink], { duration: 0.5, opacity: 0, display: 'none',  ease: 'bounce.in' });
    }

    // Функция для отображения скрытых элементов страницы
    function showElements() {
        gsap.to([inboxMessage, delMessagesBtn, backProfileLink], { duration: 0.5, opacity: 1, display: 'block', ease: 'bounce.in' });
    }

    // Добавляем обработчики событий для каждой кнопки просмотра сообщений
    viewMessageBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            // Получаем содержимое сообщения из атрибута data-content кнопки
            const messageContent = this.getAttribute('data-content');
            // Устанавливаем полученное содержимое в контент модального окна
            modalContent.innerHTML = messageContent;
            // Показываем модальное окно
            showModal();
            // Скрываем элементы страницы (входящее сообщение, кнопка удаления и ссылка "назад" в профиль)
            hideElements();
        });
    });

    // Добавляем обработчик события для кнопки закрытия модального окна
    closeModal.addEventListener('click', function() {
        // Скрываем модальное окно
        hideModal();
        // Показываем скрытые элементы страницы (входящее сообщение, кнопка удаления и ссылка "назад" в профиль)
        showElements();
    });

    // Добавляем обработчик события для модального окна при клике на фон
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            // Скрываем модальное окно
            hideModal();
            // Показываем скрытые элементы страницы (входящее сообщение, кнопка удаления и ссылка "назад" в профиль)
            showElements();
        }
    });

    // Добавляем дополнительный обработчик события для модального окна
    modal.addEventListener('click', function() {
        // Скрываем модальное окно
        hideModal();
        // Показываем скрытые элементы страницы (входящее сообщение, кнопка удаления и ссылка "назад" в профиль)
        showElements();
    });
});