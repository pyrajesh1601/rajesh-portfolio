
export function Footer({ onContact, onMenu }) {
  return (
    <footer id="contact">
  <div className="shell footer-inner">
    <div className="footer-cta">
      <h2 className="reveal">
        {"Have something in mind?"}
        <br />
        {"Letâ€™s get to work."}
      </h2>
      <button className="pill light" data-contact="" onClick={onContact}>
        {"Start a conversation "}
        <span className="arrow">
          <svg>
            <use href="#up" />
          </svg>
        </span>
      </button>
    </div>
    <div className="footer-columns">
      <div>
        <a className="brand" href="#home">
          <svg>
            <use href="#spark" />
          </svg>
          {" K Rajesh"}
        </a>
        <p>
          {"Thoughtful interfaces. Secure backends."}
          <br />
          {"Software built with care."}
        </p>
      </div>
      <div>
        <h3>
          {"Explore"}
        </h3>
        <a href="#about">
          {"About"}
        </a>
        <a href="#works">
          {"Selected work"}
        </a>
        <a href="#skills">
          {"Expertise"}
        </a>
        <a href="Rajesh-Resume.pdf" download>
          {"RÃ©sumÃ© â†“"}
        </a>
      </div>
      <div>
        <h3>
          {"Projects"}
        </h3>
        <a href="#works">
          {"DevFlow"}
        </a>
        <a href="#works">
          {"FinLedger"}
        </a>
        <a href="#works">
          {"Fitforge"}
        </a>
      </div>
      <div>
        <h3>
          {"Connect"}
        </h3>
        <a href="https://github.com/pyrajesh1601" target="_blank" rel="noopener noreferrer">
          {"GitHub â†—"}
        </a>
        <a href="https://www.linkedin.com/in/k-rajesh16" target="_blank" rel="noopener noreferrer">
          {"LinkedIn â†—"}
        </a>
        <a href="mailto:py.rajesh16@gmail.com">
          {"Email â†—"}
        </a>
      </div>
    </div>
    <div className="legal">
      <span>
        {"Â© "}
        <span>{new Date().getFullYear()}</span>
        {" K Rajesh. Built with intent."}
      </span>
      <a href="#home">
        {"Back to top â†‘"}
      </a>
    </div>
  </div>
  <div className="footer-mark" aria-hidden="true">
    {"RAJESH"}
  </div>
</footer>
  );
}
