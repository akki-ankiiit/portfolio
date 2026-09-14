import { profile, skills } from '../data/portfolio.js';
import { Reveal } from './ui.jsx';
import Icon from './Icon.jsx';

export default function CreatorHub() {
  return (
    <>
      <section className="practice-section container" aria-labelledby="practice-title">
        <Reveal><p className="eyebrow">Strategy meets a hands-on practice</p><h2 id="practice-title">What I bring to the table.</h2></Reveal>
        <div className="skills-grid">{skills.map((skill, index) => <Reveal className="skill-card" key={skill.title} delay={index * 60}><span className="skill-number">0{index + 1}</span><h3>{skill.title}</h3><ul>{skill.items.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>)}</div>
      </section>
      <section className="creator-hub" aria-labelledby="hub-title"><div className="container">
        <Reveal><p className="eyebrow">Around the internet</p><h2 id="hub-title">More from my design desk.</h2><p className="hub-description">Work, ideas, and a few ways to stay connected.</p></Reveal>
        <div className="resource-grid">{profile.resources.map((resource, index) => <Reveal key={resource.title} delay={index * 90}><a className="resource-card" href={resource.url} target="_blank" rel="noreferrer"><Icon name={resource.icon} size={27} /><span className="resource-number">0{index + 1}</span><h3>{resource.title}</h3><p>{resource.description}</p><span className="resource-link">{resource.label}<Icon name="arrow" size={17} /></span></a></Reveal>)}</div>
      </div></section>
    </>
  );
}
