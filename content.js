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
    { id: "resources", label: "Resources" }
  ],

  hero: {
    eyebrow: "Team 6996 · Adelaide, South Australia",
    title: "Koalafied",
    sub: "High school students and mentors designing, building, and programming a competition robot every year — since 2018.",
    ctas: [
      { label: "This year's binder →", href: "https://2026.teamkoalafied.com", primary: true },
      { label: "Join the team", href: "#join" }
    ],
    image: { src: "assets/img/hero.jpg", alt: "Robot 6996 on the field at a match, with a packed crowd behind the barrier" }
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
      { src: "assets/img/gallery-2024-scr-driver-station.jpg", alt: "Two students at the driver station during a match", caption: "Driver station, Southern Cross Regional 2024" },
      { src: "assets/img/gallery-2024-scr-team-photo.jpg", alt: "Team photo with the robot 'Locked In' and awards", caption: "Team photo with 'Locked In'" },
      { src: "assets/img/gallery-2025-champs-waiting.jpg", alt: "Team members in the pit area among many other teams", caption: "Waiting for a match, FIRST Championship 2025" },
      { src: "assets/img/gallery-2025-champs-team-photo.jpg", alt: "Full team photo at the FIRST Championship venue", caption: "Team photo, FIRST Championship 2025" },
      { src: "assets/img/gallery-2026-scr-team-photo.jpg", alt: "Team photo with the robot 'Lemon Launcher'", caption: "Team photo, Southern Cross Regional 2026" }
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
    { name: "WHi", logo: "assets/img/sponsors/whi.png" },
    { name: "Rockwell Automation", logo: "assets/img/sponsors/rockwell-automation.svg" }
  ],

  join: {
    thesis: "We're all chill and always welcome new members interested in any of the areas above — no experience required, we teach everything on the team.",
    roles: [
      { title: "Students", desc: "Open to any Pembroke School student. We meet weekends during build season, early January through March." },
      { title: "Mentors", desc: "Engineers, tradespeople, and parents — a few hours a week during build season, more around competitions." },
      { title: "Sponsors", desc: "Funding and materials keep the team running — see Sponsorship above, or email us below." }
    ]
  },

  // Rendered on its own page (resources.html), not on the index one-pager —
  // see renderResources() in site.js. Links pulled from the old Google
  // Sites Resources page.
  resources: {
    eyebrow: "Open source",
    title: "Resources",
    thesis: "In the spirit of FRC, we publish what we build — code and CAD from past seasons, in case it helps another team. Questions or comments are welcome — see the email below.",

    code: {
      title: "Code",
      desc: "Team Koalafied programs in C++. Code for every robot we've built is public.",
      href: "https://github.com/TeamKoalafied/public",
      label: "GitHub — TeamKoalafied/public"
    },

    cad: {
      title: "Robot Design & CAD",
      desc: "Since 2022, every robot has been fully modelled in Onshape before it's built.",
      image: { src: "assets/img/cad-lemon-launcher.webp", alt: "Full CAD assembly of Lemon Launcher, the 2026 robot", caption: "Lemon Launcher (2026) — full assembly, as modelled in Onshape" },
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
            { label: "Onshape CAD (Final / MRT 2023)", href: "https://cad.onshape.com/documents/cc5eccf3b82e6a0c4a353be1/w/9fce9eb2fa7de646e453ab5d/e/9278ef3a8d123b33cdecc197" }
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
