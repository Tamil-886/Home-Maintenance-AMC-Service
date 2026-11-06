/**
 * HomeCarely - AMC Plans & Contract Subscription Manager
 */

(function () {
  const CONTRACTS_KEY = 'homecarely_contracts';
  const PLANS_KEY = 'homecarely_plans';

  const defaultPlans = [
    {
      id: 'plan-basic',
      name: 'Basic Plan',
      tagline: 'Essential protection for compact apartments & rentals',
      priceMonthly: 19,
      priceAnnual: 199,
      duration: '12 Months',
      visits: '2 Visits / Year',
      emergencyResponse: 'Within 24 Hours',
      discountParts: '5% Off',
      services: [
        'Annual AC General Servicing',
        'Plumbing Leak & Drain Checks',
        'Electrical Panel Safety Inspection',
        'Water Heater / Geyser Diagnostic'
      ],
      exclusions: [
        'Deep Home Cleaning',
        'Pest Control Treatments',
        'Free Replacement Spare Parts'
      ]
    },
    {
      id: 'plan-standard',
      name: 'Standard Plan',
      tagline: 'Comprehensive home peace of mind for standard 2-3 BHK homes',
      priceMonthly: 35,
      priceAnnual: 349,
      duration: '12 Months',
      visits: '4 Visits / Year',
      emergencyResponse: 'Within 4 Hours',
      discountParts: '10% Off',
      services: [
        'Bi-Annual AC Filter & Chemical Clean',
        'Full Plumbing & Fixture Overhaul',
        'Electrical Safety & Circuit Audit',
        'Water Tank Sanitization (1x)',
        'Basic Pest Prevention Treatment'
      ],
      exclusions: [
        'Unlimited Emergency Callouts',
        'Structural Painting'
      ]
    },
    {
      id: 'plan-premium',
      name: 'Premium Plan',
      isPopular: false,
      tagline: 'Our most loved complete protection for villas & large residences',
      priceMonthly: 59,
      priceAnnual: 599,
      duration: '12 Months',
      visits: '8 Visits / Year + Unlimited Emergency',
      emergencyResponse: 'Priority 60 Minutes',
      discountParts: '20% Off',
      services: [
        'Quarterly AC Deep Jet Servicing & Gas Check',
        'Full House Plumbing & Pressure Testing',
        'Complete Home Electrical & Appliance Check',
        'Water Tank Deep Cleaning (2x / yr)',
        'Full Home Pest Control (2 Sessions)',
        'Priority 24/7 Emergency Dispatch',
        'Dedicated Home Service Manager'
      ],
      exclusions: [
        'Major Civil Construction'
      ]
    },
    {
      id: 'plan-comprehensive',
      name: 'Comprehensive Plan',
      tagline: 'VIP luxury maintenance coverage with zero hassle',
      priceMonthly: 99,
      priceAnnual: 999,
      duration: '12 Months',
      visits: 'Unlimited Scheduled & Emergency Visits',
      emergencyResponse: 'Immediate 30 Minutes',
      discountParts: '30% Off + Free Consumables',
      services: [
        'Monthly AC Preventive Check & Duct Sanitization',
        'Unlimited Plumbing, Electrical & Carpentry Callouts',
        'Semi-Annual Full Deep Cleaning & Upholstery Care',
        'Quarterly Water Tank Cleaning & Water Testing',
        'Full Pest Eradication & Termite Warranty',
        'Senior Master Technicians Exclusively Assigned',
        'Complimentary Minor Spare Parts ($200 value)'
      ],
      exclusions: []
    }
  ];

  const defaultContracts = [
    {
      contractId: 'AMC-2026-8842',
      customerName: 'Alex Morgan',
      customerId: 'USR-101',
      customerEmail: 'demo@homecarely.com',
      planName: 'Premium Plan',
      status: 'Active',
      startDate: '2026-04-15',
      expiryDate: '2027-04-15',
      visitsIncluded: 8,
      visitsUsed: 2,
      visitsRemaining: 6,
      annualFee: '$599',
      autoRenew: true,
      propertyType: '3 BHK Luxury Apartment'
    },
    {
      contractId: 'AMC-2026-7319',
      customerName: 'Marcus Bennett',
      customerId: 'USR-102',
      customerEmail: 'marcus.b@example.com',
      planName: 'Standard Plan',
      status: 'Active',
      startDate: '2026-02-10',
      expiryDate: '2027-02-10',
      visitsIncluded: 4,
      visitsUsed: 1,
      visitsRemaining: 3,
      annualFee: '$349',
      autoRenew: false,
      propertyType: '2 BHK Townhouse'
    },
    {
      contractId: 'AMC-2026-6102',
      customerName: 'Eleanor Vance',
      customerId: 'USR-103',
      customerEmail: 'eleanor.v@example.com',
      planName: 'Comprehensive Plan',
      status: 'Active',
      startDate: '2026-01-05',
      expiryDate: '2027-01-05',
      visitsIncluded: 12,
      visitsUsed: 4,
      visitsRemaining: 8,
      annualFee: '$999',
      autoRenew: true,
      propertyType: 'Independent Villa'
    },
    {
      contractId: 'AMC-2025-4421',
      customerName: 'Daniel Hayes',
      customerId: 'USR-104',
      customerEmail: 'dhayes@example.com',
      planName: 'Basic Plan',
      status: 'Expiring Soon',
      startDate: '2025-11-20',
      expiryDate: '2026-11-20',
      visitsIncluded: 2,
      visitsUsed: 2,
      visitsRemaining: 0,
      annualFee: '$199',
      autoRenew: false,
      propertyType: '1 BHK Studio'
    }
  ];

  if (!localStorage.getItem(PLANS_KEY)) {
    localStorage.setItem(PLANS_KEY, JSON.stringify(defaultPlans));
  }

  if (!localStorage.getItem(CONTRACTS_KEY)) {
    localStorage.setItem(CONTRACTS_KEY, JSON.stringify(defaultContracts));
  }

  window.HomeCarelySubscription = {
    getPlans: function () {
      return JSON.parse(localStorage.getItem(PLANS_KEY) || '[]');
    },

    getContracts: function () {
      return JSON.parse(localStorage.getItem(CONTRACTS_KEY) || '[]');
    },

    getActiveContractForUser: function (userEmail = 'demo@homecarely.com') {
      const contracts = this.getContracts();
      return contracts.find(c => c.customerEmail.toLowerCase() === userEmail.toLowerCase()) || contracts[0];
    },

    renewContract: function (contractId, yearsToAdd = 1) {
      const contracts = this.getContracts();
      const contract = contracts.find(c => c.contractId === contractId);
      if (contract) {
        const curDate = new Date(contract.expiryDate);
        curDate.setFullYear(curDate.getFullYear() + yearsToAdd);
        contract.expiryDate = curDate.toISOString().split('T')[0];
        contract.status = 'Active';
        contract.visitsRemaining += (contract.visitsIncluded * yearsToAdd);
        localStorage.setItem(CONTRACTS_KEY, JSON.stringify(contracts));
        return { success: true, newExpiry: contract.expiryDate };
      }
      return { success: false, message: 'Contract not found' };
    },

    subscribePlan: function (planName, customerData) {
      const contracts = this.getContracts();
      const plan = this.getPlans().find(p => p.name.toLowerCase() === planName.toLowerCase()) || defaultPlans[1];
      const newContractId = 'AMC-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

      const startDate = new Date();
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);

      const newContract = {
        contractId: newContractId,
        customerName: customerData.name || 'Alex Morgan',
        customerId: customerData.id || 'USR-101',
        customerEmail: customerData.email || 'demo@homecarely.com',
        planName: plan.name,
        status: 'Active',
        startDate: startDate.toISOString().split('T')[0],
        expiryDate: expiryDate.toISOString().split('T')[0],
        visitsIncluded: parseInt(plan.visits) || 4,
        visitsUsed: 0,
        visitsRemaining: parseInt(plan.visits) || 4,
        annualFee: '$' + plan.priceAnnual,
        autoRenew: true,
        propertyType: customerData.propertyType || 'Residential Apartment'
      };

      contracts.unshift(newContract);
      localStorage.setItem(CONTRACTS_KEY, JSON.stringify(contracts));
      return newContract;
    }
  };

  // Pricing toggle (Monthly / Annual)
  document.addEventListener('DOMContentLoaded', function () {
    const toggleBtns = document.querySelectorAll('.pricing-switch-btn');
    if (toggleBtns.length) {
      toggleBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          toggleBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          const billing = this.getAttribute('data-billing');
          
          document.querySelectorAll('.pricing-amount').forEach(el => {
            const annual = el.getAttribute('data-annual');
            const monthly = el.getAttribute('data-monthly');
            if (billing === 'monthly' && monthly) {
              el.textContent = monthly;
            } else if (annual) {
              el.textContent = annual;
            }
          });

          document.querySelectorAll('.pricing-period').forEach(el => {
            el.textContent = billing === 'monthly' ? '/ month' : '/ year';
          });
        });
      });
    }
  });
})();
