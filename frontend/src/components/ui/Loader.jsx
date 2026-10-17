import { useEffect, useState } from 'react';
export function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0), [exiting, setExiting] = useState(false);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { onComplete(); return; }
    const start = performance.now(); let frame, timer;
    function tick(time) { const t = Math.min((time - start) / 1300, 1), eased = t < .5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2; setProgress(Math.round(eased * 100)); if (t < 1) frame = requestAnimationFrame(tick); else { setExiting(true); timer = setTimeout(onComplete, 700); } }
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); clearTimeout(timer); };
  }, [onComplete]);
  return <div className={'loader' + (exiting ? ' exit' : '')} aria-hidden="true"><div className="loader-copy"><div className="brand"><svg><use href="#spark" /></svg>K Rajesh</div><p>Thoughtful interfaces.<br />Solid engineering.</p></div><div className="progress"><div className="track"><div className="fill" style={{ width: progress + '%' }} /></div><div className="progress-label"><span>Loading</span><span>{String(progress).padStart(3, '0')}</span></div></div></div>;
}
