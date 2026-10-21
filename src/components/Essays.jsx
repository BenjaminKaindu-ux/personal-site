import { useMemo, useState } from "react";
import { searchItems, tagCounts } from "../content";
import { styleById } from "../styles";
import { useLiveContent } from "../live";
import Icon from "./icons";
import Reveal from "./Reveal";
import { respondHref } from "../respond";
import { PageHead, Empty, SearchBox, TagFilter, TagList, ReadMeta, SampleBadge, LiveBadge } from "./ui";

export default function Essays() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");
  const { essays } = useLiveContent();

  const allTags = useMemo(() => Object.keys(tagCounts(essays)).sort(), [essays]);
  const items = useMemo(() => {
    let list = searchItems(essays, q);
    if (tag) list = list.filter((e) => e.tags.includes(tag));
    return list;
  }, [q, tag, essays]);

  return (
    <section className="page">
      <div className="container">
        <PageHead
          eyebrow="Essays"
          title="Longer thoughts, written slowly"
          lede="Essays are the deep end of the garden. Each one comes with a date, tags, and a way to answer back."
        />

        {essays.length > 0 && (
          <div className="toolbar">
            <SearchBox value={q} onChange={setQ} placeholder="Search essays…" label="essays" />
            <TagFilter tags={allTags} active={tag} onSelect={setTag} />
          </div>
        )}

        {items.length > 0 ? (
          <div className="cards-grid">
            {items.map((e, i) => {
              const style = styleById(e.style);
              return (
                <Reveal as="article" key={e.slug} className="card" delay={(i % 3) * 70}>
                  <div className="card-top">
                    <span className="pill">{style.icon} {style.label}</span>
                    <span className="card-badges">
                      <LiveBadge live={e.live} />
                      <SampleBadge status={e.status} />
                    </span>
                  </div>
                  <h3 className="card-title">
                    <a href={`#/essays/${e.slug}`}>{e.title}</a>
                  </h3>
                  <ReadMeta item={e} />
                  <p className="card-excerpt">{e.excerpt}</p>
                  <TagList tags={e.tags} />
                  <div className="card-cta">
                    <a className="text-link" href={`#/essays/${e.slug}`}>
                      Read <Icon name="arrowRight" />
                    </a>
                    <a className="text-link muted" href={respondHref(e.title)}>
                      <Icon name="reply" /> Respond
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <Empty
            title={essays.length === 0 ? "No essays yet" : "Nothing matches that search"}
            lede={
              essays.length === 0
                ? "Write your first essay from the Write studio (local dev server) and it will appear here."
                : "Try a different phrase or clear the topic filter."
            }
          />
        )}
      </div>
    </section>
  );
}