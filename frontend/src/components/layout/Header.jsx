import { LiveClock } from '../ui/LiveClock.jsx';

export function Header({ onContact, onMenu }) {
  return (
    <header>
  <div className="shell header-inner">
    <a className="brand" href="#home">
      <svg>
        <use href="#spark" />
      </svg>
      {" K Rajesh"}
    </a>
    <nav aria-label="Primary navigation">
      <a href="#home">
        {"Home"}
      </a>
      <a href="#works">
        {"Work"}
      </a>
      <a href="#skills">
        {"Expertise"}
      </a>
      <a href="#about">
        {"About"}
      </a>
      <button data-contact="" onClick={onContact}>
        {"Contact"}
      </button>
    </nav>
    <div className="header-right">
      <div className="clock">
        <span>
          {"India time"}
        </span>
        <LiveClock />
        <span>
          {"â€¢"}
        </span>
        <LiveClock date />
      </div>
      <button className="menu-button" id="open-menu" aria-label="Menu" aria-haspopup="dialog" onClick={onMenu}>
        <svg>
          <use href="#grid" />
        </svg>
        <span className="menu-word">
          {"Menu"}
        </span>
      </button>
    </div>
  </div>
</header>
  );
}
