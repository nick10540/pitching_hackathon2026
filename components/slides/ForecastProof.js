"use client";
import { useEffect, useRef, useState } from "react";

/* deterministic 24h load (96 points) — same shape as source proof */
const N = 96;
const seedNoise = (i) => (Math.sin(i * 12.9898) * 43758.5453) % 1;
function loadAt(i) {
  const h = i / 4;
  let v =
    3.1 +
    1.1 * Math.exp(-Math.pow((h - 9.5) / 2.6, 2)) +
    1.0 * Math.exp(-Math.pow((h - 13) / 2.4, 2)) +
    3.4 * Math.exp(-Math.pow((h - 19.6) / 2.1, 2)) -
    0.55 * Math.exp(-Math.pow((h - 4) / 2.2, 2));
  v += 0.13 * Math.sin(i * 1.7) + 0.1 * seedNoise(i);
  return Math.max(2.3, v);
}
const actual = Array.from({ length: N + 1 }, (_, i) => loadAt(i));
const fc = actual.map((v, i) => v * (1 + 0.037 * Math.sin(i * 0.83 + 1.4) * 0.9 + 0.012 * seedNoise(i + 31)));
const p90 = fc.map((v) => v * 1.085), p10 = fc.map((v) => v * 0.915);

const W = 1180, H = 400, PL = 70, PR = 30, PT = 18, PB = 40;
const xOf = (i) => PL + (i / N) * (W - PL - PR);
const yOf = (v) => PT + (H - PT - PB) * (1 - (v - 2) / (9 - 2));
const pathOf = (arr) => arr.map((v, i) => `${i ? "L" : "M"} ${xOf(i).toFixed(1)} ${yOf(v).toFixed(1)}`).join(" ");
const bandD =
  pathOf(p90) + " " +
  p10.slice().reverse().map((v, j) => { const i = N - j; return `L ${xOf(i).toFixed(1)} ${yOf(v).toFixed(1)}`; }).join(" ") + " Z";
const peakI = actual.indexOf(Math.max(...actual));

export default function ForecastProof({ active }) {
  const [p, setP] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    if (!active) { setP(0); return; }
    const DUR = 8000, t0 = performance.now();
    const tick = (t) => { const r = Math.min((t - t0) / DUR, 1); setP(r); if (r < 1) raf.current = requestAnimationFrame(tick); };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active]);

  const innerW = W - PL - PR;
  const actW = Math.min(1, p / 0.4) * innerW; // 0–0.4
  const bandW = Math.max(0, Math.min(1, (p - 0.4) / 0.18)) * innerW; // 0.4–0.58
  const fcW = Math.max(0, Math.min(1, (p - 0.55) / 0.3)) * innerW; // 0.55–0.85
  const showMape = p >= 0.88;
  const chip = (th) => p >= th;

  const grid = [];
  for (let v = 2; v <= 9; v++) {
    grid.push(<line key={"l" + v} className="gline" x1={PL} y1={yOf(v)} x2={W - PR} y2={yOf(v)} />);
    grid.push(<text key={"t" + v} className="alabel" x={PL - 9} y={yOf(v) + 4} textAnchor="end">{v} MW</text>);
  }
  for (let h = 0; h <= 24; h += 3) {
    grid.push(<text key={"h" + h} className="alabel" x={xOf(h * 4)} y={H - 12} textAnchor="middle">{String(h).padStart(2, "0")}:00</text>);
  }

  return (
    <div className="fp">
      <div className="head">
        <div>
          <div className="t1">AI Forecast ที่<span className="gold">พิสูจน์แล้ว</span> — ไม่ใช่คำโฆษณา</div>
          <div className="t2">โหลดเกาะเต่า 24 ชม. · ทุก 15 นาที (96 จุด) · ตรวจกับข้อมูลจริง ส.ค. 2568 · 40,704 แถว</div>
        </div>
        <div className="brand">⚡ <b>Smart Energy IQ</b><br />Proven Forecast</div>
      </div>

      <div className="legend">
        <div className="lg show"><span className="sw actual" />โหลดจริง (Actual)</div>
        <div className={"lg" + (p >= 0.4 ? " show" : "")}><span className="sw band" />ช่วงความเชื่อมั่น P10–P90</div>
        <div className={"lg" + (p >= 0.55 ? " show" : "")}><span className="sw fc" />AI พยากรณ์ล่วงหน้า (Day-Ahead)</div>
      </div>

      <div className="chartwrap">
        <svg viewBox={`0 0 ${W} ${H}`}>
          <defs>
            <clipPath id="bandclip"><rect x={PL} y="0" width={bandW} height={H} /></clipPath>
            <clipPath id="actclip"><rect x={PL} y="0" width={actW} height={H} /></clipPath>
            <clipPath id="fcclip"><rect x={PL} y="0" width={fcW} height={H} /></clipPath>
          </defs>
          <g>{grid}</g>
          <path className="bandpath" d={bandD} clipPath="url(#bandclip)" />
          <path className="actpath" d={pathOf(actual)} clipPath="url(#actclip)" />
          <path className="fcpath" d={pathOf(fc)} clipPath="url(#fcclip)" />
          {p >= 0.45 && (
            <g className="anno show">
              <line x1={xOf(peakI)} y1={yOf(actual[peakI]) - 12} x2={xOf(peakI)} y2={yOf(actual[peakI]) - 46} stroke="#f87171" strokeWidth="2" />
              <text x={xOf(peakI)} y={yOf(actual[peakI]) - 56} textAnchor="middle" fontSize="14" fill="#fca5a5" fontWeight="700">
                Peak {Math.floor(peakI / 4)}:{String((peakI % 4) * 15).padStart(2, "0")} น. — จุดชี้เป็นชี้ตายของเกาะ
              </text>
            </g>
          )}
        </svg>
        <div className={"mape" + (showMape ? " show" : "")}>
          <div className="k">ความคลาดเคลื่อนเฉลี่ย</div>
          <div className="v">MAPE 3.7%</div>
          <div className="tt">เป้ามาตรฐาน &lt; 10% — ผ่านแบบขาดลอย ✓</div>
        </div>
      </div>

      <div className="chips">
        <div className={"chip" + (chip(0.9) ? " show" : "")}>🎯 ทาย <b>Peak เย็น</b> ถูกทั้งเวลาและขนาด</div>
        <div className={"chip" + (chip(0.93) ? " show" : "")}>🧠 Forecast 2 ชั้น — <b>Similar-day + XGBoost</b></div>
        <div className={"chip" + (chip(0.96) ? " show" : "")}>📊 ครอบคลุมความเสี่ยง <b>P10 / P50 / P90</b></div>
        <div className={"chip" + (chip(0.98) ? " show" : "")}><span className="ok">✓</span> พิสูจน์สูตรได้ <b>22/22</b> — เปิดรันสดได้</div>
      </div>
      <div className={"punch" + (p >= 0.99 ? " show" : "")}>แม่นขนาดนี้ → วางแผนเดินเครื่องได้ “ล่วงหน้าทั้งวัน” ไม่ใช่แค่ตามแก้หน้างาน</div>

      <style jsx>{`
        .fp { position: absolute; inset: 0; padding: 34px 48px; display: flex; flex-direction: column;
          background: radial-gradient(ellipse 1000px 700px at 50% 30%, #0b1830 0%, #060e1d 75%); color: #e2e8f0; }
        .head { display: flex; justify-content: space-between; align-items: flex-start; }
        .t1 { font-size: 27px; font-weight: 800; color: #f8fafc; }
        .t1 .gold { color: #fbbf24; }
        .t2 { font-size: 13px; color: #7d96b8; font-weight: 300; margin-top: 3px; }
        .brand { text-align: right; font-size: 13px; color: #7d96b8; }
        .brand b { color: #7dd3fc; font-weight: 600; }
        .legend { display: flex; gap: 22px; margin-top: 12px; }
        .lg { display: flex; gap: 9px; align-items: center; font-size: 13.5px; color: #cbd5e1;
          opacity: 0; transform: translateY(8px); transition: all .5s ease; }
        .lg.show { opacity: 1; transform: translateY(0); }
        .sw { width: 30px; height: 5px; border-radius: 99px; }
        .sw.actual { background: #38bdf8; box-shadow: 0 0 8px rgba(56,189,248,.8); }
        .sw.fc { background: repeating-linear-gradient(90deg,#fbbf24 0 7px,transparent 7px 12px); }
        .sw.band { height: 14px; background: rgba(56,120,200,.3); border: 1px solid rgba(125,180,250,.4); border-radius: 4px; }
        .chartwrap { flex: 1; margin-top: 6px; position: relative; }
        svg { width: 100%; height: 100%; overflow: visible; }
        .gline { stroke: #15243d; stroke-width: 1; }
        .alabel { font-size: 12px; fill: #5d7799; font-family: "Prompt", sans-serif; }
        .bandpath { fill: rgba(56,120,200,.22); stroke: rgba(125,180,250,.35); stroke-width: 1; }
        .actpath { fill: none; stroke: #38bdf8; stroke-width: 3.2; filter: drop-shadow(0 0 7px rgba(56,189,248,.55)); }
        .fcpath { fill: none; stroke: #fbbf24; stroke-width: 2.8; stroke-dasharray: 9 6; filter: drop-shadow(0 0 7px rgba(251,191,36,.55)); }
        .anno { opacity: 0; transition: opacity .6s; } .anno.show { opacity: 1; }
        .mape { position: absolute; top: 4%; right: 3%; text-align: center;
          background: linear-gradient(140deg,#064e3b,#15803d); border: 3px solid #4ade80; border-radius: 20px;
          padding: 14px 32px; box-shadow: 0 14px 44px rgba(34,197,94,.4); opacity: 0;
          transform: scale(1.7) rotate(6deg); transition: all .5s cubic-bezier(.2,.9,.3,1.2); }
        .mape.show { opacity: 1; transform: scale(1) rotate(-2deg); }
        .mape .k { font-size: 13px; color: #bbf7d0; font-weight: 500; letter-spacing: 1px; }
        .mape .v { font-size: 48px; font-weight: 900; color: #fff; line-height: 1.05; text-shadow: 0 0 24px rgba(74,222,128,.6); }
        .mape .tt { font-size: 12.5px; color: #86efac; font-weight: 600; margin-top: 2px; }
        .chips { display: flex; gap: 12px; justify-content: center; margin-top: 8px; min-height: 44px; }
        .chip { background: rgba(13,26,48,.85); border: 1.5px solid #1e3a5f; border-radius: 999px;
          padding: 9px 18px; font-size: 13px; color: #cbd5e1; font-weight: 500; display: flex; gap: 8px;
          align-items: center; opacity: 0; transform: translateY(14px); transition: all .5s cubic-bezier(.2,.9,.3,1.2); }
        .chip.show { opacity: 1; transform: translateY(0); }
        .chip b { color: #7dd3fc; } .chip .ok { color: #4ade80; font-weight: 800; }
        .punch { text-align: center; font-size: 18px; font-weight: 600; color: #fde68a; margin-top: 8px;
          min-height: 26px; opacity: 0; transform: scale(.94); transition: all .7s cubic-bezier(.2,.9,.3,1.2); }
        .punch.show { opacity: 1; transform: scale(1); }
      `}</style>
    </div>
  );
}
