document.addEventListener('DOMContentLoaded', function() {
  const viewMessageBtns = document.querySelectorAll('.view-message-btn');
  const modal = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const closeModal = document.getElementById('closeModalBtn');

  viewMessageBtns.forEach(btn => {
    btn.addEventListener('click', function(event) {
      event.preventDefault();
      const messageContent = this.getAttribute('data-content');
      modalContent.innerHTML = messageContent;
      modal.style.display = 'block';
    });
  });

  modal.addEventListener('click', function() {
    modal.style.display = 'none';
  });
});