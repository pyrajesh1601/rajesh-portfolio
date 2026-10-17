import { useState } from 'react';
const slides = [ ['DevFlow / Full stack', 'Workflows, brought together.'], ['FinLedger / Financial APIs', 'Every transaction, organized.'], ['Fitforge / Java backend', 'Structure. Security. Strength.'] ];
export function ProjectCarousel() {
  const [slide, setSlide] = useState(0);
  const change = step => setSlide(i => (i + step + slides.length) % slides.length);
  return <div className="hero-card intro-element" style={{ '--delay': '400ms' }} aria-label="Project highlights"><a className="carousel-tile" href="#works" aria-label="Explore selected work"><svg><use href="#spark" /></svg></a><div className="carousel-panel"><div key={slide} className="carousel-copy" aria-live="polite"><small>{slides[slide][0]}</small><p>{slides[slide][1]}</p></div><div className="carousel-controls"><div className="dots">{slides.map(([name], i) => <button key={name} type="button" className={i === slide ? 'active' : ''} aria-label={'Show ' + name.split(' / ')[0]} aria-pressed={i === slide} onClick={() => setSlide(i)} />)}</div><div><button className="round" type="button" aria-label="Previous project" onClick={() => change(-1)}>←</button><button className="round" type="button" aria-label="Next project" onClick={() => change(1)}>→</button></div></div></div></div>;
}
