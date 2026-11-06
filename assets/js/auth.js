/**
 * HomeCarely - Authentication & Session Management (Demo Simulation)
 * Role-based frontend navigation for Customer and Admin
 */

(function () {
  const SESSION_KEY = 'homecarely_session';
  const USERS_KEY = 'homecarely_users';

  // Seed default demo accounts
  const defaultUsers = [
    {
      id: 'USR-101',
      name: 'Alex Morgan',
      email: 'demo@homecarely.com',
      password: 'password123',
      role: 'customer',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Springfield, IL',
      plan: 'Premium Plan',
      planDuration: 'Annual',
      contractId: 'AMC-2026-8842',
      expiryDate: '2027-04-15',
      visitsRemaining: 6,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'ADM-001',
      name: 'Sarah Jenkins',
      email: 'admin@homecarely.com',
      password: 'admin123',
      role: 'admin',
      title: 'Operations Director',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    }
  ];

  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }

  window.HomeCarelyAuth = {
    getUsers: function () {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    },

    getCurrentUser: function () {
      const session = localStorage.getItem(SESSION_KEY);
      if (!session) {
        // Return default customer if not explicitly logged in to make preview smooth
        return this.getUsers().find(u => u.role === 'customer') || defaultUsers[0];
      }
      return JSON.parse(session);
    },

    isLoggedIn: function () {
      return localStorage.getItem(SESSION_KEY) !== null;
    },

    login: function (email, password) {
      const users = this.getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

      if (user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        return { success: true, user: user };
      }
      return { success: false, message: 'Invalid email or password. Please use demo credentials.' };
    },

    register: function (fullName, email, password, phone = '', plan = 'Standard Plan') {
      const users = this.getUsers();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, message: 'This email is already registered.' };
      }

      const newUser = {
        id: 'USR-' + Math.floor(100 + Math.random() * 900),
        name: fullName,
        email: email,
        password: password,
        role: 'customer',
        phone: phone || '+1 (555) 000-0000',
        address: '123 New Home Street, Suite 4',
        plan: plan,
        planDuration: 'Annual',
        contractId: 'AMC-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
        expiryDate: '2027-11-01',
        visitsRemaining: 4,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      };

      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
      return { success: true, user: newUser };
    },

    logout: function (redirectPath) {
      localStorage.removeItem(SESSION_KEY);
      if (window.showToast) {
        window.showToast('You have been logged out successfully.', 'info');
      }
      setTimeout(() => {
        window.location.href = redirectPath || '../index.html';
      }, 500);
    },

    requireAuth: function (role = null, redirectUrl = '../auth/login.html') {
      const current = this.getCurrentUser();
      if (!current) {
        window.location.href = redirectUrl;
        return null;
      }
      if (role && current.role !== role) {
        // Mismatch role redirection
        if (role === 'admin') {
          window.location.href = redirectUrl;
        }
      }
      return current;
    }
  };

  // Helper bindings for login demo buttons
  document.addEventListener('DOMContentLoaded', function () {
    const fillCustomerBtn = document.getElementById('fillCustomerDemo');
    const fillAdminBtn = document.getElementById('fillAdminDemo');
    const emailInput = document.getElementById('loginEmail');
    const passInput = document.getElementById('loginPassword');

    if (fillCustomerBtn && emailInput && passInput) {
      fillCustomerBtn.addEventListener('click', function () {
        emailInput.value = 'demo@homecarely.com';
        passInput.value = 'password123';
        if (window.showToast) {
          window.showToast('Customer demo credentials filled!', 'info');
        }
      });
    }

    if (fillAdminBtn && emailInput && passInput) {
      fillAdminBtn.addEventListener('click', function () {
        emailInput.value = 'admin@homecarely.com';
        passInput.value = 'admin123';
        if (window.showToast) {
          window.showToast('Admin demo credentials filled!', 'warning');
        }
      });
    }

    // Auto-update user profile details on header/sidebar if elements exist
    const user = window.HomeCarelyAuth.getCurrentUser();
    if (user) {
      document.querySelectorAll('.auth-user-name').forEach(el => el.textContent = user.name);
      document.querySelectorAll('.auth-user-role').forEach(el => el.textContent = user.role.toUpperCase());
      document.querySelectorAll('.auth-user-email').forEach(el => el.textContent = user.email);
      document.querySelectorAll('.auth-user-plan').forEach(el => el.textContent = user.plan || 'Active Member');
      document.querySelectorAll('.auth-user-avatar').forEach(img => img.src = user.avatar);
    }
  });
})();
