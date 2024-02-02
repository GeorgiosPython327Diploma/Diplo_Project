document.addEventListener("DOMContentLoaded", function() {
    tinymce.init({
        selector: 'textarea.tinymce',
        height: 200,
        width: 700,
        plugins: 'lists image media emoticons link',
//        content_style: "body { background-color: #f5f5f5; border-radius: 40px; }",
    });
});