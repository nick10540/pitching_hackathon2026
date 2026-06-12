"use client";
import { useSteps } from "../anim";

export default function HookOpening({ active }) {
  // reveal schedule (ms): 1 scene, 2 cable heats, 3 countdown, 4 pain, 5 solution
  const s = useSteps(active, [400, 2200, 4200, 6400, 9000]);

  return (
    <div className="hook">
      {/* ───── night scene ───── */}
      <svg
        className={"scene" + (s >= 4 ? " dark" : "")}
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#070f22" />
            <stop offset="70%" stopColor="#0b1830" />
            <stop offset="100%" stopColor="#102140" />
          </linearGradient>
          <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1f3d" />
            <stop offset="100%" stopColor="#050d1d" />
          </linearGradient>
          <radialGradient id="moonglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef9c3" stopOpacity=".95" />
            <stop offset="55%" stopColor="#fde68a" stopOpacity=".25" />
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1280" height="430" fill="url(#sky)" />
        <rect y="430" width="1280" height="290" fill="url(#sea)" />

        <g fill="#dbeafe">
          {[
            [120, 70, 1.7], [300, 120, 1.3], [520, 60, 1.8], [760, 100, 1.4],
            [980, 55, 1.7], [1150, 130, 1.3], [420, 170, 1.2], [660, 200, 1.1],
            [880, 160, 1.5], [60, 200, 1.2], [1230, 80, 1.5], [200, 260, 1.1],
          ].map(([cx, cy, r], k) => (
            <circle key={k} className="star" cx={cx} cy={cy} r={r}
              style={{ animationDelay: (k * 0.21) + "s" }} />
          ))}
        </g>

        <circle cx="1080" cy="120" r="80" fill="url(#moonglow)" />
        <circle cx="1080" cy="120" r="34" fill="#fef3c7" />
        <circle cx="1068" cy="110" r="7" fill="#fde68a" opacity=".6" />

        {/* mainland (power source) */}
        <path d="M0 460 L0 380 Q 60 350 130 372 Q 180 390 210 430 L 215 460 Z" fill="#0d1b33" />
        <g fill="#fcd34d">
          <circle cx="48" cy="398" r="2.6" /><circle cx="84" cy="385" r="2.6" />
          <circle cx="120" cy="392" r="2.6" /><circle cx="158" cy="408" r="2.6" />
        </g>
        <text x="30" y="350" fontSize="15" fill="#7d96b8">โครงข่ายหลัก (เกาะ B)</text>

        {/* Koh Tao */}
        <path d="M880 480 Q 920 388 1000 372 Q 1075 358 1140 400 Q 1195 436 1210 480 L 1210 500 Q 1045 522 880 500 Z" fill="#0e2236" />
        <g>
          {[[930,468],[965,455],[1000,462],[1040,448],[1078,458],[1115,466],[1150,472],[1014,478]].map(([cx,cy],k)=>(
            <circle key={k} cx={cx} cy={cy} r="3" fill="#fcd34d"
              style={{ opacity: s >= 4 ? 0.05 : 1, transition: "opacity .8s" }} />
          ))}
        </g>
        <text x="985" y="345" fontSize="17" fontWeight="600" fill="#a8c4e2">เกาะเต่า</text>

        {/* submarine cable L6 */}
        <path
          className={"cable" + (s >= 2 ? " hot" : "")}
          d="M 212 452 Q 380 560 560 575 Q 740 590 884 492"
          fill="none" stroke="#34d399" strokeWidth="5" strokeLinecap="round"
        />
        <text x="520" y="612" fontSize="14.5" fontWeight="600" fill="#67e8f9">
          สายเคเบิลใต้น้ำ L6 — เส้นเลือดเส้นเดียวของทั้งเกาะ
        </text>
      </svg>

      {/* ───── HUD ───── */}
      <div className={"hud" + (s >= 1 ? " show" : "")}>
        <div className="hudbox">
          <div className="k">เวลา</div>
          <div className="v">02:00</div>
        </div>
        <div className="hudbox">
          <div className="k">โหลดสาย L6</div>
          <div className="v" style={{ color: s >= 2 ? "#f87171" : "#bfdcff" }}>
            {s >= 2 ? "7.7" : "5.9"}{" "}
            <span style={{ fontSize: 12, color: "#7d96b8" }}>/ 8 MW</span>
          </div>
          <div className="lbar">
            <div className="lf" style={{
              width: s >= 2 ? "96%" : "60%",
              background: s >= 2 ? "#ef4444" : "#34d399",
            }} />
          </div>
        </div>
      </div>

      {/* ───── countdown ───── */}
      <div className={"countdown" + (s >= 3 ? " show" : "")}>
        <div className="k">เวลาตัดสินใจที่เหลือ</div>
        <div className="v">16:00</div>
        <div className="k" style={{ color: "#fecaca" }}>นาที ก่อนทั้งเกาะมืด</div>
      </div>

      {/* ───── narrative text ───── */}
      <div className="title-wrap">
        <h1 className={"htitle" + (s >= 1 ? " show" : "")}>
          ตีสอง บนเกาะเต่า — เจ้าหน้าที่ กฟภ. <span className="em">หนึ่งคน</span> เฝ้าทั้งเกาะ
        </h1>
        <p className={"hsub" + (s >= 3 ? " show" : "")}>
          สายเคเบิลใต้น้ำ<span className="red">เส้นเดียว</span>กำลังวิ่งเข้าใกล้พิกัดสูงสุด
          — และเขามีเวลาแค่ <span className="red">16 นาที</span> ในการตัดสินใจ
        </p>
      </div>

      {/* ───── pain bridge ───── */}
      <div className={"painrow" + (s >= 4 ? " show" : "")}>
        <div className="pcard"><span className="ic">🏥</span><span>ผู้ป่วยติดเตียง รพ.สต.<br /><b>เครื่องออกซิเจนหยุด</b></span></div>
        <div className="pcard"><span className="ic">❄️</span><span>ห้องเย็นทั้งเกาะ<br /><b>อาหารทะเลเสียยกตู้</b></span></div>
        <div className="pcard"><span className="ic">🏨</span><span>นักท่องเที่ยว 3,000+ คน<br /><b>รีวิว ★1 ทั่วโลก</b></span></div>
      </div>

      {/* ───── solution reveal ───── */}
      <div className={"solution" + (s >= 5 ? " show" : "")}>
        <div className="radar"><span>⚡</span></div>
        <div className="sname">Smart Energy IQ</div>
        <div className="stag">AI ที่มองเห็นอนาคตของโครงข่ายไฟฟ้า — ก่อนวิกฤตจะเกิด</div>
      </div>

      <div className="brand-tag">⚡ <b>Smart Energy IQ</b> · Team Precise Nextxus · PEA Hackathon 2026</div>

      <style jsx>{`
        .hook { position: absolute; inset: 0; background: #06101f; overflow: hidden; }
        .scene { position: absolute; inset: 0; transition: filter 1s ease; }
        .scene.dark { filter: brightness(0.4) saturate(0.6); }
        .star { animation: tw 2.6s infinite alternate ease-in-out; }
        @keyframes tw { from { opacity: 0.25; } to { opacity: 0.95; } }
        .cable { stroke-dasharray: 10 7; animation: flow 1.1s linear infinite; transition: stroke 1s ease; }
        @keyframes flow { to { stroke-dashoffset: -17; } }
        .cable.hot { stroke: #ef4444; animation: flow 0.45s linear infinite;
          filter: drop-shadow(0 0 6px rgba(248,113,113,.85)); }

        .hud { position: absolute; top: 60px; left: 30px; display: flex; gap: 14px;
          align-items: flex-start; opacity: 0; transition: opacity 0.7s; z-index: 4; }
        .hud.show { opacity: 1; }
        .hudbox { background: rgba(10,20,40,.82); border: 1px solid #27405f;
          border-radius: 12px; padding: 8px 16px; backdrop-filter: blur(3px); }
        .hudbox .k { font-size: 10.5px; color: #7d96b8; letter-spacing: 1px; }
        .hudbox .v { font-size: 21px; font-weight: 700; color: #bfdcff; font-variant-numeric: tabular-nums; }
        .lbar { width: 150px; height: 9px; background: #152741; border-radius: 99px;
          overflow: hidden; margin-top: 5px; }
        .lf { height: 100%; border-radius: 99px; transition: width 0.9s ease, background 0.9s ease; }

        .countdown { position: absolute; top: 60px; right: 30px; z-index: 4;
          background: rgba(69,10,10,.85); border: 2px solid #ef4444; border-radius: 14px;
          padding: 10px 22px; text-align: center; backdrop-filter: blur(3px);
          opacity: 0; transform: scale(.7); transition: all .55s cubic-bezier(.2,.9,.3,1.3); }
        .countdown.show { opacity: 1; transform: scale(1); animation: cd 1.2s infinite .4s; }
        @keyframes cd { 0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,.5); }
          55% { box-shadow: 0 0 0 14px rgba(239,68,68,0); } }
        .countdown .k { font-size: 11px; color: #fca5a5; letter-spacing: 1px; }
        .countdown .v { font-size: 34px; font-weight: 800; color: #fee2e2; font-variant-numeric: tabular-nums; }

        .title-wrap { position: absolute; left: 0; right: 0; top: 175px; text-align: center; padding: 0 90px; z-index: 4; }
        .htitle { font-size: 33px; font-weight: 800; color: #f8fafc; line-height: 1.35;
          text-shadow: 0 2px 16px rgba(0,0,0,.8); opacity: 0; transform: translateY(14px); transition: all .8s ease; }
        .htitle.show { opacity: 1; transform: translateY(0); }
        .htitle .em { color: #fbbf24; }
        .hsub { font-size: 20px; font-weight: 500; color: #e2e8f0; margin-top: 14px; line-height: 1.6;
          text-shadow: 0 2px 12px rgba(0,0,0,.85); opacity: 0; transform: translateY(12px); transition: all .8s ease; }
        .hsub.show { opacity: 1; transform: translateY(0); }
        .htitle .red, .hsub .red { color: #fca5a5; font-weight: 800; }

        .painrow { position: absolute; left: 0; right: 0; bottom: 116px; display: flex; gap: 22px;
          justify-content: center; opacity: 0; transition: opacity .7s ease; z-index: 4; }
        .painrow.show { opacity: 1; }
        .pcard { display: flex; gap: 12px; align-items: center; width: 320px;
          background: rgba(12,18,34,.92); border: 1.5px solid #b91c1c; border-radius: 14px;
          padding: 14px 18px; font-size: 14px; color: #fecaca; line-height: 1.4;
          box-shadow: 0 0 26px rgba(220,38,38,.18); }
        .pcard .ic { font-size: 32px; }
        .pcard b { color: #fff; font-weight: 700; }

        .solution { position: absolute; inset: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 16px; z-index: 6;
          background: linear-gradient(180deg,#0b2545 0%,#13518a 55%,#1e7fb8 100%);
          opacity: 0; pointer-events: none; transition: opacity 1.2s ease; }
        .solution.show { opacity: 1; }
        .radar { width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-size: 44px; background: radial-gradient(circle,#0ea5e9,#0c4a6e);
          box-shadow: 0 0 60px rgba(14,165,233,.8); animation: rpulse 2s infinite; }
        @keyframes rpulse { 0%,100% { box-shadow: 0 0 50px rgba(14,165,233,.7); }
          50% { box-shadow: 0 0 90px rgba(14,165,233,1); } }
        .sname { font-size: 50px; font-weight: 900; color: #fff; text-shadow: 0 2px 24px rgba(2,8,23,.5); }
        .stag { font-size: 20px; font-weight: 300; color: #e0f2fe; }
      `}</style>
    </div>
  );
}
