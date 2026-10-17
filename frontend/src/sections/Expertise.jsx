
export function Expertise({ onContact, onMenu }) {
  return (
    <section id="skills" className="shell section services">
  <p className="eyebrow reveal">
    {"Expertise"}
  </p>
  <h2 className="reveal">
    {"What I bring"}
    <br />
    {"to the build."}
  </h2>
  <ul className="service-list">
    <li className="reveal">
      <button className="service-row" data-contact="" onClick={onContact}>
        <span>
          {"01"}
        </span>
        <h3>
          {"Full Stack Development"}
        </h3>
        <p>
          {"React interfaces connected to Node.js and Express APIs."}
        </p>
        <span className="arrow">
          <svg>
            <use href="#up" />
          </svg>
        </span>
      </button>
    </li>
    <li className="reveal" style={{"--delay": "80ms"}}>
      <button className="service-row" data-contact="" onClick={onContact}>
        <span>
          {"02"}
        </span>
        <h3>
          {"Java & Spring Boot"}
        </h3>
        <p>
          {"Layered backends with Spring Security, JPA, and Hibernate."}
        </p>
        <span className="arrow">
          <svg>
            <use href="#up" />
          </svg>
        </span>
      </button>
    </li>
    <li className="reveal" style={{"--delay": "160ms"}}>
      <button className="service-row" data-contact="" onClick={onContact}>
        <span>
          {"03"}
        </span>
        <h3>
          {"APIs & Authentication"}
        </h3>
        <p>
          {"RESTful API design, JWT authentication, and role-based access."}
        </p>
        <span className="arrow">
          <svg>
            <use href="#up" />
          </svg>
        </span>
      </button>
    </li>
    <li className="reveal" style={{"--delay": "240ms"}}>
      <button className="service-row" data-contact="" onClick={onContact}>
        <span>
          {"04"}
        </span>
        <h3>
          {"Data & Deployment"}
        </h3>
        <p>
          {"PostgreSQL, MongoDB, Docker Compose, Maven, and Git."}
        </p>
        <span className="arrow">
          <svg>
            <use href="#up" />
          </svg>
        </span>
      </button>
    </li>
  </ul>
</section>
  );
}
