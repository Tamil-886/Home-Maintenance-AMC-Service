const fs = require('fs');
const html = fs.readFileSync('services.html', 'utf8');
const matches = html.match(/class="col-md-6 col-lg-4 service-grid-col"/g);
console.log('Total service cards:', matches ? matches.length : 0);
