document.addEventListener('DOMContentLoaded', function () {
    const imageContainer = document.getElementById('logo_animated');

    imageContainer.addEventListener('mouseenter', () => {
        gsap.to(imageContainer, {
            rotationY: -360,
            duration: 1,
            ease: 'power1.inOut',
        });
    });
});