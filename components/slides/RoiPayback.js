"use client";
import { useSteps } from "../anim";

const CARDS = [
  {
    icon: "💰",
    title: "การเงิน (Financial)",
    metric: "฿13.23M",
    metricSub: "/เดือน",
    bullets: [
      "ประหยัดสุทธิต่อเกาะ (ข้อมูลจริง)",
      "ต้นทุน DG9 ลด −53.6%",
      "ลงทุนครั้งเดียว ฿7M · คืนเร็วสุด",
    ],
    tag: "ตอบ Viability 40% · กรรมการธุรกิจ",
    color: "fin",
    step: 5,
  },
  {
    icon: "🌱",
    title: "สิ่งแวดล้อม (ESG)",
    metric: "−4,500",
    metricSub: "ตัน/ปี",
    bullets: [
      "CO₂ ลดลงต่อเกาะ (377 ตัน/เดือน)",
      "ตอบเป้า Carbon Neutrality ของชาติ",
      "PEA รายงานผลการลดคาร์บอนได้ทันที",
    ],
    tag: "ตอบ ยุทธศาสตร์/นโยบาย",
    color: "esg",
    step: 6,
  },
  {
    icon: "👷",
    title: "คน & ปฏิบัติการ",
    metric: "60 → 3",
    metricSub: "นาที",
    bullets: [
      "เวลารับมือเหตุของ operator",
      "ความเครียด 95% → 12%",
      "ลด human error · ลดภาระ 24/7",
    ],
    tag: "ตอบ People / Productivity",
    color: "ops",
    step: 7,
  },
  {
    icon: "🔌",
    title: "ความมั่นคงไฟฟ้า",
    metric: "16 นาที",
    metricSub: "เดือนก่อน",
    bullets: [
      "ลดความถี่/ระยะเวลาไฟดับ",
      "ดัชนี SAIDI / SAIFI ดีขึ้น",
      "ป้องกันไฟดับแบบ N-1 บนเกาะ",
    ],
    tag: "ตอบ Feasibility / กกพ.",
    color: "rel",
    step: 8,
  },
];

const HERO = [
  { val: "16 วัน", label: "ระยะเวลาคืนทุน", sub: "฿7M ÷ ฿13.23M/เดือน", color: "hgold" },
  { val: "฿149.5M", label: "ประโยชน์สุทธิ ปีที่ 1", sub: "ประหยัด − CAPEX − OPEX", color: "hblue" },
  { val: "฿775.5M", label: "ประโยชน์สุทธิ 5 ปี", sub: "OPEX รวม 5 ปี ฿11M", color: "hgreen" },
  { val: "Best case*", label: "หมายเหตุ", sub: "เดินเครื่องตามที่ระบบแนะนำ · โหลดปกติ", color: "hgray" },
];

export default function RoiPayback({ active }) {
  const s = useSteps(active, [200, 500, 800, 1100, 1400, 1700, 2000, 2300]);
  return (
    <div className="roi">
      <div className={"head" + (s >= 0 ? " show" : "")}>
        <h1>Impact — <span className="g">ผลลัพธ์ที่ตอบโจทย์ PEA</span></h1>
        <div className="sub">Smart Energy IQ ส่งผลกระทบครอบคลุม 4 มิติ จากข้อมูลจริง มี.ค. 2569</div>
      </div>

      <div className="hero-row">
        {HERO.map(({ val, label, sub, color }, k) => (
          <div key={k} className={`hcard ${color}${s >= 1 + k ? " show" : ""}`}>
            <div className="hv">{val}</div>
            <div className="hl">{label}</div>
            <div className="hs">{sub}</div>
          </div>
        ))}
      </div>

      <div className="cards">
        {CARDS.map(({ icon, title, metric, metricSub, bullets, tag, color, step }) => (
          <div key={color} className={`card ${color}${s >= step ? " show" : ""}`}>
            <div className="card-top">
              <span className="icon-wrap"><span className="icon">{icon}</span></span>
              <div className="card-title">{title}</div>
            </div>
            <div className="metric">
              {metric}<span className="metric-sub">{metricSub}</span>
            </div>
            <ul className="blist">
              {bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <div className="tag">{tag}</div>
          </div>
        ))}
      </div>

      <div className="brand-tag">⚡ <b style={{ color: "#0284c7" }}>Smart Energy IQ</b> · Impact Overview</div>

      <style jsx>{`
        .roi { position: absolute; inset: 0; background: #f8fafc; color: #334155; padding: 26px 40px 20px;
          display: flex; flex-direction: column; }
        .head { opacity: 0; transform: translateY(-12px); transition: all .5s ease; }
        .head.show { opacity: 1; transform: translateY(0); }
        .head h1 { font-size: 26px; font-weight: 800; color: #0f172a; }
        .head h1 .g { color: #0284c7; }
        .head .sub { font-size: 13px; color: #64748b; margin-top: 3px; }
        /* Hero summary row */
        .hero-row { display: flex; gap: 14px; margin-top: 14px; }
        .hcard { flex: 1; border-radius: 14px; padding: 12px 16px; text-align: center;
          opacity: 0; transform: translateY(16px) scale(.95); transition: all .5s cubic-bezier(.2,.9,.3,1.2); }
        .hcard.show { opacity: 1; transform: translateY(0) scale(1); }
        .hv { font-size: 24px; font-weight: 900; line-height: 1.1; }
        .hl { font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 3px; }
        .hs { font-size: 11px; color: #94a3b8; margin-top: 2px; }
        .hgold { background: linear-gradient(160deg,#fffbeb,#fef9c3); border: 2px solid #fcd34d; }
        .hgold .hv { color: #b45309; }
        .hblue { background: linear-gradient(160deg,#eff6ff,#f0f9ff); border: 2px solid #93c5fd; }
        .hblue .hv { color: #1d4ed8; }
        .hgreen { background: linear-gradient(160deg,#f0fdf4,#ecfdf5); border: 2px solid #86efac; }
        .hgreen .hv { color: #15803d; }
        .hgray { background: linear-gradient(160deg,#f8fafc,#f1f5f9); border: 2px solid #cbd5e1; }
        .hgray .hv { font-size: 16px; color: #475569; padding-top: 4px; }
        .hgray .hs { font-size: 10.5px; }
        .cards { flex: 1; display: flex; gap: 14px; margin-top: 14px; }
        .card { flex: 1; border-radius: 20px; padding: 22px 18px 16px; display: flex; flex-direction: column; gap: 10px;
          opacity: 0; transform: translateY(28px) scale(.95); transition: all .6s cubic-bezier(.2,.9,.3,1.2); }
        .card.show { opacity: 1; transform: translateY(0) scale(1); }
        .card-top { display: flex; align-items: center; gap: 12px; }
        .icon-wrap { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center;
          justify-content: center; font-size: 26px; flex-shrink: 0; }
        .card-title { font-size: 15px; font-weight: 700; color: #0f172a; line-height: 1.35; }
        .metric { font-size: 34px; font-weight: 900; line-height: 1.1; margin-top: 4px; }
        .metric-sub { font-size: 15px; font-weight: 600; margin-left: 4px; vertical-align: middle; }
        .blist { margin: 0; padding: 0 0 0 16px; flex: 1; display: flex; flex-direction: column; gap: 7px; }
        .blist li { font-size: 13px; color: #475569; line-height: 1.45; }
        .tag { font-size: 12px; font-weight: 700; text-align: center; padding: 8px 10px;
          border-radius: 10px; margin-top: 4px; }

        /* Financial — green */
        .fin { background: linear-gradient(160deg,#f0fdf4,#ecfdf5); border: 2px solid #86efac; }
        .fin .icon-wrap { background: #16a34a; }
        .fin .metric { color: #16a34a; }
        .fin .metric-sub { color: #15803d; }
        .fin .tag { background: #dcfce7; color: #15803d; }

        /* ESG — teal/dark green */
        .esg { background: linear-gradient(160deg,#f0fdf4,#ecfdf5); border: 2px solid #4ade80; }
        .esg .icon-wrap { background: #15803d; }
        .esg .metric { color: #15803d; }
        .esg .metric-sub { color: #166534; }
        .esg .tag { background: #dcfce7; color: #15803d; }

        /* Ops — orange */
        .ops { background: linear-gradient(160deg,#fff7ed,#ffedd5); border: 2px solid #fdba74; }
        .ops .icon-wrap { background: #ea580c; }
        .ops .metric { color: #ea580c; }
        .ops .metric-sub { color: #c2410c; }
        .ops .tag { background: #ffedd5; color: #c2410c; }

        /* Reliability — indigo */
        .rel { background: linear-gradient(160deg,#eef2ff,#eff6ff); border: 2px solid #818cf8; }
        .rel .icon-wrap { background: #4f46e5; }
        .rel .metric { color: #4f46e5; }
        .rel .metric-sub { color: #4338ca; }
        .rel .tag { background: #e0e7ff; color: #4338ca; }

        .brand-tag { margin-top: 14px; font-size: 13px; color: #94a3b8; text-align: right; }
      `}</style>
    </div>
  );
}
