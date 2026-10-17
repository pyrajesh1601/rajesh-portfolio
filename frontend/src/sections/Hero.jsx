import { LiquidPortrait } from '../features/hero/LiquidPortrait.jsx';
import { ProjectCarousel } from '../features/hero/ProjectCarousel.jsx';

export function Hero({ onContact, onMenu }) {
  return (
    <section className="hero" id="home">
  <LiquidPortrait />
  <div className="vignette"></div>
  <span className="art-credit">
    {"Move your cursor · Reveal the signal"}
  </span>
  <div className="watermark intro-element" style={{"--delay": "300ms"}}>
    {"RAJESH"}
  </div>
  <div className="shell hero-grid">
    <div className="hero-left">
      <p className="eyebrow intro-element" style={{"--delay": "200ms"}}>
        {"Full Stack Developer"}
      </p>
      <h1>
        <span>
          <span style={{"--i": "0"}}>
            {"Bold ideas,"}
          </span>
        </span>
        <span>
          <span style={{"--i": "1"}}>
            {"built with"}
          </span>
        </span>
        <span>
          <span style={{"--i": "2"}}>
            {"quiet precision."}
          </span>
        </span>
      </h1>
      <p className="hero-description intro-element" style={{"--delay": "450ms"}}>
        {"I’m Rajesh. I connect thoughtful interfaces with secure, well-structured backends — turning complex requirements into useful software."}
      </p>
      <div className="hero-proof intro-element" style={{"--delay": "650ms"}}>
        <svg>
          <use href="#spark" />
        </svg>
        {" Java · Spring Boot · Node.js · React"}
      </div>
      <div className="hero-actions intro-element" style={{"--delay": "750ms"}}>
        <button className="pill" data-contact="" onClick={onContact}>
          {"Let’s Talk "}
          <span className="arrow">
            <svg>
              <use href="#up" />
            </svg>
          </span>
        </button>
        <a className="pill outline" href="#works">
          {"View Work"}
        </a>
      </div>
    </div>
    <div className="hero-right">
      <ProjectCarousel />
      <div className="tool-grid intro-element" style={{"--delay": "550ms"}}>
        <p>
          {"Tools I build with"}
        </p>
        <ul>
          <li>
            {"Java"}
          </li>
          <li>
            {"React"}
          </li>
          <li>
            {"Node.js"}
          </li>
          <li>
            {"Spring Boot"}
          </li>
          <li>
            {"PostgreSQL"}
          </li>
          <li>
            {"MongoDB"}
          </li>
          <li>
            {"Docker"}
          </li>
          <li>
            {"Git"}
          </li>
          <li>
            {"REST APIs"}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="shell hero-status intro-element" style={{"--delay": "900ms"}}>
    <span>
      {"B.Tech CSE · RCET, Bhilai"}
    </span>
    <span>
      {"Based in India"}
    </span>
    <a href="#about">
      {"Scroll to explore ↓"}
    </a>
  </div>
</section>
  );
}
