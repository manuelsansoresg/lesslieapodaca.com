import { copy } from "@/lib/copy";
import { site } from "@/lib/content";
export function Press() {
  return (
    <section
      className="press-section section-wrap section-space"
      aria-labelledby="prensa-title"
    >
      <p className="eyebrow">{copy.press1}</p>
      <div className="press-row">
        <h2 id="prensa-title">
          Prensa &<br />
          <em>entrevistas.</em>
        </h2>
        <div className="press-list">
          {site.press.length ? (
            site.press.map((p) => (
              <article key={p.url}>
                <p className="eyebrow">
                  {p.outlet}
                  {p.date ? " / " + p.date : ""}
                </p>
                <h3>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {p.title}
                  </a>
                </h3>
              </article>
            ))
          ) : (
            <>
              <p className="lead">{copy.press2}</p>
              <p>{copy.press3}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
