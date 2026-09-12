/* ============================================================
   Team Koalafied — renderer
   Reads window.SITE_CONTENT and builds the page.
   No dependencies, no build step. Same pattern as the technical
   binder's binder.js — see ../koalafied-design-system.
   ============================================================ */

(function () {
  'use strict';

  var C = window.SITE_CONTENT;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function fail(msg) {
    document.body.innerHTML =
      '<div class="boom"><h2>Site could not load</h2><p>' + esc(msg) + '</p>' +
      '<p style="margin-top:10px;color:var(--ink-3)">Check <code>content.js</code> ' +
      'for a syntax error. Open your browser console for the exact line.</p></div>';
  }

  /* ---- nav ------------------------------------------------- */

  function renderNav() {
    var t = C.team;
    var links = C.nav.map(function (n) {
      return '<a href="#' + esc(n.id) + '" data-nav="' + esc(n.id) + '">' + esc(n.label) + '</a>';
    }).join('');

    return el(
      '<header class="nav">' +
        '<div class="nav-in wrap">' +
          '<a class="wordmark" href="#top">' +
            (t.logo ? '<img class="wordmark-mark" src="' + esc(t.logo) + '" alt="">' : '') +
            '<span class="wordmark-a">' + esc(t.number) + '</span>' +
            '<span class="wordmark-b">' + esc(t.name) + '</span>' +
          '</a>' +
          '<nav class="nav-links">' + links + '</nav>' +
        '</div>' +
      '</header>');
  }

  /* ---- hero -------------------------------------------------- */

  function renderHero() {
    var h = C.hero;
    var ctas = h.ctas.map(function (c) {
      return '<a class="btn ' + (c.primary ? 'btn-primary' : 'btn-ghost') + '" href="' + esc(c.href) + '">' + esc(c.label) + '</a>';
    }).join('');

    var bg = h.image
      ? '<div class="hero-bg"><img src="' + esc(h.image.src) + '" alt="' + esc(h.image.alt) + '"><div class="hero-scrim"></div></div>'
      : '';

    return '<section class="hero" id="top">' +
      bg +
      '<div class="hero-content wrap">' +
        '<div class="hero-meta">' +
          '<p class="eyebrow">' + esc(h.eyebrow) + '</p>' +
          '<h1 class="hero-title">' + esc(h.title) + '</h1>' +
          '<p class="hero-sub">' + esc(h.sub) + '</p>' +
          '<div class="hero-cta">' + ctas + '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  /* ---- generic section shell --------------------------------- */

  function sectionShell(id, eyebrow, title, thesis, body) {
    return '<section class="sec" id="' + esc(id) + '"><div class="wrap">' +
      '<p class="eyebrow">' + esc(eyebrow) + '</p>' +
      '<h2 class="sec-title">' + esc(title) + '</h2>' +
      '<p class="sec-thesis">' + esc(thesis) + '</p>' +
      body +
    '</div></section>';
  }

  function renderAbout() {
    var a = C.about;
    var cards = a.stats.map(function (s) {
      return '<div class="card"><div class="stat">' + esc(s.stat) + '</div><p>' + esc(s.label) + '</p></div>';
    }).join('');
    return sectionShell('about', 'Who we are', 'About the team', a.thesis, '<div class="cards">' + cards + '</div>');
  }

  function renderPrograms() {
    var p = C.programs;
    var cards = p.items.map(function (it) {
      return '<div class="card"><h4>' + esc(it.title) + '</h4><p>' + esc(it.desc) + '</p></div>';
    }).join('');
    return sectionShell('programs', 'What we do', 'Programs', p.thesis, '<div class="cards">' + cards + '</div>');
  }

  function renderGallery() {
    var g = C.gallery;
    var items = g.items.map(function (it) {
      return '<div class="carousel-item">' +
        '<div class="carousel-frame"><img src="' + esc(it.src) + '" alt="' + esc(it.alt) + '" loading="lazy"></div>' +
        '<p class="carousel-cap">' + esc(it.caption) + '</p>' +
      '</div>';
    }).join('');
    var arrow = function (dir, label) {
      var d = dir < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7';
      return '<button class="carousel-nav carousel-' + (dir < 0 ? 'prev' : 'next') + '" type="button" aria-label="' + label + '" disabled>' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg></button>';
    };
    var body = '<figure class="carousel" data-carousel="gallery" style="margin:clamp(20px,3vw,32px) 0 0;">' +
      '<div class="carousel-track">' + items + '</div>' + arrow(-1, 'Previous photo') + arrow(1, 'Next photo') +
    '</figure>';
    return sectionShell('gallery', 'Photos', 'Gallery', g.thesis, body);
  }

  function renderSponsors() {
    if (!Array.isArray(C.sponsors) || !C.sponsors.length) return '';
    var row = C.sponsors.map(function (s) {
      return '<img class="sponsor-logo" src="' + esc(s.logo) + '" alt="' + esc(s.name) + '" loading="lazy">';
    }).join('');
    return '<section class="sponsors wrap" id="sponsors">' +
      '<div class="sponsors-label">Thank you to our sponsors</div>' +
      '<div class="sponsors-row">' + row + '</div>' +
    '</section>';
  }

  function renderJoin() {
    var j = C.join;
    var cards = j.roles.map(function (r) {
      return '<div class="card"><h4>' + esc(r.title) + '</h4><p>' + esc(r.desc) + '</p></div>';
    }).join('');
    return sectionShell('join', 'Get involved', 'Join the team', j.thesis, '<div class="cards">' + cards + '</div>');
  }

  function renderContact() {
    var c = C.contact;
    var form =
      '<form class="form" action="mailto:' + esc(c.email) + '" method="post" enctype="text/plain">' +
        '<div class="field"><label for="f-name">Name</label><input id="f-name" name="name" type="text" required></div>' +
        '<div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" required></div>' +
        '<div class="field"><label for="f-msg">Message</label><textarea id="f-msg" name="message" required></textarea></div>' +
        '<button class="btn btn-primary" type="submit" style="justify-self:start;">Send</button>' +
      '</form>' +
      '<p class="note muted" style="margin-top:14px;font-size:13px;">Or email <a href="mailto:' + esc(c.email) + '" style="color:var(--accent);">' + esc(c.email) + '</a> directly.</p>';
    return sectionShell('contact', 'Get in touch', 'Contact', c.thesis, form);
  }

  /* ---- interactions ------------------------------------------ */

  function wireCarousels(root) {
    root.querySelectorAll('[data-carousel]').forEach(function (fig) {
      var track = fig.querySelector('.carousel-track');
      var prev = fig.querySelector('.carousel-prev');
      var next = fig.querySelector('.carousel-next');
      if (!prev || !next) return;

      function update() {
        var max = track.scrollWidth - track.clientWidth;
        prev.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= max - 2;
      }
      function step(dir) {
        var item = track.querySelector('.carousel-item');
        var gap = 14;
        var amount = item ? item.getBoundingClientRect().width + gap : track.clientWidth * 0.9;
        track.scrollBy({ left: dir * amount, behavior: 'smooth' });
      }
      prev.addEventListener('click', function () { step(-1); });
      next.addEventListener('click', function () { step(1); });
      track.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      update();
      fig.querySelectorAll('img').forEach(function (img) {
        if (!img.complete) img.addEventListener('load', update);
      });
    });
  }

  function wireLightbox(root) {
    var box = el(
      '<div class="lightbox" id="lightbox" hidden>' +
        '<button class="lightbox-close" type="button" aria-label="Close">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
        '</button>' +
        '<figure><img id="lightbox-img" src="" alt=""><figcaption id="lightbox-cap"></figcaption></figure>' +
      '</div>');
    document.body.appendChild(box);

    var img = box.querySelector('#lightbox-img');
    var cap = box.querySelector('#lightbox-cap');
    var closeBtn = box.querySelector('.lightbox-close');
    var opener = null;

    function captionFor(src) {
      var item = src.closest('.carousel-item');
      if (item) {
        var c1 = item.querySelector('.carousel-cap');
        return c1 ? c1.innerHTML : esc(src.alt || '');
      }
      return esc(src.alt || '');
    }

    function open(src) {
      opener = document.activeElement;
      img.src = src.currentSrc || src.src;
      img.alt = src.alt || '';
      cap.innerHTML = captionFor(src);
      box.hidden = false;
      requestAnimationFrame(function () { box.classList.add('is-open'); });
      document.documentElement.style.overflow = 'hidden';
      closeBtn.focus();
    }
    function close() {
      box.classList.remove('is-open');
      document.documentElement.style.overflow = '';
      var done = function () { box.hidden = true; img.src = ''; box.removeEventListener('transitionend', done); };
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) done();
      else box.addEventListener('transitionend', done);
      if (opener && opener.focus) opener.focus();
    }

    root.addEventListener('click', function (e) {
      var target = e.target.closest('img');
      if (!target || !root.contains(target)) return;
      if (target.classList.contains('sponsor-logo')) return;
      open(target);
    });
    box.addEventListener('click', function (e) { if (e.target !== img) close(); });
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) close(); });
  }

  function wireScrollSpy() {
    var seen = {};
    var ids = C.nav.map(function (n) { return n.id; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen[e.target.id] = e.isIntersecting; });
      var active = ids.find(function (id) { return seen[id]; });
      document.querySelectorAll('.nav-links a').forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('data-nav') === active);
      });
    }, { rootMargin: '-42% 0px -52% 0px' });
    ids.forEach(function (id) {
      var target = document.getElementById(id);
      if (target) io.observe(target);
    });
  }

  /* ---- boot ---------------------------------------------------- */

  function boot() {
    if (!C || !C.team) return fail('content.js did not define window.SITE_CONTENT.');

    document.title = C.team.name + ' — Team ' + C.team.number;
    var root = document.documentElement;
    if (C.team.accent) root.style.setProperty('--accent', C.team.accent);

    document.body.insertBefore(renderNav(), document.body.firstChild);

    var main = document.getElementById('site');
    main.innerHTML =
      renderHero() +
      renderAbout() +
      renderPrograms() +
      renderGallery() +
      renderSponsors() +
      renderJoin() +
      renderContact();

    var social = (C.team.social || []).map(function (s) {
      return '<a href="' + esc(s.href) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>';
    }).join('');

    document.getElementById('foot').innerHTML =
      '<span>Team ' + esc(C.team.number) + ' · ' + esc(C.team.name) + '</span>' +
      '<span class="foot-links">' +
        '<a href="mailto:' + esc(C.contact.email) + '">' + esc(C.contact.email) + '</a>' +
        social +
      '</span>';

    wireCarousels(main);
    wireLightbox(main);
    wireScrollSpy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
