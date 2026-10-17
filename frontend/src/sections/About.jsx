import { Statement } from '../components/ui/Statement.jsx';

export function About({ onContact, onMenu }) {
  return (
    <section id="about" className="shell section about about-refined">
  <div className="about-profile reveal">
    <p className="eyebrow">
      {"The person behind the code"}
    </p>
    <div className="profile-card">
      <div className="profile-top">
        <span className="profile-monogram" aria-hidden="true">
          {"kr"}
          <span>
            {"↗"}
          </span>
        </span>
        <span className="profile-location">
          <span></span>
          {"Based in India"}
        </span>
      </div>
      <h3>
        {"K Rajesh"}
      </h3>
      <p className="profile-role">
        {"Full Stack Developer"}
      </p>
      <div className="profile-education">
        <span>
          {"COMPUTER SCIENCE & ENGINEERING"}
        </span>
        <p>
          {"RCET, Bhilai "}
          <span>
            {"·"}
          </span>
          {" B.Tech"}
        </p>
        <small>
          {"2023–Present"}
        </small>
      </div>
      <div className="profile-stack">
        <span>
          {"Java"}
        </span>
        <span>
          {"Spring Boot"}
        </span>
        <span>
          {"Node.js"}
        </span>
        <span>
          {"React"}
        </span>
      </div>
    </div>
  </div>
  <div className="about-story">
    <Statement />
    <p className="about-detail reveal">
      {"My projects connect responsive interfaces, secure APIs, and well-organized data. Beyond code, I’ve coordinated teams and inter-college events with Blaze Esports."}
    </p>
    <div className="about-bottom reveal">
      <div className="about-social-links">
        <a href="https://github.com/pyrajesh1601" target="_blank" rel="noopener noreferrer">
          {"GitHub "}
          <span>
            {"↗"}
          </span>
        </a>
        <a href="https://www.linkedin.com/in/k-rajesh16" target="_blank" rel="noopener noreferrer">
          {"LinkedIn "}
          <span>
            {"↗"}
          </span>
        </a>
        <a href="mailto:py.rajesh16@gmail.com">
          {"Email "}
          <span>
            {"↗"}
          </span>
        </a>
      </div>
      <a className="pill outline" href="Rajesh-Resume.pdf" download>
        {"Résumé ↓"}
      </a>
    </div>
  </div>
</section>
  );
}
