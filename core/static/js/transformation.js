window.onload = function() {
    $(".login-menu, .register-menu, .change-password-menu, .add-article-container, .edit-container-article, #bio-text-container, #bio-container, .static-bio").css({
        "transform": "translateY(100%) translateX(-100%)",
        "transition": "transform ease-in-out 0.8s",
    });

    setTimeout(function() {
        $(".login-menu, .register-menu, .change-password-menu, .add-article-container, .edit-container-article").css({
            "transform": "translateY(0)",
        });

        $("#bio-text-container, #bio-container, .static-bio").css({
            "transform": "translateY(0) translateX(0)",
        });
    }, 100);
};