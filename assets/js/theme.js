/**
 * HomeCarely - Theme & RTL Direction Manager
 * Persists theme (dark/light) and layout direction (ltr/rtl) in localStorage
 */

(function () {
  const THEME_STORAGE_KEY = 'homecarely_theme';
  const DIR_STORAGE_KEY = 'homecarely_direction';

  // Apply immediately before DOM render to prevent white flash
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
  const savedDir = localStorage.getItem(DIR_STORAGE_KEY) || 'ltr';

  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('dir', savedDir);

  window.HomeCarelyTheme = {
    getTheme: function () {
      return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    },

    setTheme: function (theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      updateThemeToggleIcons(theme);
    },

    toggleTheme: function () {
      const current = this.getTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      this.setTheme(next);
      if (window.showToast) {
        window.showToast(`Switched to ${next} mode`, 'info');
      }
      return next;
    },

    getDirection: function () {
      return localStorage.getItem(DIR_STORAGE_KEY) || 'ltr';
    },

    setDirection: function (dir) {
      document.documentElement.setAttribute('dir', dir);
      localStorage.setItem(DIR_STORAGE_KEY, dir);
      updateDirToggleButtons(dir);
    },

    toggleDirection: function () {
      const current = this.getDirection();
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      this.setDirection(next);
      if (window.showToast) {
        window.showToast(`Layout switched to ${next.toUpperCase()}`, 'info');
      }
      return next;
    }
  };

  function updateThemeToggleIcons(theme) {
    const togglers = document.querySelectorAll('.theme-toggle-btn');
    togglers.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill text-warning';
        } else {
          icon.className = 'bi bi-moon-stars-fill text-primary';
        }
      }
    });
  }

  function updateDirToggleButtons(dir) {
    const dirBadges = document.querySelectorAll('.dir-toggle-text');
    dirBadges.forEach(el => {
      el.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateThemeToggleIcons(window.HomeCarelyTheme.getTheme());
    updateDirToggleButtons(window.HomeCarelyTheme.getDirection());

    // Bind theme buttons
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.HomeCarelyTheme.toggleTheme();
      });
    });

    // Bind RTL buttons
    document.querySelectorAll('.dir-toggle-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.HomeCarelyTheme.toggleDirection();
      });
    });
  });
})();
