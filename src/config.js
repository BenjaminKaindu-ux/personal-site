// ============================================================
//  SITE CONFIG — the single file for everything personal.
//  Edit your name, bio, emails, and social links here.
//  All real content (essays, ideas, notes, projects) lives in
//  `content/` as Markdown files — see the README.
// ============================================================

export const profile = {
  // Preferred name and full name used across the site.
  firstName: "Benjamin",
  name: "Benjamin Kaindu Mushinge",

  // Short title shown under the name.
  role: "AI & Machine Learning Engineer and Operator",

  // Hero headline / short intro.
  intro:
    "I’m Benjamin — an AI & ML engineer who likes building, operating, and understanding machine learning systems, and writing honestly about the process.",

  // One line sub-heading under the intro.
  summary:
    "An idea garden for my essays, experiments, learning notes, and work in progress. Everything here is a draft, including me.",

  // Where you are (change if this is wrong).
  location: "Arizona, USA",

  // Emails — primary is the main contact; secondary is shown too.
  email: {
    primary: "kaindumushinge@arizona.edu",
    secondary: "kaindumushinge949@gmail.com",
  },

  // Connection to the University of Arizona, stated without any
  // guess about major, year, or academic status.
  affiliation: "Connected to the University of Arizona community.",

  // Statement about what the site is — shown in the footer.
  tagline: "Essays, ideas & learning notes from the field.",

  // Optional résumé / CV link. Set to "" to hide the button.
  resumeUrl: "",
};

// ------------------------------------------------------------
//  LEARNING BACKGROUND — real facts only. Edit freely.
// ------------------------------------------------------------
export const learning = {
  courses: [
    {
      what: "Kaggle — Intro to Machine Learning",
      detail: "Completed the introductory ML course.",
    },
    {
      what: "Kaggle — Python",
      detail: "Completed the Python course.",
    },
    {
      what: "NVIDIA — Fundamentals of Deep Learning (PyTorch)",
      detail: "Completed the deep learning fundamentals course with PyTorch.",
    },
  ],
  currently: [
    "Python",
    "Data structures & algorithms",
    "Neural networks & PyTorch",
    "Transformers",
  ],
  exploring: [
    "Building AI agents",
    "LangGraph",
    "Followed discussions of a University of Arizona deep learning course",
  ],
};

// ------------------------------------------------------------
//  VISITOR RESPONSES — the email address the “Respond” links
//  point to (with the essay title pre-filled as the subject).
//  No forms, no backend — just email.
// ------------------------------------------------------------

// ------------------------------------------------------------
//  SOCIALS — shown in the Contact page and footer. The `icon`
//  key must match an icon in src/components/icons.jsx:
//  github | linkedin | huggingface | kaggle | x | mail
// ------------------------------------------------------------
export const socials = [
  { label: "GitHub", icon: "github", url: "https://github.com/BenjaminKaindu-ux" },
  { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/kaindu-mushinge-b6829b379/" },
  { label: "Hugging Face", icon: "huggingface", url: "https://huggingface.co/BenjaminKaindu0506" },
  { label: "Kaggle", icon: "kaggle", url: "https://www.kaggle.com/benjaminkaindu" },
];

// ------------------------------------------------------------
//  VISUALS
//  All nature photos live locally in /public/images and are
//  bundled with the build:
//    nature-mountains.jpg   foggy mountain ridge at sunrise
//    nature-main.jpg        valley river at dusk
//    nature-forest.jpg      sunlit green forest
//    nature-field.jpg       golden field at sunset
//  Point heroImage at any image in public/ ("" disables it).
// ------------------------------------------------------------
export const heroImage = "/images/nature-main.jpg";

export const photoCredit = {
  photographer: "Benjamin Suter",
  site: "unsplash.com",
};