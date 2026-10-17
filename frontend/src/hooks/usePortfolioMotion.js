import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function usePortfolioMotion(locked, ready) {
  const lenis = useRef(null), lockedRef = useRef(locked);
  lockedRef.current = locked;
  useEffect(() => {
    function adaptive() { const size = 16 - (16 * (((1920 - innerWidth) / 1920) * 100) * .6666) / 100; if (size > 16) document.documentElement.style.fontSize = size + 'px'; else document.documentElement.style.removeProperty('font-size'); }
    adaptive(); addEventListener('resize', adaptive);
    let frame;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      const instance = new Lenis({ smoothWheel: true }); lenis.current = instance;
      if (lockedRef.current) instance.stop();
      const raf = time => { instance.raf(time); frame = requestAnimationFrame(raf); }; frame = requestAnimationFrame(raf);
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }), { threshold: .1 });
    document.querySelectorAll('.reveal').forEach(el => { if (reduced) el.classList.add('in-view'); else observer.observe(el); });
    let last = 0;
    function counts() { const now = performance.now(); if (now - last < 30) return; last = now; document.querySelectorAll('[data-count]').forEach(el => { const rect = el.getBoundingClientRect(), progress = reduced ? 1 : Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight / 2 + rect.height / 2))); el.textContent = (progress * Number(el.dataset.count)).toFixed(Number(el.dataset.decimals || 0)); }); }
    counts(); addEventListener('scroll', counts, { passive: true });
    return () => { cancelAnimationFrame(frame); lenis.current?.destroy(); lenis.current = null; observer.disconnect(); removeEventListener('scroll', counts); removeEventListener('resize', adaptive); };
  }, []);
  useEffect(() => {
    if (locked) { lenis.current?.stop(); Object.assign(document.documentElement.style, { position: 'relative', overflow: 'hidden', height: '100%' }); }
    else { lenis.current?.start(); ['position', 'overflow', 'height'].forEach(key => document.documentElement.style.removeProperty(key)); }
    return () => ['position', 'overflow', 'height'].forEach(key => document.documentElement.style.removeProperty(key));
  }, [locked]);
  useEffect(() => { document.body.classList.toggle('ready', ready); return () => document.body.classList.remove('ready'); }, [ready]);
  return target => { if (lenis.current) lenis.current.scrollTo(target); else target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); };
}
