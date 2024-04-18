document.addEventListener("DOMContentLoaded", function() {
    let composeMessageLink = document.getElementById('compose-message-link');

    gsap.from(composeMessageLink, {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.inOut"
    });
});