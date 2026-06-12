"use client";
import { useEffect, useState, useRef } from "react";

/**
 * Step-timed reveal driver.
 * `schedule` is an array of millisecond timestamps (from slide-enter) at which
 * the step counter advances to index+1. Resets to 0 whenever the slide leaves.
 * Use `step >= n` in JSX to gate reveals.
 */
export function useSteps(active, schedule) {
  const [step, setStep] = useState(0);
  // keep the latest schedule without making it an effect dependency —
  // otherwise a fresh array literal each render would reset the timers forever.
  const ref = useRef(schedule);
  ref.current = schedule;
  useEffect(() => {
    if (!active) {
      setStep(0);
      return;
    }
    setStep(0);
    const timers = ref.current.map((t, i) =>
      setTimeout(() => setStep(i + 1), t)
    );
    return () => timers.forEach(clearTimeout);
  }, [active]);
  return step;
}

/** Animated count-up that starts when `active` (and after `delay`). */
export function useCountUp(active, target, opts = {}) {
  const { duration = 1400, delay = 0 } = opts;
  const [val, setVal] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    if (!active) {
      setVal(0);
      return;
    }
    const start = setTimeout(() => {
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / duration, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setVal(target * e);
        if (p < 1) raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(start);
      cancelAnimationFrame(raf.current);
    };
  }, [active, target, duration, delay]);
  return val;
}

export const fmt = (n, dec = 0) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
