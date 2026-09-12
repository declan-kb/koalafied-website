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

  // Shared prev/next button for any [data-carousel] track — see
  // renderGallery() and the Events carousel in renderAbout().
  function carouselArrow(dir, label) {
    var d = dir < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7';
    return '<button class="carousel-nav carousel-' + (dir < 0 ? 'prev' : 'next') + '" type="button" aria-label="' + label + '" disabled>' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg></button>';
  }

  function fail(msg) {
    document.body.innerHTML =
      '<div class="boom"><h2>Site could not load</h2><p>' + esc(msg) + '</p>' +
      '<p style="margin-top:10px;color:var(--ink-3)">Check <code>content.js</code> ' +
      'for a syntax error. Open your browser console for the exact line.</p></div>';
  }

  /* ---- nav ------------------------------------------------- */

  // Nav is shared between index.html (a one-pager, so most items are
  // #hash anchors) and any standalone page like resources.html or
  // robots.html (which need those same anchors qualified back to
  // "index.html#id", and point at themselves directly rather than by
  // hash). Add a standalone page by giving it a nav.id here and a
  // matching #<id>-page container in boot() — no other nav change needed.
  var PAGE_ROUTES = { resources: 'resources.html', robots: 'robots.html' };

  // External-link arrow (opens-in-new-tab), same icon as the binder site's
  // CAD link — see ../koalafied-design-system.
  var EXTERNAL_ICON =
    '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>';

  // `currentPage` is null on index.html, or the nav id of the standalone
  // page currently showing (e.g. "resources", "robots").
  function renderNav(currentPage) {
    var t = C.team;
    var prevSpecial = false;
    var links = C.nav.map(function (n) {
      var isPageLink = PAGE_ROUTES.hasOwnProperty(n.id);
      var isExternal = !isPageLink && !!n.href;
      var isSpecial = isPageLink || isExternal;
      var href = isPageLink
        ? PAGE_ROUTES[n.id]
        : isExternal
          ? n.href
          : (currentPage ? 'index.html#' + n.id : '#' + n.id);
      var cls = [
        isSpecial ? 'nav-page' : '',
        // Only the first item after the anchors gets the separating rule —
        // standalone pages and any external link (like the current binder)
        // sit in the same trailing group.
        isSpecial && !prevSpecial ? 'nav-group-start' : '',
        isPageLink && n.id === currentPage ? 'is-active' : ''
      ].join(' ').trim();
      prevSpecial = isSpecial;
      // The corner-arrow icon is reserved for genuine external links —
      // standalone pages are an internal page jump, so they get no icon,
      // just the separating rule via .nav-group-start.
      var attrs = isExternal ? ' target="_blank" rel="noopener"' : '';
      var icon = isExternal ? EXTERNAL_ICON : '';
      return '<a href="' + esc(href) + '" data-nav="' + esc(n.id) + '" class="' + cls + '"' + attrs + '>' + esc(n.label) + icon + '</a>';
    }).join('');

    return el(
      '<header class="nav">' +
        '<div class="nav-in wrap">' +
          '<a class="wordmark" href="' + (currentPage ? 'index.html' : '#top') + '">' +
            (t.logo ? '<img class="wordmark-mark" src="' + esc(t.logo) + '" alt="">' : '') +
            '<span class="wordmark-a">' + esc(t.number) + '</span>' +
            '<span class="wordmark-b">' + esc(t.name) + '</span>' +
          '</a>' +
          '<button type="button" class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu">' +
            '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>' +
          '</button>' +
          '<nav class="nav-links" id="nav-links">' + links + '</nav>' +
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

  // Small stroke icons for event result tags, same visual language as the
  // nav's external-link arrow — picked by keyword so content.js can stay
  // plain data with no icon names to maintain.
  var EVENT_ICONS = [
    [/excellence/i, '<path d="M12 2l2.6 5.8 6.4.6-4.8 4.3 1.4 6.3L12 15.9l-5.6 3.1 1.4-6.3-4.8-4.3 6.4-.6z"/>'],
    [/place/i, '<circle cx="12" cy="15" r="6"/><path d="M9 9.5 6.5 3M15 9.5 17.5 3"/>'],
    [/qualified/i, '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5 5-6"/>'],
    [/rank/i, '<path d="M4 20V11M12 20V4M20 20v-7M2 20h20"/>'],
    [/competed|robots/i, '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5"/>']
  ];
  function eventIcon(title) {
    var hit = EVENT_ICONS.find(function (pair) { return pair[0].test(title); });
    var path = hit ? hit[1] : '<circle cx="12" cy="12" r="3"/>';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>';
  }
  // Colors the left edge by event series, so the grid reads at a glance
  // before you even read the labels.
  function eventSeries(name) {
    if (/championship/i.test(name)) return 'champs';
    if (/melbourne/i.test(name)) return 'mrt';
    return 'ausc';
  }

  // Shared "intro text beside an accent photo" row used by About and Join —
  // a two-column block when a photo is given, single-column otherwise.
  // `opts.extra` adds a second paragraph under the thesis (Join's schedule
  // blurb); `opts.photoFirst` puts the photo on the left instead of the
  // right, just for some rhythm between the two photo-accented sections.
  function introRow(title, thesis, photo, opts) {
    opts = opts || {};
    var figure = photo
      ? '<figure class="section-photo"><img src="' + esc(photo.src) + '" alt="' + esc(photo.alt) + '" loading="lazy"></figure>'
      : '';
    var intro =
      '<div>' +
        '<h2 class="sec-title">' + esc(title) + '</h2>' +
        '<p class="sec-thesis">' + esc(thesis) + '</p>' +
        (opts.extra ? '<p class="sec-thesis" style="margin-top:14px;">' + esc(opts.extra) + '</p>' : '') +
      '</div>';
    if (!figure) return intro;
    return '<div class="sec-cols two">' + (opts.photoFirst ? figure + intro : intro + figure) + '</div>';
  }

  function renderAbout() {
    var a = C.about;
    var events = '';
    if (Array.isArray(a.events) && a.events.length) {
      var eventCards = a.events.map(function (ev) {
        var tags = ev.titles.map(function (t) {
          return '<span class="event-tag">' + eventIcon(t) + esc(t) + '</span>';
        }).join('');
        var sub = ev.sub ? '<p class="event-sub">' + esc(ev.sub) + '</p>' : '';
        return '<div class="carousel-item carousel-item--events">' +
          '<div class="card event-card event-card--' + eventSeries(ev.event) + '">' +
            '<h4>' + esc(ev.event) + '</h4>' +
            sub +
            '<div class="event-tags">' + tags + '</div>' +
          '</div>' +
        '</div>';
      }).join('');
      events = '<h3 class="block-label" style="margin-top:clamp(24px,3vw,36px);">Competitions</h3>' +
        '<figure class="carousel carousel--events" data-carousel="events" style="margin:16px 0 0;">' +
          '<div class="carousel-track">' + eventCards + '</div>' +
          carouselArrow(-1, 'Previous event') + carouselArrow(1, 'Next event') +
        '</figure>';
    }
    var top = introRow('About the team', a.thesis, a.photo);

    return '<section class="sec" id="about"><div class="wrap">' + top + events + '</div></section>';
  }

  function renderGallery() {
    var g = C.gallery;
    var items = g.items.map(function (it) {
      return '<div class="carousel-item">' +
        '<div class="carousel-frame"><img src="' + esc(it.src) + '" alt="' + esc(it.alt) + '" loading="lazy"></div>' +
        '<p class="carousel-cap">' + esc(it.caption) + '</p>' +
      '</div>';
    }).join('');
    var body = '<figure class="carousel" data-carousel="gallery" style="margin:clamp(20px,3vw,32px) 0 0;">' +
      '<div class="carousel-track">' + items + '</div>' + carouselArrow(-1, 'Previous photo') + carouselArrow(1, 'Next photo') +
    '</figure>';
    return '<section class="sec" id="gallery"><div class="wrap">' +
      '<h2 class="sec-title">Gallery</h2>' +
      '<p class="sec-thesis">' + esc(g.thesis) + '</p>' +
      body +
    '</div></section>';
  }

  // Small, quiet strip right under the hero photo — just logos, no label,
  // in whatever order content.js lists C.sponsors (deliberately not
  // grouped by tier — see the comment on `sponsors` in content.js).
  // The fuller "thank you" section (renderSponsors) does the honors later
  // in the page.
  function renderSponsorBanner() {
    if (!Array.isArray(C.sponsors) || !C.sponsors.length) return '';
    var row = C.sponsors.map(function (s) {
      return '<img class="sponsor-logo" src="' + esc(s.logo) + '" alt="' + esc(s.name) + '" loading="lazy">';
    }).join('');
    return '<div class="sponsor-banner"><div class="wrap"><div class="sponsor-banner-row">' + row + '</div></div></div>';
  }

  // Display order for the tiered section below — content.js only tags each
  // sponsor with a `tier` name, it doesn't say which tier outranks which.
  var SPONSOR_TIER_ORDER = ['Platinum', 'Gold', 'Silver'];

  function renderSponsors() {
    if (!Array.isArray(C.sponsors) || !C.sponsors.length) return '';
    var s = C.sponsorship || {};
    var points = Array.isArray(s.points) && s.points.length ?
      '<ul class="sponsors-points">' + s.points.map(function (pt) {
        return '<li><strong>' + esc(pt.title) + ':</strong> ' + esc(pt.desc) + '</li>';
      }).join('') + '</ul>' : '';
    var tiers = SPONSOR_TIER_ORDER.map(function (tierName) {
      var inTier = C.sponsors.filter(function (sp) { return sp.tier === tierName; });
      if (!inTier.length) return '';
      var row = inTier.map(function (sp) {
        return '<img class="sponsor-logo" src="' + esc(sp.logo) + '" alt="' + esc(sp.name) + '" loading="lazy">';
      }).join('');
      return '<div class="sponsor-tier tier-' + tierName.toLowerCase() + '">' +
        '<div class="sponsors-label">' + esc(tierName) + '</div>' +
        '<div class="sponsors-row">' + row + '</div>' +
      '</div>';
    }).join('');
    return '<section class="sponsors wrap" id="sponsors">' +
      (s.title ? '<h2 class="sec-title">' + esc(s.title) + '</h2>' : '') +
      (s.thesis ? '<p class="sponsors-thesis">' + esc(s.thesis) + '</p>' : '') +
      points +
      tiers +
    '</section>';
  }

  function renderJoin() {
    var j = C.join;
    var areaCards = (j.areas || []).map(function (a) {
      return '<div class="card"><h4>' + esc(a.title) + '</h4><p>' + esc(a.desc) + '</p></div>';
    }).join('');

    // Photo on the left here (About put it on the right) — just for some
    // rhythm between the two photo-accented sections on the page.
    var top = introRow('Join the team', j.thesis, j.photo, { extra: j.schedule, photoFirst: true });

    var rest =
      '<h3 class="block-label" style="margin-top:clamp(24px,3vw,36px);">What you could work on</h3>' +
      '<div class="cards">' + areaCards + '</div>' +
      (j.note ? '<p class="muted" style="margin-top:16px;font-style:italic;">' + esc(j.note) + '</p>' : '');

    return '<section class="sec" id="join"><div class="wrap">' + top + rest + '</div></section>';
  }

  /* ---- resources page ------------------------------------------ */

  function renderResources() {
    var r = C.resources;

    var codeLine =
      '<p class="resources-code-line">' + esc(r.code.desc) +
        ' <a class="card-go" href="' + esc(r.code.href) + '" target="_blank" rel="noopener">' + esc(r.code.label) + ' →</a>' +
      '</p>';

    var cadRows = r.cad.seasons.map(function (s) {
      var links = s.links.map(function (l) {
        return '<a class="card-go" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + ' →</a>';
      }).join('');
      return '<div class="cad-row">' +
        '<div class="cad-row-info">' +
          '<h4>' + esc(s.season) + '</h4>' +
          '<p class="card-robot">' + esc(s.robot) + '</p>' +
        '</div>' +
        '<div class="card-links cad-row-links">' + links + '</div>' +
      '</div>';
    }).join('');

    return '<section class="sec" id="resources-top" style="border-top:none;"><div class="wrap">' +
        '<h1 class="sec-title">' + esc(r.title) + '</h1>' +
        '<p class="sec-thesis">' + esc(r.thesis) + '</p>' +
        codeLine +
        '<h3 class="block-label" style="margin-top:clamp(28px,4vw,44px);">' + esc(r.cad.title) + '</h3>' +
        '<div class="cad-list">' + cadRows + '</div>' +
      '</div></section>';
  }

  /* ---- robots page ----------------------------------------------- */

  // One result card per event — shared between a robot's `official` and
  // `offseason` lists. Reuses the same icon-tag treatment as the About
  // section's event cards, plus an alliance-partner line underneath.
  function robotResultCard(ev) {
    var tags = (ev.titles || []).map(function (t) {
      return '<span class="event-tag">' + eventIcon(t) + esc(t) + '</span>';
    }).join('');
    var sub = ev.sub ? '<p class="event-sub">' + esc(ev.sub) + '</p>' : '';
    var alliance = (ev.alliance && ev.alliance.length)
      ? '<div class="event-alliance"><strong>Alliance:</strong> ' + ev.alliance.map(esc).join(', ') + '</div>'
      : '';
    return '<div class="card event-card">' +
      '<h4>' + esc(ev.event) + '</h4>' +
      sub +
      '<div class="event-tags">' + tags + '</div>' +
      alliance +
    '</div>';
  }

  function renderRobots() {
    var r = C.robots;

    var entries = (r.items || []).map(function (bot, i) {
      var images = (bot.images || []).map(function (img) {
        return '<div class="carousel-item">' +
          '<div class="carousel-frame"><img src="' + esc(img.src) + '" alt="' + esc(img.alt) + '" loading="lazy"></div>' +
        '</div>';
      }).join('');
      var gallery = images
        ? '<figure class="carousel carousel--robot" data-carousel="robot-' + i + '">' +
            '<div class="carousel-track">' + images + '</div>' +
            carouselArrow(-1, 'Previous photo') + carouselArrow(1, 'Next photo') +
          '</figure>'
        : '';

      var official = (bot.official || []).map(robotResultCard).join('');
      var offseason = (bot.offseason || []).map(robotResultCard).join('');

      return '<article class="robot-entry">' +
        '<div class="robot-media">' +
          '<h3 class="robot-name">' + esc(bot.name) + '</h3>' +
          gallery +
        '</div>' +
        '<div class="robot-info">' +
          '<div class="robot-block">' +
            '<h4 class="block-label">Competed in</h4>' +
            '<p class="robot-season">' + esc(bot.season) + '</p>' +
          '</div>' +
          '<div class="robot-block">' +
            '<h4 class="block-label">What it does</h4>' +
            '<p class="robot-summary">' + esc(bot.summary) + '</p>' +
          '</div>' +
          (official ? '<div class="robot-block">' +
            '<h4 class="block-label">Official results</h4>' +
            '<div class="cards robot-results">' + official + '</div>' +
          '</div>' : '') +
          (offseason ? '<div class="robot-block">' +
            '<h4 class="block-label">Offseason results</h4>' +
            '<div class="cards robot-results">' + offseason + '</div>' +
          '</div>' : '') +
        '</div>' +
      '</article>';
    }).join('');

    return '<section class="sec" id="robots-top" style="border-top:none;"><div class="wrap">' +
        '<h1 class="sec-title">' + esc(r.title) + '</h1>' +
        '<p class="sec-thesis">' + esc(r.thesis) + '</p>' +
        '<div class="robot-list">' + entries + '</div>' +
      '</div></section>';
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

  // Mobile hamburger: the nav links panel drops down under the bar.
  // Closes itself on a link tap, an outside click, Escape, or a resize
  // back past the breakpoint where the links are shown inline anyway.
  function wireNavToggle() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    function setOpen(open) {
      links.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setOpen(!links.classList.contains('is-open'));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (links.classList.contains('is-open') &&
          !links.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
        setOpen(false);
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 720) setOpen(false);
    });
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

    var root = document.documentElement;
    if (C.team.accent) root.style.setProperty('--accent', C.team.accent);

    var main = document.getElementById('site');
    var resourcesPage = document.getElementById('resources-page');
    var robotsPage = document.getElementById('robots-page');
    // Add a future standalone page here (and to PAGE_ROUTES above) by
    // extending this chain — whichever container is present wins.
    var currentPage = resourcesPage ? 'resources' : (robotsPage ? 'robots' : null);
    var pageTitles = { resources: 'Resources — ', robots: 'Our Robots — ' };

    document.title = (pageTitles[currentPage] || '') + C.team.name + ' — Team ' + C.team.number;
    document.body.insertBefore(renderNav(currentPage), document.body.firstChild);
    wireNavToggle();

    if (main) {
      main.innerHTML =
        renderHero() +
        renderSponsorBanner() +
        renderAbout() +
        renderSponsors() +
        renderJoin() +
        renderGallery();
    }
    if (resourcesPage) {
      resourcesPage.innerHTML = renderResources();
    }
    if (robotsPage) {
      robotsPage.innerHTML = renderRobots();
    }

    var social = (C.team.social || []).map(function (s) {
      return '<a href="' + esc(s.href) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>';
    }).join('');

    document.getElementById('foot').innerHTML =
      '<span>Team ' + esc(C.team.number) + ' · ' + esc(C.team.name) + '</span>' +
      '<span class="foot-links">' +
        '<a href="mailto:' + esc(C.team.email) + '">' + esc(C.team.email) + '</a>' +
        social +
      '</span>';

    // Carousels/lightbox apply to whichever page actually rendered content;
    // scroll-spy is index.html-only since it tracks in-page #anchors.
    var contentRoot = main || robotsPage;
    if (contentRoot) {
      wireCarousels(contentRoot);
      wireLightbox(contentRoot);
    }
    if (main) wireScrollSpy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
