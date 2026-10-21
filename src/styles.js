// ============================================================
//  WRITING STYLES — a field guide used by the Writing Studio.
//  Tap into it while composing to match your essay to a style.
// ============================================================

export const writingStyles = [
  {
    id: "essay",
    label: "Reflective Essay",
    tagline: "A careful, personal walk through one idea or question.",
    when: "When one question keeps tugging at you and you want to think it through in public.",
    voice: "First person, curious, unhurried. Talk to the reader like a thoughtful friend on a long walk. It’s fine to not have an answer yet.",
    structure: ["Hook", "Context", "Wandering middle", "The turn", "Landing"],
    outline: `Write a moment or question you can't shake.
Add context — where the idea came from.
Wander — a scene, a story, the half-formed parts.
The turn — what you now believe, what changed.
Land — one image, line, or wish to leave them with.`,
  },
  {
    id: "insight",
    label: "Insight / Spark",
    tagline: "One sharp observation, delivered clean.",
    when: "When something clicks and you want to share it in the time it takes to read a text.",
    voice: "Confident, tight, zero filler. One idea, one takeaway.",
    structure: ["Observation", "Pattern", "Why it matters", "Takeaway"],
    outline: `Start with the observation — small, specific, true.
Zoom out to the pattern it belongs to.
Why it matters, in one or two sentences.
End on the one line that captures the whole thing.`,
  },
  {
    id: "note",
    label: "Journal / Diary Note",
    tagline: "A dated note from where you actually are.",
    when: "For ordinary days, small wins, and honest progress — writing to remember later, sharing because it might help someone.",
    voice: "Loose, honest, intimate. Write like no one will judge it.",
    structure: ["Date + place", "What happened", "How it felt", "What it left thinking"],
    outline: `Open with where and when — weather, place, frame of mind.
What happened — one small true thing.
What it made you feel.
What it left you thinking; maybe a question for tomorrow.`,
  },
  {
    id: "story",
    label: "Narrative / Storytelling",
    tagline: "Scene-first writing that puts the reader there.",
    when: "When something happened that deserves to be entered, not just summarised.",
    voice: "Show, don’t tell. Sensory details, short verbs, present participles.",
    structure: ["Opening scene", "Complication", "Escalation", "The turn", "Close on an image"],
    outline: `Open in the middle of a scene.
The complication — what goes sideways.
Stakes rising quietly.
The turn: the small moment that changed the meaning.
Close on an image or feeling, not a summary.`,
  },
  {
    id: "argument",
    label: "Argument / Persuasion",
    tagline: "Take a side, build the case, keep it fair.",
    when: "When you believe something and want to bring people with you.",
    voice: "Clear thesis up top. Fair to the other side. Confident without ranting.",
    structure: ["Thesis", "Grounds", "Counter & rebuttal", "Stakes", "Call to action"],
    outline: `State what you believe, plainly.
Give the experiences or evidence that led you there.
Name the strongest counter-argument, then rebut it honestly.
What hangs on this? What happens if the other view wins?
One specific thing the reader could do.`,
  },
  {
    id: "guide",
    label: "How-to / Guide",
    tagline: "Teach a process someone can actually follow.",
    when: "For any question you get asked more than once — how do you do the thing?",
    voice: "Calm, direct, second person. Assume the reader is capable but new.",
    structure: ["Why it matters", "Prep", "Numbered steps", "Pitfalls", "Result"],
    outline: `Why this is worth doing, in two lines.
What you need before you start.
Numbered steps — each one concrete.
The mistakes everyone makes.
What 'done' looks like, and where to go next.`,
  },
  {
    id: "listicle",
    label: "Listicle / Quick List",
    tagline: "Snappy, scannable, every item earns its place.",
    when: "When the value is in the enumeration — round-ups, starter kits, favourites.",
    voice: "Wry, snappy. Each item needs a title plus two or three real lines.",
    structure: ["Tease", "5–7 items", "Closer"],
    outline: `Why this list exists.
Five to seven items, each with a punchy title and substance.
A closer that sums the whole list in one line.`,
  },
  {
    id: "letter",
    label: "Letter / Correspondence",
    tagline: "Write to one person, let everyone read it.",
    when: "When you have something to say to someone — a stranger, a future reader, a younger you.",
    voice: "Warm, direct, second person. Picture the reader.",
    structure: ["Greeting", "Where I write from", "The main thing", "A question", "Sign-off"],
    outline: `Greet one person.
Say where you're writing from — weather, place, frame of mind.
Say the main thing.
Ask them a question or make an invitation.
Sign off.`,
  },
];

export const styleById = (id) => writingStyles.find((s) => s.id === id) || writingStyles[0];

// The set a visitor can filter an essay collection by.
export const essayStyleLabels = Object.fromEntries(writingStyles.map((s) => [s.id, s.label]));