/**
 * HomeCarely - Blog Search & Filter Logic
 */

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('blogSearchInput');
  const blogCards = document.querySelectorAll('.blog-card-item');
  const categoryLinks = document.querySelectorAll('.blog-category-filter');
  const commentForm = document.getElementById('blogCommentForm');
  const commentsList = document.getElementById('blogCommentsList');

  // Search input filtering
  if (searchInput && blogCards.length) {
    searchInput.addEventListener('input', function () {
      const q = this.value.toLowerCase().trim();
      blogCards.forEach(card => {
        const title = card.querySelector('.blog-title')?.textContent.toLowerCase() || '';
        const excerpt = card.querySelector('.blog-excerpt')?.textContent.toLowerCase() || '';
        const tag = card.querySelector('.blog-badge')?.textContent.toLowerCase() || '';
        if (title.includes(q) || excerpt.includes(q) || tag.includes(q)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Category filter
  if (categoryLinks.length && blogCards.length) {
    categoryLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        categoryLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        const cat = this.getAttribute('data-category')?.toLowerCase();
        blogCards.forEach(card => {
          const cardCat = card.getAttribute('data-category')?.toLowerCase();
          if (!cat || cat === 'all' || cardCat === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Blog Comment Form Simulation
  if (commentForm && commentsList) {
    commentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('commentName')?.value || 'Guest User';
      const text = document.getElementById('commentText')?.value;

      if (!text) {
        if (window.showToast) window.showToast('Please enter your comment.', 'warning');
        return;
      }

      const commentItem = document.createElement('div');
      commentItem.className = 'd-flex gap-3 mb-4 pb-3 border-bottom';
      commentItem.innerHTML = `
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80" class="rounded-circle" width="48" height="48" alt="${name}">
        <div>
          <div class="d-flex align-items-center gap-2 mb-1">
            <h6 class="mb-0 fw-bold">${name}</h6>
            <span class="text-muted small">Just now</span>
          </div>
          <p class="text-secondary mb-0 small">${text}</p>
        </div>
      `;

      commentsList.prepend(commentItem);
      commentForm.reset();
      if (window.showToast) window.showToast('Comment submitted for review!', 'success');
    });
  }
});
