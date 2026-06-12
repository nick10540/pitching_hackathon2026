"use client";
import { useSteps } from "../anim";

const TEAM = [
  {
    photo: "/img/team/narawithc.jpg", role: "Project Manager", name: "Narawithc Somna",
    exp: "8 ปี · วิศวกรคอมพิวเตอร์",
    items: ["SCADA Electrical System ในโรงงาน", "AMR Transformer Coil Transfer", "ระบบ HEMS / FEMS บริหารพลังงาน"],
    color: "blue",
  },
  {
    photo: "/img/team/phatsakon.jpg", role: "Electrical & IoT Engineer", name: "Phatsakon Srirak",
    exp: "10 ปี",
    items: ["ออกแบบ Instrument Transformer", "Peak Shaving — Solar & Battery", "ระบบ MES + เครื่องจักรสู่ IoT/Automation"],
    color: "teal",
  },
  {
    photo: "/img/team/pongsagorn.jpg", role: "Backend & Data Dev", name: "Pongsagorn Ninmongkorn",
    exp: "5 ปี · นักพัฒนาซอฟต์แวร์",
    items: ["Third-Party ร่วม ERP (Exact & Epicor)", "Finance (PCC) · Billing (PSP) · PEM", "ISO/IEC 29110 — Tech Lead 2026"],
    color: "violet",
  },
  {
    photo: "/img/team/pattarong.jpg", role: "Frontend Developer", name: "Pattarong Sombatkaew",
    exp: "2 ปี · Frontend Developer",
    items: ["ระบบ EMS สำหรับลูกค้าใน/นอกองค์กร", "ระบบ HEMS จัดการพลังงานในบ้าน"],
    color: "amber",
  },
  {
    photo: "/img/team/chalita.jpg", role: "Data & Forecast Engineer", name: "Chalita Sajjapipat",
    exp: "4 ปี · PEA · EGAT · MEA",
    items: ["HMI & IEC 61850 — สถานีไฟฟ้า", "Configuration Relay Siemens · NR", "Renewable PV + BESS · Architecture"],
    color: "green",
  },
];

const ORGS = [
  { src: "/img/partners/pea.png", alt: "PEA" },
  { src: "/img/partners/egat.png", alt: "EGAT" },
  { src: "/img/partners/mea.png", alt: "MEA" },
];
const EQUIP = [
  { src: "/img/partners/nr.png", alt: "NR Electric" },
  { src: "/img/partners/siemens.png", alt: "Siemens" },
  { src: "/img/partners/hitachi.png", alt: "Hitachi" },
  { src: "/img/partners/ge.png", alt: "General Electric" },
  { src: "/img/partners/sel.png", alt: "SEL" },
  { src: "/img/partners/huawei.png", alt: "Huawei" },
];

export default function TeamPartners({ active }) {
  const s = useSteps(active, [300, 650, 950, 1250, 1550, 1850, 2500, 3000, 3700]);

  return (
    <div className="tp">
      <div className={"head" + (s >= 1 ? " show" : "")}>
        <h1>ทีม <span className="g">Precise Nextxus</span> &amp; พันธมิตร</h1>
        <div className="sub">ประสบการณ์จริงด้านระบบไฟฟ้ากำลัง · SCADA · EMS · AI/IoT · Data Engineering</div>
      </div>

      <div className="grid">
        {TEAM.map((m, k) => (
          <div key={k} className={"card " + m.color + (s >= k + 1 ? " show" : "")}>
            <div className="top">
              <div className="avatar">
                <img src={m.photo} alt={m.name} />
              </div>
              <div className="who">
                <div className="role">{m.role}</div>
                <div className="name">{m.name}</div>
                <div className="exp">{m.exp}</div>
              </div>
            </div>
            <ul>
              {m.items.map((it, j) => <li key={j}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className={"partners" + (s >= 7 ? " show" : "")}>
        <div className="pcol cloud">
          <div className="plabel">🤝 พันธมิตรด้าน Cloud</div>
          <div className="logos">
            <div className="logo big"><img src="/img/partners/aws.png" alt="AWS" /></div>
            <div className="cloudtx">Cloud Infrastructure Partner<br />รองรับ MLOps &amp; Scale ทั้งระบบ</div>
          </div>
        </div>
        <div className="pcol">
          <div className="plabel">🏛️ หน่วยงานที่เคยร่วมงาน</div>
          <div className="logos">
            {ORGS.map((o, k) => (
              <div key={k} className="logo"><img src={o.src} alt={o.alt} /></div>
            ))}
          </div>
        </div>
        <div className="pcol equip">
          <div className="plabel">🔧 Partner ด้านอุปกรณ์</div>
          <div className="logos wrap">
            {EQUIP.map((o, k) => (
              <div key={k} className="logo"><img src={o.src} alt={o.alt} /></div>
            ))}
          </div>
        </div>
      </div>

      <div className={"thanks" + (s >= 9 ? " show" : "")}>
        <span className="big">ขอบคุณครับ</span>
        <span className="small">⚡ Smart Energy IQ · พร้อมเริ่ม PoC บนเกาะเต่าใน 20 วัน</span>
      </div>

      <div className="brand-tag" style={{ color: "#8aa1c2" }}>⚡ <b>Smart Energy IQ</b> · Team &amp; Partners · PEA Hackathon 2026</div>

      <style jsx>{`
        .tp { position: absolute; inset: 0; padding: 24px 40px 16px; display: flex; flex-direction: column;
          background: radial-gradient(ellipse 1100px 800px at 50% -10%, #0d1f3a 0%, #060e1d 72%); color: #e2e8f0; }
        .head { text-align: center; opacity: 0; transform: translateY(-10px); transition: all .6s ease; }
        .head.show { opacity: 1; transform: translateY(0); }
        .head h1 { font-size: 26px; font-weight: 800; color: #f8fafc; }
        .head h1 .g { color: #38bdf8; }
        .head .sub { font-size: 13px; color: #7d96b8; font-weight: 300; margin-top: 3px; }

        .grid { flex: 1; display: flex; gap: 12px; margin-top: 14px; }
        .card { flex: 1; background: rgba(13,26,48,.7); border: 1.5px solid #1e3a5f; border-radius: 16px;
          padding: 14px 13px; display: flex; flex-direction: column; opacity: 0;
          transform: translateY(24px); transition: all .5s cubic-bezier(.2,.9,.3,1.25); }
        .card.show { opacity: 1; transform: translateY(0); }
        .top { display: flex; gap: 11px; align-items: center; padding-bottom: 11px;
          border-bottom: 1px solid rgba(120,160,210,.18); }
        .avatar { width: 56px; height: 56px; border-radius: 50%; overflow: hidden; flex-shrink: 0;
          border: 2.5px solid; box-shadow: 0 4px 12px rgba(0,0,0,.35); }
        .avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .blue .avatar { border-color: #3b82f6; }
        .teal .avatar { border-color: #14b8a6; }
        .violet .avatar { border-color: #8b5cf6; }
        .amber .avatar { border-color: #f59e0b; }
        .green .avatar { border-color: #22c55e; }
        .role { font-size: 10.5px; font-weight: 700; letter-spacing: .3px; text-transform: uppercase; }
        .blue .role { color: #7dd3fc; } .teal .role { color: #5eead4; }
        .violet .role { color: #c4b5fd; } .amber .role { color: #fcd34d; } .green .role { color: #86efac; }
        .name { font-size: 14.5px; font-weight: 700; color: #f1f5f9; line-height: 1.2; margin-top: 1px; }
        .exp { font-size: 10.5px; color: #93b0d4; margin-top: 2px; }
        ul { list-style: none; margin: 10px 0 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
        li { font-size: 11px; color: #cbd5e1; line-height: 1.35; padding-left: 15px; position: relative; }
        li::before { content: "▹"; position: absolute; left: 0; color: #38bdf8; }

        .partners { display: flex; gap: 14px; margin-top: 12px; opacity: 0; transform: translateY(14px);
          transition: all .55s ease; }
        .partners.show { opacity: 1; transform: translateY(0); }
        .pcol { background: rgba(8,20,36,.6); border: 1.5px solid #16263f; border-radius: 14px; padding: 11px 16px; }
        .pcol.cloud { flex: 1.15; } .pcol { flex: 1; } .pcol.equip { flex: 1.9; }
        .plabel { font-size: 12px; font-weight: 700; color: #9fb6d6; margin-bottom: 9px; }
        .logos { display: flex; gap: 9px; align-items: center; }
        .logos.wrap { flex-wrap: wrap; }
        .logo { background: #fff; border-radius: 9px; padding: 7px 11px; display: flex; align-items: center;
          justify-content: center; height: 42px; box-shadow: 0 2px 8px rgba(0,0,0,.25); }
        .logo img { max-height: 26px; max-width: 96px; object-fit: contain; display: block; }
        .logo.big { height: 56px; padding: 8px 14px; }
        .logo.big img { max-height: 40px; max-width: 110px; }
        .cloudtx { font-size: 11.5px; color: #cbd5e1; line-height: 1.45; }

        .thanks { margin-top: 12px; display: flex; align-items: baseline; justify-content: center; gap: 16px;
          opacity: 0; transform: scale(.95); transition: all .6s cubic-bezier(.2,.9,.3,1.2); }
        .thanks.show { opacity: 1; transform: scale(1); }
        .thanks .big { font-size: 24px; font-weight: 900; color: #fbbf24; }
        .thanks .small { font-size: 13px; color: #93b0d4; font-weight: 300; }
      `}</style>
    </div>
  );
}
