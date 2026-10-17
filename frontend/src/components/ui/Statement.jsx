export function Statement() {
  let index = 0;
  const words = text => text.split(/(\s+)/).map((word, i) => word.trim() ? <span key={i} className="word" style={{ '--word': index++ }}>{word}</span> : word);
  return <h2 className="statement reveal" id="statement">{words('I’m a Computer Science student who builds across the stack. ')}<span className="muted">{words('I care about the details that turn a useful idea into software people can use.')}</span></h2>;
}
