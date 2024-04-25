document.addEventListener('DOMContentLoaded', function() {
  const viewMessageBtns = document.querySelectorAll('.view-message-btn');
  const modal = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const closeModal = document.getElementById('closeModalBtn');
  const inboxMessage = document.querySelector('.inbox-message');
  const delMessagesBtn = document.querySelector('.del-messages-but');
  const backProfileLink = document.querySelector('.back-profile');

  function showModal() {
    modal.style.display = 'block';

    modal.classList.remove('modal-enter', 'modal-enter-active');

    modal.classList.add('modal-enter');

    setTimeout(() => {
      modal.classList.add('modal-enter-active');
    }, 300);
  }

  function hideModal() {
    modal.classList.remove('modal-enter-active');

    setTimeout(() => {
      modal.style.display = 'none';
    }, 500);
  }

  function hideElements() {
    gsap.to([inboxMessage, delMessagesBtn, backProfileLink], { duration: 0.5, opacity: 0, display: 'none',  ease: 'bounce.in' });
  }

  function showElements() {
    gsap.to([inboxMessage, delMessagesBtn, backProfileLink], { duration: 0.5, opacity: 1, display: 'block', ease: 'bounce.in' });
  }

  viewMessageBtns.forEach(btn => {
    btn.addEventListener('click', function(event) {
      event.preventDefault();
      const messageContent = this.getAttribute('data-content');
      modalContent.innerHTML = messageContent;
      showModal();
      hideElements();
    });
  });

  closeModal.addEventListener('click', function() {
    hideModal();
    showElements();
  });

  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      hideModal();
      showElements();
    }
  });

  modal.addEventListener('click', function() {
    hideModal();
    showElements();
  });
});