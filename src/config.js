// ============================================================
//  PERSONAL SITE — edit EVERYTHING here
//  Change your name, bio, projects, ideas, email and socials
//  in this single file. No need to touch any other component.
// ============================================================

export const profile = {
  // He/She/They — pick a name that sounds like you. Used in hero,
  // nav and mailto greetings.
  name: "Benjamin Kaindu Mushinge",

  // Short title shown under the name in the hero.
  role: "AI & Machine Learning Engineer and Operator",

  // The big hero headline. Use {{name}} to insert your name from above.
  headline: "Hello, I’m {{name}} — I build machine learning systems, operate them in production, and write about what I’m learning along the way.",

  // Short paragraph under the headline.
  tagline:
    "A year into the field, I design, build and run ML systems end to end — from notebook experiments to models serving real traffic. This is where I share the projects, the ideas, and the questions that don’t fit in a README.",

  // Full bio shown in the About section (one array = one paragraph).
  bio: [
    "I’m an AI and Machine Learning Engineer and Operator — about a year into the field and deeply into the part most people skip: taking models out of notebooks and into production, then keeping them healthy once they’re there.",
    "This site is my corner of the internet for the systems I build, the models I operate, and the half-formed ideas I want to explore. If any of it catches your eye — or you think a problem deserves a machine learning solution with a human in the loop — I’d love to hear from you.",
  ],

  // A few “currently” items shown as chips in the About section.
  focus: [
    "Shipping & operating ML systems in production",
    "LLM evaluation, guardrails & reliability",
    "Tuning models under real-world constraints",
    "Writing about life as an ML operator",
  ],

  // Where you call home (used in the About section).
  location: "Arizona, USA",

  // The email your Contact section links to — this is the only
  // address visitors will use to get in touch.
  email: "kaindumushinge@arizona.edu",

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
  { label: "GitHub", icon: "github", url: "https://github.com/BenjaminKaindu-ux" },
  { label: "X", icon: "x", url: "" },
  { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/benjaminkaindu" },
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

export const siteTagline = "ML systems, ideas & notes from the field";