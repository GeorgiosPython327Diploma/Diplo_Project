 $(document).ready(function() {
            $.ajax({
                url: '/get_like_dislike_count/',
                type: 'GET',
                dataType: 'json',
                success: function(response) {
                    $('#total-likes').text(response.total_likes);
                    $('#total-dislikes').text(response.total_dislikes);
                },
                error: function(error) {
                    console.error('Error:', error);
                }
            });
        });