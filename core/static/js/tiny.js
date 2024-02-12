document.addEventListener("DOMContentLoaded", function() {
  tinymce.init({
    selector: 'textarea.content1',
    height: 200,
    width: 800,
    plugins: 'lists image media emoticons link',
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
  });

  tinymce.init({
    selector: 'textarea.content2',
    height: 500,
    menubar: true,
    plugins: 'autoresize autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table contextmenu paste code',
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
  });
});