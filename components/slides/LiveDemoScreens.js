"use client";
import { useSteps } from "../anim";

/**
 * Live-demo wall: the five key mobile screens of the running web app,
 * captured as GIFs and shown inside phone frames — exactly what a visitor
 * sees after scanning the QR code on the previous slide.
 * GIFs live in /public/livedemo/.
 */
const SCREENS = [
  {
    gif: "/livedemo/demo-1-overview.gif",
    no: "1",
    title: "ภาพรวม",
    en: "Overview",
    desc: "สถานะ 3 เกาะ · ผังการไหลไฟ · เงินประหยัดเรียลไทม์",
  },
  {
    gif: "/livedemo/demo-2-dispatch.gif",
    no: "2",
    title: "แผนจ่ายไฟ",
    en: "Dispatch Plan",
    desc: "ปฏิทินเดินเครื่องรายเดือน · KPI · เชื้อเพลิงคงเหลือ",
  },
  {
    gif: "/livedemo/demo-3-financials.gif",
    no: "3",
    title: "การเงิน",
    en: "Financials",
    desc: "ต้นทุน DG vs กริด · CO₂ · ส่งออก Excel/Word",
  },
  {
    gif: "/livedemo/demo-4-network.gif",
    no: "4",
    title: "โครงข่ายไฟฟ้า",
    en: "Power Network",
    desc: "โทโพโลยีสายส่ง · โหลดรายไลน์สด · Headroom L6",
  },
  {
    gif: "/livedemo/demo-5-operator.gif",
    no: "5",
    title: "ผู้ปฏิบัติงาน",
    en: "Operator Console",
    desc: "แผนล่วงหน้า 7 วัน · รอบเดิน DG9 · LINE Alert",
  },
];

export default function LiveDemoScreens({ active }) {
  const s = useSteps(active, [200, 500, 800, 1100, 1400, 1700, 2100]);

  return (
    <div className="lds">
      <div className={"head" + (s >= 1 ? " show" : "")}>
        <span className="eyebrow">🔴 LIVE · ใช้งานได้จริงวันนี้</span>
        <h1>
          Live Demo บนมือถือ — <span className="g">สแกนครั้งเดียว เห็นทั้งระบบ</span>
        </h1>
        <p className="sub">
          5 หน้าจอจริงจากแพลตฟอร์ม Smart Energy IQ · รองรับ Responsive เต็มรูปแบบ —
          แบบเดียวกับที่ผู้ใช้เห็นทันทีหลังสแกน QR
        </p>
      </div>

      <div className="wall">
        {SCREENS.map((sc, k) => (
          <figure key={sc.no} className={"phone" + (s >= k + 2 ? " show" : "")}>
            <div className="frame">
              <span className="notch" />
              <img
                src={sc.gif}
                alt={`${sc.title} — ${sc.en}`}
                loading="eager"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.classList.add("missing");
                }}
              />
              <span className="ph-fallback">{sc.title}</span>
            </div>
            <figcaption>
              <span className="cap-no">{sc.no}</span>
              <span className="cap-t">{sc.title}</span>
              <span className="cap-en">{sc.en}</span>
              <span className="cap-d">{sc.desc}</span>
            </figcaption>
          </figure>
        ))}

        <aside className={"oa" + (s >= 2 ? " show" : "")}>
          <div className="oa-eyebrow">🔴 รับ Alert สดเดี๋ยวนี้</div>
          <div className="qr">
            <img
              src="/img/line-oa-qr.png"
              alt="LINE OA — สแกนรับ Broadcast Alert จริงจากระบบ"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.classList.add("noqr");
              }}
            />
            <span className="qr-fallback">
              วาง QR LINE&nbsp;OA<br />ที่ /public/img/<br />line-oa-qr.png
            </span>
          </div>
          <div className="oa-name">
            <span className="oa-badge">LINE</span> Official Account
          </div>
          <div className="oa-desc">
            สแกนเข้าเป็นเพื่อน → รับ <b>Broadcast Alert จริง</b> จากระบบทันที
          </div>
        </aside>
      </div>

      <div className={"footer" + (s >= 7 ? " show" : "")}>
        <span className="big">ขอบคุณครับ</span>
        <span className="small">⚡ <b>Smart Energy IQ</b> · พร้อมเริ่ม PoC บนเกาะเต่าใน 20 วัน</span>
      </div>

      <div className="tag">⚡ Smart Energy IQ · Live Demo · PEA Hackathon 2026</div>

      <style jsx>{`
        .lds {
          position: absolute;
          inset: 0;
          padding: 30px 44px 16px;
          display: flex;
          flex-direction: column;
          background: radial-gradient(
              ellipse 1100px 800px at 50% -10%,
              #0d1f3a 0%,
              #060e1d 72%
            );
          color: #e2e8f0;
        }
        .head {
          text-align: center;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.6s ease;
        }
        .head.show {
          opacity: 1;
          transform: translateY(0);
        }
        .eyebrow {
          font-size: 13px;
          font-weight: 700;
          color: #fbbf24;
          letter-spacing: 0.4px;
        }
        .head h1 {
          font-size: 26px;
          font-weight: 800;
          color: #f8fafc;
          margin-top: 4px;
        }
        .head h1 .g {
          color: #38bdf8;
        }
        .head .sub {
          font-size: 12.5px;
          color: #7d96b8;
          font-weight: 300;
          margin-top: 5px;
          max-width: 1000px;
          margin-inline: auto;
          line-height: 1.5;
        }
        .wall {
          flex: 1;
          display: flex;
          gap: 14px;
          justify-content: center;
          align-items: center;
          margin-top: 14px;
          min-height: 0;
        }
        .phone {
          width: 176px;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateY(26px) scale(0.95);
          transition: all 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.25);
        }
        .phone.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .frame {
          position: relative;
          width: 176px;
          height: 364px;
          background: #0b1424;
          border: 3px solid #1e2f4d;
          border-radius: 26px;
          padding: 8px 6px;
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.55),
            inset 0 0 0 2px rgba(120, 160, 210, 0.08);
          overflow: hidden;
        }
        .notch {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: 16px;
          background: #1e2f4d;
          border-radius: 0 0 12px 12px;
          z-index: 2;
        }
        .frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          border-radius: 18px;
          display: block;
        }
        .ph-fallback {
          display: none;
          position: absolute;
          inset: 8px 6px;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 700;
          color: #7d96b8;
          background: #0b1424;
          border-radius: 18px;
          text-align: center;
        }
        .frame.missing .ph-fallback {
          display: flex;
        }
        figcaption {
          margin-top: 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .cap-no {
          display: inline-block;
          width: 22px;
          height: 22px;
          line-height: 22px;
          margin: 0 auto 2px;
          border-radius: 50%;
          background: #0ea5e9;
          color: #04121f;
          font-size: 13px;
          font-weight: 800;
        }
        .cap-t {
          font-size: 16px;
          font-weight: 800;
          color: #f1f5f9;
        }
        .cap-en {
          font-size: 11px;
          font-weight: 600;
          color: #38bdf8;
          letter-spacing: 0.3px;
        }
        .cap-d {
          font-size: 10.5px;
          color: #94a3b8;
          line-height: 1.4;
          margin-top: 3px;
          padding: 0 4px;
        }
        .footer {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 16px;
          margin-top: 10px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.5s ease;
        }
        .footer.show {
          opacity: 1;
          transform: translateY(0);
        }
        .footer .big {
          font-size: 24px;
          font-weight: 900;
          color: #fbbf24;
        }
        .footer .small {
          font-size: 13px;
          color: #93b0d4;
          font-weight: 300;
        }
        .footer b {
          color: #5eead4;
        }
        .tag {
          position: absolute;
          bottom: 8px;
          right: 16px;
          font-size: 11px;
          color: #44597a;
        }

        /* ── LINE OA broadcast-alert QR ── */
        .oa {
          width: 224px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 14px;
          background: linear-gradient(160deg, rgba(6, 78, 59, 0.55), rgba(13, 31, 58, 0.5));
          border: 1.5px solid #16a34a;
          border-radius: 22px;
          box-shadow: 0 14px 40px rgba(22, 163, 74, 0.22);
          opacity: 0;
          transform: translateY(26px) scale(0.95);
          transition: all 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.25);
        }
        .oa.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .oa-eyebrow {
          font-size: 13px;
          font-weight: 800;
          color: #4ade80;
          letter-spacing: 0.3px;
        }
        .oa .qr {
          position: relative;
          width: 184px;
          height: 184px;
          background: #fff;
          padding: 10px;
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }
        .oa .qr img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
        .qr-fallback {
          display: none;
          position: absolute;
          inset: 10px;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          background: #f1f5f9;
          border: 2px dashed #94a3b8;
          border-radius: 8px;
          line-height: 1.5;
        }
        .qr.noqr .qr-fallback {
          display: flex;
        }
        .oa-name {
          font-size: 14px;
          font-weight: 700;
          color: #f1f5f9;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .oa-badge {
          background: #06c755;
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 6px;
          letter-spacing: 0.5px;
        }
        .oa-desc {
          font-size: 11.5px;
          color: #bbf7d0;
          text-align: center;
          line-height: 1.5;
          padding: 0 2px;
        }
        .oa-desc b {
          color: #fff;
        }
      `}</style>
    </div>
  );
}
