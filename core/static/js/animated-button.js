document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.animated_bt');
    const buttonAnimation = gsap.timeline({ repeat: -1, yoyo: true });

    buttonAnimation.to(button, { x: 1, y: -1, x: 1, y: 1, duration: 0.1, ease: 'power1.inOut' });

    function playButtonAnimation() {
        buttonAnimation.restart();
        setTimeout(stopButtonAnimation, 2000);
    }

    function stopButtonAnimation() {
        buttonAnimation.pause();
        setTimeout(playButtonAnimation, 11000);
    }

    playButtonAnimation();
});