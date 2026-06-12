"use client";
import { useSteps } from "../anim";

const TIERS = [
  {
    tag: "Tier 1", name: "สัญญา PoC", price: "฿1.5–2M ค่าธรรมเนียมคงที่ / เกาะ · ปี 0",
    items: ["สร้าง PoC + UAT ภายใน 20 วัน", "ฝึกอบรมผู้ปฏิบัติงาน P1", "SLA การสนับสนุน 30 วัน"],
    color: "blue", foot: "เริ่มต้นความเชื่อมั่น",
  },
  {
    tag: "Tier 2", name: "Gain Share", price: "15–20% ของการประหยัดที่ยืนยันได้ / ปี",
    items: ["รายงานการประหยัดรายเดือนเทียบ baseline", "ปรับจูนโมเดลต่อเนื่อง", "฿100M+ × 15% = ฿15M+/ปี ศักยภาพ"],
    color: "green", foot: "PEA จ่ายจากเงินที่ประหยัดจริง", star: true,
  },
  {
    tag: "Tier 3", name: "ใบอนุญาต SaaS", price: "฿500K–1M / เกาะ / ปี · ปี 2+",
    items: ["แดชบอร์ดศูนย์กลางหลายเกาะ", "API + GenAI Advisory", "20 islands ≈ ฿15M ARR"],
    color: "gold", foot: "ขยายสเกลทั้งประเทศ",
  },
];

export default function BusinessModel({ active }) {
  const s = useSteps(active, [300, 1100, 1900, 2700]);
  return (
    <div className="bm">
      <div className="head">
        <h1>รูปแบบธุรกิจ — <span className="g">Precise Nextxus</span></h1>
        <div className="sub">โมเดล 3 ชั้น · เริ่มจากความเสี่ยงต่ำ แล้วเติบโตไปพร้อม PEA</div>
      </div>

      <div className="tiers">
        {TIERS.map((t, k) => (
          <div key={k} className={"tier " + t.color + (s >= k + 1 ? " show" : "") + (t.star ? " hero" : "")}>
            {t.star && <div className="ribbon">★ กลยุทธ์หลัก</div>}
            <div className="ttag">{t.tag}</div>
            <div className="tname">{t.name}</div>
            <div className="tprice">{t.price}</div>
            <ul>
              {t.items.map((it, j) => <li key={j}>{it}</li>)}
            </ul>
            <div className="tfoot">{t.foot}</div>
          </div>
        ))}
      </div>

      <div className={"strategy" + (s >= 4 ? " show" : "")}>
        🎯 <b>กลยุทธ์:</b> เริ่มด้วย Gain-Share — PEA จ่ายจากการประหยัดจริง ไม่ต้องขออนุมัติงบใหม่
        จากนั้นค่อยเปลี่ยนเป็น SaaS เมื่อขยายสเกลไปหลายเกาะ
      </div>

      <div className="brand-tag" style={{ color: "#94a3b8" }}>⚡ <b style={{ color: "#0284c7" }}>Smart Energy IQ</b> · Business Model</div>

      <style jsx>{`
        .bm { position: absolute; inset: 0; background: #fff; color: #334155; padding: 34px 48px;
          display: flex; flex-direction: column; }
        .head h1 { font-size: 28px; font-weight: 800; color: #0f172a; }
        .head h1 .g { color: #0284c7; }
        .head .sub { font-size: 14px; color: #64748b; font-weight: 300; margin-top: 4px; }
        .tiers { flex: 1; display: flex; gap: 22px; margin-top: 20px; align-items: stretch; }
        .tier { flex: 1; border-radius: 18px; padding: 22px 22px 18px; display: flex; flex-direction: column;
          position: relative; opacity: 0; transform: translateY(26px); transition: all .55s cubic-bezier(.2,.9,.3,1.25); }
        .tier.show { opacity: 1; transform: translateY(0); }
        .tier.blue { background: linear-gradient(165deg,#eff6ff,#f8fbff); border: 2px solid #bfdbfe; }
        .tier.green { background: linear-gradient(165deg,#f0fdf4,#f7fef9); border: 2px solid #86efac; }
        .tier.gold { background: linear-gradient(165deg,#fffbeb,#fef9c3); border: 2px solid #fcd34d; }
        .tier.hero { transform: translateY(26px) scale(1.03); box-shadow: 0 14px 36px rgba(22,163,74,.22); }
        .tier.hero.show { transform: translateY(0) scale(1.03); }
        .ribbon { position: absolute; top: -12px; right: 18px; background: #15803d; color: #fff;
          font-size: 12px; font-weight: 700; border-radius: 999px; padding: 4px 14px; box-shadow: 0 4px 12px rgba(21,128,61,.3); }
        .ttag { font-size: 13px; font-weight: 700; color: #64748b; }
        .tname { font-size: 23px; font-weight: 800; color: #0f172a; margin-top: 2px; }
        .blue .tname { color: #1d4ed8; } .green .tname { color: #15803d; } .gold .tname { color: #b45309; }
        .tprice { font-size: 14px; font-weight: 600; color: #334155; margin-top: 8px; line-height: 1.4;
          padding-bottom: 12px; border-bottom: 1.5px dashed #cbd5e1; }
        ul { list-style: none; margin: 14px 0 0; padding: 0; flex: 1; display: flex; flex-direction: column; gap: 9px; }
        li { font-size: 13.5px; color: #475569; line-height: 1.4; padding-left: 22px; position: relative; }
        li::before { content: "✓"; position: absolute; left: 0; color: #16a34a; font-weight: 800; }
        .tfoot { margin-top: 14px; font-size: 12.5px; font-weight: 600; text-align: center; color: #64748b;
          background: rgba(255,255,255,.6); border-radius: 10px; padding: 8px; }
        .strategy { margin-top: 18px; text-align: center; font-size: 14.5px; color: #475569;
          background: #ecfdf5; border: 1.5px solid #86efac; border-radius: 14px; padding: 13px 22px;
          opacity: 0; transition: opacity .5s; }
        .strategy.show { opacity: 1; }
        .strategy b { color: #15803d; }
      `}</style>
    </div>
  );
}
