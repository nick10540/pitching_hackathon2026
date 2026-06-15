"use client";
import { useState, useEffect, useCallback, useRef } from "react";

import IframeSlide from "./IframeSlide";
import Cover from "./slides/Cover";
import IntroVideo from "./slides/IntroVideo";
import LiveDemo from "./slides/LiveDemo";
import SavingsPrinciple from "./slides/SavingsPrinciple";
import PocArchitecture from "./slides/PocArchitecture";
import RealArchitecture from "./slides/RealArchitecture";
import CapexOpex from "./slides/CapexOpex";
import RoiPayback from "./slides/RoiPayback";
import TeamPartners from "./slides/TeamPartners";
import RecursivePrediction from "./slides/RecursivePrediction";
import LiveDemoScreens from "./slides/LiveDemoScreens";

const SLIDES = [
  { id: "cover", chapter: "ปก", Comp: Cover },
  { id: "intro", chapter: "Teaser", Comp: IntroVideo },
  { id: "hook", chapter: "As-is → Pain", src: "/slides/hook.html" },
  { id: "journey", chapter: "As-is → Pain", src: "/slides/EMS_Journey_Solution.html" },
  { id: "opp", chapter: "ค่าเสียโอกาส", src: "/slides/opportunity.html" },
  { id: "forecast", chapter: "พิสูจน์ด้วยข้อมูลจริง", src: "/slides/forecast.html" },
  { id: "demo", chapter: "Live Demo", Comp: LiveDemo },
  { id: "demo-screens", chapter: "Live Demo", Comp: LiveDemoScreens },
  { id: "poc-arch", chapter: "สถาปัตยกรรม", Comp: PocArchitecture },
  { id: "capex", chapter: "การลงทุน", Comp: CapexOpex },
  { id: "roi", chapter: "คืนทุน", Comp: RoiPayback },
  { id: "biz", chapter: "รูปแบบธุรกิจ", src: "/slides/EMS_BusinessModel_v2.html" },
  { id: "scale", chapter: "Scale-Out", src: "/slides/scale_strategy.html" },
  { id: "team", chapter: "ทีม & พันธมิตร", Comp: TeamPartners },
  { id: "recursive", chapter: "Backup — Recursive", Comp: RecursivePrediction },
  { id: "savings", chapter: "Backup — หลักการประหยัด", Comp: SavingsPrinciple },
  { id: "real-arch", chapter: "Backup — สถาปัตยกรรม", Comp: RealArchitecture },
];

export default function Deck() {
  const [i, setI] = useState(0);
  const [scale, setScale] = useState(1);
  const [light, setLight] = useState(false);
  const deckRef = useRef(null);
  const iRef = useRef(0);

  const toggleTheme = useCallback(() => setLight((v) => !v), []);

  const go = useCallback((n) => {
    setI(Math.max(0, Math.min(SLIDES.length - 1, n)));
  }, []);
  const next = useCallback(() => go(iRef.current + 1), [go]);
  const prev = useCallback(() => go(iRef.current - 1), [go]);

  useEffect(() => {
    iRef.current = i;
  }, [i]);

  useEffect(() => {
    const fit = () => {
      const s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
      setScale(s);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const toggleFs = useCallback(() => {
    const el = deckRef.current;
    if (!document.fullscreenElement) el?.requestFullscreen?.();
    else document.exitFullscreen?.();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(SLIDES.length - 1);
      else if (e.key.toLowerCase() === "f") toggleFs();
      else if (e.key.toLowerCase() === "t") toggleTheme();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go, toggleFs, toggleTheme]);

  return (
    <div className="deck" ref={deckRef}>
      <div
        className={"deck-scaler" + (light ? " light" : "")}
        style={{ transform: `scale(${scale})` }}
      >
        {SLIDES.map(({ id, Comp, src }, idx) => (
          <div key={id} className={"slide" + (idx === i ? " active" : "")}>
            {src ? (
              <IframeSlide active={idx === i} src={src} />
            ) : (
              <Comp active={idx === i} />
            )}
          </div>
        ))}
      </div>

      <div className="nav-zone left" onClick={prev} aria-label="prev" />
      <div className="nav-zone right" onClick={next} aria-label="next" />

      <div className="slide-counter">
        <b>{i + 1}</b> / {SLIDES.length}
        <span className="chapter">{SLIDES[i].chapter}</span>
      </div>

      <div className="deck-ui">
        <button onClick={prev} title="ก่อนหน้า (←)">‹</button>
        <button onClick={next} title="ถัดไป (→)">›</button>
        <button
          onClick={toggleTheme}
          title="เปลี่ยนธีม (T)"
          className={light ? "theme-active" : ""}
        >
          {light ? "🌙 มืด" : "☀️ สว่าง"}
        </button>
        <button onClick={toggleFs} title="เต็มจอ (F)">⛶ เต็มจอ</button>
      </div>

      <div className="dots">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            className={"dot" + (idx === i ? " on" : "")}
            onClick={() => go(idx)}
            title={`${idx + 1}. ${s.chapter}`}
          />
        ))}
      </div>

      <div className="hint">
        <span className="kbd">←</span>
        <span className="kbd">→</span> เปลี่ยนสไลด์ ·
        <span className="kbd">T</span> ธีม ·
        <span className="kbd">F</span> เต็มจอ
      </div>
    </div>
  );
}
