import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

export default function VideoCard({ video }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) element.pause(); }, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const togglePlay = async () => {
    if (!ref.current.paused) { ref.current.pause(); return; }
    document.querySelectorAll('video').forEach((element) => { if (element !== ref.current) element.pause(); });
    try { await ref.current.play(); setError(''); } catch { setError('Unable to play. Please try again.'); }
  };

  return <article className={`video-card ${playing ? 'is-playing' : ''}`}>
    <video ref={ref} src={video.src} poster={video.poster} muted={muted} playsInline loop preload="metadata" aria-label={video.title} onClick={togglePlay} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onTimeUpdate={() => setProgress(ref.current.duration ? (ref.current.currentTime / ref.current.duration) * 100 : 0)} onError={() => setError('This video is unavailable.')} />
    <div className="video-shade" />
    <div className="video-controls"><button onClick={togglePlay} aria-label={`${playing ? 'Pause' : 'Play'} ${video.title}`}><Icon name={playing ? 'pause' : 'play'} size={13} /></button><span>{video.title}</span><button onClick={() => setMuted(!muted)} aria-label={muted ? 'Unmute video' : 'Mute video'}><Icon name={muted ? 'muted' : 'volume'} size={14} /></button></div>
    <div className="video-progress" style={{ transform: `scaleX(${progress / 100})` }} />
    {error && <p className="video-error" role="status">{error}</p>}
  </article>;
}
