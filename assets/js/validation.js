/**
 * HomeCarely - Validation & UI Notifications
 */

window.showToast = function (message, type = 'info', title = '') {
  let container = document.querySelector('.hc-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'hc-toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: 'bi bi-check-circle-fill text-success',
    danger: 'bi bi-x-circle-fill text-danger',
    warning: 'bi bi-exclamation-triangle-fill text-warning',
    info: 'bi bi-info-circle-fill text-primary'
  };

  const toast = document.createElement('div');
  toast.className = 'hc-toast';
  toast.innerHTML = `
    <i class="${icons[type] || icons.info} fs-4"></i>
    <div class="flex-grow-1">
      ${title ? `<strong class="d-block mb-1 font-sans text-dark">${title}</strong>` : ''}
      <span class="text-secondary small">${message}</span>
    </div>
    <button type="button" class="btn-close ms-2 btn-sm" aria-label="Close"></button>
  `;

  const closeBtn = toast.querySelector('.btn-close');
  closeBtn.addEventListener('click', () => {
    toast.remove();
  });

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 4500);
};

window.togglePasswordVisibility = function (inputSelector, iconSelector) {
  const input = document.querySelector(inputSelector);
  const icon = document.querySelector(iconSelector);
  if (!input || !icon) return;

  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('bi-eye');
    icon.classList.add('bi-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('bi-eye-slash');
    icon.classList.add('bi-eye');
  }
};

window.validateEmail = function (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

window.validatePhone = function (phone) {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);
};
