import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="not-found">
      <div className="section-top not-found__section-top">
        <h1 className="title title_middle section-top__title">404 — Not Found</h1>
      </div>
      <div className="not-found__content">
        <Link className="button" to="/">
          Back to shop
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
