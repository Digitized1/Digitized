// Clearlane — shared behaviour

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '76px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = 'var(--ink)';
      links.style.padding = '20px 32px';
      links.style.gap = '18px';
    });
  }

  // Generate ambient lane-dash animation lines in hero
  const laneField = document.querySelector('.lanes');
  if (laneField) {
    const rows = [18, 38, 58, 78];
    rows.forEach((topPct, i) => {
      const row = document.createElement('div');
      row.className = 'lane-row';
      row.style.top = topPct + '%';
      laneField.appendChild(row);

      const dash = document.createElement('div');
      dash.className = 'lane-dash';
      dash.style.top = `calc(${topPct}% - 0.5px)`;
      dash.style.animationDelay = `${i * 1.6}s`;
      laneField.appendChild(dash);
    });
  }

  // FAQ accordion — close others when one opens (optional, keep simple/native)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });
});
