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

/**
 * Real-time Given Password & Re-entered Password Match Validation
 */
window.initPasswordMatchValidator = function (passSelector, confirmSelector, passFeedbackSelector, confirmFeedbackSelector) {
  const passInput = typeof passSelector === 'string' ? document.querySelector(passSelector) : passSelector;
  const confirmInput = typeof confirmSelector === 'string' ? document.querySelector(confirmSelector) : confirmSelector;
  const passFeedback = typeof passFeedbackSelector === 'string' ? document.querySelector(passFeedbackSelector) : passFeedbackSelector;
  const confirmFeedback = typeof confirmFeedbackSelector === 'string' ? document.querySelector(confirmFeedbackSelector) : confirmFeedbackSelector;

  if (!passInput || !confirmInput) return null;

  function validate() {
    const passVal = passInput.value;
    const confirmVal = confirmInput.value;
    let isValid = true;

    // Validate Given Password Length & Quality
    if (passVal.length === 0) {
      if (passFeedback) passFeedback.innerHTML = '';
      passInput.classList.remove('is-invalid', 'is-valid');
      passInput.setCustomValidity('');
    } else if (passVal.length < 8) {
      if (passFeedback) {
        passFeedback.innerHTML = '<span class="text-danger fw-semibold d-inline-flex align-items-center gap-1"><i class="bi bi-x-circle-fill"></i> Minimum 8 characters required (' + passVal.length + '/8)</span>';
      }
      passInput.classList.add('is-invalid');
      passInput.classList.remove('is-valid');
      passInput.setCustomValidity('Password must be at least 8 characters long');
      isValid = false;
    } else {
      if (passFeedback) {
        passFeedback.innerHTML = '<span class="text-success fw-semibold d-inline-flex align-items-center gap-1"><i class="bi bi-check-circle-fill"></i> Password length meets security requirements</span>';
      }
      passInput.classList.remove('is-invalid');
      passInput.classList.add('is-valid');
      passInput.setCustomValidity('');
    }

    // Validate Re-entered Password Matching
    if (confirmVal.length === 0) {
      if (confirmFeedback) confirmFeedback.innerHTML = '';
      confirmInput.classList.remove('is-invalid', 'is-valid');
      confirmInput.setCustomValidity('');
      if (passVal.length > 0) {
        isValid = false;
      }
    } else if (passVal !== confirmVal) {
      if (confirmFeedback) {
        confirmFeedback.innerHTML = '<span class="text-danger fw-semibold d-inline-flex align-items-center gap-1"><i class="bi bi-x-circle-fill"></i> Passwords do not match. Please re-enter matching password.</span>';
      }
      confirmInput.classList.add('is-invalid');
      confirmInput.classList.remove('is-valid');
      confirmInput.setCustomValidity('Passwords do not match');
      isValid = false;
    } else {
      // Passwords match
      if (passVal.length < 8) {
        if (confirmFeedback) {
          confirmFeedback.innerHTML = '<span class="text-warning fw-semibold d-inline-flex align-items-center gap-1"><i class="bi bi-exclamation-triangle-fill"></i> Passwords match, but minimum 8 characters required</span>';
        }
        confirmInput.classList.remove('is-valid');
        confirmInput.classList.add('is-invalid');
        confirmInput.setCustomValidity('Password must be at least 8 characters long');
        isValid = false;
      } else {
        if (confirmFeedback) {
          confirmFeedback.innerHTML = '<span class="text-success fw-semibold d-inline-flex align-items-center gap-1"><i class="bi bi-check-circle-fill"></i> Passwords match perfectly!</span>';
        }
        confirmInput.classList.remove('is-invalid');
        confirmInput.classList.add('is-valid');
        confirmInput.setCustomValidity('');
      }
    }

    return isValid;
  }

  passInput.addEventListener('input', validate);
  confirmInput.addEventListener('input', validate);
  passInput.addEventListener('change', validate);
  confirmInput.addEventListener('change', validate);
  passInput.addEventListener('blur', validate);
  confirmInput.addEventListener('blur', validate);

  return { validate, passInput, confirmInput };
};

// Auto-bind on common password pair fields when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // 1. Registration form fields
  if (document.getElementById('regPassword') && document.getElementById('regConfirmPassword')) {
    window.regPassValidator = window.initPasswordMatchValidator('#regPassword', '#regConfirmPassword', '#regPassFeedback', '#regConfirmPassFeedback');
  }

  // 2. Settings change password fields
  if (document.getElementById('newPassword') && document.getElementById('confirmNewPassword')) {
    window.settingsPassValidator = window.initPasswordMatchValidator('#newPassword', '#confirmNewPassword', '#newPassFeedback', '#confirmNewPassFeedback');
  }

  // 3. Reset password fields (forgot password flow)
  if (document.getElementById('resetPassword') && document.getElementById('resetConfirmPassword')) {
    window.resetPassValidator = window.initPasswordMatchValidator('#resetPassword', '#resetConfirmPassword', '#resetPassFeedback', '#resetConfirmPassFeedback');
  }
});
