"use client";
import { useSteps } from "../anim";

/**
 * Closing slide: a call-to-action to try the live web app, with a scannable
 * QR code. The QR PNG is generated offline into /public/img so it works with
 * no internet; if that asset is ever missing it falls back to a live QR API.
 */
const DEMO_URL = "http://47.130.226.9:3000/pea/home";
const QR_FALLBACK =
  "https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=" +
  encodeURIComponent(DEMO_URL);

export default function LiveDemo({ active }) {
  const s = useSteps(active, [250, 650, 1050, 1450]);

  return (
    <div className="ld">
      <div className={"head" + (s >= 1 ? " show" : "")}>
        <div className="eyebrow">🚀 ลองใช้งานจริง · Live Demo</div>
        <h1>
          ทดลองใช้ <span className="g">Smart Energy IQ</span> ได้เลย
        </h1>
        <div className="sub">สแกน QR หรือเปิดลิงก์เพื่อเข้าสู่แพลตฟอร์มจริง</div>
      </div>

      <div className="body">
        <div className={"qrwrap" + (s >= 2 ? " show" : "")}>
          <div className="qr">
            <img
              src="/img/qr-demo.png"
              alt="QR code — Smart Energy IQ live demo"
              onError={(e) => {
                if (e.currentTarget.src !== QR_FALLBACK) e.currentTarget.src = QR_FALLBACK;
              }}
            />
          </div>
          <div className="scan">📷 สแกนเพื่อเปิดบนมือถือ</div>
        </div>

        <div className={"info" + (s >= 3 ? " show" : "")}>
          <div className="card">
            <div className="label">เปิดบนเบราว์เซอร์</div>
            <a className="url" href={DEMO_URL} target="_blank" rel="noreferrer">
              {DEMO_URL}
            </a>
          </div>
          <ul>
            <li>Dashboard พลังงานแบบเรียลไทม์</li>
            <li>พยากรณ์โหลด &amp; คำแนะนำการประหยัด</li>
            <li>รองรับการใช้งานจริงบนเกาะเต่า</li>
          </ul>
        </div>
      </div>

      <div className={"thanks" + (s >= 4 ? " show" : "")}>
        <span className="big">ขอบคุณครับ</span>
        <span className="small">⚡ Smart Energy IQ · พร้อมเริ่ม PoC ใน 20 วัน</span>
      </div>

      <div className="brand-tag" style={{ color: "#8aa1c2" }}>
        ⚡ <b>Smart Energy IQ</b> · Live Demo · PEA Hackathon 2026
      </div>

      <style jsx>{`
        .ld {
          position: absolute;
          inset: 0;
          padding: 36px 56px 24px;
          display: flex;
          flex-direction: column;
          background: radial-gradient(ellipse 1100px 800px at 50% -10%, #0d1f3a 0%, #060e1d 72%);
          color: #e2e8f0;
        }
        .head {
          text-align: center;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.6s ease;
        }
        .head.show { opacity: 1; transform: translateY(0); }
        .eyebrow {
          font-size: 14px;
          font-weight: 700;
          color: #fbbf24;
          letter-spacing: 0.5px;
        }
        .head h1 { font-size: 34px; font-weight: 800; color: #f8fafc; margin-top: 6px; }
        .head h1 .g { color: #38bdf8; }
        .head .sub { font-size: 15px; color: #7d96b8; font-weight: 300; margin-top: 6px; }

        .body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 56px;
        }

        .qrwrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.25);
        }
        .qrwrap.show { opacity: 1; transform: scale(1); }
        .qr {
          background: #fff;
          padding: 16px;
          border-radius: 20px;
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.5);
        }
        .qr img { width: 248px; height: 248px; display: block; }
        .scan { font-size: 14px; color: #9fb6d6; font-weight: 500; }

        .info {
          max-width: 460px;
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.6s ease;
        }
        .info.show { opacity: 1; transform: translateX(0); }
        .card {
          background: rgba(8, 20, 36, 0.6);
          border: 1.5px solid #1e3a5f;
          border-radius: 16px;
          padding: 16px 20px;
        }
        .card .label {
          font-size: 12px;
          font-weight: 700;
          color: #9fb6d6;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 6px;
        }
        .url {
          font-size: 20px;
          font-weight: 700;
          color: #38bdf8;
          text-decoration: none;
          word-break: break-all;
        }
        .url:hover { text-decoration: underline; }
        ul {
          list-style: none;
          margin: 18px 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        li {
          font-size: 16px;
          color: #cbd5e1;
          line-height: 1.4;
          padding-left: 22px;
          position: relative;
        }
        li::before { content: "▹"; position: absolute; left: 0; color: #38bdf8; }

        .thanks {
          margin-top: 8px;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 16px;
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.2);
        }
        .thanks.show { opacity: 1; transform: scale(1); }
        .thanks .big { font-size: 26px; font-weight: 900; color: #fbbf24; }
        .thanks .small { font-size: 14px; color: #93b0d4; font-weight: 300; }
      `}</style>
    </div>
  );
}
