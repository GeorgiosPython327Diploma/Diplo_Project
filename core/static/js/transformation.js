window.onload = function() {
    $(".login-menu, .register-menu, .change-password-menu, .add-article-container, #bio-text-container, #bio-container").css({
        "transform": "translateY(100%) translateX(-100%)",
        "opacity": "0",
        "transition": "transform ease-in-out 1s, opacity ease-in-out 1s, filter ease-in-out 1s",
    });

    setTimeout(function() {
        $(".login-menu, .register-menu, .change-password-menu, .add-article-container").css({
            "transform": "translateY(0)",
            "opacity": "1",
            "filter": "brightness(1)",
        });

        $("#bio-text-container, #bio-container").css({
            "transform": "translateY(0) translateX(0)",
            "opacity": "1",
        });
    }, 100);
};

