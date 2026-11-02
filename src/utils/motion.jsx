import { useEffect, useRef, useState } from 'react';

/* ─── Custom Cursor (Disabled to preserve natural system pointer) ─── */
export function CustomCursor() {
  return null;
}

/* ─── useMagnetic ───────────────────────────────────────────────── */
export function useMagnetic(strength = 0.25) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px,${dy}px)`;
      el.style.transition = 'transform 0.1s linear';
    };
    const onLeave = () => {
      el.style.transform = 'translate(0,0)';
      el.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return ref;
}

/* ─── useTilt ────────────────────────────────────────────────────── */
export function useTilt(maxTilt = 8) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotX = ((py - 0.5) * -maxTilt).toFixed(2);
      const rotY = ((px - 0.5) * maxTilt).toFixed(2);
      el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
    };
    const onLeave = () => {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      el.style.transition = 'transform 0.5s ease-out';
    };
    const onEnter = () => {
      el.style.transition = 'transform 0.1s linear';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mouseenter', onEnter);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mouseenter', onEnter);
    };
  }, [maxTilt]);

  return ref;
}

/* ─── useScrollReveal ────────────────────────────────────────────── */
export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
}

/* ─── useCounter ─────────────────────────────────────────────────── */
export function useCounter(end, duration = 1200, startNow = true) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!startNow) return;
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(easeProgress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setVal(end);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration, startNow]);

  return val;
}

/* ─── useSpotlight ───────────────────────────────────────────────── */
export function useSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mx', `${x.toFixed(1)}%`);
      el.style.setProperty('--my', `${y.toFixed(1)}%`);
    };

    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return ref;
}
