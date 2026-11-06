/**
 * HomeCarely - Booking & Maintenance Visit Manager
 */

(function () {
  const BOOKINGS_KEY = 'homecarely_bookings';

  // Seed sample initial bookings
  const sampleBookings = [
    {
      id: 'BK-9482',
      service: 'Air Conditioning Maintenance',
      serviceCategory: 'HVAC',
      date: '2026-11-12',
      timeSlot: '10:00 AM - 12:00 PM',
      technician: 'Marcus Vance (Lead HVAC Tech)',
      technicianAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      status: 'Confirmed',
      address: '742 Evergreen Terrace, Springfield, IL',
      notes: 'Quarterly filter replacement and compressor diagnostics.',
      rating: 5,
      cost: 'Included in AMC'
    },
    {
      id: 'BK-9481',
      service: 'Plumbing Services & Leak Inspection',
      serviceCategory: 'Plumbing',
      date: '2026-11-18',
      timeSlot: '02:00 PM - 04:00 PM',
      technician: 'David Miller (Certified Plumber)',
      technicianAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      status: 'Scheduled',
      address: '742 Evergreen Terrace, Springfield, IL',
      notes: 'Master bath fixture check and water pressure regulator test.',
      rating: null,
      cost: 'Included in AMC'
    },
    {
      id: 'BK-9320',
      service: 'Electrical Maintenance & Circuit Check',
      serviceCategory: 'Electrical',
      date: '2026-10-14',
      timeSlot: '11:00 AM - 01:00 PM',
      technician: 'Robert Chen (Master Electrician)',
      technicianAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
      status: 'Completed',
      address: '742 Evergreen Terrace, Springfield, IL',
      notes: 'Panel inspection, replaced thermal breaker, installed surge protector.',
      rating: 5,
      cost: 'Included in AMC'
    },
    {
      id: 'BK-9180',
      service: 'Deep Home Cleaning & Sanitization',
      serviceCategory: 'Cleaning',
      date: '2026-09-05',
      timeSlot: '09:00 AM - 01:00 PM',
      technician: 'Cleaning Crew Alpha (Team of 3)',
      technicianAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      status: 'Completed',
      address: '742 Evergreen Terrace, Springfield, IL',
      notes: 'Seasonal deep clean of living room, kitchen, and upholstery sanitization.',
      rating: 5,
      cost: 'Included in AMC'
    }
  ];

  if (!localStorage.getItem(BOOKINGS_KEY)) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(sampleBookings));
  }

  window.HomeCarelyBooking = {
    getAllBookings: function () {
      return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
    },

    getBookingById: function (id) {
      const bookings = this.getAllBookings();
      return bookings.find(b => b.id === id) || bookings[0];
    },

    createBooking: function (bookingData) {
      const bookings = this.getAllBookings();
      const newId = 'HC-BKG-' + Math.floor(1000 + Math.random() * 9000);
      
      // Select appropriate technician based on category
      const techDirectory = {
        'HVAC': { name: 'Marcus Vance (Lead HVAC)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
        'Plumbing': { name: 'David Miller (Master Plumber)', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
        'Electrical': { name: 'Robert Chen (Certified Electrician)', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80' },
        'Cleaning': { name: 'Maria Santos (Sanitization Lead)', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80' },
        'Inspection': { name: 'James Wilson (Master Inspector)', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80' }
      };
      const cat = bookingData.serviceCategory || 'General';
      const assignedTech = techDirectory[cat] || { name: 'Marcus Vance (Lead Master Tech)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' };

      const newBooking = {
        id: newId,
        customerName: bookingData.customerName || 'Alex Morgan',
        customerEmail: bookingData.customerEmail || 'demo@homecarely.com',
        customerPhone: bookingData.customerPhone || '+1 (555) 234-5678',
        amcPlan: bookingData.amcPlan || 'Premium Villa Plan',
        service: bookingData.service || 'General Home Maintenance',
        serviceCategory: bookingData.serviceCategory || 'General',
        date: bookingData.date,
        timeSlot: bookingData.timeSlot || '10:00 AM - 12:00 PM',
        technician: assignedTech.name,
        technicianAvatar: assignedTech.avatar,
        status: 'Scheduled',
        address: bookingData.address || '742 Evergreen Terrace, Springfield, IL',
        notes: bookingData.notes || 'Routine maintenance visit requested by customer.',
        isEmergency: bookingData.isEmergency || false,
        rating: null,
        cost: bookingData.cost || 'Included in AMC ($0)',
        createdAt: new Date().toISOString()
      };

      bookings.unshift(newBooking);
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
      return newBooking;
    },

    updateBookingStatus: function (id, newStatus, technicianName = null) {
      const bookings = this.getAllBookings();
      const item = bookings.find(b => b.id === id);
      if (item) {
        item.status = newStatus;
        if (technicianName) item.technician = technicianName;
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
        return true;
      }
      return false;
    },

    cancelBooking: function (id) {
      return this.updateBookingStatus(id, 'Cancelled');
    }
  };

  // Handle legacy form submission if present
  document.addEventListener('DOMContentLoaded', function () {
    const bookVisitForm = document.getElementById('bookVisitForm');
    if (bookVisitForm) {
      bookVisitForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const service = document.getElementById('visitService')?.value || 'Air Conditioning Maintenance';
        const date = document.getElementById('visitDate')?.value;
        const timeSlot = document.getElementById('visitTime')?.value || '10:00 AM - 12:00 PM';
        const address = document.getElementById('visitAddress')?.value;
        const notes = document.getElementById('visitNotes')?.value;
        const isEmergency = document.getElementById('visitEmergency')?.checked;

        if (!date) {
          if (window.showToast) window.showToast('Please select a preferred date', 'warning');
          return;
        }

        const newBooking = window.HomeCarelyBooking.createBooking({
          service, date, timeSlot, address, notes, isEmergency
        });

        if (window.showToast) {
          window.showToast(`Maintenance visit booked successfully! Booking Ref: ${newBooking.id}`, 'success', 'Booking Confirmed');
        }

        setTimeout(() => {
          window.location.href = 'bookings.html';
        }, 1200);
      });
    }
  });
})();
