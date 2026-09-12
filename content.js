/* ============================================================
   TEAM KOALAFIED — SITE CONTENT
   ------------------------------------------------------------
   This is the only file most people need to touch.
   Plain JSON wrapped in one line of JavaScript so the site works
   when you just double-click index.html (no web server, no build).

   Copy pulled and tightened from the previous Google Sites page
   (sites.google.com/view/team-koalafied) — facts checked against
   its Home, Team History, Sponsorship and Join our Team pages.

   Same content/render split as the technical binder — see
   ../koalafied-design-system/website-style-guide.html "Content pattern".
   ============================================================ */

window.SITE_CONTENT = {

  team: {
    number: "6996",
    name: "Koalafied",
    tagline: "The only school-based FRC team in South Australia.",
    accent: "#0a7770",
    logo: "assets/img/logo.svg",
    email: "teamkoalafied@gmail.com",
    social: [
      { label: "Instagram", href: "https://www.instagram.com/koalafied_6996/" },
      { label: "Facebook", href: "https://www.facebook.com/koalafied6996/" },
      { label: "YouTube", href: "https://www.youtube.com/channel/UCNGR7FG2zscbgj31Bp5toSw" }
    ]
  },

  nav: [
    { id: "about", label: "About" },
    { id: "programs", label: "Programs" },
    { id: "gallery", label: "Gallery" },
    { id: "sponsors", label: "Sponsors" },
    { id: "join", label: "Join" },
    { id: "contact", label: "Contact" }
  ],

  hero: {
    eyebrow: "Team 6996 · Adelaide, South Australia",
    title: "Koalafied",
    sub: "High school students and mentors designing, building, and programming a competition robot every year — since 2018.",
    ctas: [
      { label: "This year's binder →", href: "https://2026.teamkoalafied.com", primary: true },
      { label: "Join the team", href: "#join" }
    ]
  },

  about: {
    thesis: "Team Koalafied is a group of Pembroke School students and mentors competing in the FIRST® Robotics Competition since 2018. Every year, students design, build, test, and program a robot from scratch to compete against teams from around the world — meeting on weekends throughout build season.",
    stats: [
      { stat: "2018", label: "Founded" },
      { stat: "~20", label: "Students and mentors" },
      { stat: "2026", label: "FIRST Championship qualifier" }
    ]
  },

  programs: {
    thesis: "Every student picks up several of these over a season — no prior experience in any of them is expected.",
    items: [
      { title: "Mechanical", desc: "Assembling the robot and fabricating parts on drills, lathes, and CNC routers." },
      { title: "Programming", desc: "Writing and fine-tuning robot code, designing autonomous paths." },
      { title: "CAD", desc: "3D-modelling components and full robot assemblies before they're built." },
      { title: "Prototyping", desc: "Turning an idea into a working mechanism, fast." },
      { title: "Media", desc: "Photos, video, and marketing — including this website." },
      { title: "Sponsorships", desc: "Reaching out to local companies to help fund the season." }
    ]
  },

  gallery: {
    thesis: "A season in photos.",
    items: [
      { src: "assets/img/gallery-1.svg", alt: "Placeholder — competition photo", caption: "Pit area, Southern Cross Regional" },
      { src: "assets/img/gallery-2.svg", alt: "Placeholder — build season photo", caption: "Build season, late night" },
      { src: "assets/img/gallery-3.svg", alt: "Placeholder — team photo", caption: "Drive team before a match" },
      { src: "assets/img/gallery-4.svg", alt: "Placeholder — robot reveal photo", caption: "On the field, FIRST Championship" }
    ]
  },

  sponsors: [
    { name: "Gene Haas Foundation", logo: "assets/img/sponsors/gene-haas-foundation.png" },
    { name: "South Australia — The Defence State", logo: "assets/img/sponsors/sa-defence-state.png" },
    { name: "Pembroke School", logo: "assets/img/sponsors/pembroke.svg" },
    { name: "Australian Institute for Machine Learning", logo: "assets/img/sponsors/AIML.png" },
    { name: "REDARC", logo: "assets/img/sponsors/redarc.png" },
    { name: "Energy Exemplar", logo: "assets/img/sponsors/energy-exemplar.png" },
    { name: "C&J Accountants and Advisors", logo: "assets/img/sponsors/cj-accountants.png" },
    { name: "WHi", logo: "assets/img/sponsors/whi.png" }
  ],

  join: {
    thesis: "We're all chill and always welcome new members interested in any of the areas above — no experience required, we teach everything on the team.",
    roles: [
      { title: "Students", desc: "Open to any Pembroke School student. We meet weekends during build season, early January through March." },
      { title: "Mentors", desc: "Engineers, tradespeople, and parents — a few hours a week during build season, more around competitions." },
      { title: "Sponsors", desc: "Funding and materials keep the team running — see Sponsorship above, or get in touch below." }
    ]
  },

  contact: {
    thesis: "Questions about joining, sponsoring, or this year's robot — get in touch.",
    email: "teamkoalafied@gmail.com"
  }
};
