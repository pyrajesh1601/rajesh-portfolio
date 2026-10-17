
export function IconDefinitions({ onContact, onMenu }) {
  return (
    <svg aria-hidden="true" style={{"position": "absolute", "width": "0", "height": "0", "overflow": "hidden"}}>
  <defs>
    <symbol id="spark" viewBox="0 0 48 48">
      <path fill="currentColor" d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
    </symbol>
    <symbol id="up" viewBox="0 0 24 24">
      <path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </symbol>
    <symbol id="right" viewBox="0 0 24 24">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </symbol>
    <symbol id="globe" viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="9.25" />
        <path d="M12 2.75c2.6 2.3 4 5.8 4 9.25s-1.4 6.95-4 9.25c-2.6-2.3-4-5.8-4-9.25s1.4-6.95 4-9.25zM2.75 12h18.5" />
      </g>
    </symbol>
    <symbol id="close" viewBox="0 0 24 24">
      <path d="M4 4l16 16M20 4 4 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </symbol>
    <symbol id="grid" viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </symbol>
  </defs>
</svg>
  );
}
