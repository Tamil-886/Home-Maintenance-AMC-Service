import json
import urllib.parse
import re
import glob

services_9 = [
    {
        "cat": "hvac",
        "key": "ac",
        "title": "Air Conditioning Maintenance",
        "badge_class": "bg-primary-subtle text-primary",
        "badge_text": "HVAC & Cooling",
        "icon": "bi bi-snow",
        "img": "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=600&q=80",
        "desc": "High-pressure jet wash of cooling coils, refrigerant gas top-up, compressor health check, filter disinfection, and PCB diagnostics.",
        "bullets": [
            "Jet pump antibacterial chemical wash",
            "Refrigerant pressure & capacitor test",
            "Drain tray algae clearing"
        ],
        "price": "From $59 / visit"
    },
    {
        "cat": "plumbing",
        "key": "plumbing",
        "title": "Plumbing Services & Leak Inspection",
        "badge_class": "bg-info-subtle text-info",
        "badge_text": "Plumbing Care",
        "icon": "bi bi-droplet",
        "img": "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80",
        "desc": "Acoustic leak detection, drain jetting, pressure regulator overhaul, sanitary fixture installations, and geyser servicing.",
        "bullets": [
            "Non-destructive pipe leak tracking",
            "Water heater & boiler descaling",
            "High pressure mainline drain unclogging"
        ],
        "price": "From $55 / visit"
    },
    {
        "cat": "electrical",
        "key": "electrical",
        "title": "Electrical Maintenance & Breaker Care",
        "badge_class": "bg-primary-subtle text-primary",
        "badge_text": "Electrical",
        "icon": "bi bi-lightning-charge",
        "img": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80",
        "desc": "Breaker panel testing, short-circuit diagnostics, appliance rewiring, earthing resistance audits, and whole-house surge protection.",
        "bullets": [
            "Infrared thermal load audit",
            "Circuit breaker trip testing",
            "24/7 short-circuit emergency callouts"
        ],
        "price": "From $49 / visit"
    },
    {
        "cat": "cleaning",
        "key": "cleaning",
        "title": "Deep Home Cleaning & Sanitization",
        "badge_class": "bg-success-subtle text-success",
        "badge_text": "Deep Cleaning",
        "icon": "bi bi-stars",
        "img": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
        "desc": "Complete intensive scrub of tiles, sanitaryware, grout, kitchen grease, floor buffing, and high-temperature upholstery steam extraction.",
        "bullets": [
            "Single-disc floor buffing machine",
            "140°C upholstery steam disinfection",
            "Microfiber eco-safe detergents"
        ],
        "price": "From $89 / visit"
    },
    {
        "cat": "cleaning",
        "key": "pest",
        "title": "Pest Control & Termite Defense",
        "badge_class": "bg-danger-subtle text-danger",
        "badge_text": "Pest Eradication",
        "icon": "bi bi-bug",
        "img": "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=600&q=80",
        "desc": "Targeted chemical eradication of cockroaches, bedbugs, termites, rodents, and ants using odorless Bayer-certified compounds.",
        "bullets": [
            "No need to vacate the property",
            "Micro-gel cockroach baiting",
            "100% money back re-service guarantee"
        ],
        "price": "From $65 / session"
    },
    {
        "cat": "plumbing",
        "key": "watertank",
        "title": "Water Tank & Overhead Reservoir Cleaning",
        "badge_class": "bg-info-subtle text-info",
        "badge_text": "Sanitization",
        "icon": "bi bi-water",
        "img": "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80",
        "desc": "6-stage mechanized cleaning process: de-sludging, high-pressure jet scrub, vacuum suction, anti-bacterial spray, and UV disinfection.",
        "bullets": [
            "German high-pressure jet wash",
            "Food-grade certified disinfectants",
            "Lab water purity test report"
        ],
        "price": "From $60 / tank"
    },
    {
        "cat": "maintenance",
        "key": "painting",
        "title": "Painting & Wall Restoration",
        "badge_class": "bg-warning-subtle text-warning",
        "badge_text": "Wall Care",
        "icon": "bi bi-brush",
        "img": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
        "desc": "Wall plaster touchups, waterproof anti-fungal coatings, crack sealing, and premium interior & exterior emulsion paint finishes.",
        "bullets": [
            "Moisture meter wall scan & damp curing",
            "Low-VOC odorless luxury paints",
            "Dust-free mechanical sanding"
        ],
        "price": "From $69 / room"
    },
    {
        "cat": "maintenance",
        "key": "carpentry",
        "title": "Carpentry & Woodwork Services",
        "badge_class": "bg-secondary-subtle text-dark",
        "badge_text": "Woodwork",
        "icon": "bi bi-hammer",
        "img": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80",
        "desc": "Door realignment, smart lock installations, modular kitchen hinge replacements, furniture restoration, and bespoke cabinetry repairs.",
        "bullets": [
            "Hydraulic hinge & sliding track tuning",
            "Digital biometric lock fitting",
            "Termite-damaged timber reinforcement"
        ],
        "price": "From $45 / visit"
    },
    {
        "cat": "maintenance",
        "key": "inspection",
        "title": "General Home Health Inspection",
        "badge_class": "bg-primary-subtle text-primary",
        "badge_text": "Audit & Report",
        "icon": "bi bi-clipboard2-check",
        "img": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
        "desc": "A thorough 120-point digital inspection covering electrical stability, pipe pressures, structural cracking, roof seepage, and HVAC health.",
        "bullets": [
            "Thermal infrared leak imaging",
            "Instant 25-page digital audit PDF",
            "Priority repair action plan"
        ],
        "price": "From $79 / audit"
    }
]

# 1. Build cards HTML
cards_html = []
for i, s in enumerate(services_9, 1):
    booking_url = f"customer/booking.html?service={urllib.parse.quote(s['title'])}"
    details_url = f"service-details.html?service={s['key']}"
    bullets_html = "\n".join([f'                <li><i class="bi bi-check-circle-fill"></i> {b}</li>' for b in s['bullets']])
    card = f"""        <!-- {i}. {s['title']} -->
        <div class="col-md-6 col-lg-4 service-grid-col" data-cat="{s['cat']}">
          <div class="service-card">
            <div class="card-thumb">
              <img src="{s['img']}" alt="{s['title']}">
              <div class="service-icon-pill"><i class="{s['icon']}"></i></div>
            </div>
            <div class="card-body">
              <span class="badge-tag {s['badge_class']} mb-2">{s['badge_text']}</span>
              <h4 class="h5 fw-bold mb-2">{s['title']}</h4>
              <p class="text-muted small mb-3">{s['desc']}</p>
              <ul class="service-features-list">
{bullets_html}
              </ul>
              <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                <span class="fw-bold text-primary">{s['price']}</span>
                <div class="d-flex gap-2 align-items-center">
                  <a href="{details_url}" class="btn btn-sm btn-outline-hc">Details</a>
                  <a href="{booking_url}" class="btn btn-sm btn-primary-hc">Book Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>"""
    cards_html.append(card)

full_cards_container = "\n\n".join(cards_html)

# 2. Update services.html
with open('services.html', 'r', encoding='utf-8') as f:
    s_html = f.read()

# Update meta description
s_html = re.sub(
    r'<meta name="description" content="[^"]*">',
    '<meta name="description" content="Explore our 9 core residential home maintenance services available for standalone booking or covered under HomeCarely AMC subscription packages.">',
    s_html
)

# Update filter buttons
new_filter_buttons = """          <div class="d-flex flex-wrap gap-2" id="serviceFilterButtons">
            <button class="btn btn-sm btn-primary rounded-pill px-3 active service-filter-btn" data-filter="all">All (9)</button>
            <button class="btn btn-sm btn-light border rounded-pill px-3 service-filter-btn" data-filter="hvac">HVAC &amp; Cooling</button>
            <button class="btn btn-sm btn-light border rounded-pill px-3 service-filter-btn" data-filter="plumbing">Plumbing &amp; Water</button>
            <button class="btn btn-sm btn-light border rounded-pill px-3 service-filter-btn" data-filter="electrical">Electrical</button>
            <button class="btn btn-sm btn-light border rounded-pill px-3 service-filter-btn" data-filter="cleaning">Cleaning &amp; Pest</button>
            <button class="btn btn-sm btn-light border rounded-pill px-3 service-filter-btn" data-filter="maintenance">Carpentry &amp; Inspection</button>
          </div>"""

s_html = re.sub(
    r'<div class="d-flex flex-wrap gap-2" id="serviceFilterButtons">[\s\S]*?</div>\s*</div>\s*<div class="col-lg-4">',
    lambda m: new_filter_buttons + '\n        </div>\n        <div class="col-lg-4">',
    s_html
)

# Replace cards container
cards_regex = r'<div class="row g-4" id="servicesCardsContainer">[\s\S]*?</div>\s*</div>\s*</section>\s*<!-- Interactive JavaScript'
new_cards_section = f'<div class="row g-4" id="servicesCardsContainer">\n\n{full_cards_container}\n\n      </div>\n    </div>\n  </section>\n\n  <!-- Interactive JavaScript'

s_html = re.sub(cards_regex, lambda m: new_cards_section, s_html)

s_html = s_html.replace('All 24 Services', 'All 9 Services')
s_html = s_html.replace('View All 24 Services', 'View All 9 Services')

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(s_html)

print("services.html successfully updated with exactly 9 services.")

# 3. Update customer/booking.html dropdown to 9 services
with open('customer/booking.html', 'r', encoding='utf-8') as f:
    b_html = f.read()

grouped_9_options = """                    <select class="form-select" id="selectService" required>
                      <option value="" disabled selected>-- Choose Maintenance Service (9 Available) --</option>
                      <option value="Air Conditioning Maintenance" data-category="HVAC">Air Conditioning Maintenance</option>
                      <option value="Plumbing Services &amp; Leak Inspection" data-category="Plumbing">Plumbing Services &amp; Leak Inspection</option>
                      <option value="Electrical Maintenance &amp; Breaker Care" data-category="Electrical">Electrical Maintenance &amp; Breaker Care</option>
                      <option value="Deep Home Cleaning &amp; Sanitization" data-category="Cleaning">Deep Home Cleaning &amp; Sanitization</option>
                      <option value="Pest Control &amp; Termite Defense" data-category="Cleaning">Pest Control &amp; Termite Defense</option>
                      <option value="Water Tank &amp; Overhead Reservoir Cleaning" data-category="Plumbing">Water Tank &amp; Overhead Reservoir Cleaning</option>
                      <option value="Painting &amp; Wall Restoration" data-category="General">Painting &amp; Wall Restoration</option>
                      <option value="Carpentry &amp; Woodwork Services" data-category="General">Carpentry &amp; Woodwork Services</option>
                      <option value="General Home Health Inspection" data-category="Inspection">General Home Health Inspection</option>
                    </select>"""

b_html = re.sub(
    r'<select class="form-select" id="selectService" required>[\s\S]*?</select>',
    lambda m: grouped_9_options,
    b_html
)

with open('customer/booking.html', 'w', encoding='utf-8') as f:
    f.write(b_html)

print("customer/booking.html updated with 9 services.")

# 4. Update footers across all html files from 24 Services to 9 Services
html_files = glob.glob('*.html') + glob.glob('*/*.html')
count = 0
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        c = f.read()
    
    updated = False
    if 'View All 24 Services' in c:
        c = c.replace('View All 24 Services', 'View All 9 Services')
        updated = True
    if 'Active Home Maintenance Catalog (24 Services)' in c:
        c = c.replace('Active Home Maintenance Catalog (24 Services)', 'Active Home Maintenance Catalog (9 Services)')
        updated = True
    
    if updated:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(c)
        count += 1

print(f"Updated footer/heading references in {count} files to 9 Services.")
