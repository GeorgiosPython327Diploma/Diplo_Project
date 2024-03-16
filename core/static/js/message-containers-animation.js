document.addEventListener("DOMContentLoaded", function () {
  const inboxMessage = document.querySelector('.inbox-message');
  const composeMessage = document.querySelector('.compose-message');

  gsap.set(inboxMessage, { opacity: 0, y: '100%' });
  gsap.set(composeMessage, { opacity: 0, y: '100%' });

  gsap.to(inboxMessage, { opacity: 1, y: '0%', duration: 1, ease: 'power1.inOut' });
  gsap.to(composeMessage, { opacity: 1, y: '0%', duration: 1, ease: 'power1.inOut' });
});