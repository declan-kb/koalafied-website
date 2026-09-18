/* ============================================================
   TEAM KOALAFIED — SITE CONTENT
   ------------------------------------------------------------
   This is the only file most people need to touch.
   Plain JSON wrapped in a line of JavaScript
   ============================================================ */

window.SITE_CONTENT = {

  team: {
    number: "6996",
    name: "Team Koalafied",
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
    { id: "robots", label: "Robots" },
    { id: "resources", label: "Resources" },
   // { id: "page3", label: "Page 3"},   // idk if this will work lol (it worked, but no button)
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
    thesis: "Team Koalafied is a group of high school students from Pembroke School and mentors participating in the FIRST® Robotics Competition since 2018 in Adelaide, South Australia. Students design, build, test and program robots to compete from scratch based on each year's unique game challenge. The team currently consists of approximately 20 high school students and mentors, meeting regularly on weekends to build robots and develop skills.",
    photo: { src: "assets/img/gallery-2026-scr-team-photo.jpg", alt: "Team photo with the robot 'Lemon Launcher'" },
    // One card per event, reverse chronological (newest first) — rendered
    // as a horizontal carousel, see renderAbout() in site.js. `sub` is the
    // event's location, shown under the full competition title.
    events: [
      { event: "Melbourne Robotics Tournament 2026", sub: "Melbourne, Australia",
        titles: ["Qualification Rank 6", "Excellence in Robot Design", "2nd Place"] },
      { event: "Southern Cross Regional 2026", sub: "Sydney, Australia",
        titles: ["Qualification Rank 4", "Excellence in Engineering", "2nd Place", "Qualified for FIRST Championship"] },
      { event: "FIRST Championship: Newton Division 2025", sub: "Houston, USA",
        titles: ["Qualification Rank 18"] },
      { event: "Melbourne Robotics Tournament 2025", sub: "Melbourne, Australia",
        titles: ["Qualification Rank 4 and 13", "Competed with two robots", "3rd Place"] },
      { event: "Southern Cross Regional 2025", sub: "Sydney, Australia",
        titles: ["Qualification Rank 3", "Excellence in Engineering", "2nd Place", "Qualified for FIRST Championship"] }
    ]
  },

  gallery: {
    thesis: "A season in photos.",
    items: [
      { src: "assets/img/gallery-2023-scr-driver-station.jpg", alt: "Two students at the driver station during a match", caption: "Driver station, Southern Cross Regional 2023" },
      { src: "assets/img/gallery-2025-scr-team-photo.jpg", alt: "Team photo with the robot 'Locked In' and awards", caption: "Team photo with 'Locked In'" },
      { src: "assets/img/gallery-2025-champs-waiting.jpg", alt: "Team members in the pit area among many other teams", caption: "Waiting for a match, FIRST Championship 2025" },
      { src: "assets/img/gallery-2025-champs-team-photo.jpg", alt: "Full team photo at the FIRST Championship venue", caption: "Team photo, FIRST Championship 2025" },
      { src: "assets/img/gallery-2026-scr-team-photo.jpg", alt: "Team photo with the robot 'Lemon Launcher'", caption: "Team photo, Southern Cross Regional 2026" }
    ]
  },

  // Text pulled and tightened from the old Google Sites Sponsorship page.
  sponsorship: {
    title: "Our 2026 Sponsors",
    thesis: "Robot parts, registration fees and new tools are all paid for by sponsors. Here's what that support actually buys, for the team and for sponsors:",
    points: [
      { title: "Robot budget", desc: "Motors, sensors, controllers, and the raw material to CNC machine custom parts" },
      { title: "Competition & travel", desc: "Registration fees for our regional events and when we qualify, the World Championships." },
      { title: "Investing in STEM", desc: "FIRST Robotics alumni are demonstrably more confident in STEM and more likely to pursue careers in STEM fields." },
      { title: "Visibility", desc: "Sponsor logos are placed on the robot, our team shirts, and this website. Seen by thousands of students, teachers, and professionals at every event, it brings visibility to companies and shows their support and investment in the future of STEM." }
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
    photo: { src: "assets/img/gallery-2023-scr-driver-station.jpg", alt: "Two students at the driver station during a match" },
    areas: [
      { title: "Mechanical", desc: "Assembling robots and fabricating parts on drills, lathes, CNC routers, rivet guns, and more." },
      { title: "Programming", desc: "Writing and fine-tuning robot code, designing autonomous paths." },
      { title: "CAD", desc: "3D-modelling components and full robots before they're built." },
      { title: "Prototyping", desc: "Turning an idea into a working mechanism, fast." },
      { title: "Electrical", desc: "Wiring all of the robots mechanisms, bringing the robot to life." },
      { title: "Woodwork", desc: "Producing large field elements for each year's game." },
      { title: "Media", desc: "Filming, editing, photos, and marketing — including this website." },
      { title: "Sponsorships", desc: "Reaching out to local companies to help fund the season." }
    ],
    note: "And maybe winning competitions. No promises."
  },

  // Rendered on its own page (robots.html), not on the index one-pager —
  // see renderRobots() in site.js. One entry per robot (not per season —
  // 2025 fielded two robots, so it gets two entries). `official` is FIRST-
  // sanctioned events (regionals, Championship); `offseason` is everything
  // else (e.g. the Melbourne Robotics Tournament). Both reuse the same
  // {event, sub, titles} shape as about.events, plus an `alliance` list of
  // the partner teams for that event.
  //
  // `links` is optional — a plain {label, href} list of anywhere else to
  // read more about this robot (CAD, its Blue Alliance team-season page,
  // a tech binder site, design docs, ...). Leave it off, or use an empty
  // array, for a robot with nothing to link to. Blue Alliance team-season
  // URLs look like https://www.thebluealliance.com/team/6996/2026.
  //
  // `aka` is optional — a nickname or alternate name shown under `name`.
  // 
  // 'full' is used for a photo that would appear instead of the cover photo when clicked on. 
  // Should be used when cropping a photo is necessary but having it as a full frame photo is weird

  robots: {
    title: "Our Robots",
    thesis: "Competing since in the FIRST® Robotics Competiton since 2018, Team Koalafied have built a wide range of robots. Designed and built from scratch each year, they complete a unique game objective each year.",
    items: [
      {
        name: "Lemon Launcher",
        season: "2026 REBUILT presented by Haas",
        images: [
          { src: "assets/img/robots/2026/cover.jpg", alt: "Lemon Launcher (V1 spec) shooting fuel during the teleoperated period at the 2026 Southern Cross Regional" },
          { src: "assets/img/robots/2026/shooting1.jpg", alt: "Lemon Launcher (V1 spec) shooting fuel during the autonomous control period at the 2026 Southern Cross Regional" },
          { src: "assets/img/robots/2026/climb.jpg", alt: "Lemon Launcher (V2 spec) performing a climb during the autonomous control period at the 2026 Melbourne Robotics Tournament" },
          { src: "assets/img/robots/2026/starting.jpg", alt: "Lemon Launcher (V1 spec) before a match pictured alongside an alliance partner at the 2026 Southern Cross Regional" }        
        ],
        summary: "Intakes fuel from the ground, shoots fuel with a variable hood turreted shooter and performs a climb to L1 in both auto and teleop.",
        links: [
          { label: "Onshape", href: "https://cad.onshape.com/documents/f777e2d9e964fbf60835e3da/w/235a7544344677d127d5777e/e/62d9f4aee1b8ab6f94113ccb" },
          { label: "TBA", href: "https://www.thebluealliance.com/team/6996/2026" },
          { label: "Tech Binder", href: "https://2026.teamkoalafied.com" }
        ],
        official: [
          { event: "2026 Southern Cross Regional", sub: "Sydney, Australia",
            titles: ["Qualification Rank 4", "Excellence in Engineering Award", "2nd Place", "Qualified for FIRST Championship", "Alliance Captain"],
            alliance: ["Team 6510 — Pymble Pride", "Team 4774 — The Drop Bears", "Team 7583 — Embers"] }
        ],
        offseason: [
          { event: "2026 Melbourne Robotics Tournament", sub: "Melbourne, Australia",
            titles: ["Qualification Rank 6", "Excellence in Robot Design Award", "2nd Place"],
            alliance: ["Team 5584 — IC Robotics", "Team 9991 — Blackburn Burnouts 2"] }
        ]
      },
      {
        name: "Locked In",
        season: "2025 REEFSCAPE presented by Haas",
        images: [
          { src: "assets/img/robots/2025/locked-in.jpg", full: "assets/img/robots/2025/locked-in-full.jpg", alt: "Locked In before a match at the 2025 Southern Cross Regional" },
          { src: "assets/img/robots/2025/cycle.jpg", alt: "Locked In preparing to score at a match at the 2025 Southern Cross Regional" },
          { src: "assets/img/robots/2025/award.jpg", alt: "The team with Locked In receiving the Finalist Award at the 2025 Southern Cross Regional" },
          { src: "assets/img/robots/2025/climb.jpg", alt: "Locked In performing a triple deep climb with alliance partners at the 2025 Southern Cross Regional" },
          { src: "assets/img/robots/2025/score.jpg", alt: "Locked In scoring a coral on Level 4 at the 2025 Southern Cross Regional" }
        ],
        summary: "Retrieves coral from the coral station, scores coral on all levels, and performs a deep climb under the barge.",
        links: [
          { label: "Onshape", href: "https://cad.onshape.com/documents/102a531f9f12f2de5a27c2c0/v/ef274877a9ed6af3e292f405/e/23f5a1bc9ff04b58a115f348" },
          { label: "TBA", href: "https://www.thebluealliance.com/team/6996/2025" }
        ],
        official: [
          { event: "2025 Southern Cross Regional", sub: "Sydney, Australia",
            titles: ["Qualification Rank 3", "Excellence in Engineering Award", "2nd Place", "Qualified for FIRST Championship", "Alliance Captain"],
            alliance: ["Team 7433 — Iona Fusion", "Team 4729 — EMU Robotics"] },
          { event: "2025 FIRST Championship: Newton Division", sub: "Houston, USA",
            titles: ["Qualification Rank 18"], }
        ],
        offseason: [
          { event: "2025 Melbourne Robotics Tournament", sub: "Melbourne, Australia",
            titles: ["Qualification Rank 13", "3rd Place"],
            alliance: ["Team 9976 — Unkoalafied", "Team 9993 — GVC"] }
        ]
      },
      {
        name: "UnKoalafied",
        aka: "Unk",
        season: "2025 REEFSCAPE presented by Haas (Offseason) & 2026 REBUILT presented by Haas (Offseason)",
        images: [
          { src: "assets/img/robots/unk25-26/unk25.jpg", alt: "Unk (2025 spec) before a match at the 2025 Melbourne Robotics Tournament" },
          { src: "assets/img/robots/unk25-26/unk26.jpg", alt: "Unk (2026 spec) defending during a match at the 2025 Melbourne Robotics Tournament" }
        ],
        summary: "Uses fixed-arm coral scorer to score in Level 1, and performs a deep climb in REEFSCAPE. Drivebase only robot for defense and passing fuel to human players in REBUILT.",
        links: [
          { label: "Onshape", href: "https://cad.onshape.com/documents/c6aa7cca3688b1b28fb8df62/w/a340963050603817736e33c1/e/c595ba8ef762207db832ccad" }
        ],
        official: [],
        offseason: [
          { event: "2025 Melbourne Robotics Tournament", sub: "Melbourne, Australia",
            titles: ["Qualification Rank 4", "3rd Place", "Alliance Captain"],
            alliance: ["Team 6996 — Koalafied", "Team 9993 — GVC"] },
          { event: "2026 Melbourne Robotics Tournament", sub: "Melbourne, Australia",
            titles: ["Qualification Rank 7", "5th Place", "Alliance Captain"],
            alliance: ["Team 7128 — XLR8", "Team 7583 — Embers"] }
        ]
      },
      {
        name: "#10-32",
        season: "2024 Crescendo presented by Haas",
        images: [
          { src: "assets/img/robots/2024/10-32.jpg", full: "assets/img/robots/2024/10-32-full.jpg", alt: "#10-32 on the field" }
        ],
        summary: "Picks up notes and fires them into the amp and speaker. Also climbs on the stage and scores in the trap.",
        links: [
          { label: "Onshape", href: "https://cad.onshape.com/documents/f766febc8e90c6595c502360/v/b26d0f4082e8170b1287d16a/e/600ed28dccf6c49ac9d2fe31" },
          { label: "TBA", href: "https://www.thebluealliance.com/team/6996/2024" }
        ],
        official: [
          { event: "2024 Southern Cross Regional", sub: "Sydney, Australia",
            titles: ["Qualification Rank 14", "3rd Place"],
            alliance: ["Team 4788 — Can't Control", "Team 9599 — Colorful Panda"] }
        ],
        offseason: [
          { event: "2024 Melbourne Robotics Tournament", sub: "Melbourne, Australia",
            titles: ["Qualification Rank 3", "2nd Place"],
            alliance: ["Team 5584 — IC Robotics", "Team 9992", "Team 9994"] }
        ]
      },
      {
        name: "Borzoi",
        season: "2023 Charged Up presented by Haas",
        images: [
          { src: "assets/img/robots/2023/borzoi.jpg", full: "assets/img/robots/2023/borzoi-full.jpg", alt: "Borzoi on the field" }
        ],
        summary: "Our first year to utilise swerve-drive, enabling us to move in any direction with incredible speed. Picks up cones and cubes and reaches out 1.5m to place them using an arm.",
        links: [
          { label: "Onshape (AUSC)", href: "https://cad.onshape.com/documents/cc5eccf3b82e6a0c4a353be1/v/fabf0b2e8591f270ea97c5c4/e/9278ef3a8d123b33cdecc197" },
          { label: "Onshape (MRT)", href: "https://cad.onshape.com/documents/cc5eccf3b82e6a0c4a353be1/w/9fce9eb2fa7de646e453ab5d/e/9278ef3a8d123b33cdecc197" },
          { label: "TBA", href: "https://www.thebluealliance.com/team/6996/2023" }
        ],
        official: [
          { event: "2023 Southern Cross Regional", sub: "Wollongong, Australia",
            titles: ["Qualification Rank 6", "Quality Award", "3rd Place", "Alliance Captain"],
            alliance: ["Team 4774 — The Drop Bears", "Team 7583 — Embers"] }
        ],
        offseason: [
          { event: "2023 Melbourne Robotics Tournament", sub: "Melbourne, Australia",
            titles: ["Qualification Rank 1", "1st Place", "Alliance Captain"],
            alliance: ["Team 6508 — Hastings Heroes", "Team 5876 — ARTEMIS", "Team 5648 — Melbourne Robocats"] }
        ]
      },
      {
        name: "Terrance",
        season: "2022 Rapid React presented by Boeing",
        images: [
          { src: "assets/img/robots/2022/terrance.jpg", full: "assets/img/robots/2022/terrance-full.jpg", alt: "Terrance on the field" }
        ],
        summary: "Shoots basketball sized balls picked up from the ground with a variable hood turret.",
        links: [
          { label: "Onshape", href: "https://cad.onshape.com/documents/910e9a18fff81f80b3abc55a/w/8ad7f0ddf213a39ad8e854ea/e/ab8ae5589140f22ccd0b1332" },
          { label: "Design Doc (PDF)", href: "https://www.chiefdelphi.com/uploads/short-url/mAkm3d8cyBXEPry1zg2KFUno75c.pdf" },
          { label: "TBA", href: "https://www.thebluealliance.com/team/9996/2022" }
        ],
        offseason: [
          { event: "2022 Melbourne Robotics Tournament", sub: "Melbourne, Australia",
            titles: ["Qualification Rank 16", "1st Place"],
            alliance: ["Team 4613 — Barker Redbacks", "Team 6508 — Hastings Heroes", "Team 9993"] }
        ]
      },
      {
        name: "Bob",
        season: "2020/2021 Infinite Recharge",
        images: [
          { src: "assets/img/robots/2020-21/bob.jpg", alt: "Bob on the field" }
        ],
        summary: "Shoots a volley of 6 dodgeballs collected from the ground with automatic targeting, and hangs from a balancing beam.",
        links: [
          { label: "TBA", href: "https://www.thebluealliance.com/team/6996/2021" }
        ],
        offseason: [
          { event: "2021 Unofficial South Pacific Regional", sub: "Sydney, Australia",
            titles: ["Qualification Rank 2", "2nd Place"],
            alliance: ["Team 6579 — Komplete Kaos Inc", "Team 5564 — GRANBOTS", "Team 6575 — Tempe T-Rex"] }
        ]
      },
      {
        name: "Poltergust 3000",
        aka: "CJ",
        season: "2019 Destination: Deep Space presented by Boeing",
        images: [
          { src: "assets/img/robots/2019/poltergust-3000.jpg", alt: "Poltergust 3000 on the field" }
        ],
        summary: "Picks up panels with suction and places them 2m high with a telescoping arm.",
        links: [
          { label: "TBA", href: "https://www.thebluealliance.com/team/6996/2019" }
        ],
        official: [
          { event: "2019 Southern Cross Regional", sub: "Sydney, Australia",
            titles: ["Qualification Rank 19"] },
          { event: "2019 South Pacific Regional", sub: "Sydney, Australia",
            titles: ["Qualification Rank 37", "Tied 4th Place", "Creativity Award"],
            alliance: ["Team 4614 — Purple Monkey Diswasher", "Team 4270 — Crusaders"] }
        ]
      },
      {
        name: "Buzz",
        season: "2018 Power Up",
        images: [
          { src: "assets/img/robots/2018/buzz.jpg", alt: "Buzz on the field" }
        ],
        summary: "Picks up crates and stacks them 2m high using a fork-lift style mechanism.",
        links: [
          { label: "TBA", href: "https://www.thebluealliance.com/team/6996/2018" }
        ],
        official: [
          { event: "2018 Southern Cross Regional", sub: "Sydney, Australia",
            titles: ["Qualification Rank 15", "Rookie All Star Award", "FIRST Dean's List Finalist Award", "2nd Place","Qualified for FIRST Championship"], 
            alliance: ["Team 6508 — Hastings Heroes", "Team 4774 — The Drop Bears"] },
          { event: "2018 FIRST Championship: Roebling Division", sub: "Houston, USA",
            titles: ["Qualification Rank 30", "5th Place"], 
            alliance: ["Team 6072 — Triton Tech 6072", "Team 6106 — PrepaTeec - TecGear", "Team 6390 — Hephaestus"] }
          ]
      }
    ]
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
            { label: "Onshape", href: "https://cad.onshape.com/documents/f777e2d9e964fbf60835e3da/w/235a7544344677d127d5777e/e/62d9f4aee1b8ab6f94113ccb" }
          ]
        },
        {
          season: "2025 Reefscape", robot: "Unk",
          links: [
            { label: "Onshape", href: "https://cad.onshape.com/documents/c6aa7cca3688b1b28fb8df62/w/a340963050603817736e33c1/e/c595ba8ef762207db832ccad" }
          ]
        },
        {
          season: "2025 Reefscape", robot: "Locked In",
          links: [
            { label: "Onshape", href: "https://cad.onshape.com/documents/102a531f9f12f2de5a27c2c0/v/ef274877a9ed6af3e292f405/e/23f5a1bc9ff04b58a115f348" }
          ]
        },
        {
          season: "2024 Crescendo", robot: "#10-32",
          links: [
            { label: "Onshape", href: "https://cad.onshape.com/documents/f766febc8e90c6595c502360/v/b26d0f4082e8170b1287d16a/e/600ed28dccf6c49ac9d2fe31" }
          ]
        },
        {
          season: "2023 Charged Up", robot: "Borzoi",
          links: [
            { label: "Onshape (AUSC)", href: "https://cad.onshape.com/documents/cc5eccf3b82e6a0c4a353be1/v/fabf0b2e8591f270ea97c5c4/e/9278ef3a8d123b33cdecc197" },
            { label: "Onshape (MRT)", href: "https://cad.onshape.com/documents/cc5eccf3b82e6a0c4a353be1/w/9fce9eb2fa7de646e453ab5d/e/9278ef3a8d123b33cdecc197" }
          ]
        },
        {
          season: "2022 Rapid React", robot: "Terrance",
          links: [
            { label: "Onshape", href: "https://cad.onshape.com/documents/910e9a18fff81f80b3abc55a/w/8ad7f0ddf213a39ad8e854ea/e/ab8ae5589140f22ccd0b1332" },
            { label: "Design Doc (PDF)", href: "https://www.chiefdelphi.com/uploads/short-url/mAkm3d8cyBXEPry1zg2KFUno75c.pdf" }
          ]
        }
      ]
    }
  }
}
