// ============================================================
//  WRITING — your essays, insights, journal notes & more.
//  This is where you write. Two things live here:
//
//    1. `styles` — a field guide to the most common writing
//       styles. Each entry explains the style, when to use it,
//       the voice, the structure, and a ready-to-fill template.
//       (You can edit these or leave them as your reference.)
//
//    2. `posts`  — your actual writing. Add a new object to
//       publish it on the site. Collapse the section below to
//       see a cheat-sheet for the block format.
//
//  BLOCK CHEAT-SHEET (the `blocks` array of a post):
//    "some words"          -> paragraph
//    ["h", "Sub heading"]  -> sub-heading
//    ["q", "quote text"]   -> pull-quote
//    ["q", "text", "— who"]-> pull-quote with attribution
//    ["list", [a, b, ...]] -> bullet list
//    ["ol", [a, b, ...]]   -> numbered list
//    ["steps", [a, b, ...]]-> big numbered steps (how-to posts)
//    ["center", "line"]    -> centered call-out (insight takeaway)
//    ["salutation", "Dear reader,"]  -> letter greeting
//    ["sign", "— Alex"]    -> letter sign-off
//    ["st", "A declaration"]-> manifesto-style bold statement
//    ["hr"]                -> a gentle divider
//
//  The seeded posts below are EXAMPLES showing every block type.
//  Delete them and add your own. Full docs in the README.
// ============================================================

export const styles = [
  {
    id: "essay",
    label: "Reflective Essay",
    icon: "✒️",
    tagline: "A careful, personal walk through an idea.",
    when: "When one question keeps tugging at you and you want to think it through in public.",
    voice: "First person, curious, unhurried. Talk to the reader like a thoughtful friend on a long walk. It’s fine to not have an answer yet.",
    structure: ["Hook — a moment or question you can’t shake", "Context — where this idea came from", "Wander — a scene, a story, the half-formed parts", "The turn — what you now believe, what changed", "Landing — one image, line, or wish to leave them with"],
    template: `[Open with a moment or a question you can't shake.]

[Offer context: where this idea came from, why it matters to you.]

[Wander the middle: a scene, a story, the parts you're still unsure about.]

[The turn: what you now believe, and what changed your mind.]

[Land: one image, line or wish to leave the reader with.]`,
  },
  {
    id: "insight",
    label: "Insight / Spark",
    icon: "💡",
    tagline: "One sharp observation, delivered clean.",
    when: "When something clicks and you want to share it in the time it takes to read a text.",
    voice: "Confident, tight, zero filler. Every word carries weight. One idea, one takeaway.",
    structure: ["The observation", "The pattern behind it", "Why it matters", "One-line takeaway (your ‘center’ line)"],
    template: `[Start with the observation — small, specific, true.]

[Zoom out: the pattern this is part of.]

[Why it matters, in one or two sentences.]

["center", "One line that captures the whole idea."]`,
  },
  {
    id: "journal",
    label: "Journal / Diary Note",
    icon: "📔",
    tagline: "A dated note from where you actually are.",
    when: "For ordinary days, small wins, and honest progress — writing to remember later, sharing because it might help someone.",
    voice: "Loose, honest, intimate. Write like no one will judge it. Sentences that don’t have to perform.",
    structure: ["Date + where you are", "What happened", "What it made you feel", "What it left you thinking"],
    template: `[A line about where and when: weather, place, frame of mind.]

[What happened — one small true thing.]

[What it made you feel.]

[What it left you thinking; maybe a question for tomorrow.]`,
  },
  {
    id: "story",
    label: "Narrative / Storytelling",
    icon: "🌄",
    tagline: "Scene-first writing that puts the reader there.",
    when: "When something happened that deserves to be *entered*, not just summarised.",
    voice: "Show, don’t tell. Sensory details, present participles, short verbs. Let the reader feel the cold/heat/rush.",
    structure: ["Opening scene", "Complication", "Escalation", "The turn", "Close on an image or feeling"],
    template: `[Open in the middle of a scene. What's the first thing you notice?]

[The complication — what goes sideways or shifts.]

[Escalation: the stakes quietly rising.]

[The turn: the small moment that changed the meaning.]

[Close on an image or a feeling — not a summary.]`,
  },
  {
    id: "persuasion",
    label: "Argument / Persuasion",
    icon: "⚖️",
    tagline: "Take a side, build the case, keep it fair.",
    when: "When you believe something and want to bring people with you — not just win a point.",
    voice: "Clear thesis up top. Fair to the other side. Confident without ranting. End with stakes, not insults.",
    structure: ["Hook + thesis", "Grounds — the evidence/experience", "Counter & honest rebuttal", "Stakes — what hangs on it", "Call to action"],
    template: `[Hook + thesis: what you believe, stated plainly.]

[Grounds: the experiences or evidence that led you here.]

[The strongest counter-argument, then your honest rebuttal.]

[Stakes: what happens if the other view wins.]

[Call to action: one specific thing the reader could do.]`,
  },
  {
    id: "guide",
    label: "How-to / Guide",
    icon: "🧭",
    tagline: "Teach a process someone can actually follow.",
    when: "For any ‘how do you do the thing?’ you get asked more than once.",
    voice: "Calm, direct, second person (‘you’). Assume the reader is capable but new.",
    structure: ["Why it matters", "Prep — what you need", "Numbered steps", "Pitfalls", "The result, and where to go next"],
    template: `[Why this is worth doing, in two lines.]

[What you need before you start.]

["steps", [
  "Step one — the first concrete action.",
  "Step two — build on it.",
  "Step three — the moment of truth.",
  "Step four — finish and check your work."
]]

[The mistakes everyone makes, so they don't.]

[What 'done' looks like — and one idea for going further.]`,
  },
  {
    id: "listicle",
    label: "Listicle / Quick List",
    icon: "🗒️",
    tagline: "Snappy, scannable, earns its items.",
    when: "When the value is in the enumeration — the round-up, the starter kit, the favourites.",
    voice: "Wry, snappy. Each item needs title + 2–3 real lines. If an item can’t earn its place, cut it.",
    structure: ["Tease — why this list exists", "5–7 numbered items (each with a punchy title)", "A closer that sends them off"],
    template: `[Tease: why this list, why now.]

["ol", [
  "Item one title — two or three lines of real substance.",
  "Item two title — the one everyone argues with.",
  "Item three title — the quiet favourite.",
  ...
]]

[Closer: the one line that sums up the whole list.]`,
  },
  {
    id: "letter",
    label: "Letter / Correspondence",
    icon: "✉️",
    tagline: "Write to one person, let everyone read it.",
    when: "When you have something to say *to* someone — a stranger whose trail tip helped, a future reader, a younger you.",
    voice: "Warm, direct, written in the second person. Have the reader’s face in your mind. One voice, speaking to one person.",
    structure: ["Greeting", "‘Here’s where I write from’", "The main thing", "A question for them", "Sign-off"],
    template: `["salutation", "Dear ____,"]

[Here's where I write from — a line of context/weather/place.]

[The main thing: what you wanted to say.]

[A question for them, or an invitation.]

["sign", "— Alex"]`,
  },
];

// ------------------------------------------------------------
//  POSTS — add new writing right below. Rules to remember:
//   • `style` must match a style id above (essay, insight,
//     journal, story, persuasion, guide, listicle, letter).
//   • `date` is an ISO date string like "2026-10-18".
//   • `blocks` uses the cheat-sheet at the top of this file.
// ------------------------------------------------------------

export const posts = [
  {
    title: "Why I keep a paper map",
    date: "2026-10-18",
    style: "essay",
    excerpt:
      "Everyone I know navigates with a glowing dot. I keep a folded map in my pack, and at some point I had to admit it isn't nostalgia — it's a philosophy.",
    blocks: [
      "The first thing I do when I reach a new range is buy a paper map. Not for the contour lines or the campsite symbols, though those are lovely — I buy it because a paper map can't scroll. It has edges. When you hold it up, the trail you're on is pointing in exactly one direction, and everything you haven't walked yet is a measured distance away, in real inches.",
      "My phone knows where I am to within a meter, always. It tells me the weather I'm standing in. It has hiked every trail I've ever walked and keeps the receipts. And yet on the third day of every trip, the phone goes to airplane mode, and I pull out the map, and I feel the whole world get quieter.",
      ["q", "A map that can get wet, crumple, and still tell you exactly where you are is a map that believes in you.", "— something I should have said aloud at camp"],
      "I think that's the real reason. A paper map doesn't compute — it trusts. It assumes you can read elevation, recognize shapes, hold your thumb on the contour that says *you are here*. The glowing dot does the opposite: it assumes you can't, and it's never wrong, and it never needs you.",
      ["h", "What the map taught me"],
      "At some point I stopped carrying the map for navigation and started carrying it for the speed limit it puts on things. You can't teleport to the summit on paper; you can only see it from every angle — across the valley, back down the switchbacks, over the shoulder of the ridge that hides last year's burn. Knowing where I am is cheap. Having to think about where I am is the whole point.",
      "The dot will probably win in the end. It always does. But I've started noticing how much of modern life is just being told where you are, and I'd like to keep at least one small thing that asks me to look up and figure it out myself.",
      "So: paper maps. Two dollars each. Highly recommended — I'll draw you the route.",
    ],
  },
  {
    title: "The slow-mode principle",
    date: "2026-10-12",
    style: "insight",
    excerpt:
      "Almost every tool we have is optimised for how fast you can put things in. Almost none are optimised for how clearly you can think.",
    blocks: [
      "We optimise every app for input speed — faster keystrokes, faster swipes, fewer seconds between opening and sending. It is the only direction we ever tune. And it produces tools that are wonderful at generating output and terrible at generating thought.",
      "The best creative rooms in my life had a shared unwritten rule: nothing happens quickly in them. The darkroom. The trail. The notebook with the coffee ring. Same hours as the apps, radically different speed limit.",
      ["center", "Speed is for getting things done. Slowness is for knowing what the right thing is."],
      "I don't want tools that are slow for the sake of it. I want tools that know the difference between typing and deciding.",
    ],
  },
  {
    title: "A letter to whoever runs the trail register",
    date: "2026-10-02",
    style: "letter",
    excerpt:
      "There's a locked mailbox of a box at the treeline on the Fern Ridge trail. Someone maintains it. This is for them, and for whoever reads the book inside.",
    blocks: [
      ["salutation", "Dear keeper of the register,"],
      "I'm writing from the picnic table at the Fern Ridge junction, where the book lives in its tin box under the cedar. It's the first day of October, clear, and someone before me drew a small accurate map of how the switchbacks really go. I'd like to say thank you for the pencils you leave in the box, sharper than any pencil deserves to be, and for replacing the book before anyone felt the need to write on the wood.",
      "I don't know your name. The register has taught me a lot about the people on this mountain — who hikes before dawn, who carries their dog, who is out here for the first time and slightly afraid — but you manage to be completely absent from your own book. That's a skill, I think. A kind of care that arranges the furniture and never sits in the chair.",
      "Next time you're checking the pencils, please take a page from the newest book as my thanks. There's one entry near the end, in pencil, about the fog lifting at the summit around nine — that one's yours.",
      ["sign", "— a regular on the ridge"],
    ],
  },
  {
    title: "Rain at the summit",
    date: "2026-09-21",
    style: "story",
    excerpt:
      "Six of us, one weather report we all decided to believe, and a summit we reached in the middle of a cloud.",
    blocks: [
      "The rain started on the ridge, an hour below the top, and it had opinions about us. It came in sideways and took the view away in one move — first the valley, then the shoulder of the mountain, then the next person in line, which was the worst one because we could all still hear each other breathing.",
      "At the summit there is a small stone windbreak and barely room inside it for six shivering climbers and one extremely loyal dog. We huddled like the world's most uncomfortable press conference. No one took a summit photo. Nobody suggested starting down, either.",
      "And then, exactly the way it does in the stories that are too neat to be true, it worked. The cloud frayed at its edges, tore open over the valley, and the light came through in long gold ribbons like somebody had finally found the right lens. We watched it for twelve minutes in a silence you don't get anymore unless you earn it.",
      "The descent was mostly mud and laughter. I don't remember ever so much as checking the map. There was nowhere else, and we all knew it, which I think is the quiet definition of being somewhere you were supposed to be.",
      ["center", "Some of the best views are the ones you almost didn't get."],
    ],
  },
  {
    title: "An argument for the front porch",
    date: "2026-09-08",
    style: "persuasion",
    excerpt:
      "The internet built itself an HOA. I'd like to argue for a few front porches before it's all walls and welcome mats.",
    blocks: [
      "Every platform on the internet is optimised for one thing: keeping you inside its walls long enough to show you more. Feeds are frictionless. Profiles are public. Algorithms decide which of your friends' lives you're allowed to think about. We built a suburb where everything is a fence and nothing is a porch.",
      "Personal websites are the exception, and the exception matters. A personal site isn't optimised for anything. It loads a photo slowly and you stay anyway. It has a guestbook in the literal sense. It points to other people's sites not because an algorithm chose them but because a human likes them. None of this is a feature list; all of it is a temperament.",
      "The honest counter-argument: personal sites are dead ends, and the platforms are *right* — your writing reaches ten thousand people on a feed and roughly four on a blog. I'd accept that if the four readers weren't reading with their whole attention, one essay at a time, from start to end, on purpose.",
      "The stakes are creeping and quiet. Every hour we spend inside walls is an hour the next generation spends learning that walls are the only option. If no one models a different internet, the suburb wins by default.",
      "So start sloppily. A single page, a single essay, one letter published in public. It doesn't need to be beautiful; it needs to be yours. The front porch doesn't ask you to build a house. It asks you to sit outside.",
    ],
  },
];

// ------------------------------------------------------------
//  Derived helpers (computed once so the UI stays cheap)
// ------------------------------------------------------------

const fmt = (iso) => {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const words = (blocks) =>
  (blocks || [])
    .map((b) => (typeof b === "string" ? b : b.length >= 2 && typeof b[1] === "string" ? b[1] : b.length >= 2 && Array.isArray(b[1]) ? b[1].join(" ") : ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

const mins = (n) => Math.max(1, Math.round(n / 225));

export const postCards = posts.map((p) => {
  const style = styles.find((s) => s.id === p.style) || styles[0];
  return {
    ...p,
    styleMeta: style,
    dateLabel: fmt(p.date),
    readMins: mins(words(p.blocks)),
  };
});

export const styleById = (id) => styles.find((s) => s.id === id) || styles[0];