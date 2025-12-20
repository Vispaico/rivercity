import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

export default function useRevealInView(ref, options) {
  const inView = useInView(ref, options);
  const once = options?.once ?? false;
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (inView) setRevealed(true);
    else if (!once) setRevealed(false);
  }, [inView, once]);

  useEffect(() => {
    if (revealed) return;

    const check = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || 0;
      const viewW = window.innerWidth || 0;
      const intersects = rect.bottom > 0 && rect.right > 0 && rect.top < viewH && rect.left < viewW;

      if (intersects) setRevealed(true);
    };

    const scheduleCheck = () => requestAnimationFrame(check);

    const onPageShow = () => scheduleCheck();
    const onFocus = () => scheduleCheck();
    const onVisibilityChange = () => {
      if (!document.hidden) scheduleCheck();
    };

    const raf = scheduleCheck();

    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [ref, revealed]);

  return once ? revealed || inView : inView;
}
