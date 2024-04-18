document.addEventListener("DOMContentLoaded", function () {
  const messagePosition = document.getElementById('messagePosition');
  let isOpen = false;

  function toggleMessagePosition() {
    if (!isOpen) {
      gsap.to(messagePosition, { duration: 0.5, x: '-83%', ease: 'power2.inOut' });
      isOpen = true;
    } else {
      gsap.to(messagePosition, { duration: 0.5, x: '1%', ease: 'power2.inOut' });
      isOpen = false;
    }
  }

  setTimeout(function() {
    toggleMessagePosition();
  }, 1000);

  messagePosition.addEventListener('click', function() {
    toggleMessagePosition();
  });
});
