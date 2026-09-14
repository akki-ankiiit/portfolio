import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { imagery } from '../data/portfolio.js';
import useMediaQuery from '../hooks/useMediaQuery.js';
import Icon from './Icon.jsx';

const thoughts = [
  'Good interfaces leave room for people.',
  'The best question is often “why?”',
  'Less friction. More thoughtful little details.',
  'Make the complex feel like second nature.',
];

export default function HeroArtwork() {
  const stage = useRef(null);
  const animationFrame = useRef(null);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [focused, setFocused] = useState(false);
  const [thought, setThought] = useState(-1);

  const resetPosition = () => {
    cancelAnimationFrame(animationFrame.current);
    stage.current?.style.setProperty('--art-x', '0px');
    stage.current?.style.setProperty('--art-y', '0px');
    stage.current?.style.setProperty('--art-rotate', '0deg');
  };

  useEffect(() => {
    if (focused || reduceMotion) resetPosition();
    return () => cancelAnimationFrame(animationFrame.current);
  }, [focused, reduceMotion]);

  const onPointerMove = (event) => {
    if (focused || reduceMotion || event.pointerType !== 'mouse') return;
    const bounds = stage.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cancelAnimationFrame(animationFrame.current);
    animationFrame.current = requestAnimationFrame(() => {
      stage.current?.style.setProperty('--art-x', `${x * 8}px`);
      stage.current?.style.setProperty('--art-y', `${y * 6}px`);
      stage.current?.style.setProperty('--art-rotate', `${x * 0.9}deg`);
    });
  };

  return (
    <div className={`ink-hero ${focused ? 'is-focused' : ''}`} ref={stage} onPointerMove={onPointerMove} onPointerLeave={resetPosition}>
      <div className="ink-art-canvas">
        <img className="ink-hero-image" src={imagery.hero} width="720" height="650" alt="Animated black-ink illustration of a young designer with headphones, sneakers, and skateboard, surrounded by doodles and ideas" fetchPriority="high" />
      </div>
      <Link className="ink-art-control ink-work-note" to="/#work"><span>inside my sketchbook</span><Icon name="arrow" size={14} /><svg viewBox="0 0 90 36" aria-hidden="true"><path d="M5 3c5 21 48 31 70 15m-14-2 14 2-3 12" /></svg></Link>
      <button className="ink-art-control ink-focus-note" aria-label="Toggle focus mode" aria-pressed={focused} onClick={() => setFocused(!focused)}>
        <img src={imagery.headphones} width="40" height="32" alt="" />
        <span>focus mode <i className="focus-state" aria-hidden="true" /></span>
      </button>
      <button className="ink-art-control ink-thought-note" onClick={() => setThought((current) => (current + 1) % thoughts.length)} aria-label="Read another design thought"><span>hear me out…</span><Icon size={13} /></button>
      <svg className="ink-orbit-spark" viewBox="0 0 44 44" aria-hidden="true"><path d="M22 3v9m0 20v9M3 22h9m20 0h9M8 8l7 7m14 14 7 7M8 36l7-7m14-14 7-7" /></svg>
      <div className="ink-art-caption" role="status" aria-live="polite"><span>{focused ? 'Headphones on. Motion off. A little space to think.' : thought >= 0 ? thoughts[thought] : 'A little curiosity, outside the lines.'}</span><span className="ink-caption-line" aria-hidden="true" /></div>
    </div>
  );
}
