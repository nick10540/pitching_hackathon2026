"use client";
import { useSteps, useCountUp, fmt } from "../anim";

export default function PainSolutionImpact({ active }) {
  const s = useSteps(active, [
    400, 1000, 1600, 2400, // act1
    3600, 4200, 5000, 5800, 6600, // act2
    7800, 8500, 9200, 9900, 10700, // act3
  ]);
  const act = s >= 10 ? 3 : s >= 5 ? 2 : 1;

  const n1 = useCountUp(active && s >= 10, 14.08, { duration: 1300 });
  const n2 = useCountUp(active && s >= 11, 169, { duration: 1300 });
  const n3 = useCountUp(active && s >= 12, 1690, { duration: 1500 });

  return (
    <div className="psi">
      {/* ACT 1 — PAIN */}
      <div className={"act" + (act === 1 ? " in" : " out")}>
        <div className="lbl pain">ACT 1 · PAIN — ปัญหาที่เกาะเต่าเจอทุกวัน</div>
        <div className="atitle">เกาะเต่าวันนี้ — จ่ายแพง เสี่ยงดับ คนเฝ้าจนไหม้</div>
        <div className="asub">ข้อมูลจริงจากระบบ กฟภ. เดือนสิงหาคม 2568 · 40,704 แถว</div>
        <div className="paincards">
          {[
            ["🔥", "ดีเซลเดินเปล่า เผาเงินทุกชั่วโมง", "DG9 เดิน 99.5% ของเวลา แม้โหลดต่ำ — 12 ฿/หน่วย แพงกว่ากริดเกือบ 3 เท่า", "฿22.78M", "/ เดือน ที่เกาะเดียว"],
            ["😰", "Operator เฝ้าตาเปล่า 24/7", "ไม่มีระบบเตือนล่วงหน้า — โหลดพุ่งทีต้องวิทยุตามช่าง สตาร์ทเครื่องเอง ลุ้นทุกคืน", "16 นาที", "คือเส้นตายตัดสินใจ"],
            ["🔌", "สายใต้น้ำเส้นเดียว ไม่มีแผนสอง", "เคเบิล L6 (8 MW) คือเส้นเลือดเดียว — trip เมื่อไหร่ มืดทั้งเกาะ 3,000+ คน", "1 เส้น", "= ความเสี่ยงทั้งเกาะ"],
          ].map(([ic, tt, ds, num, sm], k) => (
            <div key={k} className={"pcard" + (s >= k + 1 ? " show" : "")}>
              <div className="ic">{ic}</div>
              <div className="tt">{tt}</div>
              <div className="ds">{ds}</div>
              <div className="num">{num} <small>{sm}</small></div>
            </div>
          ))}
        </div>
        <div className={"burnbar" + (s >= 4 ? " show" : "")}>
          <span className="fire">🔥</span>
          <span className="tx">ทุกชั่วโมงที่ผ่านไป เงินกำลังไหม้ — และจะเป็นแบบนี้ต่อไป ถ้าไม่มีใครแก้</span>
        </div>
      </div>

      {/* ACT 2 — SOLUTION */}
      <div className={"act" + (act === 2 ? " in" : act > 2 ? " out" : "")}>
        <div className="lbl sol">ACT 2 · SOLUTION — Smart Energy IQ แก้ให้ทีละข้อ</div>
        <div className="atitle">ปัญหาเดิมทุกข้อ → ถูกแก้ด้วย AI ที่พิสูจน์แล้ว</div>
        <div className="asub">หลักการเดียว: เดินดีเซลเฉพาะเมื่อสายส่งไม่พอ · ทุกสูตรพิสูจน์ได้ 22/22</div>
        <div className="solrows">
          {[
            ["🔥", "DG9 เดินเปล่า ฿22.78M/เดือน", "🤖", "AI Dispatch Optimizer", "คำนวณทุก 15 นาที — เดินดีเซลเฉพาะเมื่อจำเป็นจริง", "DG9 −61.8%"],
            ["😰", "เฝ้าตาเปล่า ไม่มีระบบเตือน", "📱", "AI Forecast + LINE Alert", "พยากรณ์โหลด MAPE 3.7% — เตือนก่อนวิกฤต 16 นาที", "รู้ก่อน 16 นาที"],
            ["🔌", "L6 trip = มืดทั้งเกาะ", "🗺️", "Scenario Simulation 9 เหตุการณ์", "ซ้อมรับมือ L6 Trip · Ferranti · Peak พร้อมแผน UFLS", "มีแผนรับมือทุกเคส"],
          ].map(([pic, ptx, sic, stt, sds, chip], k) => (
            <div key={k} className={"srow" + (s >= 6 + k ? " solved" : "")}>
              <div className="pain"><span className="pic">{pic}</span><span className="ptx">{ptx}</span></div>
              <div className="arrow">➜</div>
              <div className="sol">
                <span className="sic">{sic}</span>
                <div className="sbody"><div className="stt">{stt}</div><div className="sds">{sds}</div></div>
                <span className="schip">{chip}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={"soltrust" + (s >= 9 ? " show" : "")}>
          🛡️ ปลอดภัย 100%: ระบบ <b>แนะนำเท่านั้น (Advisory)</b> · Operator ตัดสินใจเอง · ข้อมูลขึ้น Cloud ทางเดียวตาม <b>IEC 62443</b>
        </div>
      </div>

      {/* ACT 3 — IMPACT */}
      <div className={"act" + (act === 3 ? " in" : "")}>
        <div className="lbl imp">ACT 3 · IMPACT — ผลลัพธ์ที่ PEA ได้ทันที</div>
        <div className="atitle">ตัวเลขจริง ไม่ใช่ประมาณการ — พิสูจน์แล้วกับข้อมูลจริง</div>
        <div className="impgrid">
          <div className={"impbig" + (s >= 10 ? " show" : "")}>
            <div className="ilb">💰 ประหยัดสุทธิ / เดือน</div>
            <div className="ivl">฿{fmt(n1, 2)}<small> ล้าน</small></div>
          </div>
          <div className={"impbig" + (s >= 11 ? " show" : "")}>
            <div className="ilb">📅 ประหยัด / ปี (ต่อเกาะ)</div>
            <div className="ivl">฿{fmt(n2)}<small> ล้าน</small></div>
          </div>
          <div className={"impbig gold" + (s >= 12 ? " show" : "")}>
            <div className="ilb">🏆 มูลค่า 10 ปี ที่เกาะเต่าเกาะเดียว</div>
            <div className="ivl">฿{fmt(n3)}<small> ล้าน</small></div>
          </div>
        </div>
        <div className="impchips">
          {[
            ["⚙️", "ชั่วโมงเดิน DG9 −61.8% → เครื่องอายุยืน ค่าซ่อมลด"],
            ["🌱", "CO₂ ลด 377 ตัน/เดือน → ตอบ Net Zero 2065"],
            ["💡", "ไฟฟ้ามั่นคงขึ้น → นักท่องเที่ยว 3,000+ ไม่เจอไฟดับ"],
            ["😌", "Operator มีระบบช่วยเฝ้า → ลด human error ลดภาระ 24/7"],
            ["🏝️", "เกาะเต่า = Smart Island ต้นแบบแห่งแรกของ PEA"],
          ].map(([ic, tx], k) => (
            <div key={k} className={"ichip" + (s >= 13 ? " show" : "")} style={{ transitionDelay: k * 70 + "ms" }}>
              <span className="cic">{ic}</span><span>{tx}</span>
            </div>
          ))}
        </div>
        <div className={"cta" + (s >= 14 ? " show" : "")}>
          <div className="c1">💎 Gain-Share Model — PEA จ่ายจากเงินที่ประหยัดได้จริงเท่านั้น <span className="g">ความเสี่ยง = ศูนย์</span></div>
          <div className="c2">ไม่ต้องขออนุมัติงบใหม่ · เริ่ม PoC บนเกาะเต่าได้ใน 20 วัน · ขยายได้ทุกเกาะ (config เดียว)</div>
        </div>
      </div>

      <div className="brand-tag" style={{ color: "#94a3b8" }}>⚡ <b style={{ color: "#0284c7" }}>Smart Energy IQ</b></div>

      <style jsx>{`
        .psi { position: absolute; inset: 0; background: #fff; color: #334155; overflow: hidden; }
        .act { position: absolute; inset: 0; padding: 38px 54px; display: flex; flex-direction: column;
          opacity: 0; transform: translateX(50px); pointer-events: none; transition: all .65s cubic-bezier(.2,.8,.25,1); }
        .act.in { opacity: 1; transform: translateX(0); pointer-events: auto; }
        .act.out { opacity: 0; transform: translateX(-50px); }
        .lbl { width: fit-content; font-size: 13px; font-weight: 700; letter-spacing: 1.5px;
          padding: 5px 18px; border-radius: 999px; margin-bottom: 10px; }
        .lbl.pain { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
        .lbl.sol { background: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; }
        .lbl.imp { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
        .atitle { font-size: 31px; font-weight: 800; color: #0f172a; line-height: 1.25; }
        .asub { font-size: 14px; color: #64748b; font-weight: 300; margin-top: 4px; }

        .paincards { flex: 1; display: flex; gap: 22px; margin-top: 22px; }
        .pcard { flex: 1; background: #fef5f5; border: 2px solid #fecaca; border-radius: 18px;
          padding: 22px; display: flex; flex-direction: column; gap: 9px; opacity: 0;
          transform: translateY(30px) scale(.95); transition: all .55s cubic-bezier(.2,.9,.3,1.25); }
        .pcard.show { opacity: 1; transform: translateY(0) scale(1); }
        .pcard .ic { font-size: 44px; }
        .pcard .tt { font-size: 18px; font-weight: 700; color: #b91c1c; line-height: 1.3; }
        .pcard .ds { font-size: 13px; color: #64748b; line-height: 1.5; flex: 1; }
        .pcard .num { font-size: 25px; font-weight: 800; color: #dc2626; }
        .pcard .num small { font-size: 12.5px; font-weight: 500; color: #94a3b8; }
        .burnbar { margin-top: 16px; background: #fff7ed; border: 1.5px solid #fdba74; border-radius: 14px;
          padding: 12px 24px; display: flex; align-items: center; gap: 14px; justify-content: center;
          opacity: 0; transition: opacity .5s; }
        .burnbar.show { opacity: 1; }
        .burnbar .fire { font-size: 26px; animation: flick .6s infinite alternate; }
        @keyframes flick { from { transform: scale(1) rotate(-3deg); } to { transform: scale(1.15) rotate(3deg); } }
        .burnbar .tx { font-size: 16px; color: #9a3412; font-weight: 500; }

        .solrows { flex: 1; display: flex; flex-direction: column; gap: 16px; margin-top: 20px; justify-content: center; }
        .srow { display: flex; align-items: center; }
        .srow .pain { width: 290px; background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 14px;
          padding: 13px 18px; font-size: 14px; color: #b91c1c; font-weight: 600; display: flex; gap: 10px;
          align-items: center; flex-shrink: 0; transition: opacity .4s; }
        .srow .pain .pic { font-size: 22px; }
        .srow.solved .pain { opacity: .55; }
        .srow.solved .ptx { text-decoration: line-through; text-decoration-color: #dc2626; text-decoration-thickness: 2px; }
        .srow .arrow { width: 80px; text-align: center; font-size: 26px; color: #0284c7; flex-shrink: 0;
          opacity: 0; transform: scale(.4); transition: all .4s cubic-bezier(.2,.9,.3,1.4); }
        .srow.solved .arrow { opacity: 1; transform: scale(1); }
        .srow .sol { flex: 1; background: #f0f9ff; border: 2px solid #7dd3fc; border-radius: 14px;
          padding: 13px 20px; display: flex; gap: 14px; align-items: center; opacity: 0;
          transform: translateX(26px); transition: all .5s cubic-bezier(.2,.9,.3,1.2); box-shadow: 0 3px 10px rgba(2,132,199,.1); }
        .srow.solved .sol { opacity: 1; transform: translateX(0); }
        .srow .sic { font-size: 30px; }
        .srow .sbody { flex: 1; }
        .srow .stt { font-size: 16px; font-weight: 700; color: #075985; }
        .srow .sds { font-size: 12.5px; color: #64748b; margin-top: 1px; }
        .srow .schip { background: #dcfce7; color: #15803d; border: 1px solid #86efac; font-size: 13px;
          font-weight: 700; padding: 4px 12px; border-radius: 999px; white-space: nowrap; }
        .soltrust { margin-top: 16px; text-align: center; font-size: 13.5px; color: #475569;
          background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 999px; padding: 8px 22px;
          width: fit-content; align-self: center; opacity: 0; transition: opacity .5s; }
        .soltrust.show { opacity: 1; }
        .soltrust b { color: #0369a1; }

        .impgrid { display: flex; gap: 18px; margin-top: 20px; }
        .impbig { flex: 1; border-radius: 18px; padding: 18px 22px; text-align: center;
          background: linear-gradient(160deg,#f0fdf4,#ecfdf5); border: 2px solid #86efac; opacity: 0;
          transform: translateY(26px) scale(.93); transition: all .55s cubic-bezier(.2,.9,.3,1.3); }
        .impbig.show { opacity: 1; transform: translateY(0) scale(1); }
        .impbig .ilb { font-size: 13px; color: #64748b; font-weight: 500; }
        .impbig .ivl { font-size: 38px; font-weight: 900; color: #15803d; line-height: 1.15; font-variant-numeric: tabular-nums; }
        .impbig .ivl small { font-size: 15px; font-weight: 600; color: #16a34a; }
        .impbig.gold { background: linear-gradient(160deg,#fffbeb,#fef9c3); border-color: #fcd34d; }
        .impbig.gold .ivl { color: #b45309; }
        .impchips { display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap; justify-content: center; }
        .ichip { background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 10px 16px;
          display: flex; gap: 10px; align-items: center; font-size: 13px; color: #334155; font-weight: 500;
          opacity: 0; transform: translateY(16px); transition: all .45s cubic-bezier(.2,.9,.3,1.2); }
        .ichip.show { opacity: 1; transform: translateY(0); }
        .ichip .cic { font-size: 20px; }
        .cta { margin-top: auto; border-radius: 18px; padding: 16px 30px; text-align: center;
          background: linear-gradient(135deg,#064e3b,#15803d); color: #fff; box-shadow: 0 10px 30px rgba(21,128,61,.35);
          opacity: 0; transform: scale(.9); transition: all .6s cubic-bezier(.2,.9,.3,1.3); }
        .cta.show { opacity: 1; transform: scale(1); }
        .cta .c1 { font-size: 20px; font-weight: 800; }
        .cta .c1 .g { color: #fde047; }
        .cta .c2 { font-size: 13.5px; font-weight: 300; margin-top: 4px; opacity: .92; }
      `}</style>
    </div>
  );
}
