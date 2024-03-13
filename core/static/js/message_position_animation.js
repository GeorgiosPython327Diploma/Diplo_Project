 const messagePosition = document.getElementById('messagePosition');

  let isOpen = false;

  messagePosition.addEventListener('click', function() {
    if (!isOpen) {
      gsap.to(messagePosition, { duration: 0.5, x: '-83%', ease: 'power2.inOut' });
      isOpen = true;
    } else {
      gsap.to(messagePosition, { duration: 0.5, x: '1%', ease: 'power2.inOut' });
      isOpen = false;
    }
  });