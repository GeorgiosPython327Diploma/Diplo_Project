function updateUnreadMessageCount() {
    var url = $('#unread-message-url').data('url');
    $.ajax({
        url: url,
        type: 'GET',
        success: function(response) {
            $('#unread-message-count').text(response.unread_count);
        },
        error: function(xhr, status, error) {
            console.error('Error while updating unread message count:', error);
        }
    });
}

$(document).ready(function() {
    updateUnreadMessageCount();
    setInterval(updateUnreadMessageCount, 60000);
});
