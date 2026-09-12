/* ============================================================
   TEAM KOALAFIED — SITE CONTENT
   ------------------------------------------------------------
   This is the only file most people need to touch.
   Plain JSON wrapped in one line of JavaScript so the site works
   when you just double-click index.html (no web server, no build).

   Same content/render split as the technical binder — see
   ../koalafied-design-system/website-style-guide.html "Content pattern".
   ============================================================ */

window.SITE_CONTENT = {

  team: {
    number: "6996",
    name: "Koalafied",
    tagline: "An FRC robotics team building robots, and the people who build them.",
    accent: "#0a7770",
    logo: "assets/img/logo.svg"
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
    eyebrow: "Team 6996",
    title: "Koalafied",
    sub: "We design, build, and compete with a robot every season — and we teach every skill that takes along the way.",
    ctas: [
      { label: "This year's binder →", href: "https://2026.teamkoalafied.com", primary: true },
      { label: "Join the team", href: "#join" }
    ]
  },

  about: {
    thesis: "Started in 2019, Koalafied is a student-run FIRST Robotics Competition team based in Adelaide, South Australia.",
    stats: [
      { stat: "2019", label: "Founded" },
      { stat: "40+", label: "Active students" },
      { stat: "6", label: "Seasons competed" }
    ]
  },

  programs: {
    thesis: "Four sub-teams run in parallel through build season, each open to any student regardless of experience.",
    items: [
      { title: "Mechanical", desc: "Design and machine the robot — CAD, fabrication, assembly." },
      { title: "Electrical", desc: "Wiring, control systems, sensors, pneumatics." },
      { title: "Software", desc: "Robot code, autonomous routines, driver tooling." },
      { title: "Business", desc: "Sponsorship, outreach, media, and this website." }
    ]
  },

  gallery: {
    thesis: "A season in photos.",
    items: [
      { src: "assets/img/gallery-1.svg", alt: "Placeholder — competition photo", caption: "Regional competition, pit area" },
      { src: "assets/img/gallery-2.svg", alt: "Placeholder — build season photo", caption: "Build season, late night" },
      { src: "assets/img/gallery-3.svg", alt: "Placeholder — team photo", caption: "Full team, season kickoff" },
      { src: "assets/img/gallery-4.svg", alt: "Placeholder — robot reveal photo", caption: "Robot reveal" }
    ]
  },

  sponsors: [
    { name: "Gene Haas Foundation", logo: "assets/img/sponsors/gene-haas-foundation.png" },
    { name: "REDARC", logo: "assets/img/sponsors/redarc.png" }
    // Copy the rest of this list straight from ../eh/content.js when ready.
  ],

  join: {
    thesis: "No experience required — we teach everything on the team, from CAD to code to public speaking.",
    roles: [
      { title: "Students", desc: "Open to any high-school student in the region. Sign up at the start of the season." },
      { title: "Mentors", desc: "Engineers, tradespeople, and professionals — a few hours a week during build season." },
      { title: "Sponsors", desc: "Funding, materials, and mentorship keep the team running. See the Sponsors section above." }
    ]
  },

  contact: {
    thesis: "Questions about joining, sponsoring, or this year's robot — reach out.",
    email: "contact@teamkoalafied.com"
  }
};
