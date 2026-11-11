/**
 * HomeCarely - Blog Search & Filter Logic
 */

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('blogSearchInput');
  const blogCards = document.querySelectorAll('.blog-card-item');
  const categoryLinks = document.querySelectorAll('.blog-category-filter');
  const commentForm = document.getElementById('blogCommentForm');
  const commentsList = document.getElementById('blogCommentsList');

  // Combined search & category filtering
  function filterBlogPosts() {
    const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeBtn = document.querySelector('.blog-category-filter.active');
    const cat = activeBtn ? activeBtn.getAttribute('data-category')?.toLowerCase() : 'all';

    blogCards.forEach(card => {
      const cardCat = card.getAttribute('data-category')?.toLowerCase() || '';
      const title = card.querySelector('.blog-title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.blog-excerpt')?.textContent.toLowerCase() || '';
      const tag = card.querySelector('.blog-badge')?.textContent.toLowerCase() || '';

      const matchesCat = (!cat || cat === 'all' || cardCat === cat);
      const matchesSearch = (!q || title.includes(q) || excerpt.includes(q) || tag.includes(q));

      if (matchesCat && matchesSearch) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Search input filtering
  if (searchInput && blogCards.length) {
    searchInput.addEventListener('input', filterBlogPosts);
  }

  // Category filter buttons
  if (categoryLinks.length && blogCards.length) {
    categoryLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        categoryLinks.forEach(l => {
          l.classList.remove('active', 'btn-primary');
          l.classList.add('btn-light');
        });
        this.classList.add('active', 'btn-primary');
        this.classList.remove('btn-light');

        filterBlogPosts();
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
