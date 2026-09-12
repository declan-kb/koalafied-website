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
    tagline: "The only school-based FRC team in South Australia.",
    accent: "#0a7770",
    logo: "assets/img/logo.svg",
    email: "teamkoalafied@gmail.com",
    social: [
      { label: "Instagram", href: "https://www.instagram.com/koalafied_6996/" },
      { label: "YouTube", href: "https://www.youtube.com/channel/UCNGR7FG2zscbgj31Bp5toSw" },
      { label: "The Blue Alliance", href: "https://www.thebluealliance.com/team/6996" }
    ]
  },

  nav: [
    { id: "about", label: "About" },
    { id: "sponsors", label: "Sponsors" },
    { id: "join", label: "Join" },
    { id: "gallery", label: "Gallery" },
    { id: "resources", label: "Resources" },
    { id: "binder", label: "2026 Binder", href: "https://2026.teamkoalafied.com" }
  ],

  hero: {
    eyebrow: "Team 6996 · Adelaide, South Australia",
    title: "Koalafied",
    sub: "High school students and mentors designing, building, and programming a competition robot every year since 2018.",
    ctas: [
      { label: "This year's robot", href: "https://2026.teamkoalafied.com", primary: true },
      { label: "Join the team", href: "#join" }
    ],
    image: { src: "assets/img/hero.jpg", alt: "Our robot on the field at a match" }
  },

  about: {
    thesis: "Team Koalafied is a group of Pembroke School students and mentors competing in the FIRST® Robotics Competition since 2018. Every year, students design, build, test, and program a robot from scratch to compete against teams from around the world, meeting several times a week throughout build season. It's hands-on and multi-disciplinary: mechanical build, programming, electrical, CAD, prototyping, woodwork, and media all go into it.",
    photo: { src: "assets/img/gallery-2026-scr-team-photo.jpg", alt: "Team photo with the robot 'Lemon Launcher'" },
    // One card per event, reverse chronological (newest first) — rendered
    // as a horizontal carousel, see renderAbout() in site.js. `sub` is the
    // event's location, shown under the full competition title.
    events: [
      { event: "Melbourne Robotics Tournament 2026", sub: "Melbourne, Australia",
        titles: ["Qual Rank 6", "Excellence in Robot Design", "2nd Place"] },
      { event: "Southern Cross Regional 2026", sub: "Sydney, Australia",
        titles: ["Qual Rank 4", "Excellence in Engineering", "2nd Place", "Qualified for FIRST Championship"] },
      { event: "FIRST Championship: Newton Division 2025", sub: "Houston, USA",
        titles: ["Qual Rank 18"] },
      { event: "Melbourne Robotics Tournament 2025", sub: "Melbourne, Australia",
        titles: ["Qual Rank 4 and 13", "Competed with two robots", "3rd Place"] },
      { event: "Southern Cross Regional 2025", sub: "Sydney, Australia",
        titles: ["Qual Rank 3", "Excellence in Engineering", "2nd Place", "Qualified for FIRST Championship"] }
    ]
  },

  gallery: {
    thesis: "A season in photos.",
    items: [
      { src: "assets/img/gallery-2024-scr-driver-station.jpg", alt: "Two students at the driver station during a match", caption: "Driver station, Southern Cross Regional 2024" },
      { src: "assets/img/gallery-2024-scr-team-photo.jpg", alt: "Team photo with the robot 'Locked In' and awards", caption: "Team photo with 'Locked In'" },
      { src: "assets/img/gallery-2025-champs-waiting.jpg", alt: "Team members in the pit area among many other teams", caption: "Waiting for a match, FIRST Championship 2025" },
      { src: "assets/img/gallery-2025-champs-team-photo.jpg", alt: "Full team photo at the FIRST Championship venue", caption: "Team photo, FIRST Championship 2025" },
      { src: "assets/img/gallery-2026-scr-team-photo.jpg", alt: "Team photo with the robot 'Lemon Launcher'", caption: "Team photo, Southern Cross Regional 2026" }
    ]
  },

  // Text pulled and tightened from the old Google Sites Sponsorship page.
  sponsorship: {
    title: "Our Sponsors",
    thesis: "Robot parts, registration fees and new tools are all paid for by sponsors. Here's what that support actually buys, for the team and for you:",
    points: [
      { title: "Robot budget", desc: "Motors, sensors, controllers, and the raw material to CNC machine custom parts" },
      { title: "Competition & travel", desc: "Registration fees for our regional events and when we qualify, World Championships." },
      { title: "Investing in STEM", desc: "FIRST Robotics alumni are demonstrably more confident in STEM and more likely to pursue engineering." },
      { title: "Visibility", desc: "Your logo is placed on the robot, the team shirts, and this site: seen by thousands of students, teachers, and industry judges at every event." }
    ]
  },

  // One row per sponsor. Two places read this same list: renderSponsorBanner
  // (the quiet logo strip near the top of the page) and  renderSponsors
  // (the fuller tiered "thank you" section further down) groups these by
  // `tier`, ordered by SPONSOR_TIER_ORDER in site.js.
  sponsors: [
    { name: "Gene Haas Foundation", logo: "assets/img/sponsors/gene-haas-foundation.png", tier: "Gold" },
    { name: "South Australia — The Defence State", logo: "assets/img/sponsors/sa-defence-state.png", tier: "Gold" },
    { name: "Pembroke School", logo: "assets/img/sponsors/pembroke.svg", tier: "Platinum" },
    { name: "Australian Institute for Machine Learning", logo: "assets/img/sponsors/AIML.png", tier: "Silver" },
    { name: "REDARC", logo: "assets/img/sponsors/redarc.png", tier: "Silver" },
    { name: "Energy Exemplar", logo: "assets/img/sponsors/energy-exemplar.png", tier: "Silver" },
    { name: "C&J Accountants and Advisors", logo: "assets/img/sponsors/cj-accountants.png", tier: "Platinum" },
    { name: "WHi", logo: "assets/img/sponsors/whi.png", tier: "Gold" },
    { name: "Rockwell Automation", logo: "assets/img/sponsors/rockwell-automation.svg", tier: "Gold" }
  ],

  // Primarily aimed at prospective student members — see renderJoin() in
  // site.js. Copy pulled from the old Google Sites "Join our Team" page.
  join: {
    thesis: "We're currently looking for new students for the 2027 season, starting in January. We're all chill and welcome anyone at all interested in the areas below. No experience required: we teach everything on the team.",
    schedule: "During build season (early January through to our March competition in Sydney) we meet several times per week. The rest of the year we meet less often, to prepare for extra competitions, improve the robot, and pick up new skills.",
    photo: { src: "assets/img/gallery-2024-scr-driver-station.jpg", alt: "Two students at the driver station during a match" },
    areas: [
      { title: "Mechanical", desc: "Assembling robots and fabricating parts on drills, lathes, CNC routers, rivet guns, and more." },
      { title: "Programming", desc: "Writing and fine-tuning robot code, designing autonomous paths." },
      { title: "CAD", desc: "3D-modelling components and full robots before they're built." },
      { title: "Prototyping", desc: "Turning an idea into a working mechanism, fast." },
      { title: "Woodwork", desc: "Producing large field elements for each year's game." },
      { title: "Media", desc: "Filming, editing, photos, and marketing — including this website." },
      { title: "Sponsorships", desc: "Reaching out to local companies to help fund the season." }
    ],
    note: "And winning competitions. No promises."
  },

  // Rendered on its own page (resources.html), not on the index one-pager —
  // see renderResources() in site.js. Links pulled from the old Google
  // Sites Resources page.
  resources: {
    title: "Resources",
    thesis: "We always publish code and CAD from past seasons, in case it helps another team. Questions or comments are welcome: see the email below.",

    code: {
      title: "Code",
      desc: "Team Koalafied programs in C++. Code for every robot we've built is public.",
      href: "https://github.com/TeamKoalafied/public",
      label: "GitHub — TeamKoalafied/public"
    },

    cad: {
      title: "Robot Design & CAD",
      seasons: [
        {
          season: "2026 Rebuilt", robot: "Lemon Launcher",
          links: [
            { label: "Onshape CAD", href: "https://cad.onshape.com/documents/f777e2d9e964fbf60835e3da/w/235a7544344677d127d5777e/e/62d9f4aee1b8ab6f94113ccb" }
          ]
        },
        {
          season: "2025 Reefscape", robot: "Unk",
          links: [
            { label: "Onshape CAD", href: "https://cad.onshape.com/documents/c6aa7cca3688b1b28fb8df62/w/a340963050603817736e33c1/e/c595ba8ef762207db832ccad" }
          ]
        },
        {
          season: "2025 Reefscape", robot: "Locked In",
          links: [
            { label: "Onshape CAD", href: "https://cad.onshape.com/documents/102a531f9f12f2de5a27c2c0/v/ef274877a9ed6af3e292f405/e/23f5a1bc9ff04b58a115f348" }
          ]
        },
        {
          season: "2024 Crescendo", robot: "#10-32",
          links: [
            { label: "Onshape CAD", href: "https://cad.onshape.com/documents/f766febc8e90c6595c502360/v/b26d0f4082e8170b1287d16a/e/600ed28dccf6c49ac9d2fe31" }
          ]
        },
        {
          season: "2023 Charged Up", robot: "Borzoi",
          links: [
            { label: "Onshape CAD (AUSC 2023)", href: "https://cad.onshape.com/documents/cc5eccf3b82e6a0c4a353be1/v/fabf0b2e8591f270ea97c5c4/e/9278ef3a8d123b33cdecc197" },
            { label: "Onshape CAD (MRT 2023)", href: "https://cad.onshape.com/documents/cc5eccf3b82e6a0c4a353be1/w/9fce9eb2fa7de646e453ab5d/e/9278ef3a8d123b33cdecc197" }
          ]
        },
        {
          season: "2022 Rapid React", robot: "Terrance",
          links: [
            { label: "Onshape CAD", href: "https://cad.onshape.com/documents/910e9a18fff81f80b3abc55a/w/8ad7f0ddf213a39ad8e854ea/e/ab8ae5589140f22ccd0b1332" },
            { label: "Design Documentation (PDF)", href: "https://www.chiefdelphi.com/uploads/short-url/mAkm3d8cyBXEPry1zg2KFUno75c.pdf" }
          ]
        }
      ]
    }
  }
};
