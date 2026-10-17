import { useCallback, useState } from 'react';
import { IconDefinitions } from './components/ui/IconDefinitions.jsx';
import { Header } from './components/layout/Header.jsx';
import { Hero } from './sections/Hero.jsx';
import { About } from './sections/About.jsx';
import { Highlights } from './sections/Highlights.jsx';
import { Projects } from './sections/Projects.jsx';
import { Expertise } from './sections/Expertise.jsx';
import { Stats } from './sections/Stats.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Loader } from './components/ui/Loader.jsx';
import { ContactModal, NavMenu } from './components/layout/Dialogs.jsx';
import { ChatWidget } from './features/chat/ChatWidget.jsx';
import { usePortfolioMotion } from './hooks/usePortfolioMotion.js';

export function App() {
  const [loading, setLoading] = useState(true), [dialog, setDialog] = useState(null);
  const complete = useCallback(() => setLoading(false), []);
  const scrollTo = usePortfolioMotion(loading || Boolean(dialog), !loading);
  const contact = () => setDialog('contact');
  function navigate(event) { const anchor = event.target.closest('a[href^="#"]'); if (!anchor) return; const id = anchor.getAttribute('href'); if (id.length < 2) return; const target = document.getElementById(id.slice(1)); if (!target) return; event.preventDefault(); setDialog(null); requestAnimationFrame(() => { scrollTo(target); history.replaceState(null, '', id); }); }
  return <div onClick={navigate}><IconDefinitions /><a className="skip" href="#main">Skip to content</a>{loading && <Loader onComplete={complete} />}<Header onMenu={() => setDialog('menu')} onContact={contact} /><main id="main"><Hero onContact={contact} /><About /><Highlights /><Projects /><Expertise onContact={contact} /><Stats /></main><Footer onContact={contact} />{dialog === 'menu' && <NavMenu onClose={() => setDialog(null)} onContact={contact} />}{dialog === 'contact' && <ContactModal onClose={() => setDialog(null)} />}<ChatWidget /></div>;
}
