# HomeCarely – Multipurpose Home Maintenance AMC Service Website Template

**HomeCarely** is a complete, premium-quality, commercial-grade HTML website template crafted specifically for **Annual Maintenance Contract (AMC) Home Care Services**, property maintenance companies, facility management agencies, and residential on-demand repair contractors.

Built strictly according to professional commercial standards for platforms such as **ThemeForest** and **TemplateMonster**, as well as for direct enterprise client deployments.

---

## 🌟 Key Product Features

- **Strict Technology Stack**:
  - Pure **HTML5** & **CSS3**
  - **Vanilla JavaScript** (Zero frameworks, zero dependencies)
  - **Bootstrap 5.3.3**
  - **Bootstrap Icons 1.11.3**
  - **Chart.js** (for Admin & Customer visual metrics)
  - *Strictly NO React, Next.js, Angular, Vue, Tailwind, TypeScript, Node.js, PHP, Python, or build steps required. Simply double-click `index.html` to open in any web browser!*
- **Complete Page Coverage (43 Pages)**:
  - **13 Public Website Pages**: General Landing Page, Express Landing Page, About Us, Services Catalog, Service Details with dynamic URL parameters, AMC Plans with comparison matrix, Pricing Guide, Blog Listing, Blog Details with comments, Contact Us with interactive map simulation, Categorized FAQ, 404 Error Page, Coming Soon / Maintenance Page with live countdown.
  - **3 Authentication Pages**: Customer/Admin Login with one-click demo credentials fill, Customer Registration, and Forgot Password recovery.
  - **12 Customer Dashboard Pages**: Overview, Profile, My Plans, Active Contracts, Book a Maintenance Visit, My Bookings, Booking Details with live status timeline, Service History, Contract Renewal, Notifications, Live Support/Tech Chat simulator, and Settings.
  - **15 Admin Dashboard Pages**: Operations Command Overview, Analytics & Charts, Customers Management, Services Catalog Manager, AMC Tier Configurator, Subscriptions Registry, Master Bookings Manager, Field Visits Fleet Dispatch, Demo Payment Transactions, Blog Editor, Testimonials Moderation, Contact Inquiries Inbox, Broadcast Notifications, Admin Profile, and System Settings.
- **Dark Mode & Light Mode**:
  - Smooth instant theme switching with preference stored in `localStorage` (`homecarely_theme`).
  - High-contrast, elegant dark palette crafted for all cards, navbars, sidebars, tables, and forms.
- **RTL (Right-to-Left) Layout Support**:
  - Comprehensive `assets/css/rtl.css` supporting Arabic, Hebrew, and Persian reading directions with mirrored sidebar, alignment, and navigation controls.
- **Interactive AMC Savings Calculator**:
  - Allows homeowners to choose property type (1 BHK, 2 BHK, 3 BHK, Villa), air conditioning units, and annual emergencies to calculate instant cost savings vs ad-hoc repair bills.
- **Client-Side Data Persistence via LocalStorage**:
  - Pre-seeded with realistic mock contracts, bookings, and demo user accounts.
  - Adding a visit, renewing a contract, or moderating a booking persists across sessions and updates views dynamically without a database or backend server.

---

## 📂 Project Folder Structure

```text
home-maintenance-amc/
│
├── index.html                   # Home Page 1 – General Home Maintenance Landing Page
├── home-2.html                  # Home Page 2 – Express Service & Direct Quote Landing
├── about.html                   # About Us, Company History, Team & Certifications
├── services.html                # Our Services Catalog (All 10 Maintenance Services)
├── service-details.html         # Dedicated Service Details (Supports ?service=ac, plumbing, etc.)
├── amc-plans.html               # AMC Subscription Plans & Full Comparison Matrix
├── pricing.html                 # Comprehensive Pricing Guide & Standalone Rate Card
├── blog.html                    # Blog Listing with Search & Category Filters
├── blog-details.html            # Single Blog Article with Comments & Author Bio
├── contact.html                 # Contact Us with Interactive Form & Office Locations
├── faq.html                     # Categorized Accordion FAQ with Search Filter
├── 404.html                     # 404 Error Page with Fast Navigation
├── coming-soon.html             # Maintenance / Launch Page with Live Timer
│
├── auth/
│   ├── login.html               # Login (Customer & Admin Demo with 1-click credentials)
│   ├── register.html            # Customer Registration with AMC Plan Selection
│   └── forgot-password.html     # Password Reset Simulation Flow
│
├── customer/
│   ├── dashboard.html           # Customer Dashboard Overview & Quota Widgets
│   ├── profile.html             # Profile, Property Details & Field Tech Notes
│   ├── my-plans.html            # Active AMC Plan Breakdown & Upgrade Modal
│   ├── contracts.html           # Legal AMC Agreement View & PDF Download
│   ├── book-visit.html          # Schedule Maintenance Visit (Slot & Emergency Toggle)
│   ├── bookings.html            # My Bookings List, Search & Status Filters
│   ├── booking-details.html     # Booking Details, Tech Card & Status Timeline
│   ├── service-history.html     # Past Completed Maintenance Logs & Invoices
│   ├── renewal.html             # Contract Renewal & Add-on Services Portal
│   ├── notifications.html       # Customer Alerts & Technician Arrival Updates
│   ├── messages.html            # Live Simulated Chat with Assigned Technician
│   └── settings.html            # Customer Appearance, Notifications & Security
│
├── admin/
│   ├── dashboard.html           # Operations Overview & Revenue Trends Chart
│   ├── analytics.html           # Performance Metrics & Service Distribution Charts
│   ├── customers.html           # Registered Customer Accounts Registry
│   ├── services.html            # Manage 10 Home Maintenance Services & Rates
│   ├── plans.html               # Configure AMC Subscription Tiers
│   ├── contracts.html           # Subscriptions Registry & Manual Renewal
│   ├── bookings.html            # Master Bookings Administration & Status Changer
│   ├── maintenance-visits.html  # Daily Fleet Dispatch Roster & Van Tracking
│   ├── payments.html            # Demo Invoicing & Transaction Logs
│   ├── blogs.html               # Manage Blog Articles & Guides
│   ├── testimonials.html        # Customer Reviews Moderation
│   ├── messages.html            # Contact Form Inquiries Inbox
│   ├── notifications.html       # Broadcast Announcement Transmitter
│   ├── profile.html             # Admin Profile & Security Activity
│   └── settings.html            # System & Business Configuration
│
├── assets/
│   ├── css/
│   │   ├── style.css            # Core Design System, Gradients & Typography
│   │   ├── responsive.css       # Mobile & Tablet Breakpoints (320px to 1920px)
│   │   ├── dashboard.css        # Dashboard Sidebar, Topbar, Tables & Widgets
│   │   ├── dark-mode.css        # High-Contrast Dark Theme Styles
│   │   └── rtl.css              # Right-to-Left Layout Rules
│   │
│   └── js/
│       ├── theme.js             # Dark/Light & RTL Manager with LocalStorage
│       ├── validation.js        # Form Validation & Toast Notifications
│       ├── auth.js              # Demo Authentication & Role Redirection
│       ├── booking.js           # Visit Scheduler & Bookings Store
│       ├── subscription.js      # AMC Plans, Renewals & Expiry Calculation
│       ├── customer-dashboard.js# Customer UI Dynamic Rendering
│       ├── admin-dashboard.js   # Admin Metrics, Actions & Chart.js Integration
│       ├── blog.js              # Blog Filter, Search & Comment Handler
│       ├── navigation.js        # Navbar Sticky, Active States & Mobile Drawer
│       └── main.js              # Master Script, Savings Calculator & Counters
│
└── README.md                    # Documentation & Commercial Guide
```

---

## 🛠️ The 10 Covered Home Maintenance Services

1. **Electrical Maintenance**: Breaker panel testing, short-circuit diagnostics, rewiring, earthing resistance audits, and surge protection.
2. **Plumbing Services**: Acoustic pipe leak detection, drain jetting, pressure regulator overhaul, and fixture repairs.
3. **Air Conditioning Maintenance**: High-pressure jet pump wash, chemical coil scrubbing, gas pressure checks, and drain pipe flushing.
4. **Painting & Wall Maintenance**: Moisture scanning, anti-fungal treatment, crack sealing, and interior/exterior emulsion finishes.
5. **Carpentry Services**: Door realignment, biometric smart lock fitting, sliding track adjustment, and cabinetry repair.
6. **Appliance Repair**: Inverter refrigerators, washing machines, dishwashers, microwave ovens, and induction hobs.
7. **Water Tank Cleaning**: 6-stage mechanized cleaning: de-sludging, jet scrubbing, vacuum suction, and UV disinfection.
8. **Deep Home Cleaning**: Intensive single-day scrub of kitchens, tiles, bathrooms, and 140°C upholstery steam extraction.
9. **Pest Control**: Odorless Bayer-certified micro-gel baiting, termite barriers, and 90-day warranty.
10. **General Home Inspection**: 120-point digital baseline structural, moisture, electrical, and HVAC audit.

---

## 💳 The 4 AMC Subscription Tiers

| Tier | Annual Price | Monthly Price | Scheduled Visits | Emergency SLA | Spare Parts Discount |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Basic Plan** | $199 / yr | $19 / mo | 2 Visits / Year | Within 24 Hours | 5% Off |
| **Standard Plan** | $349 / yr | $35 / mo | 4 Visits / Year | Within 4 Hours | 10% Off |
| **Premium Plan** *(Most Popular)* | $599 / yr | $59 / mo | 8 Visits + Unlimited Emergency | Within 60 Minutes | 20% Off |
| **Comprehensive Plan** *(VIP)* | $999 / yr | $99 / mo | Unlimited Visits & Labor | Immediate 30 Minutes | 30% Off + $200 Spares |

---

## 🚀 How to Run & Preview

1. **Direct Browser Preview**:
   - Double-click `index.html` in file explorer to open in Chrome, Firefox, Safari, or Edge.
2. **Local HTTP Server** (Optional for developers):
   - You can use Python: `python -m http.server 8000`
   - Or VS Code extension: "Live Server"
3. **Demo Logins**:
   - Customer Portal: `demo@homecarely.com` / `password123`
   - Admin Portal: `admin@homecarely.com` / `admin123`
   - *Click the convenient demo credentials fill buttons on `auth/login.html`.*

---

## 📱 Responsive Testing Matrix

The template has been thoroughly verified across all required breakpoints:
- 320px (iPhone SE / Small Androids)
- 360px & 375px (Samsung Galaxy & iPhone standard)
- 390px & 414px (iPhone Pro / Plus)
- 576px (Small tablets & landscape phones)
- 768px (iPad Mini / Portrait tablets)
- 992px (Desktop & iPad Pro)
- 1024px & 1152px (Small laptops)
- 1280px & 1366px (Standard HD laptops)
- 1440px & 1920px (Full HD & 2K Ultra-wide monitors)

---

## 📄 License & Attribution

- Built by DeepMind Advanced Agentic Coding for the **HomeCarely** Home Maintenance AMC brand.
- High-resolution photography sourced via [Unsplash](https://unsplash.com) under the Unsplash free commercial license.
- Icons by [Bootstrap Icons](https://icons.getbootstrap.com) (MIT License).
- Charts by [Chart.js](https://www.chartjs.org) (MIT License).
