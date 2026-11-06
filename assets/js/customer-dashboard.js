/**
 * HomeCarely - Customer Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', function () {
  const user = window.HomeCarelyAuth ? window.HomeCarelyAuth.getCurrentUser() : null;
  const contract = window.HomeCarelySubscription ? window.HomeCarelySubscription.getActiveContractForUser(user ? user.email : '') : null;
  const bookings = window.HomeCarelyBooking ? window.HomeCarelyBooking.getAllBookings() : [];

  // Update Contract Overview Widgets
  if (contract) {
    document.querySelectorAll('.c-plan-name').forEach(el => el.textContent = contract.planName);
    document.querySelectorAll('.c-plan-id').forEach(el => el.textContent = contract.contractId);
    document.querySelectorAll('.c-plan-expiry').forEach(el => el.textContent = contract.expiryDate);
    document.querySelectorAll('.c-visits-remaining').forEach(el => el.textContent = contract.visitsRemaining);
    document.querySelectorAll('.c-visits-total').forEach(el => el.textContent = contract.visitsIncluded);
    document.querySelectorAll('.c-visits-used').forEach(el => el.textContent = contract.visitsUsed);
  }

  // Update upcoming appointment widget on dashboard
  const upcomingAppointmentEl = document.getElementById('upcomingServiceTitle');
  if (upcomingAppointmentEl && bookings.length > 0) {
    const upcoming = bookings.find(b => b.status === 'Scheduled' || b.status === 'Confirmed') || bookings[0];
    if (upcoming) {
      upcomingAppointmentEl.textContent = upcoming.service;
      const slotEl = document.getElementById('upcomingTimeSlot');
      if (slotEl) slotEl.textContent = `${upcoming.timeSlot} (2-Hour Window)`;
      const addrEl = document.getElementById('upcomingAddress');
      if (addrEl) addrEl.textContent = upcoming.address;
      const techEl = document.getElementById('upcomingTechName');
      if (techEl) techEl.textContent = upcoming.technician;
      const avatarEl = document.getElementById('upcomingTechAvatar');
      if (avatarEl && upcoming.technicianAvatar) avatarEl.src = upcoming.technicianAvatar;
      const statusBadge = document.getElementById('upcomingStatusBadge');
      if (statusBadge) {
        statusBadge.className = `badge-status ${upcoming.status.toLowerCase()}`;
        statusBadge.textContent = upcoming.status;
      }
      const detailsBtn = document.getElementById('upcomingDetailsBtn');
      if (detailsBtn) detailsBtn.href = `booking-details.html?id=${upcoming.id}`;

      if (upcoming.date) {
        const d = new Date(upcoming.date + 'T00:00:00');
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const dayEl = document.getElementById('upcomingDay');
        const monthYearEl = document.getElementById('upcomingMonthYear');
        if (dayEl) dayEl.textContent = String(d.getDate()).padStart(2, '0');
        if (monthYearEl) monthYearEl.textContent = `${months[d.getMonth()]} ${d.getFullYear()}`;
      }
    }
  }

  // Render recent bookings on dashboard
  const recentBookingsTbody = document.getElementById('customerRecentBookingsTbody');
  if (recentBookingsTbody) {
    recentBookingsTbody.innerHTML = '';
    const slice = bookings.slice(0, 5);
    if (slice.length === 0) {
      recentBookingsTbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No maintenance bookings found.</td></tr>';
    } else {
      slice.forEach(b => {
        const badgeClass = b.status.toLowerCase();
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${b.id}</strong></td>
          <td>
            <div class="fw-semibold text-dark">${b.service}</div>
            <span class="text-muted small">${b.serviceCategory}</span>
          </td>
          <td>
            <div>${b.date}</div>
            <span class="text-muted small">${b.timeSlot}</span>
          </td>
          <td>
            <div class="d-flex align-items-center gap-2">
              <img src="${b.technicianAvatar}" class="rounded-circle" width="28" height="28" alt="${b.technician}">
              <span class="small">${b.technician}</span>
            </div>
          </td>
          <td><span class="badge-status ${badgeClass}">${b.status}</span></td>
          <td class="text-end">
            <a href="booking-details.html?id=${b.id}" class="btn btn-sm btn-light border">View</a>
          </td>
        `;
        recentBookingsTbody.appendChild(tr);
      });
    }
  }

  // Render all bookings table on bookings.html
  const allBookingsTbody = document.getElementById('customerAllBookingsTbody');
  if (allBookingsTbody) {
    function renderBookings(list) {
      allBookingsTbody.innerHTML = '';
      if (!list.length) {
        allBookingsTbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-muted">No matching bookings found.</td></tr>';
        return;
      }
      list.forEach(b => {
        const badgeClass = b.status.toLowerCase();
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${b.id}</strong></td>
          <td>
            <div class="fw-semibold text-dark">${b.service}</div>
            <span class="text-muted small">${b.address}</span>
          </td>
          <td>
            <div>${b.date}</div>
            <span class="text-muted small">${b.timeSlot}</span>
          </td>
          <td>
            <div class="d-flex align-items-center gap-2">
              <img src="${b.technicianAvatar}" class="rounded-circle" width="30" height="30" alt="${b.technician}">
              <div>
                <div class="fw-semibold small">${b.technician}</div>
              </div>
            </div>
          </td>
          <td><span class="badge-status ${badgeClass}">${b.status}</span></td>
          <td><span class="badge bg-light text-dark border">${b.cost}</span></td>
          <td class="text-end">
            <a href="booking-details.html?id=${b.id}" class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-eye"></i></a>
            ${b.status !== 'Cancelled' && b.status !== 'Completed' ? 
              `<button class="btn btn-sm btn-outline-danger cancel-booking-btn" data-id="${b.id}" title="Cancel Visit"><i class="bi bi-x-circle"></i></button>` : ''}
          </td>
        `;
        allBookingsTbody.appendChild(tr);
      });

      // Bind cancel buttons
      document.querySelectorAll('.cancel-booking-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          const id = this.getAttribute('data-id');
          if (confirm(`Are you sure you want to cancel visit ${id}?`)) {
            window.HomeCarelyBooking.cancelBooking(id);
            if (window.showToast) window.showToast(`Booking ${id} has been cancelled.`, 'info');
            renderBookings(window.HomeCarelyBooking.getAllBookings());
          }
        });
      });
    }

    renderBookings(bookings);

    // Filter by status
    const statusFilter = document.getElementById('bookingStatusFilter');
    if (statusFilter) {
      statusFilter.addEventListener('change', function () {
        const val = this.value;
        const currentList = window.HomeCarelyBooking.getAllBookings();
        if (val === 'all') {
          renderBookings(currentList);
        } else {
          renderBookings(currentList.filter(b => b.status.toLowerCase() === val.toLowerCase()));
        }
      });
    }

    // Search filter
    const searchInput = document.getElementById('bookingSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const q = this.value.toLowerCase();
        const currentList = window.HomeCarelyBooking.getAllBookings();
        renderBookings(currentList.filter(b => 
          b.service.toLowerCase().includes(q) || 
          b.id.toLowerCase().includes(q) || 
          b.technician.toLowerCase().includes(q)
        ));
      });
    }
  }

  // Booking Details Page logic
  const bookingDetailCard = document.getElementById('bookingDetailCard');
  if (bookingDetailCard) {
    const urlParams = new URLSearchParams(window.location.search);
    const bookingId = urlParams.get('id') || 'BK-9482';
    const item = window.HomeCarelyBooking.getBookingById(bookingId);

    if (item) {
      document.querySelectorAll('.detail-booking-id').forEach(el => el.textContent = item.id);
      document.querySelectorAll('.detail-service-title').forEach(el => el.textContent = item.service);
      document.querySelectorAll('.detail-service-category').forEach(el => el.textContent = item.serviceCategory);
      document.querySelectorAll('.detail-date').forEach(el => el.textContent = item.date);
      document.querySelectorAll('.detail-slot').forEach(el => el.textContent = item.timeSlot);
      document.querySelectorAll('.detail-address').forEach(el => el.textContent = item.address);
      document.querySelectorAll('.detail-notes').forEach(el => el.textContent = item.notes);
      document.querySelectorAll('.detail-technician-name').forEach(el => el.textContent = item.technician);
      document.querySelectorAll('.detail-technician-avatar').forEach(img => img.src = item.technicianAvatar);

      const statusEl = document.getElementById('detailStatusBadge');
      if (statusEl) {
        statusEl.className = `badge-status ${item.status.toLowerCase()}`;
        statusEl.textContent = item.status;
      }
    }
  }

  // Renewal Form Logic
  const renewalForm = document.getElementById('amcRenewalForm');
  if (renewalForm && contract) {
    renewalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const years = parseInt(document.getElementById('renewalDuration')?.value || 1);
      const res = window.HomeCarelySubscription.renewContract(contract.contractId, years);
      if (res.success) {
        if (window.showToast) {
          window.showToast(`Contract ${contract.contractId} renewed successfully until ${res.newExpiry}!`, 'success', 'Plan Renewed');
        }
        setTimeout(() => {
          window.location.href = 'contracts.html';
        }, 1200);
      }
    });
  }

  // Chat/Messaging Interactive Simulator
  const chatForm = document.getElementById('customerChatForm');
  const chatMessagesArea = document.getElementById('chatMessagesArea');
  const chatInput = document.getElementById('chatMessageInput');

  if (chatForm && chatMessagesArea && chatInput) {
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const msg = chatInput.value.trim();
      if (!msg) return;

      // Add customer message
      const outBubble = document.createElement('div');
      outBubble.className = 'chat-bubble outgoing';
      outBubble.innerHTML = `${msg} <span class="chat-time text-white-50">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>`;
      chatMessagesArea.appendChild(outBubble);
      chatInput.value = '';
      chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;

      // Auto technician response after 1 second
      setTimeout(() => {
        const inBubble = document.createElement('div');
        inBubble.className = 'chat-bubble incoming';
        inBubble.innerHTML = `Thanks for your message! Our technician Marcus Vance has noted this update for your upcoming scheduled AMC service. <span class="chat-time text-muted">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>`;
        chatMessagesArea.appendChild(inBubble);
        chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
      }, 1000);
    });
  }
});
