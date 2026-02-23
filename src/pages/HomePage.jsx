import React from 'react';
import { Link } from 'react-router-dom';
import { UNITS, buildUnitPath } from '../navigation/navigationConfig';
import './HomePage.css';

function resolveThumbnailSrc(thumbnailKey) {
  return `${process.env.PUBLIC_URL}/assets/${thumbnailKey}`;
}

function HomePage() {
  return (
    <main className="homepage">
      <header className="homepage__header">
        <h1 className="homepage__title">Learning Units</h1>
        <p className="homepage__subtitle">
          Four chronological units. Start at Unit 1 and continue in order.
        </p>
      </header>

      <section className="homepage__grid">
        {UNITS.map((unit) => (
          <article
            key={unit.id}
            className="homepage-card"
            style={{ borderTopColor: unit.accentColor }}
          >
            <div className="homepage-card__media">
              <img
                src={resolveThumbnailSrc(unit.thumbnailKey)}
                alt={unit.title}
                className="homepage-card__image"
              />
            </div>
            <div className="homepage-card__body">
              <h2 className="homepage-card__title">{unit.title}</h2>
              <p className="homepage-card__description">{unit.description}</p>
            </div>
            <div className="homepage-card__footer">
              <Link
                className="homepage-card__link"
                to={buildUnitPath(unit.slug)}
              >
                Enter {unit.title}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default HomePage;

