
export function Highlights({ onContact, onMenu }) {
  return (
    <section className="shell about-highlights" aria-label="What shapes my work">
  <a className="about-highlight reveal" href="#works">
    <span className="highlight-index">
      {"01 / PROJECTS "}
      <svg aria-hidden="true">
        <use href="#up" />
      </svg>
    </span>
    <h3>
      {"Ideas into applications."}
    </h3>
    <p>
      {"DevFlow, FinLedger, and Fitforge — full stack products and focused backends."}
    </p>
  </a>
  <a className="about-highlight reveal" style={{"--delay": "80ms"}} href="#skills">
    <span className="highlight-index">
      {"02 / ENGINEERING "}
      <svg aria-hidden="true">
        <use href="#up" />
      </svg>
    </span>
    <h3>
      {"Security in every layer."}
    </h3>
    <p>
      {"JWT authentication, role-based access, and clearly structured REST APIs."}
    </p>
  </a>
  <a className="about-highlight reveal" style={{"--delay": "160ms"}} href="https://www.linkedin.com/in/k-rajesh16" target="_blank" rel="noopener noreferrer">
    <span className="highlight-index">
      {"03 / LEADERSHIP "}
      <svg aria-hidden="true">
        <use href="#up" />
      </svg>
    </span>
    <h3>
      {"Built with people."}
    </h3>
    <p>
      {"Logistics, resources, and teamwork across 7+ inter-college esports events."}
    </p>
  </a>
</section>
  );
}
