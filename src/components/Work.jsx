import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { categories, imagery, projects } from '../data/portfolio.js';
import { Pill, Reveal, Selection } from './ui.jsx';
import Icon from './Icon.jsx';

function ProjectCard({ project, index }) {
  return (
    <article className="portfolio-card" style={{ '--card-delay': `${index * 55}ms` }}>
      <Link className="portfolio-card-button" to={`/work/${project.id}`} data-project-link={project.id} aria-label={`Read ${project.title} case study`}>
        <Selection className="project-cover">
          <img src={project.image} alt={`${project.title} — black-ink sketches and comic-style project notes`} width="1200" height="850" loading="lazy" />
          <span className="project-open"><Icon name="arrow" size={20} /></span>
        </Selection>
        <div className="portfolio-card-meta"><span>{project.client} / {project.category}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
        <h3>{project.title}</h3>
        <p>{project.subtitle}</p>
        <div className="project-tags">{project.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
      </Link>
    </article>
  );
}

export default function Work({ active = 'products', onCategoryChange }) {
  const setActive = onCategoryChange;
  const tabs = useRef([]);
  const selected = projects.filter((project) => project.group === active);
  const onTabKeyDown = (event, index) => {
    const actions = { ArrowRight: (index + 1) % categories.length, ArrowLeft: (index + categories.length - 1) % categories.length, Home: 0, End: categories.length - 1 };
    if (actions[event.key] === undefined) return;
    event.preventDefault();
    const next = actions[event.key];
    setActive(categories[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section id="work" className="work-section" aria-labelledby="work-title">
      <div className="work-container">
        <Reveal className="work-heading">
          <img className="work-flower" src={imagery.flower} width="56" height="63" alt="" loading="lazy" />
          <h2 id="work-title">A few things I’ve shaped.</h2>
          <p className="work-intro">Ink, ideas, and considered experiences. A look inside my sketchbook.</p>
          <div className="folder-tabs" role="tablist" aria-label="Work categories">
            {categories.map((category, index) => (
              <button key={category.id} ref={(element) => { tabs.current[index] = element; }} id={`tab-${category.id}`} role="tab" aria-selected={active === category.id} aria-controls="work-panel" tabIndex={active === category.id ? 0 : -1} className={`folder-tab ${active === category.id ? 'is-active' : ''}`} onClick={() => setActive(category.id)} onKeyDown={(event) => onTabKeyDown(event, index)}>
                <Selection><img src={category.folder} alt="" width="56" height="46" /></Selection>
                <span className="folder-name">{category.label}</span><span className="folder-dot" />
              </button>
            ))}
          </div>
        </Reveal>
        <div id="work-panel" role="tabpanel" aria-labelledby={`tab-${active}`} tabIndex={0} className="work-panel">
          <div className="gallery-topline"><span>{active === 'products' ? 'From discovery to the details' : active === 'websites' ? 'From my original Notion collection' : 'The foundations behind the interface'}</span><span>{selected.length} projects</span></div>
          <div className="portfolio-grid gallery-transition" key={active}>
            {selected.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
          </div>
        </div>
        <div className="back-to-top"><Pill href="#work">Back to the folders</Pill></div>
      </div>
    </section>
  );
}
