"use client";
import { useSteps } from "../anim";

export default function RealArchitecture({ active }) {
  const s = useSteps(active, [300, 900, 1500, 2100]);
  return (
    <div className="arch">
      <div className={"head" + (s >= 1 ? " show" : "")}>
        <div className="badge">Production · พร้อมขยายจริง</div>
        <h1>สถาปัตยกรรม Production — <span className="g">Real-time · MLflow · Multi-Island</span></h1>
        <div className="sub">ยกระดับจาก PoC: Real-time ingestion (Kinesis) · MLflow MLOps pipeline · Drift detection · Security &amp; Ops ตาม IEC 62443 · Multi-Island Config Framework — เพิ่มเกาะใหม่ด้วย config เดียว</div>
      </div>

      <div className={"imgwrap" + (s >= 2 ? " show" : "")}>
        <img src="/img/real-architecture.png" alt="Smart Energy IQ — Production System" />
      </div>

      <div className="pills">
        {["⚡ Real-time ingestion (Kinesis)", "🔁 MLflow + Drift Checker", "🛡️ Security/Ops · IEC 62443", "🏝️ Multi-Island Config · Scalable"].map((t, k) => (
          <div key={k} className={"pill" + (s >= 3 ? " show" : "")} style={{ transitionDelay: k * 70 + "ms" }}>{t}</div>
        ))}
      </div>

      <div className="brand-tag" style={{ color: "#8aa1c2" }}>⚡ <b>Smart Energy IQ</b> · Production Architecture</div>

      <style jsx>{`
        .arch { position: absolute; inset: 0; padding: 28px 44px 18px; display: flex; flex-direction: column;
          background: radial-gradient(ellipse 1100px 700px at 50% 0%, #0a1f2e 0%, #050b14 70%); color: #e2e8f0; }
        .head { text-align: center; opacity: 0; transform: translateY(-10px); transition: all .6s ease; }
        .head.show { opacity: 1; transform: translateY(0); }
        .badge { display: inline-block; background: #134e4a; color: #99f6e4; border: 1px solid #14b8a6;
          font-size: 12px; font-weight: 600; border-radius: 999px; padding: 4px 16px; margin-bottom: 8px; }
        .head h1 { font-size: 25px; font-weight: 800; color: #f8fafc; }
        .head h1 .g { color: #2dd4bf; }
        .head .sub { font-size: 13px; color: #7d96b8; font-weight: 300; margin-top: 4px; max-width: 1080px; margin-inline: auto; line-height: 1.5; }
        .imgwrap { flex: 1; margin-top: 14px; display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: scale(.97); transition: all .7s cubic-bezier(.2,.9,.3,1.2); min-height: 0; }
        .imgwrap.show { opacity: 1; transform: scale(1); }
        .imgwrap img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 12px;
          box-shadow: 0 16px 50px rgba(0,0,0,.5); border: 1px solid rgba(120,160,210,.2); }
        .pills { display: flex; gap: 12px; justify-content: center; margin-top: 12px; }
        .pill { background: rgba(13,30,40,.85); border: 1.5px solid #1e4a45; border-radius: 999px;
          padding: 8px 18px; font-size: 13px; color: #cbd5e1; font-weight: 500;
          opacity: 0; transform: translateY(12px); transition: all .45s cubic-bezier(.2,.9,.3,1.2); }
        .pill.show { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
}
