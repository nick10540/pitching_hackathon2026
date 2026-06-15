"use client";
import { useSteps } from "../anim";

const CAPEX = [
  ["ทีมพัฒนา (Development Team)", "฿1M", 14.3],
  ["Edge device + เชื่อมต่อ SCADA Integration", "฿5M", 71.4],
  ["ตั้งค่าเริ่มต้น AWS (Initial Setup)", "฿1M", 14.3],
];
const OPEX = [
  ["ทีมบำรุงรักษา (MLOps 0.5 FTE)", "฿0.6M", 27.3],
  ["ซัพพอร์ต + Monitor", "฿0.8M", 36.4],
  ["โครงสร้างพื้นฐาน AWS", "฿0.8M", 36.4],
];

export default function CapexOpex({ active }) {
  const s = useSteps(active, [300, 900, 1300, 1700, 2200, 2800, 3200, 3600, 4100, 4700]);
  return (
    <div className="co">
      <div className="head">
        <h1>การลงทุน — <span className="g">CAPEX &amp; OPEX</span> ต่อ 1 เกาะ</h1>
        <div className="sub">ลงทุนเริ่มต้นต่อ 1 เกาะ · Edge + SCADA Integration + Cloud — AWS เป็นเพียง 36.4% ของ OPEX</div>
      </div>

      <div className="cols">
        <div className={"panel capex" + (s >= 1 ? " show" : "")}>
          <div className="ph">CAPEX — ครั้งเดียว (PoC → Production)</div>
          <div className="rows">
            {CAPEX.map(([n, c, pct], k) => (
              <div key={k} className={"row" + (s >= 2 + k ? " show" : "")}>
                <div className="rn">{n}</div>
                <div className="rbarwrap"><div className="rbar cap" style={{ width: (s >= 2 + k ? pct : 0) + "%" }} /></div>
                <div className="rc">{c}<span className="rpct">{pct}%</span></div>
              </div>
            ))}
          </div>
          <div className="total cap">CAPEX รวม <b>฿7M</b></div>
        </div>

        <div className={"panel opex" + (s >= 5 ? " show" : "")}>
          <div className="ph">OPEX — ประจำปี</div>
          <div className="rows">
            {OPEX.map(([n, c, pct], k) => (
              <div key={k} className={"row" + (s >= 6 + k ? " show" : "")}>
                <div className="rn">{n}</div>
                <div className="rbarwrap"><div className="rbar op" style={{ width: (s >= 6 + k ? pct : 0) + "%" }} /></div>
                <div className="rc">{c}<span className="rpct">{pct}%</span></div>
              </div>
            ))}
          </div>
          <div className="total op">OPEX รวม <b>฿2.2M / ปี</b></div>
        </div>
      </div>

      <div className={"note" + (s >= 9 ? " show" : "")}>
        💡 ลงทุนครั้งเดียว <b>฿7M</b> + ดูแลปีละ <b>฿2.2M</b> — เทียบกับค่าเสียโอกาส <b>฿158.7M/ปี</b> ที่เกาะเดียว
      </div>

      <div className="brand-tag" style={{ color: "#94a3b8" }}>⚡ <b style={{ color: "#0284c7" }}>Smart Energy IQ</b> · CAPEX &amp; OPEX</div>

      <style jsx>{`
        .co { position: absolute; inset: 0; background: #fff; color: #334155; padding: 34px 48px;
          display: flex; flex-direction: column; }
        .head h1 { font-size: 28px; font-weight: 800; color: #0f172a; }
        .head h1 .g { color: #0284c7; }
        .head .sub { font-size: 14px; color: #64748b; font-weight: 300; margin-top: 4px; }
        .cols { flex: 1; display: flex; gap: 26px; margin-top: 20px; }
        .panel { flex: 1; border-radius: 18px; padding: 20px 24px; display: flex; flex-direction: column;
          opacity: 0; transform: translateY(20px); transition: all .6s cubic-bezier(.2,.9,.3,1.2); }
        .panel.show { opacity: 1; transform: translateY(0); }
        .capex { background: linear-gradient(160deg,#eff6ff,#f8fbff); border: 2px solid #bfdbfe; }
        .opex { background: linear-gradient(160deg,#f0fdf4,#f7fef9); border: 2px solid #bbf7d0; }
        .ph { font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 14px; }
        .rows { flex: 1; display: flex; flex-direction: column; gap: 14px; justify-content: center; }
        .row { display: flex; align-items: center; gap: 14px; opacity: 0; transform: translateX(-12px);
          transition: all .5s cubic-bezier(.2,.9,.3,1.2); }
        .row.show { opacity: 1; transform: translateX(0); }
        .rn { width: 210px; font-size: 13.5px; color: #475569; font-weight: 500; line-height: 1.3; }
        .rbarwrap { flex: 1; height: 22px; background: #e8eef6; border-radius: 8px; overflow: hidden; }
        .rbar { height: 100%; border-radius: 8px; transition: width 1s cubic-bezier(.2,.8,.3,1); }
        .rbar.cap { background: linear-gradient(90deg,#3b82f6,#60a5fa); }
        .rbar.op { background: linear-gradient(90deg,#16a34a,#4ade80); }
        .rc { width: 96px; text-align: right; font-size: 16px; font-weight: 800; color: #0f172a; }
        .rpct { display: block; font-size: 11px; font-weight: 600; color: #94a3b8; }
        .total { margin-top: 16px; text-align: right; font-size: 16px; color: #475569; font-weight: 600;
          padding-top: 12px; border-top: 1.5px dashed #cbd5e1; }
        .total b { font-size: 24px; margin-left: 8px; }
        .total.cap b { color: #1d4ed8; } .total.op b { color: #15803d; }
        .note { margin-top: 16px; text-align: center; font-size: 15px; color: #475569;
          background: #fffbeb; border: 1.5px solid #fcd34d; border-radius: 14px; padding: 12px 22px;
          opacity: 0; transition: opacity .5s; }
        .note.show { opacity: 1; }
        .note b { color: #b45309; font-weight: 800; }
      `}</style>
    </div>
  );
}
