"use client";
import { useSteps } from "../anim";

const BEFORE = [
  ["🖥️", "นั่งเฝ้า panel ทั้งคืน", "ดูมิเตอร์ด้วยตาเปล่า ไม่มีระบบเตือนล่วงหน้า", "02:00"],
  ["😨", "กว่าจะรู้ว่าโหลดพุ่ง — สายใกล้เต็มแล้ว", "L6 วิ่งไป 7.6/8 MW ไม่มีใครบอกก่อน", "02:12"],
  ["📻", "โทรวิทยุตามช่างที่โรงไฟฟ้า", "ปลุกทีม สื่อสารด้วยเสียง เสี่ยงฟังผิด", "02:15"],
  ["⏱️", "สตาร์ท DG9 ด้วยมือ — ลุ้นให้ทัน", "เครื่องดีเซลต้อง warm-up · ระหว่างนี้เกาะเสี่ยงไฟดับ", "02:16–28"],
  ["😮‍💨", "รอดแบบเฉียดฉิว… คืนนี้", "ถ้าช้าอีก 3 นาที = ไฟดับทั้งเกาะ 3,000+ คน", "02:28"],
  ["📝", "นั่งกรอก Excel รายงานย้อนหลัง", "พรุ่งนี้ DG9 ก็เดินเต็มสูบ 'เผื่อไว้' ต่อ", "03:00"],
];
const AFTER = [
  ["😴", "Operator พักตามกะปกติ", "AI เฝ้าระบบแทน · forecast โหลดทุก 15 นาที", "02:00"],
  ["📱", "LINE Alert ดัง — เตือนล่วงหน้า 16 นาที", "“คาดว่า L6 จะเต็มพิกัด 02:16 · แนะนำเดิน DG9 1.4 MW”", "02:00"],
  ["👨‍🔧", "ตรวจสอบ → กดยืนยันสั่งเดินเครื่อง", "Human-in-the-loop · คนตัดสินใจ ระบบแค่แนะนำ", "02:03"],
  ["✅", "DG9 เดินทันเวลา · ระบบ log อัตโนมัติ", "รายงาน dispatch + ตัวเลขประหยัดเข้าระบบเอง", "02:16"],
];

export default function OperatorJourney({ active }) {
  // reveal: before steps then after steps interleaved, then stamps+footer
  const s = useSteps(active, [300, 900, 1700, 2600, 3500, 4400, 5200, 6000, 6900, 7800, 8600]);
  const bShown = [s >= 1, s >= 4, s >= 5, s >= 6, s >= 7, s >= 8].map(Boolean);
  const aShown = [s >= 1, s >= 2, s >= 3, s >= 9].map(Boolean);
  const stamp = s >= 10;
  const footer = s >= 11;
  const bStress = Math.min(95, s >= 8 ? 92 : s >= 6 ? 78 : s >= 4 ? 45 : 18);
  const aStress = s >= 1 ? 12 : 0;

  return (
    <div className="oj">
      <div className="head">
        <h1>คืนเดียวกัน เหตุการณ์เดียวกัน — <span className="b">ก่อน</span> vs <span className="a">หลัง</span> Smart Energy IQ</h1>
        <div className="sub">ตีสองบนเกาะเต่า · โหลดพุ่ง สายเคเบิลใต้น้ำ L6 ใกล้เต็มพิกัด</div>
      </div>

      <div className="cols">
        {/* BEFORE */}
        <div className="col before">
          <div className="colhead">
            <span className="nm">😰 ก่อนมีระบบ (วันนี้)</span>
            <span className="badge">ตอบสนอง 28 นาที</span>
          </div>
          <div className="steps">
            {BEFORE.map(([ic, tt, ds, tm], k) => (
              <div key={k} className={"step" + (bShown[k] ? " on" : "")}>
                <span className="ic">{ic}</span>
                <div className="body"><div className="tt">{tt}</div><div className="ds">{ds}</div></div>
                <span className="tmark">{tm}</span>
              </div>
            ))}
          </div>
          <div className="meter">
            <div className="lb"><span>ระดับความเครียด Operator</span><span>{bStress}%</span></div>
            <div className="bar"><div className="fill" style={{ width: bStress + "%" }} /></div>
          </div>
          <div className={"stamp" + (stamp ? " show" : "")}><div className="inner">เสี่ยง · ช้า · เหนื่อย</div></div>
        </div>

        {/* AFTER */}
        <div className="col after">
          <div className="colhead">
            <span className="nm">😌 หลังมี Smart Energy IQ</span>
            <span className="badge">ตอบสนอง 3 นาที</span>
          </div>
          <div className="steps">
            {AFTER.map(([ic, tt, ds, tm], k) => (
              <div key={k} className={"step" + (aShown[k] ? " on" : "")}>
                <span className="ic">{ic}</span>
                <div className="body"><div className="tt">{tt}</div><div className="ds">{ds}</div></div>
                <span className="tmark">{tm}</span>
              </div>
            ))}
          </div>
          <div className="meter">
            <div className="lb"><span>ระดับความเครียด Operator</span><span>{aStress}%</span></div>
            <div className="bar"><div className="fill afill" style={{ width: aStress + "%" }} /></div>
          </div>
          <div className={"stamp" + (s >= 9 ? " show" : "")}><div className="inner">ปลอดภัย · ทันเวลา · มีหลักฐาน</div></div>
        </div>
      </div>

      <div className="footer">
        <div className={"fbox fb" + (footer ? " show" : "")}>
          <div className="kv"><div className="k">เวลาตอบสนอง</div><div className="v">28 นาที</div></div>
          <div className="kv"><div className="k">รู้ตัวล่วงหน้า</div><div className="v">0 นาที</div></div>
          <div className="kv"><div className="k">DG9 พรุ่งนี้</div><div className="v">เดินเต็มสูบต่อ</div></div>
        </div>
        <div className={"fbox fa" + (footer ? " show" : "")}>
          <div className="kv"><div className="k">เวลาตอบสนอง</div><div className="v">3 นาที</div></div>
          <div className="kv"><div className="k">รู้ตัวล่วงหน้า</div><div className="v">16 นาที</div></div>
          <div className="kv"><div className="k">ผลลัพธ์</div><div className="v">ประหยัด ฿14M/เดือน</div></div>
        </div>
      </div>

      <div className="brand-tag" style={{ color: "#94a3b8" }}>⚡ <b style={{ color: "#0284c7" }}>Smart Energy IQ</b> · Operator Journey</div>

      <style jsx>{`
        .oj { position: absolute; inset: 0; background: #fff; color: #334155;
          padding: 30px 44px; display: flex; flex-direction: column; }
        .head { text-align: center; }
        .head h1 { font-size: 26px; font-weight: 700; color: #0f172a; }
        .head h1 .b { color: #dc2626; } .head h1 .a { color: #16a34a; }
        .head .sub { font-size: 13px; color: #64748b; font-weight: 300; margin-top: 3px; }
        .cols { flex: 1; display: flex; gap: 26px; margin-top: 16px; }
        .col { flex: 1; border-radius: 18px; padding: 16px 20px 12px; position: relative;
          display: flex; flex-direction: column; }
        .col.before { background: #fef5f5; border: 1.5px solid #fecaca; }
        .col.after { background: #f2fcf5; border: 1.5px solid #bbf7d0; }
        .colhead { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .colhead .nm { font-size: 17px; font-weight: 700; }
        .before .nm { color: #b91c1c; } .after .nm { color: #15803d; }
        .badge { font-size: 11.5px; padding: 3px 12px; border-radius: 999px; font-weight: 600; }
        .before .badge { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
        .after .badge { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
        .steps { flex: 1; display: flex; flex-direction: column; gap: 7px; }
        .step { display: flex; gap: 12px; align-items: flex-start; padding: 8px 12px; border-radius: 12px;
          background: rgba(255,255,255,.55); border: 1px solid transparent; opacity: 0.22;
          transform: translateX(-8px); transition: all .45s cubic-bezier(.2,.9,.3,1.15); }
        .step.on { opacity: 1; transform: translateX(0); }
        .before .step.on { border-color: #fca5a5; background: #fff; box-shadow: 0 2px 6px rgba(220,38,38,.12); }
        .after .step.on { border-color: #86efac; background: #fff; box-shadow: 0 2px 6px rgba(22,163,74,.12); }
        .step .ic { font-size: 23px; width: 30px; text-align: center; flex-shrink: 0; }
        .step .body { flex: 1; }
        .step .tt { font-size: 13.5px; font-weight: 600; color: #0f172a; line-height: 1.3; }
        .step .ds { font-size: 11.5px; color: #64748b; line-height: 1.35; margin-top: 1px; }
        .step .tmark { font-size: 11px; font-weight: 600; color: #94a3b8; white-space: nowrap; flex-shrink: 0; padding-top: 2px; }
        .before .step.on .tmark { color: #dc2626; } .after .step.on .tmark { color: #16a34a; }
        .meter { margin-top: 10px; }
        .meter .lb { font-size: 11.5px; color: #64748b; display: flex; justify-content: space-between; }
        .meter .bar { height: 9px; background: #e2e8f0; border-radius: 99px; overflow: hidden; margin-top: 3px; }
        .meter .fill { height: 100%; border-radius: 99px; transition: width .6s ease;
          background: linear-gradient(90deg,#f59e0b,#ef4444); }
        .meter .afill { background: linear-gradient(90deg,#22c55e,#4ade80); }
        .stamp { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          pointer-events: none; opacity: 0; transform: scale(1.6) rotate(-8deg); transition: all .5s cubic-bezier(.2,.9,.3,1.2); }
        .stamp.show { opacity: 1; transform: scale(1) rotate(-8deg); }
        .stamp .inner { font-size: 28px; font-weight: 800; padding: 10px 30px; border-radius: 14px; }
        .before .stamp .inner { color: #dc2626; border: 4px solid #ef4444; background: rgba(254,226,226,.82); }
        .after .stamp .inner { color: #15803d; border: 4px solid #22c55e; background: rgba(220,252,231,.82); }
        .footer { display: flex; gap: 26px; margin-top: 12px; min-height: 56px; }
        .fbox { flex: 1; border-radius: 12px; padding: 8px 16px; display: flex; gap: 18px;
          align-items: center; justify-content: center; opacity: 0; transform: translateY(10px); transition: all .5s ease; }
        .fbox.show { opacity: 1; transform: translateY(0); }
        .fbox.fb { background: #fef2f2; border: 1px solid #fecaca; }
        .fbox.fa { background: #f0fdf4; border: 1px solid #bbf7d0; }
        .fbox .kv { text-align: center; }
        .fbox .k { font-size: 11px; color: #64748b; }
        .fbox .v { font-size: 19px; font-weight: 800; }
        .fb .v { color: #dc2626; } .fa .v { color: #16a34a; }
      `}</style>
    </div>
  );
}
