"use client";
import { useEffect, useRef, useState } from "react";
import { fmt } from "../anim";

const ISLANDS = [
  { id: "tao", x: 187, y: 604, n: "เกาะเต่า", p: 1, major: true, hub: true, t: 0.12 },
  { id: "phangan", x: 200, y: 624, n: "พะงัน", p: 2, major: true, t: 0.27 },
  { id: "samui", x: 204, y: 640, n: "สมุย", p: 2, major: true, t: 0.30 },
  { id: "phayam", x: 92, y: 625, n: "พยาม", p: 2, t: 0.33 },
  { id: "yao", x: 106, y: 716, n: "เกาะยาว", p: 2, t: 0.36 },
  { id: "panyi", x: 99, y: 703, n: "", p: 2, t: 0.38 },
  { id: "phuket", x: 89, y: 727, n: "ภูเก็ต", p: 2, major: true, t: 0.40 },
  { id: "phiphi", x: 117, y: 739, n: "พีพี", p: 2, t: 0.42 },
  { id: "lanta", x: 137, y: 746, n: "ลันตา", p: 2, t: 0.44 },
  { id: "mook", x: 152, y: 761, n: "", p: 2, t: 0.46 },
  { id: "libong", x: 160, y: 768, n: "", p: 2, t: 0.47 },
  { id: "sukorn", x: 172, y: 776, n: "", p: 2, t: 0.48 },
  { id: "lipe", x: 152, y: 812, n: "หลีเป๊ะ", p: 2, major: true, t: 0.50 },
  { id: "sichang", x: 251, y: 430, n: "สีชัง", p: 3, t: 0.58 },
  { id: "lan", x: 250, y: 445, n: "เกาะล้าน", p: 3, major: true, t: 0.61 },
  { id: "samet", x: 294, y: 464, n: "เสม็ด", p: 3, major: true, t: 0.64 },
  { id: "chang", x: 351, y: 494, n: "เกาะช้าง", p: 3, major: true, t: 0.68 },
  { id: "mak", x: 362, y: 507, n: "หมาก", p: 3, t: 0.71 },
  { id: "kood", x: 366, y: 518, n: "กูด", p: 3, t: 0.74 },
];

const TH_PATH = `M191,17 Q280,40 330,90 Q380,130 515,188 Q545,260 561,365
  Q480,390 363,405 Q380,440 389,519 Q350,470 300,440 Q260,420 231,399
  Q210,430 195,463 Q160,520 145,581 Q150,620 152,661 Q190,720 238,770 Q284,788 317,815
  Q300,850 269,861 Q230,830 198,804 Q180,780 172,752 Q150,735 125,718 Q105,710 99,698
  Q100,650 106,612 Q130,560 145,524 Q120,450 106,382 Q100,300 102,228 Q90,150 64,80 Q120,30 191,17 Z`;

const lerp = (a, b, t) => a + (b - a) * Math.max(0, Math.min(1, t));
function mapVal(p, segs) {
  for (const [p0, p1, v0, v1] of segs) {
    if (p < p0) return v0;
    if (p <= p1) return lerp(v0, v1, (p - p0) / (p1 - p0));
  }
  return segs[segs.length - 1][3];
}

export default function ScaleOutMap({ active }) {
  const [p, setP] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    if (!active) { setP(0); return; }
    const DUR = 12000, t0 = performance.now();
    const tick = (t) => { const r = Math.min((t - t0) / DUR, 1); setP(r); if (r < 1) raf.current = requestAnimationFrame(tick); };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active]);

  const phase = p >= 0.55 ? 3 : p >= 0.25 ? 2 : p >= 0.1 ? 1 : 0;
  const isl = mapVal(p, [[0.1, 0.25, 0, 1], [0.25, 0.5, 1, 13], [0.55, 0.78, 13, 20]]);
  const save = mapVal(p, [[0.1, 0.25, 0, 169], [0.25, 0.5, 169, 650], [0.55, 0.78, 650, 1000]]);
  const arr = mapVal(p, [[0.1, 0.25, 0, 8], [0.25, 0.5, 8, 45], [0.55, 0.78, 45, 100]]);
  const finale = p >= 0.85;
  const plus = p >= 0.78 ? "+" : "";

  return (
    <div className="so">
      <div className="head">
        <div className="t1">จาก<span className="gold">หนึ่งเกาะ</span>ที่พิสูจน์แล้ว … สู่<span className="gold">ทั้งประเทศ</span></div>
        <div className="t2">โมเดลเดียวกัน · Config เดียว · ขยายได้ทุกเกาะในระบบ กฟภ.</div>
      </div>

      <svg className="map" viewBox="0 0 600 880" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="hubglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity=".85" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path className={"thpath" + (p > 0.02 ? " lit" : "")} d={TH_PATH} />
        <ellipse cx="89" cy="727" rx="9" ry="14" fill="#0d2036" stroke="#1f4a73" strokeWidth="2" />
        <g>
          {ISLANDS.map((o) => {
            const on = p >= o.t;
            return (
              <g key={o.id} className={"isl" + (on ? " on" : "") + (finale ? " party" : "")}>
                <circle className="glow" cx={o.x} cy={o.y} r={o.hub ? 17 : o.major ? 12 : 9} />
                <circle className={"core" + (o.hub ? " hub" : "")} cx={o.x} cy={o.y} r={o.hub ? 6.5 : o.major ? 5 : 3.6} />
                {o.n && (
                  <text className="ilabel" x={o.x + (o.x < 170 ? -10 : 12)} y={o.y + 4.5}
                    textAnchor={o.x < 170 ? "end" : "start"}>{o.n}</text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      <div className="panel">
        <div className="counters">
          <div className={"cnt blue" + (phase >= 1 ? " show" : "")}>
            <div className="ic">🏝️</div>
            <div><div className="k">เกาะที่ครอบคลุม</div><div className="v">{fmt(Math.round(isl))}{plus}</div></div>
          </div>
          <div className={"cnt" + (phase >= 1 ? " show" : "")}>
            <div className="ic">💰</div>
            <div><div className="k">ศักยภาพประหยัดให้ กฟภ. (ประมาณการ)</div><div className="v">฿{fmt(Math.round(save))}{plus}<small> ล้าน / ปี</small></div></div>
          </div>
          <div className={"cnt green" + (phase >= 1 ? " show" : "")}>
            <div className="ic">📈</div>
            <div><div className="k">โอกาสรายได้ธุรกิจ (ARR)</div><div className="v">฿{fmt(Math.round(arr))}<small> ล้าน / ปี</small></div></div>
          </div>
        </div>

        <div className="phases">
          {[
            ["1", "เกาะเต่า — จุดพิสูจน์", "PoC 20 วัน · ฿169M/ปี · ข้อมูลจริง 40,704 แถว", 1],
            ["2", "ขยายภาคใต้ — 12 เกาะ", "สมุย · พะงัน · ภูเก็ต · พีพี · ลันตา · หลีเป๊ะ …", 2],
            ["3", "ทั่วประเทศ — 20+ เกาะ", "ช้าง · กูด · หมาก · เสม็ด · ล้าน · สีชัง …", 3],
          ].map(([no, tt, ds, ph]) => {
            const st = phase > ph ? "done" : phase === ph ? "on" : "";
            return (
              <div key={no} className={"ph " + st}>
                <div className="no">{no}</div>
                <div><div className="tt">{tt}</div><div className="ds">{ds}</div></div>
                <div className="chk">✅</div>
              </div>
            );
          })}
        </div>

        <div className={"confchip" + (finale ? " show" : "")}>⚙️ <b>Config เดียว</b> — เพิ่มเกาะใหม่ได้ใน 1 วัน · ไม่ต้องเขียนโค้ดใหม่</div>
      </div>

      <div className={"stamp" + (finale ? " show" : "")}>
        <div className="l1">เครือข่าย <span className="hl">Smart Island</span> แห่งแรกของ PEA</div>
        <div className="l2">ประหยัดระดับ “พันล้านต่อปี” · เริ่มจากเกาะเดียวที่พิสูจน์แล้ว — เกาะเต่า</div>
      </div>

      <div className="brand-tag" style={{ color: "rgba(125,150,184,.75)" }}>⚡ <b>Smart Energy IQ</b> · Scale-Out</div>

      <style jsx>{`
        .so { position: absolute; inset: 0; overflow: hidden;
          background: radial-gradient(ellipse 1100px 800px at 30% 45%, #0b1830 0%, #060e1d 70%); color: #e2e8f0; }
        .head { position: absolute; top: 26px; left: 44px; z-index: 20; }
        .head .t1 { font-size: 27px; font-weight: 800; color: #f8fafc; line-height: 1.3; }
        .head .t1 .gold { color: #fbbf24; }
        .head .t2 { font-size: 14px; color: #7d96b8; font-weight: 300; margin-top: 3px; }
        .map { position: absolute; left: 18px; top: 84px; width: 470px; height: 620px; }
        .thpath { fill: #0d2036; stroke: #1f4a73; stroke-width: 2; filter: drop-shadow(0 0 18px rgba(56,189,248,.18)); }
        .thpath.lit { stroke: #38bdf8; transition: stroke 1.5s; }
        .isl { opacity: 0; transition: opacity .5s; }
        .isl.on { opacity: 1; }
        .isl .core { fill: #fcd34d; }
        .isl .core.hub { fill: #fbbf24; }
        .isl .glow { fill: #fbbf24; opacity: .32; animation: glowpulse 2.2s infinite ease-in-out; }
        @keyframes glowpulse { 0%,100% { opacity: .2; } 50% { opacity: .5; } }
        .isl.party .core { animation: party .9s infinite alternate ease-in-out; }
        @keyframes party { from { r: 4.5; } to { r: 7; } }
        .ilabel { font-size: 13px; font-weight: 600; fill: #fde68a; font-family: "Prompt", sans-serif;
          text-shadow: 0 1px 6px #000; }
        .panel { position: absolute; right: 36px; top: 104px; width: 430px; display: flex; flex-direction: column; gap: 14px; z-index: 20; }
        .counters { display: flex; flex-direction: column; gap: 12px; }
        .cnt { background: rgba(13,26,48,.88); border: 1.5px solid #1e3a5f; border-radius: 16px;
          padding: 13px 20px; display: flex; align-items: center; gap: 16px; opacity: 0;
          transform: translateX(30px); transition: all .6s cubic-bezier(.2,.9,.3,1.2); }
        .cnt.show { opacity: 1; transform: translateX(0); }
        .cnt .ic { font-size: 30px; }
        .cnt .k { font-size: 12.5px; color: #7d96b8; }
        .cnt .v { font-size: 30px; font-weight: 800; color: #fbbf24; line-height: 1.15; font-variant-numeric: tabular-nums; }
        .cnt .v small { font-size: 14px; font-weight: 500; color: #94a3b8; }
        .cnt.green .v { color: #4ade80; } .cnt.blue .v { color: #7dd3fc; }
        .phases { display: flex; flex-direction: column; gap: 9px; }
        .ph { background: rgba(13,26,48,.7); border: 1.5px solid #16263f; border-radius: 13px;
          padding: 10px 16px; display: flex; gap: 12px; align-items: center; opacity: .35; transition: all .6s ease; }
        .ph.on { opacity: 1; border-color: #fbbf24; background: rgba(40,32,12,.45); box-shadow: 0 0 18px rgba(251,191,36,.12); }
        .ph.done { opacity: 1; border-color: #16a34a; background: rgba(8,36,20,.5); }
        .ph .no { width: 34px; height: 34px; border-radius: 50%; background: #152741; color: #7dd3fc;
          display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px; flex-shrink: 0; }
        .ph.on .no { background: #92400e; color: #fde68a; }
        .ph.done .no { background: #14532d; color: #86efac; }
        .ph .tt { font-size: 15px; font-weight: 700; color: #e2e8f0; }
        .ph .ds { font-size: 11.5px; color: #7d96b8; margin-top: 1px; }
        .ph .chk { margin-left: auto; font-size: 19px; opacity: 0; transform: scale(.4); transition: all .4s cubic-bezier(.2,.9,.3,1.5); }
        .ph.done .chk { opacity: 1; transform: scale(1); }
        .confchip { background: rgba(8,32,52,.85); border: 1.5px solid #0ea5e9; border-radius: 12px;
          padding: 10px 16px; font-size: 13.5px; color: #bae6fd; text-align: center; font-weight: 500;
          opacity: 0; transform: translateY(14px); transition: all .55s cubic-bezier(.2,.9,.3,1.2); }
        .confchip.show { opacity: 1; transform: translateY(0); }
        .confchip b { color: #7dd3fc; }
        .stamp { position: absolute; left: 253px; bottom: 38px; transform: translateX(-50%) scale(.85); z-index: 30;
          background: linear-gradient(135deg,#78350f,#b45309); border: 2.5px solid #fcd34d; border-radius: 18px;
          padding: 14px 34px; text-align: center; box-shadow: 0 12px 40px rgba(245,158,11,.35);
          opacity: 0; transition: all .7s cubic-bezier(.2,.9,.3,1.25); max-width: 470px; }
        .stamp.show { opacity: 1; transform: translateX(-50%) scale(1); }
        .stamp .l1 { font-size: 21px; font-weight: 900; color: #fffbeb; }
        .stamp .l1 .hl { color: #fde047; }
        .stamp .l2 { font-size: 12.5px; color: #fde68a; font-weight: 300; margin-top: 3px; }
      `}</style>
    </div>
  );
}
