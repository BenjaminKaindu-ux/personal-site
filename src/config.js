// ============================================================
//  PERSONAL SITE — edit EVERYTHING here
//  Change your name, bio, projects, ideas, email and socials
//  in this single file. No need to touch any other component.
// ============================================================

export const profile = {
  // He/She/They — pick a name that sounds like you. Used in hero,
  // nav and mailto greetings.
  name: "Alex Morgan",

  // Short title shown under the name in the hero.
  role: "Builder, tinkerer & curious human",

  // The big hero headline. Use {{name}} to insert your name from above.
  headline: "Hello, I’m {{name}} — I build things, think out loud, and love a good long walk in the hills.",

  // Short paragraph under the headline.
  tagline:
    "I make software, tools and small experiments, and I write about the ideas behind them. Pull up a chair — there’s always room for one more conversation.",

  // Full bio shown in the About section (one array = one paragraph).
  bio: [
    "I’m a developer and general-purpose idea enthusiast based near the mountains. By day I build web tools that help people get things done; by night I’m usually sketching prototypes, photographing the forest, or reading about trails I definitely plan to hike.",
    "This site is my little corner of the internet — a place for the projects I’m proud of, the half-formed thoughts and ideas I want to explore, and the people I’d love to hear from. If anything here sparks something, reach out.",
  ],

  // A few “currently” items shown as chips in the About section.
  focus: [
    "Building an open-source hiking log",
    "Learning Rust (slowly)",
    "Photographing the autumn forest",
    "Writing about slow software",
  ],

  // Where you call home (used in the About section).
  location: "Somewhere with tall trees",

  // The email your Contact section links to — this is the only
  // address visitors will use to get in touch.
  email: "hello@alexmorgan.dev",

  // Optional short email subject if you want something custom.
  emailSubject: "Hello from your website",

  // Optional résumé / CV link. Set to "" to hide the button.
  resumeUrl: "",
};

// ------------------------------------------------------------
//  PROJECTS — each item becomes a card in the Projects section.
//  Title, one or two line description, tags, and an optional
//  link. Set featured: true for the first card.
// ------------------------------------------------------------
export const projects = [
  {
    title: "TrailLog",
    description:
      "An open-source hiking log that maps your wanderings, keeps photos and notes per trail, and turns your history into gentle little stats.",
    tags: ["React", "Node", "SQLite"],
    url: "https://github.com/yourname/traillog",
    icon: "🥾",
    featured: true,
  },
  {
    title: "SlowReader",
    description:
      "A reading app that strips away the noise — every article becomes clean, calm typography you actually finish.",
    tags: ["Vite", "Local-first"],
    url: "",
    icon: "📖",
  },
  {
    title: "Night Photo Booth",
    description:
      "A tiny web tool for the exposure math behind long-exposure night shots. Built while chasing auroras that never showed.",
    tags: ["JavaScript", "Canvas"],
    url: "",
    icon: "🌙",
  },
  {
    title: "Front Porch",
    description:
      "A digital guestbook for my site — visitors leave a note, a question, or a trail tip. The reason the Ideas section exists.",
    tags: ["Static", "Serverless"],
    url: "",
    icon: "🌿",
  },
];

// ------------------------------------------------------------
//  IDEAS — thoughts, half-formed ideas and writing prompts.
//  Each card gets a “Discuss this” link that opens an email to
//  you with the idea as the subject — an easy way for visitors
//  to respond without a backend or forms.
// ------------------------------------------------------------
export const ideas = [
  {
    title: "Software should have a slow mode",
    description:
      "A lot of tools are optimised for speed of input and nothing else. What would an app look like that deliberately slows you down — in the nicest way?",
    status: "Thinking out loud",
  },
  {
    title: "A trail map that forgets places",
    description:
      "Most maps remember everything. What if a hiking map slowly faded the places you haven’t visited in years, and made the ones you love feel closer?",
    status: "Draft",
  },
  {
    title: "Postcards, but digital and honest",
    description:
      "We send photos every day and almost never hear back. What if a tiny service emailed you a ‘postcard’ from friends — once a month, no likes, no streaks?",
    status: "Questioning",
  },
  {
    title: "The internet’s best idea yet: front yards",
    description:
      "Personal sites are the closest thing the web has to a front porch. This site is my attempt to keep that tradition alive — and I’d love yours. Link me!",
    status: "Open thread",
  },
];

// ------------------------------------------------------------
//  SOCIALS — shown in the Contact section and nav. The `icon`
//  key must match an icon in src/components/icons.jsx:
//  github | x | linkedin | mail | rss
//  Set url to "" to hide an entry.
// ------------------------------------------------------------
export const socials = [
  { label: "GitHub", icon: "github", url: "https://github.com/yourname" },
  { label: "X", icon: "x", url: "https://x.com/yourname" },
  { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/yourname" },
  { label: "RSS", icon: "rss", url: "" },
];

// ------------------------------------------------------------
//  VISUALS
//  Pick which nature photo is the site background. All images
//  live in /public/images and are bundled with the build:
//    nature-mountains.jpg   foggy mountain ridge at sunrise
//    nature-main.jpg        Yosemite valley river
//    nature-forest.jpg      sunlit green forest
//    nature-field.jpg       golden field at sunset
//  Drop any new JPG/WebP you like into /public/images and point
//  backgroundImage at it (e.g. "/images/my-photo.jpg").
// ------------------------------------------------------------
export const backgroundImage = "/images/nature-mountains.jpg";

// Photo credit shown in the footer (Unsplash license is free to use —
// attribution is optional but appreciated).
export const photoCredit = {
  photographer: "Timur Garifov",
  site: "unsplash.com",
};

export const siteTagline = "Projects, ideas & a front porch on the internet";