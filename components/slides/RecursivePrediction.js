"use client";
import { useSteps } from "../anim";

const DAYS = [
  { d: "1 (1 ก.พ.)", lag1: "3.5 MW", lag1t: "จริง", lag24: "3.2 MW", lag24t: "จริง", lag168: "3.4 MW", lag168t: "จริง", pred: "3.48", actual: "3.50", err: "0.57", ok: true },
  { d: "2 (2 ก.พ.)", lag1: "3.45 MW", lag1t: "ทำนาย", lag24: "3.48 MW", lag24t: "ทำนาย", lag168: "3.4 MW", lag168t: "จริง", pred: "3.60", actual: "3.70", err: "2.70", ok: false },
  { d: "3 (3 ก.พ.)", lag1: "3.58 MW", lag1t: "ทำนาย", lag24: "3.60 MW", lag24t: "ทำนาย", lag168: "3.5 MW", lag168t: "จริง", pred: "3.65", actual: "3.80", err: "3.95", ok: false },
  { d: "7 (7 ก.พ.)", lag1: "3.85 MW", lag1t: "ทำนาย", lag24: "3.82 MW", lag24t: "ทำนาย", lag168: "3.48 MW", lag168t: "ทำนาย", pred: "3.95", actual: "4.10", err: "3.66", ok: false },
];

const ERR_TABLE = [
  { day: "1", err: "0.57%", note: "มีข้อมูลจริง", ok: true },
  { day: "2", err: "2.70%", note: "เริ่มคลาดเคลื่อน", ok: false },
  { day: "3", err: "3.95%", note: "Error สะสม", ok: false },
  { day: "4", err: "5.13%", note: "Error สูงขึ้น", ok: false },
  { day: "5", err: "6.25%", note: "Error สูงสุด", ok: false },
  { day: "6", err: "6.17%", note: "ยังสูงอยู่", ok: false },
  { day: "7", err: "3.66%", note: "ลดลงเล็กน้อย", ok: false },
];

export default function RecursivePrediction({ active }) {
  const s = useSteps(active, [300, 600, 900, 1200, 1600, 2000, 2400, 2800, 3300, 3800, 4400]);

  return (
    <div className="rp">
      <div className="head">
        <h1>การทำนายแบบ <span className="hi">RECURSIVE</span> — ภาพประกอบ</h1>
        <div className="sub">ทำนาย 7 วันล่วงหน้า โดยใช้ค่าทำนายก่อนหน้าเป็น Input ของครั้งถัดไป (เหมือน Production จริง)</div>
      </div>

      <div className="body">
        {/* ── Left: Recursive Chain ── */}
        <div className="col-chain">
          <div className="col-title">ขั้นตอนการทำนาย (Recursive)</div>
          <div className="chain">
            {DAYS.map((d, k) => (
              <div key={k} className="chain-item">
                {k === 3 && <div className={"ellipsis" + (s >= 4 ? " show" : "")}>⋮ วันที่ 4–6 ⋮</div>}
                <div className={"daybox" + (s >= k + 1 ? " show" : "") + (k === 3 ? " last" : "")}>
                  <div className="daytitle">วันที่ {d.d}</div>
                  <div className="inputs">
                    <span className={"tag " + (d.lag1t === "ทำนาย" ? "pred" : "real")}>{d.lag1t}</span>
                    <span className="lbl">Lag-1h: {d.lag1}</span>
                    <span className={"tag " + (d.lag24t === "ทำนาย" ? "pred" : "real")}>{d.lag24t}</span>
                    <span className="lbl">Lag-24h: {d.lag24}</span>
                  </div>
                  <div className="result-row">
                    <span className="arrow-r">→</span>
                    <span className="pred-val">{d.pred} MW</span>
                    <span className="actual-val">จริง: {d.actual} MW</span>
                    <span className={"err-val" + (d.ok ? " ok" : "")}>{d.err}%</span>
                  </div>
                </div>
                {k < 3 && <div className={"chain-arrow" + (s >= k + 1 ? " show" : "")}>↓ ใช้ค่าทำนายต่อ</div>}
              </div>
            ))}
          </div>

          <div className={"analogy" + (s >= 8 ? " show" : "")}>
            <span className="a-icon">📞</span>
            <span className="a-text">เกม "กระซิบ": ยิ่งส่งต่อไกล ยิ่งผิดเพี้ยน — แต่นี่คือความจริงของ Production!</span>
          </div>
        </div>

        {/* ── Middle: Error Table ── */}
        <div className="col-err">
          <div className="col-title">Error สะสมตามวัน</div>
          <table className="etable">
            <thead>
              <tr><th>วัน</th><th>MAPE</th><th>หมายเหตุ</th></tr>
            </thead>
            <tbody>
              {ERR_TABLE.map((r, k) => (
                <tr key={k} className={s >= 5 ? "show" : ""} style={{ transitionDelay: `${k * 60}ms` }}>
                  <td className="td-day">{r.day}</td>
                  <td className={"td-err" + (r.ok ? " ok" : "")}>{r.err}</td>
                  <td className="td-note">{r.note}</td>
                </tr>
              ))}
              <tr className={"avg-row" + (s >= 6 ? " show" : "")}>
                <td className="td-day">เฉลี่ย</td>
                <td className="td-err ok">4.92%</td>
                <td className="td-note">MAPE (7 วัน) ✓</td>
              </tr>
            </tbody>
          </table>

          <div className={"err-note" + (s >= 7 ? " show" : "")}>
            Error เพิ่มขึ้นวันที่ 1–5<br />แล้วลดลงช่วงปลาย<br />เพราะ Lag-168h ยังเป็น<br />ค่าจริง (ข้อมูลสัปดาห์ก่อน)
          </div>
        </div>

        {/* ── Right: Data Split + Why ── */}
        <div className="col-info">
          <div className="col-title">ข้อมูล Train / Test / Production</div>
          <div className={"timeline-box" + (s >= 3 ? " show" : "")}>
            <div className="tl-row train">
              <div className="tl-label">Train</div>
              <div className="tl-bar">
                <div className="tl-text">ม.ค. 2025 – ม.ค. 2026<br /><span className="tl-sub">389 วัน · 37,344 intervals · 7 features</span></div>
              </div>
              <div className="tl-tag">เรียนรู้</div>
            </div>
            <div className="tl-row test">
              <div className="tl-label">Test</div>
              <div className="tl-bar">
                <div className="tl-text">ก.พ. 2026<br /><span className="tl-sub">28 วัน · 2,688 intervals</span></div>
              </div>
              <div className="tl-tag">ทดสอบ</div>
            </div>
            <div className="tl-row prod">
              <div className="tl-label">Prod</div>
              <div className="tl-bar">
                <div className="tl-text">มี.ค. 2026<br /><span className="tl-sub">30 วัน · 2,880 intervals</span></div>
              </div>
              <div className="tl-tag">ใช้จริง</div>
            </div>
            <div className="tl-note">✅ Model ไม่เคยเห็นข้อมูล Test/Prod มาก่อน</div>
          </div>

          <div className="col-title" style={{ marginTop: 14 }}>ทำไมต้อง Recursive?</div>
          <div className={"why-box" + (s >= 9 ? " show" : "")}>
            <div className="why-row"><span className="why-x">❌</span> ไม่มี "Load 1 ชม.ที่แล้ว" ของวันที่ 2 (อนาคต!)</div>
            <div className="why-row"><span className="why-x">❌</span> ไม่มี "Load 24 ชม.ที่แล้ว" ของวันที่ 2 (อนาคต!)</div>
            <div className="why-row why-sol"><span className="why-ck">✓</span> ต้องใช้ค่าทำนายวันที่ 1 เป็น Input ของวันที่ 2</div>
            <div className="why-row why-sol"><span className="why-ck">✓</span> วนซ้ำไปเรื่อยๆ → เหมือน Production จริง</div>
            <div className="why-warn">⚠️ ถ้าใช้ข้อมูลจริงจากอนาคต = โกง!</div>
          </div>
        </div>
      </div>

      {/* ── Footer: Summary ── */}
      <div className={"footer" + (s >= 10 ? " show" : "")}>
        <span className="f-label">สรุป:</span>
        <span className="f-text">Recursive = ใช้ผลทำนายก่อนหน้าเป็น Input → Error สะสมเรื่อยๆ → เหมือน Production จริง</span>
        <span className="f-result">MAPE 7 วัน = <b>4.92%</b> ✓</span>
      </div>

      <div className="brand-tag">⚡ <b>Smart Energy IQ</b> · Backup — Recursive Prediction</div>

      <style jsx>{`
        .rp { position: absolute; inset: 0; padding: 20px 40px 14px;
          display: flex; flex-direction: column; gap: 10px;
          background: radial-gradient(ellipse 1200px 800px at 50% 10%, #0a1a30 0%, #04090f 80%);
          color: #e2e8f0; font-family: 'Prompt', sans-serif; }

        .head { text-align: center; }
        .head h1 { font-size: 22px; font-weight: 800; color: #f8fafc; line-height: 1.2; }
        .head h1 .hi { color: #38bdf8; }
        .head .sub { font-size: 12px; color: #6a8cad; margin-top: 3px; }

        .body { flex: 1; display: grid; grid-template-columns: 420px 1fr 340px; gap: 14px; min-height: 0; }

        .col-title { font-size: 11.5px; font-weight: 700; color: #7dd3fc; letter-spacing: .05em;
          text-transform: uppercase; margin-bottom: 8px; border-bottom: 1px solid #1e3a5f; padding-bottom: 4px; }

        /* ── Chain column ── */
        .col-chain { display: flex; flex-direction: column; overflow: hidden; }
        .chain { flex: 1; display: flex; flex-direction: column; gap: 0; overflow: hidden; }
        .chain-item { display: flex; flex-direction: column; gap: 0; }

        .daybox { background: rgba(10,22,40,.8); border: 1.5px solid #1e3a5f; border-radius: 10px;
          padding: 7px 11px; opacity: 0; transform: translateX(-12px);
          transition: all .4s cubic-bezier(.2,.9,.3,1.1); }
        .daybox.show { opacity: 1; transform: translateX(0); }
        .daybox.last { border-color: #2563eb; }
        .daytitle { font-size: 12px; font-weight: 700; color: #93c5fd; margin-bottom: 4px; }
        .inputs { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 5px; align-items: center; }
        .tag { font-size: 9.5px; font-weight: 700; padding: 2px 6px; border-radius: 5px; }
        .tag.real { background: #14532d; color: #4ade80; border: 1px solid #16a34a; }
        .tag.pred { background: #1e3a5f; color: #7dd3fc; border: 1px solid #2563eb; }
        .lbl { font-size: 10.5px; color: #8aaccf; margin-right: 6px; font-family: monospace; }
        .result-row { display: flex; align-items: center; gap: 7px; }
        .arrow-r { color: #475569; font-weight: 700; }
        .pred-val { font-size: 13px; font-weight: 800; color: #38bdf8; }
        .actual-val { font-size: 10.5px; color: #64748b; font-family: monospace; }
        .err-val { font-size: 11.5px; font-weight: 700; color: #ef4444; }
        .err-val.ok { color: #4ade80; }

        .chain-arrow { font-size: 10px; color: #334d6e; text-align: center; padding: 2px 0;
          opacity: 0; transition: opacity .4s; }
        .chain-arrow.show { opacity: 1; }

        .ellipsis { font-size: 11px; color: #4a6686; text-align: center; padding: 2px 0;
          font-weight: 700; letter-spacing: .1em; opacity: 0; transition: opacity .5s; }
        .ellipsis.show { opacity: 1; }

        .analogy { display: flex; gap: 8px; align-items: flex-start; margin-top: 6px;
          background: rgba(30,58,95,.3); border: 1px solid #1e3a5f; border-radius: 9px;
          padding: 7px 11px; font-size: 11px; color: #93c5fd;
          opacity: 0; transform: translateY(6px); transition: all .5s; }
        .analogy.show { opacity: 1; transform: translateY(0); }
        .a-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }

        /* ── Error table ── */
        .col-err { display: flex; flex-direction: column; overflow: hidden; }
        .etable { width: 100%; border-collapse: collapse; font-size: 12px; }
        .etable th { font-size: 10.5px; font-weight: 700; color: #7dd3fc; text-align: left;
          padding: 4px 8px; background: rgba(14,34,60,.7); border-bottom: 1px solid #1e3a5f; }
        .etable td { padding: 5px 8px; border-bottom: 1px solid rgba(30,58,95,.4); }
        .etable tr { opacity: 0; transition: opacity .35s; }
        .etable tr.show { opacity: 1; }
        .avg-row td { border-top: 1.5px solid #2563eb; font-weight: 700; }
        .avg-row { opacity: 0; transition: opacity .5s; }
        .avg-row.show { opacity: 1; }
        .td-day { color: #94a3b8; font-family: monospace; text-align: center; }
        .td-err { color: #ef4444; font-weight: 700; font-family: monospace; }
        .td-err.ok { color: #4ade80; }
        .td-note { color: #64748b; font-size: 10.5px; }

        .err-note { margin-top: 8px; font-size: 10.5px; color: #6a8cad; line-height: 1.6;
          background: rgba(8,20,40,.6); border: 1px solid #1a3050; border-radius: 8px;
          padding: 7px 10px; opacity: 0; transition: opacity .5s; }
        .err-note.show { opacity: 1; }

        /* ── Info column ── */
        .col-info { display: flex; flex-direction: column; overflow: hidden; }
        .timeline-box { display: flex; flex-direction: column; gap: 6px;
          opacity: 0; transform: translateY(8px); transition: all .5s; }
        .timeline-box.show { opacity: 1; transform: translateY(0); }
        .tl-row { display: flex; align-items: center; gap: 8px; border-radius: 9px; padding: 7px 10px; }
        .tl-row.train { background: rgba(30,58,95,.4); border: 1px solid #2563eb; }
        .tl-row.test  { background: rgba(20,83,45,.35); border: 1px solid #16a34a; }
        .tl-row.prod  { background: rgba(50,30,8,.4); border: 1px solid #d97706; }
        .tl-label { font-size: 10px; font-weight: 800; width: 30px; flex-shrink: 0;
          color: #94a3b8; text-transform: uppercase; }
        .tl-bar { flex: 1; }
        .tl-text { font-size: 11px; font-weight: 700; color: #e2e8f0; line-height: 1.3; }
        .tl-sub { font-size: 9.5px; color: #64748b; font-weight: 400; font-family: monospace; }
        .tl-tag { font-size: 9px; font-weight: 700; color: #94a3b8; flex-shrink: 0;
          background: rgba(0,0,0,.3); border-radius: 5px; padding: 2px 6px; }
        .tl-note { font-size: 10.5px; color: #4ade80; margin-top: 2px; }

        .why-box { display: flex; flex-direction: column; gap: 5px;
          background: rgba(8,20,36,.6); border: 1.5px solid #1e3a5f; border-radius: 10px;
          padding: 10px 12px; opacity: 0; transform: translateY(8px); transition: all .5s; }
        .why-box.show { opacity: 1; transform: translateY(0); }
        .why-row { display: flex; gap: 7px; align-items: flex-start; font-size: 11.5px;
          color: #94a3b8; line-height: 1.4; }
        .why-x { color: #ef4444; font-size: 13px; flex-shrink: 0; }
        .why-ck { color: #4ade80; font-size: 13px; flex-shrink: 0; }
        .why-sol { color: #bcd3f0; }
        .why-warn { margin-top: 4px; font-size: 11px; color: #fbbf24; font-weight: 700;
          background: rgba(50,30,8,.4); border-radius: 7px; padding: 5px 9px; }

        /* ── Footer ── */
        .footer { display: flex; align-items: center; gap: 12px; background: rgba(10,24,44,.8);
          border: 1.5px solid #2563eb; border-radius: 12px; padding: 9px 18px;
          opacity: 0; transform: translateY(8px); transition: all .5s; }
        .footer.show { opacity: 1; transform: translateY(0); }
        .f-label { font-size: 12px; font-weight: 800; color: #7dd3fc; flex-shrink: 0; }
        .f-text { font-size: 12px; color: #bcd3f0; flex: 1; }
        .f-result { font-size: 14px; font-weight: 700; color: #4ade80; flex-shrink: 0; }
        .f-result b { color: #38bdf8; }

        .brand-tag { text-align: right; font-size: 11px; color: #2e4a6a; margin-top: 2px; }
        .brand-tag b { color: #38bdf8; }
      `}</style>
    </div>
  );
}
