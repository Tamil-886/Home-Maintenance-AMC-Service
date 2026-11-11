/**
 * HomeCarely - Navigation & UI Interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  // Sticky Navbar Effect on Scroll
  const navbar = document.querySelector('.main-navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Dashboard Mobile Sidebar Toggle
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const dashboardSidebar = document.querySelector('.dashboard-sidebar');
  if (sidebarToggleBtn && dashboardSidebar) {
    sidebarToggleBtn.addEventListener('click', function () {
      dashboardSidebar.classList.toggle('show');
    });

    // Close on outside click on mobile
    document.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        if (!dashboardSidebar.contains(e.target) && !sidebarToggleBtn.contains(e.target)) {
          dashboardSidebar.classList.remove('show');
        }
      }
    });
  }

  // Active Navbar links based on URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link, .sidebar-menu .sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || href.endsWith(currentPath))) {
      link.classList.add('active');
    }
  });

  // Dynamic Navbar Authentication & Direct Dashboard Link Handler
  function initNavbarAuth() {
    const isLoggedIn = (function () {
      if (window.HomeCarelyAuth && typeof window.HomeCarelyAuth.isLoggedIn === 'function') {
        return window.HomeCarelyAuth.isLoggedIn();
      }
      return localStorage.getItem('homecarely_session') !== null;
    })();

    const user = window.HomeCarelyAuth ? window.HomeCarelyAuth.getCurrentUser() : null;
    const pathLower = (window.location.pathname || '').toLowerCase();
    const inCustomerDir = pathLower.includes('/customer/') || pathLower.includes('\\customer\\');
    const inOtherSubDir = pathLower.includes('/auth/') || pathLower.includes('\\auth\\') || pathLower.includes('/admin/') || pathLower.includes('\\admin\\');
    const isSubDir = inCustomerDir || inOtherSubDir;

    const loginPath = isSubDir ? '../auth/login.html' : 'auth/login.html';
    // User / Customer Dashboard direct relative path
    const directUserDashboardPath = inCustomerDir ? 'dashboard.html' : (inOtherSubDir ? '../customer/dashboard.html' : 'customer/dashboard.html');

    // 1. Direct Dashboard Link in Navbar -> Opens Customer/User Dashboard directly (No Auth Check / No Login Redirect)
    document.querySelectorAll('.nav-dashboard-link').forEach(link => {
      link.href = directUserDashboardPath;
      link.removeAttribute('onclick');
      link.onclick = null; // Direct standard navigation to Customer Dashboard without login requirement
    });

    // 2. Dynamic Log In / Log Out button in Navbar
    document.querySelectorAll('.nav-login-btn').forEach(btn => {
      if (isLoggedIn) {
        btn.href = '#';
        btn.innerHTML = '<i class="bi bi-box-arrow-right"></i> <span>Log Out</span>';
        btn.classList.add('logout-trigger-btn');
        btn.setAttribute('data-redirect', isSubDir ? '../index.html' : 'index.html');
        btn.title = 'Sign Out (' + (user ? user.name : 'Active User') + ')';
      } else {
        btn.href = loginPath;
        btn.innerHTML = '<i class="bi bi-box-arrow-in-right"></i> <span>Log In</span>';
        btn.classList.remove('logout-trigger-btn');
        btn.removeAttribute('data-redirect');
        btn.title = 'Log In to Member Portal';
      }
    });

    // Remove any leftover legacy nav-auth-btn elements
    document.querySelectorAll('.nav-auth-btn').forEach(btn => btn.remove());
  }

  initNavbarAuth();

  // Global Logout Handlers (Direct & Delegated)
  document.addEventListener('click', function (e) {
    const logoutBtn = e.target.closest('.logout-trigger-btn');
    if (logoutBtn) {
      e.preventDefault();
      const redirect = logoutBtn.getAttribute('data-redirect') || '../index.html';
      if (window.HomeCarelyAuth) {
        window.HomeCarelyAuth.logout(redirect);
      } else {
        localStorage.removeItem('homecarely_session');
        window.location.href = redirect;
      }
    }
  });

  // Back to Top Floating Button
  let backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn && document.querySelector('.main-footer')) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.setAttribute('title', 'Back to top');
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = '<i class="bi bi-chevron-up fs-5"></i>';
    document.body.appendChild(backToTopBtn);
  }

  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
