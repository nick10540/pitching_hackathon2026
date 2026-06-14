"use client";
import { useSteps } from "../anim";

const ROWS = [
  ["ประหยัดรวม (DG9 + Island)", "฿158.7M", "฿793.5M", "pos"],
  ["CAPEX (เฉพาะปีที่ 1)", "−฿8M", "−฿8M", "neg"],
  ["OPEX", "−฿2.2M", "−฿11M", "neg"],
  ["ประโยชน์สุทธิต่อ PEA", "฿148.5M", "฿774.5M", "net"],
];

export default function RoiPayback({ active }) {
  const s = useSteps(active, [300, 800, 1300, 1900, 2500, 3100, 3700, 4300]);
  return (
    <div className="roi">
      <div className="head">
        <h1>ROI และ<span className="g">ระยะเวลาคืนทุน</span> สำหรับ PEA</h1>
        <div className="sub">ประมาณการทางการเงิน 5 ปี (ต่อ 1 เกาะ) · เทียบข้อมูลจริง มี.ค. 2569 กับ ส.ค. 2568</div>
      </div>

      <div className="hero">
        {[
          ["฿8M", "CAPEX รวม", "Dev + Edge/SCADA + setup", "blue", 1],
          ["฿13.23M", "ประหยัดสุทธิ / เดือน", "เทียบ มี.ค. 2569 กับ ส.ค. 2568", "green", 2],
          ["18 วัน", "ระยะเวลาคืนทุน", "฿8M ÷ ฿13.23M/เดือน · Best case*", "gold", 3],
        ].map(([v, l, sub, c, st], k) => (
          <div key={k} className={"hcard " + c + (s >= st ? " show" : "")}>
            <div className="hv">{v}</div>
            <div className="hl">{l}</div>
            <div className="hs">{sub}</div>
          </div>
        ))}
      </div>

      <div className={"tablewrap" + (s >= 4 ? " show" : "")}>
        <div className="tbl">
          <div className="trow th">
            <div className="tc name">ประมาณการทางการเงิน 5 ปี (รายปี)</div>
            <div className="tc">ปีที่ 1</div>
            <div className="tc">รวม 5 ปี</div>
          </div>
          {ROWS.map(([n, y1, y5, cls], k) => (
            <div key={k} className={"trow " + cls + (s >= 5 + k ? " show" : "")}>
              <div className="tc name">{n}</div>
              <div className="tc">{y1}</div>
              <div className="tc">{y5}</div>
            </div>
          ))}
        </div>
        <div className="extras">
          <div className="ex">🌱 4,500+ ตัน CO₂/ปี ลดลงต่อเกาะ</div>
          <div className="ex">😌 ลดภาระ Operator (P1 classification)</div>
          <div className="ex">🛡️ ป้องกันไฟดับแบบ N-1 บน Island C</div>
          <div className="ex">😊 มลพิษลด → ความพึงพอใจลูกค้าสูงขึ้น</div>
        </div>
      </div>

      <div className={"note" + (s >= 4 ? " show" : "")}>
        * <b>Best case</b> — กรณีเดินเครื่องตามที่ระบบแนะนำ และพฤติกรรมโหลดปกติ เทียบกับการเดินเครื่องดีเซล 99.5% เหมือนเดิม
      </div>

      <div className="brand-tag" style={{ color: "#94a3b8" }}>⚡ <b style={{ color: "#0284c7" }}>Smart Energy IQ</b> · ROI &amp; Payback</div>

      <style jsx>{`
        .roi { position: absolute; inset: 0; background: #fff; color: #334155; padding: 32px 48px;
          display: flex; flex-direction: column; }
        .head h1 { font-size: 28px; font-weight: 800; color: #0f172a; }
        .head h1 .g { color: #0284c7; }
        .head .sub { font-size: 14px; color: #64748b; font-weight: 300; margin-top: 4px; }
        .hero { display: flex; gap: 18px; margin-top: 16px; }
        .hcard { flex: 1; border-radius: 16px; padding: 16px 20px; text-align: center;
          opacity: 0; transform: translateY(22px) scale(.94); transition: all .55s cubic-bezier(.2,.9,.3,1.3); }
        .hcard.show { opacity: 1; transform: translateY(0) scale(1); }
        .hcard.blue { background: linear-gradient(160deg,#eff6ff,#f8fbff); border: 2px solid #bfdbfe; }
        .hcard.green { background: linear-gradient(160deg,#f0fdf4,#f7fef9); border: 2px solid #bbf7d0; }
        .hcard.gold { background: linear-gradient(160deg,#fffbeb,#fef9c3); border: 2px solid #fcd34d; }
        .hv { font-size: 38px; font-weight: 900; line-height: 1.1; }
        .blue .hv { color: #1d4ed8; } .green .hv { color: #15803d; } .gold .hv { color: #b45309; }
        .hl { font-size: 14.5px; font-weight: 700; color: #0f172a; margin-top: 4px; }
        .hs { font-size: 12px; color: #94a3b8; margin-top: 2px; }
        .tablewrap { flex: 1; display: flex; gap: 22px; margin-top: 18px; opacity: 0;
          transform: translateY(16px); transition: all .6s ease; }
        .tablewrap.show { opacity: 1; transform: translateY(0); }
        .tbl { flex: 1.5; display: flex; flex-direction: column; border-radius: 14px; overflow: hidden;
          border: 1px solid #e2e8f0; }
        .trow { display: flex; align-items: center; opacity: 0; transform: translateX(-10px);
          transition: all .45s ease; }
        .trow.show, .trow.th { opacity: 1; transform: translateX(0); }
        .trow .tc { flex: 1; padding: 11px 16px; font-size: 14px; text-align: right; font-weight: 700; color: #0f172a; }
        .trow .tc.name { flex: 2; text-align: left; font-weight: 500; color: #475569; }
        .trow.th { background: #0f172a; }
        .trow.th .tc { color: #fff; font-weight: 700; font-size: 13.5px; }
        .trow.th .tc.name { color: #cbd5e1; }
        .trow.pos { background: #f8fafc; } .trow.pos .tc:not(.name) { color: #16a34a; }
        .trow.neg { background: #fff; } .trow.neg .tc:not(.name) { color: #dc2626; }
        .trow.net { background: #ecfdf5; border-top: 2px solid #86efac; }
        .trow.net .tc { font-size: 16px; font-weight: 800; }
        .trow.net .tc:not(.name) { color: #15803d; }
        .extras { flex: 1; display: flex; flex-direction: column; gap: 10px; justify-content: center; }
        .ex { background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 11px 16px;
          font-size: 13px; color: #475569; font-weight: 500; }
        .note { font-size: 11.5px; color: #94a3b8; text-align: center; margin-top: 10px;
          opacity: 0; transition: opacity .5s ease; }
        .note.show { opacity: 1; }
        .note b { color: #b45309; font-weight: 700; }
      `}</style>
    </div>
  );
}
