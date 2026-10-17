
export function Stats({ onContact, onMenu }) {
  return (
    <section className="shell stats-wrap">
  <div className="stats reveal">
    <p className="eyebrow">
      {"A little context"}
    </p>
    <h2>
      {"Learning by building."}
      <br />
      {"Growing by doing."}
    </h2>
    <ul className="stats-grid">
      <li>
        <div className="stat-number">
          <span data-count="3">
            {"3"}
          </span>
        </div>
        <p>
          {"Featured projects"}
        </p>
        <small>
          {"Full stack & backend"}
        </small>
      </li>
      <li>
        <div className="stat-number">
          <span data-count="8.04" data-decimals="2">
            {"8.04"}
          </span>
        </div>
        <p>
          {"CGPA · B.Tech CSE"}
        </p>
        <small>
          {"RCET, Bhilai · 2023–Present"}
        </small>
      </li>
      <li>
        <div className="stat-number">
          <span data-count="7">
            {"7"}
          </span>
          {"+"}
        </div>
        <p>
          {"Inter-college esports events"}
        </p>
        <small>
          {"Blaze Esports · Incubated at RuBI"}
        </small>
      </li>
      <li>
        <div className="stat-number">
          <span data-count="2">
            {"2"}
          </span>
        </div>
        <p>
          {"Certifications"}
        </p>
        <small>
          {"MERN development & AIML"}
        </small>
      </li>
    </ul>
  </div>
</section>
  );
}
