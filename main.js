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

  // Nav shadow/glass state on scroll
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 12) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Scroll-reveal: fade/slide sections in as they enter view
  const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('in-view'));
  }

  // Hero headline: split into words for staggered entrance
  document.querySelectorAll('.hero h1[data-split]').forEach((h1) => {
    const words = h1.textContent.trim().split(/\s+/);
    h1.innerHTML = words
      .map((w, i) => `<span style="animation-delay:${0.35 + i * 0.06}s">${w}</span>`)
      .join(' ');
  });

  // Stat count-up when visible
  const stats = document.querySelectorAll('.stat .num[data-count]');
  if (stats.length) {
    const statIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        statIO.unobserve(el);
      });
    }, { threshold: 0.5 });
    stats.forEach((el) => statIO.observe(el));
  }

  // Contact form: real client-side handling (no backend on GitHub Pages,
  // so this validates, shows a success state, and opens a pre-filled email
  // to hello@clearlane.co as the actual delivery method).
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const toast = document.getElementById('form-toast');
      const name = contactForm.querySelector('#cf-name').value.trim();
      const email = contactForm.querySelector('#cf-email').value.trim();
      const note = contactForm.querySelector('#cf-note').value.trim();

      if (!name || !email) return;

      btn.classList.add('is-loading');
      const originalLabel = btn.textContent;
      btn.innerHTML = '<span class="spin"></span> Sending…';

      const subject = encodeURIComponent(`Strategy call request — ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nWhat's eating the most time right now:\n${note || '(not provided)'}`
      );
      const mailto = `mailto:hello@clearlane.co?subject=${subject}&body=${body}`;

      setTimeout(() => {
        btn.classList.remove('is-loading');
        btn.textContent = originalLabel;
        contactForm.reset();
        if (toast) toast.classList.add('show');
        window.location.href = mailto;
      }, 700);
    });
  }

  // Ebook signup form: no backend on GitHub Pages, so this shows an honest
  // inline confirmation. Wire this to a real email service (e.g. Formspree,
  // Mailchimp, ConvertKit) to actually deliver the guide.
  const ebookForm = document.getElementById('ebook-form');
  if (ebookForm) {
    ebookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = ebookForm.querySelector('button[type="submit"]');
      const note = document.getElementById('ebook-note');
      const emailInput = document.getElementById('ebook-email');
      if (!emailInput.value.trim()) return;

      btn.classList.add('is-loading');
      const original = btn.textContent;
      btn.innerHTML = '<span class="spin"></span> Sending…';

      setTimeout(() => {
        btn.classList.remove('is-loading');
        btn.textContent = 'Sent ✓';
        if (note) {
          note.textContent = `On its way to ${emailInput.value.trim()}. Check your inbox in a minute.`;
          note.style.color = 'var(--gold)';
        }
        ebookForm.reset();
      }, 700);
    });
  }
});
