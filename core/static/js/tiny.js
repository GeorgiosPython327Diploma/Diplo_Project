document.addEventListener("DOMContentLoaded", function() {
    tinymce.init({
        selector: 'textarea.tinymce',
        height: 200,
        width: 700,
        plugins: 'lists image media emoticons link',
        style_formats: [
            { title: 'Paragraph', format: 'p' },
            { title: 'Heading 1', format: 'h1' },
            { title: 'Bold', icon: 'bold', format: 'bold' },
            { title: 'Italic', icon: 'italic', format: 'italic' },
            { title: 'Underline', icon: 'underline', format: 'underline' },
            { title: 'Strikethrough', icon: 'strikethrough', format: 'strikethrough' },
            { title: 'Bulleted List', icon: 'bullist', format: 'ul' },
            { title: 'Numbered List', icon: 'numlist', format: 'ol' },
            { title: 'Link', icon: 'link', format: 'link' },
            { title: 'Unlink', icon: 'unlink', format: 'unlink' },
        ],
    });
});