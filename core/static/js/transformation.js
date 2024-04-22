window.onload = function() {
    gsap.set([".login-menu", ".register-menu", ".change-password-menu", ".add-article-container", ".edit-container-article", "#bio-text-container", "#bio-container", ".static-bio"], {
        x: -100,
        y: 100
    });

    gsap.to([".login-menu", ".register-menu", ".change-password-menu", ".add-article-container", ".edit-container-article"], {
        duration: 0.1,
        y: 0,
        x: 0,
        ease: "power2.out"
    });

    gsap.to(["#bio-text-container", "#bio-container", ".static-bio"], {
        duration: 0.3,
        x: 0,
        y: 0,
        ease: "bounce.inOut"
    });
};