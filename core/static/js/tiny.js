document.addEventListener("DOMContentLoaded", function() {
    tinymce.init({
        selector: 'textarea.tinymce',
        height: 200,
        width: 700,
        plugins: 'lists image media',
        content_css: '/static/css/tinystyle.css',
    });
});