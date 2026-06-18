

// Map: toggle card title → CSS class on <body>
const SETTING_MAP = {
  'HIGH CONTRAST MODE':   'high-contrast',
  'LARGE TEXT SIZE':      'large-text',
  'COLOUR BLIND MODE':    'colour-blind',
  'REDUCE MOTION':        'reduce-motion',
  'COMFORT VIGNETTE':     'comfort-vignette',
  'SEATED PLAY MODE':     'seated-play',
  'ONE-HANDED MODE':      'one-handed',
  'CUSTOM BUTTON MAPPING':'custom-mapping',
  'VOICE CONTROL':        'voice-control',
};

// ── 1. Apply saved settings immediately (runs before DOMContentLoaded) ──
(function applyOnLoad() {
  Object.entries(SETTING_MAP).forEach(([title, cls]) => {
    const saved = localStorage.getItem('access_' + cls);
    if (saved === 'true') {
      document.documentElement.classList.add(cls);
      document.body && document.body.classList.add(cls);
    }
  });
})();

// ── 2. Once DOM is ready, sync toggle states and wire up listeners ──
document.addEventListener('DOMContentLoaded', () => {

  Object.entries(SETTING_MAP).forEach(([title, cls]) => {
    if (localStorage.getItem('access_' + cls) === 'true') {
      document.body.classList.add(cls);
    }
  });

  const accessPage = document.getElementById('accessibility');
  if (!accessPage) return;

  accessPage.querySelectorAll('.access-card').forEach(card => {
    const title   = card.querySelector('h4')?.textContent.trim();
    const cls     = SETTING_MAP[title];
    const checkbox = card.querySelector('input[type="checkbox"]');
    if (!cls || !checkbox) return;

    const saved = localStorage.getItem('access_' + cls);
    if (saved !== null) {
      checkbox.checked = (saved === 'true');
    }
  });

  accessPage.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const title = this.closest('.access-card')?.querySelector('h4')?.textContent.trim();
      const cls   = SETTING_MAP[title];
      if (!cls) return;

      document.body.classList.toggle(cls, this.checked);
      localStorage.setItem('access_' + cls, this.checked);
    });
  });

  const applyBtn = document.querySelector('.btn.btn-primary');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      accessPage.querySelectorAll('.access-card').forEach(card => {
        const title    = card.querySelector('h4')?.textContent.trim();
        const cls      = SETTING_MAP[title];
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (!cls || !checkbox) return;

        document.body.classList.toggle(cls, checkbox.checked);
        localStorage.setItem('access_' + cls, checkbox.checked);
      });
      console.log('Accessibility settings saved.');
    });
  }

  const cancelBtn = document.querySelector('.btn.btn-outline');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      accessPage.querySelectorAll('.access-card').forEach(card => {
        const title    = card.querySelector('h4')?.textContent.trim();
        const cls      = SETTING_MAP[title];
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (!cls || !checkbox) return;

        const saved = localStorage.getItem('access_' + cls);
        checkbox.checked = (saved === 'true');
      });
    });
  }

});
window.onload = function() {
  const largeFont = localStorage.getItem("largeFont");

  if (largeFont === "true") {
    document.body.classList.add("large-text");
  }
};