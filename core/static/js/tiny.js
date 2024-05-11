document.addEventListener("DOMContentLoaded", function() {
  // Инициализация TinyMCE для текстовых областей с классом 'content_comment'
  tinymce.init({
    selector: 'textarea.content_comment', // Выбираем все текстовые области с классом 'content_comment'
    height: 200, // Высота текстовой области
    width: 800, // Ширина текстовой области
    plugins: 'autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table contextmenu paste code emoticons', // Подключаемые плагины
    toolbar: 'undo redo | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | emoticons', // Панель инструментов
    invalid_elements: 'h1,h2,h3,h4,h5,h6', // Список недопустимых элементов
  });

  // Инициализация TinyMCE для текстовых областей с классом 'content_edit'
  tinymce.init({
    selector: 'textarea.content_edit', // Выбираем все текстовые области с классом 'content_edit'
    height: 500, // Высота текстовой области
    width: 800, // Ширина текстовой области
    menubar: true, // Включаем меню
    plugins: 'autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table contextmenu paste code emoticons', // Подключаемые плагины
    toolbar: 'undo redo | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | emoticons', // Панель инструментов
    invalid_elements: 'h1,h2,h3,h4,h5,h6', // Список недопустимых элементов
  });

  // Инициализация TinyMCE для текстовых областей с классом 'content_add'
  tinymce.init({
    selector: 'textarea.content_add', // Выбираем все текстовые области с классом 'content_add'
    height: 300, // Высота текстовой области
    menubar: true, // Включаем меню
    plugins: 'autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table contextmenu paste code emoticons', // Подключаемые плагины
    toolbar: 'undo redo | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | emoticons', // Панель инструментов
    invalid_elements: 'h1,h2,h3,h4,h5,h6', // Список недопустимых элементов
  });
});