import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="not-found container ink-page-transition">
      <div className="not-found-content">
        <p className="not-found-eyebrow">A page out of place</p>
        <h1 className="not-found-title">This chapter hasn’t been written.</h1>
        <Link className="text-link not-found-link" to="/">
          Back to the portfolio ↗
        </Link>
      </div>
    </section>
  );
}
