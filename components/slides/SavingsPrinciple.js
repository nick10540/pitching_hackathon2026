"use client";
import { useSteps } from "../anim";

const FLOW = [
  ["1", "พยากรณ์โหลด", "Load_C = No6 + No9"],
  ["2", "เผื่อสำรอง", "Reserve = max(0.3, 10%·Load)"],
  ["3", "เช็คเฮดรูม", "P6 = min(8, No6 + H-3C)"],
];

// pentagon geometry — vertices of a 5-sided shape pointing up
const CX = 300, CY = 205, R = 160;
const ANG = [-90, -18, 54, 126, 198].map((d) => (d * Math.PI) / 180);
const V = ANG.map((a) => [CX + R * Math.cos(a), CY + R * Math.sin(a)]);

const DIMS = [
  { s: "S1", ic: "⛔", t: "ลดชั่วโมงเดิน DG9", d: "สายส่งพอ → ปิดเครื่อง", c: "green" },
  { s: "S2", ic: "🎯", t: "คุม FCF ใน ECO zone", d: "รักษาโหลด 60–75%", c: "teal" },
  { s: "S3", ic: "🔁", t: "ลด Start / Stop", d: "ลด crank waste", c: "sky" },
  { s: "S4", ic: "📉", t: "เลี่ยงเดิน Load ต่ำ", d: "< 60% ต่อเนื่อง", c: "violet" },
  { s: "S5", ic: "🛡️", t: "กัน Emergency / Overload", d: "ลดความเสี่ยงระบบ", c: "amber" },
];
const CARD_W = 170, CARD_H = 76;

export default function SavingsPrinciple({ active }) {
  const s = useSteps(active, [
    300, 650, 1000, 1450, 1850, // flow
    2400, 2750, 3000, 3250, 3500, 3750, // hub + 5 dims
    4400, // fcf
  ]);

  const pentPath =
    "M " + V.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ") + " Z";

  return (
    <div className="sp">
      <div className="head">
        <h1>หลักการประหยัด — <span className="g">หนึ่งกฎ ทุก 15 นาที</span></h1>
        <div className="sub">เดินดีเซลเฉพาะเมื่อสายส่งไม่พอ — แตกเป็น 5 มิติการประหยัด (S1–S5)</div>
      </div>

      {/* ───── decision flow (linear, easy to read) ───── */}
      <div className="flow">
        {FLOW.map(([no, tt, ds], k) => (
          <div key={k} className="fitem">
            <div className={"fstep" + (s >= k + 1 ? " show" : "")}>
              <div className="fno">{no}</div>
              <div className="ftx"><div className="ftt">{tt}</div><div className="fds">{ds}</div></div>
            </div>
            <div className={"farrow" + (s >= k + 1 ? " show" : "")}>→</div>
          </div>
        ))}

        <div className={"fdecision" + (s >= 4 ? " show" : "")}>
          <div className="dq">โหลด + สำรอง<br />≤ เฮดรูม ?</div>
        </div>
        <div className={"farrow" + (s >= 5 ? " show" : "")}>→</div>

        <div className="fresults">
          <div className={"res a" + (s >= 5 ? " show" : "")}>
            <span className="tick">✓</span>
            <div><b>Group A · DG9 OFF</b><span>ใช้ไฟจากสายส่ง · ★ ประหยัดสุด</span></div>
          </div>
          <div className={"res b" + (s >= 5 ? " show" : "")}>
            <span className="tick">✗</span>
            <div><b>Group B · DG9 ON</b><span>เดินใน ECO zone · lead 16 นาที</span></div>
          </div>
        </div>
      </div>

      {/* ───── 5-dimension pentagon ───── */}
      <div className="pentwrap">
        <div className="pent">
          <svg viewBox="0 0 600 420" className="pentsvg">
            <polygon points={V.map(([x, y]) => `${x},${y}`).join(" ")} className="pentline" />
            {V.map(([x, y], k) => (
              <line key={k} x1={CX} y1={CY} x2={x} y2={y}
                className={"spoke" + (s >= 7 + k ? " show" : "")} />
            ))}
          </svg>

          <div className={"hub" + (s >= 6 ? " show" : "")}>
            <div className="hubn">5</div>
            <div className="hubt">มิติ<br />ประหยัด</div>
          </div>

          {DIMS.map((d, k) => {
            const [x, y] = V[k];
            return (
              <div key={k} className={"dim " + d.c + (s >= 7 + k ? " show" : "")}
                style={{ left: x - CARD_W / 2, top: y - CARD_H / 2, width: CARD_W, height: CARD_H }}>
                <div className="dtag">{d.s}</div>
                <div className="dbody">
                  <div className="dt"><span className="dic">{d.ic}</span>{d.t}</div>
                  <div className="dd">{d.d}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={"fcf" + (s >= 12 ? " show" : "")}>
        <b>FCF (Fuel Curve Factor):</b> &lt;40% → 1.16 · 50–60% → 1.07 · 60–75% → 1.02 · ≥75% → 1.00
        &nbsp;— รักษา ECO zone = น้ำมันคุ้มค่าสุด/kWh
      </div>

      <div className="brand-tag" style={{ color: "#8aa1c2" }}>⚡ <b>Smart Energy IQ</b> · หลักการประหยัด 5 มิติ</div>

      <style jsx>{`
        .sp { position: absolute; inset: 0; padding: 26px 48px 16px; display: flex; flex-direction: column;
          background: radial-gradient(ellipse 1100px 760px at 50% 12%, #0c1c33 0%, #060e1d 76%); color: #e2e8f0; }
        .head { text-align: center; }
        .head h1 { font-size: 27px; font-weight: 800; color: #f8fafc; }
        .head h1 .g { color: #fbbf24; }
        .head .sub { font-size: 13.5px; color: #7d96b8; font-weight: 300; margin-top: 3px; }

        /* ── flow ── */
        .flow { display: flex; align-items: stretch; justify-content: center; gap: 4px; margin-top: 16px; }
        .fitem { display: flex; align-items: center; gap: 4px; }
        .fstep { display: flex; gap: 10px; align-items: center; background: rgba(13,26,48,.75);
          border: 1.5px solid #1e3a5f; border-radius: 13px; padding: 10px 14px; min-width: 168px;
          opacity: 0; transform: translateY(12px); transition: all .45s cubic-bezier(.2,.9,.3,1.2); }
        .fstep.show { opacity: 1; transform: translateY(0); }
        .fno { width: 30px; height: 30px; border-radius: 50%; background: #14304f; color: #7dd3fc;
          display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0; }
        .ftt { font-size: 14px; font-weight: 700; color: #e2e8f0; }
        .fds { font-size: 11px; color: #8fb0d6; font-family: monospace; margin-top: 1px; }
        .farrow { color: #3d5e89; font-size: 22px; font-weight: 700; opacity: 0; transition: opacity .4s; }
        .farrow.show { opacity: 1; }
        .fdecision { display: flex; align-items: center; justify-content: center; width: 120px; height: 64px;
          background: linear-gradient(145deg,#3a2c0a,#52400f); border: 1.5px solid #d97706; border-radius: 14px;
          opacity: 0; transform: scale(.85); transition: all .5s cubic-bezier(.2,.9,.3,1.3); }
        .fdecision.show { opacity: 1; transform: scale(1); }
        .dq { font-size: 12.5px; font-weight: 700; color: #fcd34d; text-align: center; line-height: 1.3; }
        .fresults { display: flex; flex-direction: column; gap: 7px; }
        .res { display: flex; gap: 10px; align-items: center; border-radius: 12px; padding: 8px 14px;
          min-width: 232px; opacity: 0; transform: translateX(14px); transition: all .5s cubic-bezier(.2,.9,.3,1.2); }
        .res.show { opacity: 1; transform: translateX(0); }
        .res.a { background: rgba(8,40,24,.6); border: 1.5px solid #16a34a; }
        .res.b { background: rgba(50,30,8,.5); border: 1.5px solid #d97706; }
        .res .tick { font-size: 18px; font-weight: 900; }
        .res.a .tick { color: #4ade80; } .res.b .tick { color: #fbbf24; }
        .res b { font-size: 13.5px; display: block; color: #f1f5f9; }
        .res span:not(.tick) { font-size: 11px; color: #aac3e0; }

        /* ── pentagon ── */
        .pentwrap { flex: 1; display: flex; align-items: center; justify-content: center; margin-top: 4px; }
        .pent { position: relative; width: 600px; height: 420px; }
        .pentsvg { position: absolute; inset: 0; width: 600px; height: 420px; overflow: visible; }
        .pentline { fill: rgba(56,120,200,.05); stroke: #1e3a5f; stroke-width: 2; stroke-dasharray: 6 6; }
        .spoke { stroke: #24456e; stroke-width: 2; opacity: 0; transition: opacity .5s; }
        .spoke.show { opacity: 1; }
        .hub { position: absolute; left: ${CX - 58}px; top: ${CY - 58}px; width: 116px; height: 116px;
          border-radius: 50%; background: radial-gradient(circle,#fbbf24,#b45309);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          box-shadow: 0 0 40px rgba(251,191,36,.5); opacity: 0; transform: scale(.5);
          transition: all .6s cubic-bezier(.2,.9,.3,1.4); }
        .hub.show { opacity: 1; transform: scale(1); }
        .hubn { font-size: 38px; font-weight: 900; color: #fff; line-height: 1; }
        .hubt { font-size: 12px; font-weight: 700; color: #fff7e0; text-align: center; line-height: 1.2; margin-top: 2px; }

        .dim { position: absolute; display: flex; gap: 9px; align-items: center; border-radius: 14px;
          padding: 9px 12px; background: rgba(13,26,48,.92); backdrop-filter: blur(2px);
          opacity: 0; transform: scale(.8); transition: all .5s cubic-bezier(.2,.9,.3,1.35); }
        .dim.show { opacity: 1; transform: scale(1); }
        .dtag { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center;
          justify-content: center; font-weight: 800; font-size: 14px; color: #fff; flex-shrink: 0; }
        .dim.green { border: 1.5px solid #22c55e; } .green .dtag { background: linear-gradient(140deg,#16a34a,#14532d); }
        .dim.teal { border: 1.5px solid #14b8a6; } .teal .dtag { background: linear-gradient(140deg,#0d9488,#115e59); }
        .dim.sky { border: 1.5px solid #38bdf8; } .sky .dtag { background: linear-gradient(140deg,#0284c7,#0c4a6e); }
        .dim.violet { border: 1.5px solid #8b5cf6; } .violet .dtag { background: linear-gradient(140deg,#7c3aed,#5b21b6); }
        .dim.amber { border: 1.5px solid #f59e0b; } .amber .dtag { background: linear-gradient(140deg,#d97706,#92400e); }
        .dt { font-size: 13px; font-weight: 700; color: #f1f5f9; line-height: 1.2; display: flex; gap: 5px; align-items: center; }
        .dic { font-size: 15px; }
        .dd { font-size: 10.5px; color: #9fb6d6; margin-top: 2px; }

        .fcf { margin-top: 6px; text-align: center; font-size: 12px; color: #bcd3f0;
          background: rgba(8,32,52,.7); border: 1.5px solid #1e4d6b; border-radius: 12px; padding: 8px 18px;
          opacity: 0; transition: opacity .5s; }
        .fcf.show { opacity: 1; }
        .fcf b { color: #7dd3fc; }
      `}</style>
    </div>
  );
}
