"use client";
import { useEffect, useRef, useState } from "react";
import { fmt } from "../anim";

const YEARS = 10;
const M_PER_YEAR = 169; // ล้านบาท/ปี (14.08M × 12)
const CO2_PER_YEAR = 4524; // ตัน/ปี
const W = 1180, H = 320, PAD_L = 64, PAD_R = 40, PAD_T = 22, PAD_B = 30;
const plotW = W - PAD_L - PAD_R, plotH = H - PAD_T - PAD_B;
const maxY = YEARS * M_PER_YEAR * 1.07;
const xOf = (yr) => PAD_L + (yr / YEARS) * plotW;
const yOf = (m) => PAD_T + plotH - (m / maxY) * plotH;

const MILESTONES = [
  { yr: 1 / 12, label: "1 เดือน", value: "฿14M", dy: -50 },
  { yr: 1, label: "1 ปี", value: "฿169M", dy: -50 },
  { yr: 5, label: "5 ปี", value: "฿845M", dy: -54 },
  { yr: 10, label: "10 ปี", value: "฿1,690M", dy: -58 },
];

export default function OpportunityCost({ active }) {
  const [p, setP] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!active) { setP(0); return; }
    const DUR = 7000;
    const t0 = performance.now();
    const tick = (t) => {
      const raw = Math.min((t - t0) / DUR, 1);
      setP(1 - Math.pow(1 - raw, 3));
      if (raw < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active]);

  const yr = p * YEARS;
  const steps = 80;
  let d = `M ${xOf(0)} ${yOf(0)}`;
  for (let i = 1; i <= steps; i++) {
    const yy = (i / steps) * yr;
    d += ` L ${xOf(yy)} ${yOf(yy * M_PER_YEAR)}`;
  }
  const area = d + ` L ${xOf(yr)} ${yOf(0)} Z`;

  const TOASTS = [
    ["🔌", "ไฟดับ 1 ครั้ง", "= นักท่องเที่ยว 3,000+ คนเสียประสบการณ์ → รีวิวแย่ → รายได้หาย", 0.12],
    ["🔧", "DG9 เดินหนักเกิน", "→ เครื่องเสื่อมเร็ว → ค่าซ่อม/เปลี่ยนเครื่องเพิ่มทุกปี", 0.35],
    ["😓", "Operator เฝ้า 24/7", "ไม่มีระบบเตือน → เสี่ยง human error ทุกคืน", 0.6],
    ["🌏", "Thailand Net Zero 2065", "→ PEA ถูกกดดันด้านนโยบายเพิ่มขึ้นเรื่อย ๆ", 0.82],
  ];

  const grid = [];
  for (let v = 0; v <= 1600; v += 400) {
    grid.push(<line key={"g" + v} className="grid" x1={PAD_L} y1={yOf(v)} x2={W - PAD_R} y2={yOf(v)} />);
    grid.push(<text key={"gt" + v} className="axis-lb" x={PAD_L - 8} y={yOf(v) + 4} textAnchor="end">฿{v.toLocaleString()}M</text>);
  }
  for (let g = 0; g <= YEARS; g++) {
    grid.push(<text key={"yx" + g} className="axis-lb" x={xOf(g)} y={H - 8} textAnchor="middle">ปีที่ {g}</text>);
  }

  let badge = "เริ่มนับ…";
  if (yr >= 0.13 && yr < 1.2) badge = "ครบ 1 ปี — ฿169 ล้านหายไปแล้ว";
  else if (yr >= 1.2 && yr < 5.2) badge = "ปีที่ " + Math.floor(yr) + " — ยังไม่มีใครแก้";
  else if (yr >= 5.2) badge = "ปีที่ " + Math.floor(yr) + " — เงินที่หายไปซื้อ EMS ได้หลายสิบระบบ";

  return (
    <div className="oc">
      <div className="head">
        <div>
          <div className="title">ถ้า<span className="red">ไม่ทำอะไรเลย</span> เกาะเต่าเสียโอกาสเท่าไหร่?</div>
          <div className="subtitle">ค่าเสียโอกาสสะสมจากการเดินดีเซลแบบเดิม (DG9 เดิน 99.5% ของเวลา) · ฐานข้อมูลจริง ส.ค. 2568</div>
        </div>
        <div className="brand"><div className="nm">⚡ Smart Energy IQ</div><div className="tg">PEA Hackathon 2026 · เกาะเต่า</div></div>
      </div>

      <div className="counters">
        <div className="counter c-time"><div className="lb">เวลาผ่านไป</div><div className="vl">{fmt(yr, 1)}<span className="un">ปี</span></div></div>
        <div className="counter c-money"><div className="lb">เงินที่เผาทิ้งสะสม (ค่าเสียโอกาส)</div><div className="vl">฿{fmt(yr * M_PER_YEAR)}<span className="un">ล้านบาท</span></div></div>
        <div className="counter c-co2"><div className="lb">CO₂ ปล่อยเกินจำเป็นสะสม</div><div className="vl">{fmt(yr * CO2_PER_YEAR)}<span className="un">ตัน</span></div></div>
      </div>

      <div className="chartwrap">
        <div className="yearbadge">{badge}</div>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc2626" stopOpacity=".22" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity=".02" />
            </linearGradient>
          </defs>
          <g>{grid}</g>
          <path className="area" d={area} style={{ opacity: p > 0 ? 1 : 0 }} />
          <path className="line" d={d} />
          {MILESTONES.map((m, i) => {
            const x = xOf(m.yr), y = yOf(m.yr * M_PER_YEAR);
            const tw = 104; let tx = x - tw / 2;
            if (tx < PAD_L) tx = PAD_L;
            if (tx + tw > W - PAD_R) tx = W - PAD_R - tw;
            return (
              <g key={i} className={"ms" + (yr >= m.yr - 0.01 ? " show" : "")}>
                <circle cx={x} cy={y} r="7" />
                <rect className="tag-bg" x={tx} y={y + m.dy} width={tw} height="44" rx="8" />
                <text className="tag-t" x={tx + tw / 2} y={y + m.dy + 17} textAnchor="middle">{m.label}</text>
                <text className="tag-v" x={tx + tw / 2} y={y + m.dy + 36} textAnchor="middle">{m.value}</text>
              </g>
            );
          })}
        </svg>
        <div className={"punch" + (p >= 0.985 ? " show" : "")}>
          <div className="b1">10 ปี ที่เกาะเดียว =</div>
          <div className="b2">฿1,690 ล้าน</div>
          <div className="b3">+ CO₂ 45,240 ตัน ที่ไม่ควรเกิด</div>
        </div>
      </div>

      <div className="toasts">
        {TOASTS.map(([ic, b, tx, at], k) => (
          <div key={k} className={"toast" + (p >= at ? " show" : "")}>
            <div className="ic">{ic}</div>
            <div className="tx"><b>{b}</b> {tx}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .oc { position: absolute; inset: 0; background: #fff; color: #334155; padding: 32px 48px;
          display: flex; flex-direction: column; }
        .head { display: flex; justify-content: space-between; align-items: flex-start; }
        .title { font-size: 29px; font-weight: 700; color: #0f172a; line-height: 1.25; }
        .title .red { color: #dc2626; }
        .subtitle { font-size: 13.5px; color: #64748b; margin-top: 4px; font-weight: 300; }
        .brand { text-align: right; }
        .brand .nm { font-size: 15px; font-weight: 600; color: #0284c7; }
        .brand .tg { font-size: 11px; color: #94a3b8; }
        .counters { display: flex; gap: 18px; margin-top: 16px; }
        .counter { flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px;
          padding: 13px 18px; position: relative; overflow: hidden; box-shadow: 0 1px 3px rgba(15,23,42,.05); }
        .counter .lb { font-size: 12.5px; color: #64748b; }
        .counter .vl { font-size: 29px; font-weight: 800; margin-top: 2px; font-variant-numeric: tabular-nums; }
        .counter .un { font-size: 13px; font-weight: 500; color: #94a3b8; margin-left: 4px; }
        .c-money .vl { color: #dc2626; } .c-co2 .vl { color: #d97706; } .c-time .vl { color: #0284c7; }
        .counter::after { content: ""; position: absolute; left: 0; bottom: 0; height: 3px; width: 100%;
          background: linear-gradient(90deg,#dc2626,#d97706); opacity: .5; }
        .chartwrap { flex: 1; margin-top: 14px; position: relative; }
        svg { width: 100%; height: 100%; overflow: visible; }
        .axis-lb { font-size: 12px; fill: #94a3b8; font-family: "Prompt", sans-serif; }
        .grid { stroke: #e8edf4; stroke-width: 1; }
        .area { fill: url(#gradArea); }
        .line { fill: none; stroke: #dc2626; stroke-width: 3.5; filter: drop-shadow(0 2px 5px rgba(220,38,38,.3)); }
        .ms { opacity: 0; transition: opacity .5s; }
        .ms.show { opacity: 1; }
        .ms circle { fill: #fff; stroke: #dc2626; stroke-width: 3; }
        .ms .tag-bg { fill: #fff; stroke: #fca5a5; stroke-width: 1.4; filter: drop-shadow(0 2px 5px rgba(15,23,42,.12)); }
        .ms .tag-t { font-size: 12px; fill: #64748b; font-family: "Prompt", sans-serif; }
        .ms .tag-v { font-size: 16px; font-weight: 700; fill: #dc2626; font-family: "Prompt", sans-serif; }
        .yearbadge { position: absolute; left: 50%; transform: translateX(-50%); top: -6px;
          background: #eff6ff; border: 1px solid #7dd3fc; color: #0369a1; font-size: 13px; font-weight: 600;
          border-radius: 999px; padding: 4px 16px; z-index: 5; }
        .punch { position: absolute; right: 60px; top: 96px; text-align: right; opacity: 0;
          transform: scale(.85); transition: all .7s cubic-bezier(.2,.9,.3,1.25); }
        .punch.show { opacity: 1; transform: scale(1); }
        .punch .b1 { font-size: 16px; color: #64748b; }
        .punch .b2 { font-size: 50px; font-weight: 800; color: #dc2626; text-shadow: 0 2px 18px rgba(220,38,38,.25); line-height: 1.1; }
        .punch .b3 { font-size: 15px; color: #b45309; margin-top: 4px; }
        .toasts { display: flex; gap: 12px; margin-top: 8px; min-height: 60px; }
        .toast { flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;
          padding: 9px 14px; display: flex; gap: 10px; align-items: center; box-shadow: 0 1px 3px rgba(15,23,42,.05);
          opacity: 0; transform: translateY(14px); transition: all .55s cubic-bezier(.2,.9,.3,1.2); }
        .toast.show { opacity: 1; transform: translateY(0); }
        .toast .ic { font-size: 22px; }
        .toast .tx { font-size: 12px; line-height: 1.4; color: #475569; }
        .toast .tx b { color: #b45309; font-weight: 600; }
      `}</style>
    </div>
  );
}
