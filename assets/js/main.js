/**
 * HomeCarely - Master Script
 * AMC Savings Calculator, Dynamic Counters, and Bootstrap Helpers
 */

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Bootstrap Tooltips & Popovers
  if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // Interactive AMC Savings Calculator
  const calcHomeTypeBtns = document.querySelectorAll('.calc-home-type-btn');
  const calcACUnits = document.getElementById('calcACUnits');
  const calcEmergencyCallouts = document.getElementById('calcEmergencyCallouts');
  const calcCleaning = document.getElementById('calcDeepCleaning');
  const calcPest = document.getElementById('calcPestControl');

  const outOneOffCost = document.getElementById('calcOneOffCost');
  const outAmcCost = document.getElementById('calcAmcCost');
  const outTotalSavings = document.getElementById('calcTotalSavings');
  const outSavingsPercent = document.getElementById('calcSavingsPercent');

  let selectedHomeMultiplier = 1.0; // Default 2BHK

  if (calcHomeTypeBtns.length && outOneOffCost && outAmcCost) {
    function calculateSavings() {
      const acCount = parseInt(calcACUnits?.value || 3);
      const emergencyCount = parseInt(calcEmergencyCallouts?.value || 2);
      const deepClean = calcCleaning?.checked ? 250 : 0;
      const pestControl = calcPest?.checked ? 180 : 0;

      // Typical market one-off costs:
      // AC service: $75 per unit x 2 services a year = $150 per AC
      // Emergency callout fee: $120 per call
      // Plumbing & Electrical baseline inspections: $200
      const acCost = acCount * 150;
      const emergencyCost = emergencyCount * 120;
      const baselineInspection = 220 * selectedHomeMultiplier;

      const totalOneOff = Math.round((acCost + emergencyCost + baselineInspection + deepClean + pestControl));

      // HomeCarely AMC Plan Cost (e.g. Standard or Premium)
      let amcPrice = 349;
      if (selectedHomeMultiplier >= 1.4) amcPrice = 599; // Villa/3BHK
      if (selectedHomeMultiplier <= 0.8) amcPrice = 199; // 1BHK

      const savings = Math.max(0, totalOneOff - amcPrice);
      const percent = Math.min(65, Math.round((savings / totalOneOff) * 100));

      outOneOffCost.textContent = '$' + totalOneOff.toLocaleString();
      outAmcCost.textContent = '$' + amcPrice.toLocaleString();
      outTotalSavings.textContent = '$' + savings.toLocaleString();
      if (outSavingsPercent) outSavingsPercent.textContent = percent + '%';
    }

    calcHomeTypeBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        calcHomeTypeBtns.forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        selectedHomeMultiplier = parseFloat(this.getAttribute('data-multiplier') || 1.0);
        calculateSavings();
      });
    });

    if (calcACUnits) calcACUnits.addEventListener('input', calculateSavings);
    if (calcEmergencyCallouts) calcEmergencyCallouts.addEventListener('input', calculateSavings);
    if (calcCleaning) calcCleaning.addEventListener('change', calculateSavings);
    if (calcPest) calcPest.addEventListener('change', calculateSavings);

    calculateSavings();
  }

  // Animated Numbers Counter for Hero & Stats
  const counters = document.querySelectorAll('.counter-value');
  if (counters.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = +entry.target.getAttribute('data-target');
          let count = 0;
          const increment = Math.ceil(target / 40);
          const updateCount = () => {
            count += increment;
            if (count < target) {
              entry.target.textContent = count.toLocaleString() + (entry.target.getAttribute('data-suffix') || '');
              setTimeout(updateCount, 30);
            } else {
              entry.target.textContent = target.toLocaleString() + (entry.target.getAttribute('data-suffix') || '');
            }
          };
          updateCount();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }
});
