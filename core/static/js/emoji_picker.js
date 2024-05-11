// Функция для вставки эмодзи в текстовое поле
function insertEmoji(emoji) {
    // Находим текстовое поле по его id "id_content"
    let textarea = document.getElementById('id_content');
    // Добавляем выбранное эмодзи в текстовое поля
    textarea.value += emoji;
}