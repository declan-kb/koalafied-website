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

  // Nav is shared between index.html (a one-pager, so most items are
  // #hash anchors) and any standalone page like resources.html or
  // robots.html (which need those same anchors qualified back to
  // "index.html#id", and point at themselves directly rather than by
  // hash). Add a standalone page by giving it a nav.id here and a
  // matching #<id>-page container in boot() — no other nav change needed.
  var PAGE_ROUTES = { resources: 'resources.html', robots: 'robots.html' };

  // External-link icon (opens-in-new-tab), same icon as the binder site's
  // CAD link — see ../koalafied-design-system. Reused everywhere a link
  // leaves the site (nav, hero CTA, resources page) instead of a "→".
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
      var attrs = isExternal && n.id !== 'binder' ? ' target="_blank" rel="noopener"' : '';
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
      // Same external-link cue as the nav: a CTA that leaves the site gets
      // the corner-arrow icon instead of plain text.
      var isExternal = /^https?:\/\//i.test(c.href);
      return '<a class="btn ' + (c.primary ? 'btn-primary' : 'btn-ghost') + '" href="' + esc(c.href) + '">' + esc(c.label) + (isExternal ? EXTERNAL_ICON : '') + '</a>';
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

  // Stroke icons for the honours line of a result row (see resultRow) —
  // picked by keyword so content.js can stay plain data with no icon names.
  var HONOUR_ICONS = [
    [/qualified/i, '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5 5-6"/>'],
    [/award|excellence/i, '<path d="M12 2l2.6 5.8 6.4.6-4.8 4.3 1.4 6.3L12 15.9l-5.6 3.1 1.4-6.3-4.8-4.3 6.4-.6z"/>']
  ];

  // Picks the first [regex, svg paths] pair in `table` whose regex matches
  // `text`, drawn as a decorative stroke icon — a small dot if none match.
  function lineIcon(table, text) {
    var hit = table.find(function (pair) { return pair[0].test(text); });
    var path = hit ? hit[1] : '<circle cx="12" cy="12" r="3"/>';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
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

  // ---- reusable content blocks --------------------------------
  // Each section on the page is a header (via introRow, or a plain
  // title+thesis pair) followed by zero or more of these blocks. Adding a
  // new section is usually just a new content.js entry plus a couple of
  // calls below — see renderAbout/renderGallery/renderSponsors/renderJoin
  // for examples of composing them with renderSection().

  // Wraps header + block HTML in the standard "<section class="sec">
  // <div class="wrap">" shell shared by About, Gallery and Join.
  function renderSection(id, innerHtml) {
    return '<section class="sec" id="' + id + '"><div class="wrap">' + innerHtml + '</div></section>';
  }

  // How an event's `titles` are split across the results table's columns:
  // the playoff finish ("2nd Place"), awards and Championship
  // qualification, the qualification rank, and anything else (e.g.
  // "Alliance Captain") as a quiet note under the finish.
  var PLACE_RE = /^(tied\s+)?\d+(st|nd|rd|th)\s+place$/i;
  var RANK_RE = /^qualification rank\s+(.+)$/i;
  var HONOUR_RE = /award|excellence|qualified/i;

  // Alliance partners are written in content.js as "6510 Pymble Pride":
  // team number, then name (optional).
  function parseTeam(entry) {
    var m = String(entry).match(/^\s*(?:team\s*)?(\d+)\s*[,:–—-]?\s*(.*)$/i);
    return m ? { number: m[1], name: m[2].trim() } : { number: '', name: String(entry).trim() };
  }

  // The season an event belongs to, from its name ("2026 Southern Cross
  // Regional" or "Southern Cross Regional 2026").
  function eventYear(name) {
    var m = String(name || '').match(/\b(20\d{2})\b/);
    return m ? m[1] : '';
  }

  // A partner team's FIRST avatar for that season, cropped to a circle, if
  // scripts/fetch-team-avatars.mjs has saved one (it lists them in
  // assets/js/team-avatars.js). Otherwise a circle with the team's
  // initials, so every partner lines up the same way. wireTeamAvatars
  // picks a backdrop for logos that are see-through.
  function teamAvatar(team, year) {
    var saved = (window.TEAM_AVATARS || {})[year] || [];
    if (team.number && saved.indexOf(Number(team.number)) !== -1) {
      return '<span class="team-avatar"><img src="assets/img/avatars/' + year + '/frc' + team.number + '.png" alt="" width="20" height="20" loading="lazy"></span>';
    }
    var initials = team.name.split(/\s+/)
      .filter(function (w) { return /^[a-z0-9]/i.test(w) && !/^(the|of|and)$/i.test(w); })
      .map(function (w) { return w.charAt(0); }).join('').slice(0, 2).toUpperCase();
    return '<span class="team-avatar team-avatar--none" aria-hidden="true">' + esc(initials || '#') + '</span>';
  }

  // One event in the results table: a row of four cells, plus a second
  // row listing alliance partners when there are any. `ev` is the
  // {event, sub, titles} shape used by about.events and each robot's
  // official/offseason lists, with an optional `kind` ("Official" or
  // "Offseason") shown beside the location.
  function resultRow(ev) {
    var place = null, rank = null, honours = [], notes = [];
    (ev.titles || []).forEach(function (t) {
      var m;
      if (!place && PLACE_RE.test(t)) place = t;
      else if (!rank && (m = t.match(RANK_RE))) rank = m[1];
      else if (HONOUR_RE.test(t)) honours.push(t);
      else notes.push(t);
    });
    var meta = [ev.sub, ev.kind].filter(Boolean).map(esc).join(' · ');
    var year = eventYear(ev.event);
    var partners = (ev.alliance || []).map(parseTeam);
    // Empty cells stay blank on wide screens and are dropped on phones.
    var cell = function (cls, html) {
      return '<td class="' + cls + (html ? '' : ' res-empty') + '">' + html + '</td>';
    };

    var rowClass = [place && /^1st/i.test(place) ? 'is-win' : '', partners.length ? 'has-alliance' : ''].join(' ').trim();
    var main = '<tr' + (rowClass ? ' class="' + rowClass + '"' : '') + '>' +
      cell('res-event', '<strong>' + esc(ev.event) + '</strong>' + (meta ? '<span>' + meta + '</span>' : '')) +
      cell('res-finish', (place ? '<strong>' + esc(place) + '</strong>' : '') +
        notes.map(function (n) { return '<span>' + esc(n) + '</span>'; }).join('')) +
      cell('res-awards', honours.map(function (h) {
        return '<span class="res-award' + (/qualified/i.test(h) ? ' res-award--qualified' : '') + '">' + lineIcon(HONOUR_ICONS, h) + esc(h) + '</span>';
      }).join('')) +
      cell('res-rank', rank ? esc(rank) : '') +
    '</tr>';

    if (!partners.length) return main;
    var teams = partners.map(function (t) {
      var inner = teamAvatar(t, year) +
        '<span class="team-label">' + (t.number ? '<b>' + esc(t.number) + '</b>' : '') + (t.name ? ' ' + esc(t.name) : '') + '</span>';
      return '<li>' + (t.number
        ? '<a class="team" href="https://www.thebluealliance.com/team/' + t.number + (year ? '/' + year : '') + '" target="_blank" rel="noopener">' + inner + '</a>'
        : '<span class="team">' + inner + '</span>') + '</li>';
    }).join('');
    return main +
      '<tr class="res-alliance"><td colspan="4"><div class="res-alliance-in">' +
        '<span class="res-alliance-label">Alliance</span><ul>' + teams + '</ul>' +
      '</div></td></tr>';
  }

  // The results table — About's Recent Competitions and every robot on the
  // Robots page share this one format, so achievements always read the
  // same way. On phones each row stacks into a short block (see CSS).
  function blockResults(events, heading) {
    if (!Array.isArray(events) || !events.length) return '';
    return (heading ? '<h3 class="sub-title">' + esc(heading) + '</h3>' : '') +
      '<div class="results"><table>' +
        '<thead><tr><th scope="col">Event</th><th scope="col">Finish</th><th scope="col">Awards &amp; honours</th><th scope="col">Qualifying rank</th></tr></thead>' +
        '<tbody>' + events.map(resultRow).join('') + '</tbody>' +
      '</table></div>';
  }

  // How many photos go in each row of a photo grid: alternating 2 and 3,
  // so the page has some rhythm, but never leaving one photo alone on the
  // last row (5 → [2,3], 6 → [2,2,2], 8 → [2,3,3]). Only a 1-photo
  // gallery gets a row of one.
  function photoRowSizes(n) {
    var rows = [], k = 0;
    while (n > 0) {
      var size = k++ % 2 ? 3 : 2;
      if (n - size === 1) size = size === 3 ? 2 : 3;
      size = Math.min(size, n);
      rows.push(size);
      n -= size;
    }
    return rows;
  }

  // Every photo in a Gallery-style grid, all visible at once — used by the
  // home page Gallery. Photos in a row share one height and fill the row's
  // width in proportion to their own shape (see wirePhotoGrids, which reads
  // each photo's real aspect ratio into --r), so nothing gets cropped:
  // group shots keep everyone's heads in frame. Each photo is a link to the
  // full image, which the lightbox intercepts.
  function blockPhotoGrid(items) {
    if (!Array.isArray(items) || !items.length) return '';
    var start = 0;
    var rows = photoRowSizes(items.length).map(function (size) {
      var cells = items.slice(start, start + size).map(function (it) {
        return '<figure class="pgrid-item">' +
          '<a class="pgrid-link" href="' + esc(it.full || it.src) + '">' +
            '<img src="' + esc(it.src) + '" alt="' + esc(it.alt) + '" loading="lazy">' +
          '</a>' +
          (it.caption ? '<figcaption class="pgrid-cap">' + esc(it.caption) + '</figcaption>' : '') +
        '</figure>';
      }).join('');
      start += size;
      return '<div class="pgrid-row">' + cells + '</div>';
    }).join('');
    return '<div class="pgrid">' + rows + '</div>';
  }

  // One large photo with a thumbnail strip under it — used per robot on the
  // Robots page. The photo sits whole on a soft "stage" (never cropped);
  // the thumbnails switch it, and clicking it opens the lightbox (see
  // wirePhotoStages). A robot with a single photo gets no thumbnails.
  // `full` is an optional higher-res lightbox image.
  function blockPhotoStage(items) {
    if (!Array.isArray(items) || !items.length) return '';
    var first = items[0];
    var thumbs = items.length > 1
      ? '<div class="pstage-thumbs">' + items.map(function (it, i) {
          return '<button type="button" class="pstage-thumb" aria-pressed="' + (i === 0) + '"' +
            ' aria-label="Show photo ' + (i + 1) + ' of ' + items.length + '"' +
            ' data-src="' + esc(it.src) + '" data-full="' + esc(it.full || it.src) + '" data-alt="' + esc(it.alt) + '">' +
            '<img src="' + esc(it.src) + '" alt="" loading="lazy">' +
          '</button>';
        }).join('') + '</div>'
      : '';
    return '<div class="pstage">' +
      '<button type="button" class="pstage-main" data-full="' + esc(first.full || first.src) + '" aria-label="View full size: ' + esc(first.alt) + '">' +
        '<img class="pstage-photo" src="' + esc(first.src) + '" alt="' + esc(first.alt) + '" loading="lazy">' +
      '</button>' +
      thumbs +
    '</div>';
  }

  // One icon per Join area, matched on its title the same way HONOUR_ICONS
  // is, so content.js stays plain text. A new area with no match here gets
  // the plain dot — add a [regex, paths] row to give it a proper icon.
  var AREA_ICONS = [
    [/mechanic/i, '<path d="M10.5 4.96L10.83 2.47L13.17 2.47L13.5 4.96A7.2 7.2 0 0 1 15.92 5.96L15.92 5.96L17.91 4.44L19.56 6.09L18.04 8.08A7.2 7.2 0 0 1 19.04 10.5L19.04 10.5L21.53 10.83L21.53 13.17L19.04 13.5A7.2 7.2 0 0 1 18.04 15.92L18.04 15.92L19.56 17.91L17.91 19.56L15.92 18.04A7.2 7.2 0 0 1 13.5 19.04L13.5 19.04L13.17 21.53L10.83 21.53L10.5 19.04A7.2 7.2 0 0 1 8.08 18.04L8.08 18.04L6.09 19.56L4.44 17.91L5.96 15.92A7.2 7.2 0 0 1 4.96 13.5L4.96 13.5L2.47 13.17L2.47 10.83L4.96 10.5A7.2 7.2 0 0 1 5.96 8.08L5.96 8.08L4.44 6.09L6.09 4.44L8.08 5.96A7.2 7.2 0 0 1 10.5 4.96Z"/><circle cx="12" cy="12" r="2.8"/>'],
    [/program|code|software/i, '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15"/>'],
    [/\bcad\b|3d|model/i, '<path d="M12 2.8l8.2 4.6v9.2L12 21.2l-8.2-4.6V7.4z"/><path d="M3.8 7.4L12 12l8.2-4.6M12 12v9.2"/>'],
    [/prototyp|idea/i, '<path d="M9.2 17.5h5.6M10 21h4"/><path d="M12 3a6.2 6.2 0 0 0-3.6 11.2c.5.4.8 1 .8 1.6v1.7h5.6v-1.7c0-.6.3-1.2.8-1.6A6.2 6.2 0 0 0 12 3z"/>'],
    [/electric|wiring/i, '<path d="M13.5 2.5L4.5 13.5h7l-1 8 9-11h-7z"/>'],
    [/wood|carpent/i, '<g transform="rotate(-32 12 12)"><path d="M14 5v12.5M14 5L2.5 9.5V14"/><path d="M2.5 14l1 1.4 1-.9 1 1.4 1-.9 1 1.4 1-.9 1 1.4 1-.9 1 1.4 1-.9 1 1.4 1.5-.9"/><path d="M14 4.5h4a3.5 3.5 0 0 1 3.5 3.5v6a3.5 3.5 0 0 1-3.5 3.5h-4M17 9v4"/></g>'],
    [/media|photo|video|film/i, '<path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.7L9 4.5h6L16.8 7h2.7A1.5 1.5 0 0 1 21 8.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/><circle cx="12" cy="13.2" r="3.6"/>'],
    [/sponsor|fund/i, '<circle cx="12" cy="12" r="9.2"/><path d="M14.8 8.9c-.5-.8-1.5-1.3-2.8-1.3-1.7 0-2.8.8-2.8 2 0 2.8 5.6 1.5 5.6 4.3 0 1.2-1.1 2.1-2.8 2.1-1.3 0-2.4-.5-2.9-1.4M12 5.8v1.8M12 16.1v2"/>']
  ];

  // A ruled {title, desc} list with an icon hung beside each title — used
  // by Join's "areas". A typeset list rather than a grid of boxes: the
  // entries are short, equal-weight and non-interactive, so boxes only
  // added borders to read around. `note` is an optional closing aside.
  function blockIconList(items, heading, icons, note) {
    if (!Array.isArray(items) || !items.length) return '';
    var rows = items.map(function (it) {
      return '<li class="icon-item">' +
        '<span class="icon-item-icon">' + lineIcon(icons, it.title) + '</span>' +
        '<h4>' + esc(it.title) + '</h4><p>' + esc(it.desc) + '</p>' +
      '</li>';
    }).join('');
    return (heading ? '<h3 class="sub-title">' + esc(heading) + '</h3>' : '') +
      '<ul class="icon-list">' + rows + '</ul>' +
      (note ? '<p class="icon-note">' + esc(note) + '</p>' : '');
  }

  function renderAbout() {
    var a = C.about;
    var header = introRow('About the team', a.thesis, a.photo);
    var events = blockResults(a.events, 'Recent Competitions');
    return renderSection('about', header + events);
  }

  function renderGallery() {
    var g = C.gallery;
    var header = '<h2 class="sec-title">Gallery</h2><p class="sec-thesis">' + esc(g.thesis) + '</p>';
    var body = blockPhotoGrid(g.items);
    return renderSection('gallery', header + body);
  }

  // Small, quiet strip right under the hero photo — just a small label and
  // logos, in whatever order content.js lists C.sponsors (deliberately not
  // grouped by tier — see the comment on `sponsors` in content.js).
  // The fuller "thank you" section (renderSponsors) does the honors later
  // in the page.
  function renderSponsorBanner() {
    if (!Array.isArray(C.sponsors) || !C.sponsors.length) return '';
    var row = C.sponsors.map(function (s) {
      return '<img class="sponsor-logo" src="' + esc(s.logo) + '" alt="' + esc(s.name) + '" loading="lazy">';
    }).join('');
    return '<div class="sponsor-banner"><div class="wrap">' +
      '<div class="sponsor-banner-label">Thank you to our sponsors:</div>' +
      '<div class="sponsor-banner-row">' + row + '</div>' +
      '</div></div>';
  }

  // Display order for the tiered section below — content.js only tags each
  // sponsor with a `tier` name, it doesn't say which tier outranks which.
  var SPONSOR_TIER_ORDER = ['Platinum', 'Gold', 'Silver'];

  // The {title, desc} bullet list under Sponsors' thesis.
  function blockBulletPoints(points) {
    if (!Array.isArray(points) || !points.length) return '';
    return '<ul class="sponsors-points">' + points.map(function (pt) {
      return '<li><strong>' + esc(pt.title) + ':</strong> ' + esc(pt.desc) + '</li>';
    }).join('') + '</ul>';
  }

  function renderSponsors() {
    if (!Array.isArray(C.sponsors) || !C.sponsors.length) return '';
    var s = C.sponsorship || {};
    var header =
      (s.title ? '<h2 class="sec-title">' + esc(s.title) + '</h2>' : '') +
      (s.thesis ? '<p class="sponsors-thesis">' + esc(s.thesis) + '</p>' : '');
    // Sponsor logos grouped into Platinum/Gold/Silver rows — specific to
    // this section (tier grouping/ordering), not a reusable block.
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
      header +
      blockBulletPoints(s.points) +
      tiers +
    '</section>';
  }

  function renderJoin() {
    var j = C.join;
    // Photo on the left here (About put it on the right) — just for some
    // rhythm between the two photo-accented sections on the page.
    var header = introRow('Join the team', j.thesis, j.photo, { extra: j.schedule, photoFirst: true });
    var areas = blockIconList(j.areas, 'What you could work on', AREA_ICONS, j.note);

    return renderSection('join', header + areas);
  }

  /* ---- resources page ------------------------------------------ */

  function renderResources() {
    var r = C.resources;

    var codeLine =
      '<p class="resources-code-line">' + esc(r.code.desc) +
        ' <a class="card-go" href="' + esc(r.code.href) + '" target="_blank" rel="noopener">' + esc(r.code.label) + EXTERNAL_ICON + '</a>' +
      '</p>';

    var cadRows = r.cad.seasons.map(function (s) {
      var links = s.links.map(function (l) {
        return '<a class="card-go" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + EXTERNAL_ICON + '</a>';
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
        '<h3 class="sub-title">' + esc(r.cad.title) + '</h3>' +
        '<div class="cad-list">' + cadRows + '</div>' +
      '</div></section>';
  }

  /* ---- robots page ----------------------------------------------- */

  // "2026" — or "2025–26" for a robot whose season spans years (Unk, Bob).
  // The timeline marker for each robot.
  function seasonYears(season) {
    var years = String(season || '').match(/\b(?:19|20)\d{2}\b/g) || [];
    var last = years[years.length - 1];
    return years.length > 1 && years[0] !== last ? years[0] + '–' + last.slice(2) : (years[0] || '');
  }

  // "Lemon Launcher" → "lemon-launcher", for robots.html#lemon-launcher links.
  function slugify(text) {
    return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'robot';
  }

  // The Robots page: a timeline, newest robot first. Every robot has the
  // same four parts — photo, name and summary, links, results table.
  function renderRobots() {
    var r = C.robots;
    var usedIds = {};

    var items = (r.items || []).map(function (bot) {
      var id = slugify(bot.name);
      while (usedIds[id]) id += '-2';
      usedIds[id] = true;

      var sub = [bot.season, bot.aka ? 'aka “' + bot.aka + '”' : ''].filter(Boolean).map(esc).join(' · ');
      var events = (bot.official || []).map(function (ev) { return Object.assign({}, ev, { kind: 'Official' }); })
        .concat((bot.offseason || []).map(function (ev) { return Object.assign({}, ev, { kind: 'Offseason' }); }));
      var links = (bot.links || []).map(function (l) {
        return '<a class="tl-link" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + EXTERNAL_ICON + '</a>';
      }).join('');

      return '<li class="tl-item" id="' + id + '">' +
        '<p class="tl-year">' + esc(seasonYears(bot.season)) + '</p>' +
        '<div class="tl-body">' +
          '<div class="tl-main">' +
            '<div class="tl-media">' + blockPhotoStage(bot.images) + '</div>' +
            '<div class="tl-info">' +
              '<h2 class="tl-name">' + esc(bot.name) + '</h2>' +
              (sub ? '<p class="tl-sub">' + sub + '</p>' : '') +
              '<p class="tl-summary">' + esc(bot.summary) + '</p>' +
              (links ? '<p class="tl-links">' + links + '</p>' : '') +
            '</div>' +
          '</div>' +
          blockResults(events) +
        '</div>' +
      '</li>';
    }).join('');

    return '<section class="sec" id="robots-top" style="border-top:none;"><div class="wrap">' +
        '<h1 class="sec-title">' + esc(r.title) + '</h1>' +
        '<p class="sec-thesis">' + esc(r.thesis) + '</p>' +
        '<ol class="timeline">' + items + '</ol>' +
      '</div></section>';
  }

  /* ---- interactions ------------------------------------------ */

  // Runs `fn` once `img` has its natural size — right away if it's
  // already loaded (cached), otherwise on load.
  function onImageReady(img, fn) {
    if (img.complete && img.naturalWidth) fn();
    else img.addEventListener('load', fn);
  }

  // Full-screen photo viewer shared by every photo on the site. Opened with
  // a list of {src, alt, caption} and a starting index; steps through the
  // list with the arrow buttons, ←/→ keys, or a swipe on touch screens.
  // `onChange(i)` fires whenever the shown photo changes, so a Robots page
  // stage can end up on whichever photo you left the viewer on.
  // A native <dialog> handles focus trapping and inerting the page behind.
  function createLightbox() {
    var chevron = function (d) {
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
    };
    var box = el(
      '<dialog class="lightbox" aria-label="Photo viewer">' +
        '<p class="lightbox-count" aria-hidden="true"></p>' +
        '<button class="lightbox-btn lightbox-close" type="button" aria-label="Close">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
        '</button>' +
        '<button class="lightbox-btn lightbox-nav lightbox-prev" type="button" aria-label="Previous photo">' + chevron('M15 5l-7 7 7 7') + '</button>' +
        '<button class="lightbox-btn lightbox-nav lightbox-next" type="button" aria-label="Next photo">' + chevron('M9 5l7 7-7 7') + '</button>' +
        '<figure class="lightbox-figure">' +
          '<img class="lightbox-img" src="" alt="">' +
          '<figcaption class="lightbox-cap" aria-live="polite"></figcaption>' +
        '</figure>' +
      '</dialog>');
    document.body.appendChild(box);

    var img = box.querySelector('.lightbox-img');
    var cap = box.querySelector('.lightbox-cap');
    var count = box.querySelector('.lightbox-count');
    var prev = box.querySelector('.lightbox-prev');
    var next = box.querySelector('.lightbox-next');
    var items = [], index = 0, onChange = null, opener = null;

    function show(i) {
      index = Math.max(0, Math.min(items.length - 1, i));
      var it = items[index];
      img.src = it.src;
      img.alt = it.alt || '';
      cap.textContent = it.caption || it.alt || '';
      count.textContent = items.length > 1 ? (index + 1) + ' / ' + items.length : '';
      var focused = document.activeElement;
      prev.hidden = index === 0;
      next.hidden = index === items.length - 1;
      // Stepping to either end hides the button you just pressed — hand
      // focus to the other one so the keyboard stays inside the viewer.
      if (focused && focused.hidden) (focused === next ? prev : next).focus();
      // Warm the neighbors so stepping through feels instant.
      [index - 1, index + 1].forEach(function (n) {
        if (items[n]) new Image().src = items[n].src;
      });
      if (onChange) onChange(index);
    }

    function open(list, start, changeFn) {
      items = list;
      onChange = changeFn || null;
      opener = document.activeElement;
      show(start || 0);
      box.showModal();
      document.documentElement.style.overflow = 'hidden';
      requestAnimationFrame(function () { box.classList.add('is-open'); });
    }

    function close() {
      if (!box.open) return;
      box.classList.remove('is-open');
      document.documentElement.style.overflow = '';
      var finished = false;
      var done = function () {
        if (finished) return;
        finished = true;
        box.close();
        img.src = '';
        if (opener && opener.focus) opener.focus();
      };
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) done();
      else { box.addEventListener('transitionend', done, { once: true }); setTimeout(done, 250); }
    }

    prev.addEventListener('click', function () { show(index - 1); });
    next.addEventListener('click', function () { show(index + 1); });
    box.querySelector('.lightbox-close').addEventListener('click', close);
    // Esc: run the same fade-out instead of the dialog's instant close.
    box.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
    document.addEventListener('keydown', function (e) {
      if (!box.open) return;
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });

    // Swipe left/right on touch screens. A swipe also ends in a click,
    // which must not count as a "click the backdrop to close".
    var touchX = null, touchY = 0, swiped = false;
    box.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse') return;
      touchX = e.clientX; touchY = e.clientY;
    });
    box.addEventListener('pointerup', function (e) {
      if (touchX === null) return;
      var dx = e.clientX - touchX, dy = e.clientY - touchY;
      touchX = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        swiped = true;
        show(index + (dx < 0 ? 1 : -1));
      }
    });
    box.addEventListener('click', function (e) {
      if (swiped) { swiped = false; return; }
      if (!e.target.closest('.lightbox-img, .lightbox-btn, .lightbox-cap')) close();
    });

    return { open: open };
  }

  // Home page Gallery (see blockPhotoGrid): sizes each photo to its real
  // shape once loaded, and opens the lightbox on click. Cmd/Ctrl-click
  // and middle-click still open the plain image in a new tab.
  function wirePhotoGrids(root, lightbox) {
    root.querySelectorAll('.pgrid').forEach(function (grid) {
      var links = Array.prototype.slice.call(grid.querySelectorAll('.pgrid-link'));
      var items = links.map(function (a) {
        var img = a.querySelector('img');
        var cap = a.parentNode.querySelector('.pgrid-cap');
        return { src: a.getAttribute('href'), alt: img.alt, caption: cap ? cap.textContent : '' };
      });
      links.forEach(function (a, i) {
        var img = a.querySelector('img');
        onImageReady(img, function () {
          a.parentNode.style.setProperty('--r', (img.naturalWidth / img.naturalHeight).toFixed(3));
        });
        a.addEventListener('click', function (e) {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          lightbox.open(items, i);
        });
      });
    });
  }

  // Robots page photo stages (see blockPhotoStage): thumbnails swap the
  // large photo, and the large photo opens the lightbox on the same one.
  function wirePhotoStages(root, lightbox) {
    root.querySelectorAll('.pstage').forEach(function (stage) {
      var main = stage.querySelector('.pstage-main');
      var mainImg = main.querySelector('.pstage-photo');
      var thumbs = Array.prototype.slice.call(stage.querySelectorAll('.pstage-thumb'));
      var items = thumbs.length
        ? thumbs.map(function (t) { return { src: t.dataset.full, alt: t.dataset.alt }; })
        : [{ src: main.dataset.full, alt: mainImg.alt }];
      var current = 0;

      function select(i) {
        if (i === current || !thumbs[i]) return;
        current = i;
        var t = thumbs[i];
        mainImg.src = t.dataset.src;
        mainImg.alt = t.dataset.alt;
        main.dataset.full = t.dataset.full;
        main.setAttribute('aria-label', 'View full size: ' + t.dataset.alt);
        thumbs.forEach(function (other, j) { other.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
      }

      thumbs.forEach(function (t, i) {
        t.addEventListener('click', function () { select(i); });
      });
      main.addEventListener('click', function () {
        lightbox.open(items, current, select);
      });
    });
  }

  // Some FIRST avatars are a full square picture, which simply fills its
  // circle; others are a see-through logo, often all white. For those,
  // look at the logo's own pixels and put light artwork on a dark circle
  // and dark or coloured artwork on a white one. Reading pixels needs the
  // page served over http(s); opened as a local file it keeps the white
  // circle.
  function wireTeamAvatars(root) {
    root.querySelectorAll('.team-avatar img').forEach(function (img) {
      onImageReady(img, function () {
        var w = img.naturalWidth, h = img.naturalHeight;
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext('2d', { willReadFrequently: true });
        var data;
        try {
          ctx.drawImage(img, 0, 0);
          data = ctx.getImageData(0, 0, w, h).data;
        } catch (err) {
          img.parentNode.classList.add('team-avatar--on-light');
          return;
        }
        var clear = 0, solid = 0, light = 0;
        for (var i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 128) { clear++; continue; }
          solid++;
          light += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
        }
        if (clear / (w * h) < 0.05) return; // a full picture: no backdrop needed
        img.parentNode.classList.add(solid && light / solid > 0.6 ? 'team-avatar--on-dark' : 'team-avatar--on-light');
      });
    });
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
    var conductPage = document.getElementById('conduct-page');
    // Add a future standalone page here (and to PAGE_ROUTES above) by
    // extending this chain — whichever container is present wins.
    // conduct.html has no nav.id / PAGE_ROUTES entry — it's reachable only
    // by navigating to it directly, on purpose. Unlike the other standalone
    // pages, its content is static HTML in the page itself (not content.js),
    // since it's one-off prose nothing else reuses — this var only drives
    // the page <title> below.
    var currentPage = resourcesPage ? 'resources' : (robotsPage ? 'robots' : (conductPage ? 'conduct' : null));
    var pageTitles = { resources: 'Resources | ', robots: 'Our Robots | ', conduct: 'Code of Conduct | ' };

    document.title = (pageTitles[currentPage] || '') + C.team.name + ' | Team ' + C.team.number;
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
        '<span>' + esc(C.team.email) + '</span>' +
        social +
      '</span>';

    // Carousels/photos apply to whichever page actually rendered content;
    // scroll-spy is index.html-only since it tracks in-page #anchors.
    var contentRoot = main || robotsPage;
    if (contentRoot) {
      var lightbox = createLightbox();
      wirePhotoGrids(contentRoot, lightbox);
      wirePhotoStages(contentRoot, lightbox);
      wireTeamAvatars(contentRoot);
      // The single accent photos beside About/Join's intro text open on
      // their own too.
      contentRoot.querySelectorAll('.section-photo img').forEach(function (img) {
        img.addEventListener('click', function () {
          lightbox.open([{ src: img.currentSrc || img.src, alt: img.alt }], 0);
        });
      });
    }
    if (main) wireScrollSpy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
