document.addEventListener("DOMContentLoaded", function() {
  tinymce.init({
    selector: 'textarea.content_comment',
    height: 200,
    width: 800,
    plugins: 'autoresize  autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table contextmenu paste code emoticons',
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | emoticons',
  });

  tinymce.init({
    selector: 'textarea.content_edit',
    height: 500,
    menubar: true,
    plugins: 'autoresize autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table contextmenu paste code emoticons',
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | emoticons',
  });
});