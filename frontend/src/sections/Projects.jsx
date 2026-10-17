
export function Projects({ onContact, onMenu }) {
  return (
    <section id="works" className="shell section work">
  <div className="section-title reveal">
    <p className="eyebrow">
      {"Portfolio"}
    </p>
    <h2>
      {"Selected Work"}
    </h2>
  </div>
  <div className="project-grid">
    <a className="project reveal" href="https://github.com/pyrajesh1601?tab=repositories" target="_blank" rel="noopener noreferrer">
      <div className="project-meta">
        <span>
          {"01 / Full stack platform"}
        </span>
        <span className="project-arrow">
          <svg>
            <use href="#up" />
          </svg>
        </span>
      </div>
      <div className="project-symbol code" aria-hidden="true">
        {"{ / }"}
      </div>
      <div className="project-bottom">
        <h3>
          {"DevFlow"}
        </h3>
        <p>
          {"A shared workspace for projects, issues, and team workflows. JWT authentication, role-based access, and a responsive tracking dashboard."}
        </p>
        <div className="tags">
          <span>
            {"React"}
          </span>
          <span>
            {"Node.js"}
          </span>
          <span>
            {"Express"}
          </span>
          <span>
            {"PostgreSQL"}
          </span>
        </div>
      </div>
    </a>
    <a className="project reveal" style={{"--delay": "90ms"}} href="https://github.com/pyrajesh1601?tab=repositories" target="_blank" rel="noopener noreferrer">
      <div className="project-meta">
        <span>
          {"02 / Financial backend"}
        </span>
        <span className="project-arrow">
          <svg>
            <use href="#up" />
          </svg>
        </span>
      </div>
      <div className="project-symbol ledger-symbol" aria-hidden="true">
        {"↔"}
      </div>
      <div className="project-bottom">
        <h3>
          {"FinLedger"}
        </h3>
        <p>
          {"A secure financial ledger for accounts, transactions, income, and expenses. Protected APIs, role-based authorization, and email notifications."}
        </p>
        <div className="tags">
          <span>
            {"Node.js"}
          </span>
          <span>
            {"MongoDB"}
          </span>
          <span>
            {"JWT"}
          </span>
          <span>
            {"Nodemailer"}
          </span>
        </div>
      </div>
    </a>
    <a className="project reveal" style={{"--delay": "180ms"}} href="https://github.com/pyrajesh1601?tab=repositories" target="_blank" rel="noopener noreferrer">
      <div className="project-meta">
        <span>
          {"03 / Fitness backend"}
        </span>
        <span className="project-arrow">
          <svg>
            <use href="#up" />
          </svg>
        </span>
      </div>
      <div className="project-symbol" aria-hidden="true">
        <svg>
          <use href="#spark" />
        </svg>
      </div>
      <div className="project-bottom">
        <h3>
          {"Fitforge"}
        </h3>
        <p>
          {"A layered Java backend for authentication and workout management. Spring Security, JWT authorization, and containerized deployment."}
        </p>
        <div className="tags">
          <span>
            {"Spring Boot"}
          </span>
          <span>
            {"Spring Security"}
          </span>
          <span>
            {"PostgreSQL"}
          </span>
          <span>
            {"Docker"}
          </span>
        </div>
      </div>
    </a>
    <div className="project grid-note reveal" style={{"--delay": "270ms"}}>
      <div className="project-meta">
        {"Beyond the code "}
        <svg>
          <use href="#up" />
        </svg>
      </div>
      <div>
        <h3>
          {"Good work takes a team."}
        </h3>
        <p>
          {"Operational lead at Blaze Esports. Student ambassador at the Institution’s Innovation Council. Experience coordinating people, resources, and events."}
        </p>
        <a className="pill" href="https://www.linkedin.com/in/k-rajesh16" target="_blank" rel="noopener noreferrer">
          {"More about my journey "}
          <span className="arrow">
            <svg>
              <use href="#up" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  </div>
</section>
  );
}
