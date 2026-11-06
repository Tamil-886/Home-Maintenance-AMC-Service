/**
 * HomeCarely - Admin Dashboard Logic & Analytics
 */

document.addEventListener('DOMContentLoaded', function () {
  const contracts = window.HomeCarelySubscription ? window.HomeCarelySubscription.getContracts() : [];
  const bookings = window.HomeCarelyBooking ? window.HomeCarelyBooking.getAllBookings() : [];

  // Update Admin Metric Counters
  const totalContractsEl = document.getElementById('adminTotalContracts');
  const totalBookingsEl = document.getElementById('adminTotalBookings');
  const pendingRequestsEl = document.getElementById('adminPendingRequests');

  if (totalContractsEl) totalContractsEl.textContent = contracts.length;
  if (totalBookingsEl) totalBookingsEl.textContent = bookings.length;
  if (pendingRequestsEl) {
    const pendingCount = bookings.filter(b => b.status === 'Scheduled' || b.status === 'Pending').length;
    pendingRequestsEl.textContent = pendingCount;
  }

  // Render Admin Recent Bookings
  const adminRecentTbody = document.getElementById('adminRecentBookingsTbody');
  if (adminRecentTbody) {
    adminRecentTbody.innerHTML = '';
    bookings.forEach(b => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${b.id}</strong></td>
        <td>
          <div class="fw-semibold">${b.service}</div>
          <span class="text-muted small">${b.address}</span>
        </td>
        <td>${b.date}</td>
        <td>
          <span class="badge bg-light text-dark border">${b.technician}</span>
        </td>
        <td><span class="badge-status ${b.status.toLowerCase()}">${b.status}</span></td>
        <td class="text-end">
          <div class="dropdown d-inline-block">
            <button class="btn btn-sm btn-light border dropdown-toggle" type="button" data-bs-toggle="dropdown">Actions</button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item admin-action-btn" href="#" data-id="${b.id}" data-action="Confirmed">Mark Confirmed</a></li>
              <li><a class="dropdown-item admin-action-btn" href="#" data-id="${b.id}" data-action="Completed">Mark Completed</a></li>
              <li><a class="dropdown-item admin-action-btn text-danger" href="#" data-id="${b.id}" data-action="Cancelled">Cancel Booking</a></li>
            </ul>
          </div>
        </td>
      `;
      adminRecentTbody.appendChild(tr);
    });

    // Action listener
    document.querySelectorAll('.admin-action-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        const act = this.getAttribute('data-action');
        window.HomeCarelyBooking.updateBookingStatus(id, act);
        if (window.showToast) window.showToast(`Booking ${id} updated to ${act}`, 'success');
        setTimeout(() => location.reload(), 600);
      });
    });
  }

  // Initialize Chart.js if present
  if (typeof Chart !== 'undefined') {
    // Revenue & Bookings Trend Chart
    const revenueCtx = document.getElementById('revenueAnalyticsChart');
    if (revenueCtx) {
      new Chart(revenueCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'AMC Revenue ($k)',
              data: [18, 24, 32, 29, 45, 52, 60, 58, 72, 85, 94, 110],
              borderColor: '#1068eb',
              backgroundColor: 'rgba(16, 104, 235, 0.08)',
              tension: 0.4,
              fill: true,
              pointRadius: 4
            },
            {
              label: 'One-off Services ($k)',
              data: [12, 14, 17, 15, 22, 26, 28, 30, 35, 41, 44, 48],
              borderColor: '#0ea5e9',
              borderDash: [5, 5],
              tension: 0.4,
              fill: false,
              pointRadius: 3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' }
          },
          scales: {
            y: { grid: { color: 'rgba(226, 232, 240, 0.6)' } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    // Service Breakdown Doughnut
    const serviceCtx = document.getElementById('serviceDistributionChart');
    if (serviceCtx) {
      new Chart(serviceCtx, {
        type: 'doughnut',
        data: {
          labels: ['AC & HVAC', 'Plumbing', 'Electrical', 'Cleaning', 'Pest Control', 'Others'],
          datasets: [{
            data: [35, 25, 20, 10, 6, 4],
            backgroundColor: ['#1068eb', '#0ea5e9', '#f59e0b', '#10b981', '#8b5cf6', '#94a3b8'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }
  }
});
