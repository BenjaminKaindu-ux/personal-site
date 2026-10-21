import { useMemo, useState } from "react";
import { searchItems, tagCounts } from "../content";
import { useLiveContent } from "../live";
import Icon from "./icons";
import Reveal from "./Reveal";
import { PageHead, Empty, SearchBox, TagFilter, TagList, ReadMeta, SampleBadge, LiveBadge } from "./ui";
import ArticlePage from "./Article";

export default function Notes({ slug }) {
  // If a slug is present this is the note reader view (routed from App).
  if (slug) return <ArticlePage kind="notes" slug={slug} backView="notes" backLabel="All notes" />;

  return <NotesList />;
}

function NotesList() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");
  const { notes } = useLiveContent();

  const allTags = useMemo(() => Object.keys(tagCounts(notes)).sort(), [notes]);
  const items = useMemo(() => {
    let list = searchItems(notes, q);
    if (tag) list = list.filter((n) => n.tags.includes(tag));
    return list;
  }, [q, tag, notes]);

  return (
    <section className="page">
      <div className="container">
        <PageHead
          eyebrow="Learning notes"
          title="Notes to self"
          lede="Practical notes on AI, machine learning, deep learning, Python and the rest — written as I learn, not as an instructor."
        />

        {notes.length > 0 && (
          <div className="toolbar">
            <SearchBox value={q} onChange={setQ} placeholder="Search notes…" label="notes" />
            <TagFilter tags={allTags} active={tag} onSelect={setTag} />
          </div>
        )}

        {items.length > 0 ? (
          <div className="cards-grid">
            {items.map((n, i) => (
              <Reveal as="article" key={n.slug} className="card" delay={(i % 3) * 70}>
                <div className="card-top">
                  <span className="pill pill-sage">Learning note</span>
                  <span className="card-badges">
                    <LiveBadge live={n.live} />
                    <SampleBadge status={n.status} />
                  </span>
                </div>
                <h3 className="card-title">
                  <a href={`#/notes/${n.slug}`}>{n.title}</a>
                </h3>
                <ReadMeta item={n} />
                <p className="card-excerpt">{n.excerpt}</p>
                <TagList tags={n.tags} />
                <div className="card-cta">
                  <a className="text-link" href={`#/notes/${n.slug}`}>
                    Read the note <Icon name="arrowRight" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Empty
            title={notes.length === 0 ? "No learning notes yet" : "Nothing matches that search"}
            lede={
              notes.length === 0
                ? "Notes on PyTorch, Python and the rest will live here — add the first from the Write studio."
                : "Try a different phrase or clear the topic filter."
            }
          />
        )}
      </div>
    </section>
  );
}