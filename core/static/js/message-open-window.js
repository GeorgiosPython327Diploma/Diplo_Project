document.addEventListener('DOMContentLoaded', function() {
  const viewMessageBtns = document.querySelectorAll('.view-message-btn');
  const modal = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const closeModal = document.getElementById('closeModalBtn');
  const inboxMessage = document.querySelector('.inbox-message');
  const delMessagesBtn = document.querySelector('.del-messages-but');
  const backProfileLink = document.querySelector('.back-profile');

  viewMessageBtns.forEach(btn => {
    btn.addEventListener('click', function(event) {
      event.preventDefault();
      const messageContent = this.getAttribute('data-content');
      modalContent.innerHTML = messageContent;
      modal.style.display = 'block';
      hideElements();
    });
  });

  modal.addEventListener('click', function() {
    modal.style.display = 'none';
    showElements();
  });

  modal.addEventListener('click', function(event) {
    event.stopPropagation();
  });

  function hideElements() {
    inboxMessage.style.display = 'none';
    delMessagesBtn.style.display = 'none';
    backProfileLink.style.display = 'none';
  }

  function showElements() {
    inboxMessage.style.display = 'block';
    delMessagesBtn.style.display = 'block';
    backProfileLink.style.display = 'block';
  }
});