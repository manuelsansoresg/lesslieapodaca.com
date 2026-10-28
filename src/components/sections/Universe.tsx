import { copy } from "@/lib/copy";
import { bookHref, site } from "@/lib/content";
export function Universe() {
  return (
    <section
      className="universe-section section-space"
      aria-labelledby="universo-title"
    >
      <div className="section-wrap universe-inner">
        <p className="eyebrow">{copy.universe1}</p>
        <h2 id="universo-title">
          Todo lo que sientes
          <br />
          <em>también es una historia.</em>
        </h2>
        <p className="universe-description">
          Romance juvenil, adolescencia y crecimiento personal.
          <br />
          Un lugar para explorar las emociones a través de las palabras.
        </p>
        <div className="universe-themes">
          {site.book.themes.map((theme, i) => (
            <span key={theme}>
              <small>0{i + 1}</small>
              {theme}
            </span>
          ))}
        </div>
        {site.book.excerpts.length > 0 ? (
          site.book.excerpts.map((q) => (
            <figure className="excerpt" key={q.text}>
              <blockquote>{q.text}</blockquote>
              <figcaption>{q.attribution}</figcaption>
            </figure>
          ))
        ) : (
          <p className="excerpt-pending">{copy.universe2}</p>
        )}
        <a className="button button-ivory" href={bookHref}>
          Descubre la historia <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
