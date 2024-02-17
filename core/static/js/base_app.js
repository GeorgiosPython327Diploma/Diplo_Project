document.addEventListener('DOMContentLoaded', function () {
  const shape = document.querySelector('.shape');
  let isHovered = false;

  shape.style.borderRadius = '50%';
  shape.style.width = '18px';
  shape.style.height = '11px';

  function rotate360() {
    gsap.to(shape, {
      rotation: '+=-360',
      duration: 1,
      ease: 'linear',
      onComplete: function () {
        if (isHovered) {
          rotate360();
        }
      },
    });
  }

  function makeSquare() {
    gsap.to(shape, {
      width: '20px',
      height: '20px',
      borderRadius: '0%',
      duration: 0.3,
      ease: 'ease-in-out',
    });
  }

  shape.addEventListener('mouseover', function () {
    isHovered = true;
    makeSquare();
    rotate360();
  });

  shape.addEventListener('mouseout', function () {
    isHovered = false;
    gsap.to(shape, {
      width: '18px',
      height: '11px',
      borderRadius: '50%',
      duration: 0.3,
      ease: 'ease-in-out',
    });
  });

  gsap.to('body', {
    opacity: 1,
    duration: 0.6,
    ease: 'ease-in-out',
  });
});