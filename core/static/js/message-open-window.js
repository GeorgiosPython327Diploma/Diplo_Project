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

  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
});