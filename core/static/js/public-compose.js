document.addEventListener("DOMContentLoaded", function() {
    let composeMessageLink = document.getElementById('compose-message-link');

    gsap.from(composeMessageLink, {
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: "back.out"
    });
});