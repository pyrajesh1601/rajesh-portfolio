import { useEffect, useState } from 'react';
export function LiveClock({ date = false }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(timer); }, []);
  const value = date ? new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'long', year: 'numeric' }).format(now).replace(/ (\d{4})$/, ', $1') : new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true }).format(now).replace(/\s/g, '').toLowerCase();
  return <span className={date ? 'live-date' : 'live-time'}>{value}</span>;
}
