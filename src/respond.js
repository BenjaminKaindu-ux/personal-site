// Shared helper: a "Respond" link that opens the contact page with the
// piece's title pre-filled as the email subject.
export const respondHref = (title) =>
  `#/contact?subject=${encodeURIComponent(`Response: “${title}”`)}`;