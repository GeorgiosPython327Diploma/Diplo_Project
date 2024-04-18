document.addEventListener('DOMContentLoaded', function () {
    const imageContainer = document.getElementById('logo_animated');
    let logoAnimation;

    const logoAnimationTimeline = gsap.timeline({ repeat: -1, yoyo: true });

    logoAnimationTimeline.to(imageContainer, { rotationY: -360, duration: 1, ease: 'power1.inOut' });

    function playLogoAnimation() {
        logoAnimation = logoAnimationTimeline.restart();
        setTimeout(stopLogoAnimation, 1000);
    }

    function stopLogoAnimation() {
        logoAnimation.pause();
        setTimeout(playLogoAnimation, 20000);
    }

    playLogoAnimation();
});