"use client";
import { useSteps } from "../anim";

/**
 * Operator View: a single full-slide image that speaks for itself, with
 * overlaid callouts that point at specific panels of the screenshot.
 * Drop the screenshot at /public/img/demomain/demomain.jpg.
 *
 * Each callout is positioned by left/top (% of the slide = where the arrow
 * tip lands). dir "up" → box sits above the tip; dir "down" → box drops
 * below the tip. Nudge left/top to align with the blue-bordered panels.
 */
const CALLOUTS = [
  {
    id: "forecast",
    left: 52,
    top: 36,
    dir: "up",
    tone: "green",
    icon: "📈",
    title: "AI Forecast + LINE Alert",
    sub: "พยากรณ์โหลด 7 วัน · แจ้งเตือนเข้า LINE อัตโนมัติ",
  },
  {
    id: "dispatch",
    left: 52,
    top: 70,
    dir: "up",
    tone: "blue",
    icon: "🤖",
    title: "AI Dispatch Optimizer",
    sub: "วางแผนเดินเครื่อง DG + BESS อัตโนมัติ",
  },
  {
    id: "scenario",
    left: 17,
    top: 70,
    dir: "up",
    tone: "violet",
    icon: "🧪",
    title: "Scenario Simulation",
    sub: "จำลองสถานการณ์ · ทดสอบแผนก่อนสั่งจริง",
  },
];

export default function OperatorView({ active }) {
  const s = useSteps(active, [150, 700, 1050, 1400]);

  return (
    <div className="ov">
      <img
        className={"full" + (s >= 1 ? " show" : "")}
        src="/img/demomain/demo.gif"
        alt="Operator View — การใช้งานจริงบนเว็บ Smart Energy IQ"
        loading="eager"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement.classList.add("missing");
        }}
      />
      <span className="fallback">
        วางรูปที่ /public/img/demomain/demo.gif
      </span>

      {CALLOUTS.map((c, k) => (
        <div
          key={c.id}
          className={
            "callout " + c.dir + " " + c.tone + (s >= k + 2 ? " show" : "")
          }
          style={{ left: `${c.left}%`, top: `${c.top}%` }}
        >
          {c.dir === "down" && <span className="arrow" />}
          <div className="box">
            <span className="ico">{c.icon}</span>
            <span className="txt">
              <b>{c.title}</b>
              <small>{c.sub}</small>
            </span>
          </div>
          {c.dir === "up" && <span className="arrow" />}
        </div>
      ))}

      <style jsx>{`
        .ov {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #060e1d;
          overflow: hidden;
        }
        .full {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          opacity: 0;
          transform: scale(0.98);
          transition: all 0.6s ease;
        }
        .full.show {
          opacity: 1;
          transform: scale(1);
        }
        .fallback {
          display: none;
          position: absolute;
          font-size: 18px;
          font-weight: 600;
          color: #64748b;
        }
        .ov.missing .fallback {
          display: block;
        }

        .callout {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.3);
          pointer-events: none;
          z-index: 3;
        }
        .callout.up {
          transform: translate(-50%, -100%) translateY(-14px);
        }
        .callout.down {
          transform: translate(-50%, 0) translateY(14px);
        }
        .callout.up.show {
          opacity: 1;
          transform: translate(-50%, -100%) translateY(0);
          animation: bobUp 2.2s ease-in-out 0.6s infinite;
        }
        .callout.down.show {
          opacity: 1;
          transform: translate(-50%, 0) translateY(0);
          animation: bobDown 2.2s ease-in-out 0.6s infinite;
        }

        .box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          border-radius: 16px;
          white-space: nowrap;
        }
        .blue .box {
          background: linear-gradient(135deg, #0ea5e9, #2563eb);
          border: 2px solid #7dd3fc;
          box-shadow: 0 12px 34px rgba(37, 99, 235, 0.55),
            0 0 0 6px rgba(56, 189, 248, 0.15);
        }
        .green .box {
          background: linear-gradient(135deg, #16a34a, #059669);
          border: 2px solid #6ee7b7;
          box-shadow: 0 12px 34px rgba(5, 150, 105, 0.55),
            0 0 0 6px rgba(110, 231, 183, 0.15);
        }
        .violet .box {
          background: linear-gradient(135deg, #8b5cf6, #6d28d9);
          border: 2px solid #c4b5fd;
          box-shadow: 0 12px 34px rgba(109, 40, 217, 0.55),
            0 0 0 6px rgba(196, 181, 253, 0.15);
        }
        .ico {
          font-size: 26px;
          line-height: 1;
        }
        .txt {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }
        .txt b {
          font-size: 19px;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.2px;
        }
        .txt small {
          font-size: 12.5px;
          font-weight: 500;
          color: #eafaf2;
        }
        .blue .txt small {
          color: #d8effc;
        }

        .arrow {
          width: 0;
          height: 0;
          border-left: 13px solid transparent;
          border-right: 13px solid transparent;
        }
        .up .arrow {
          margin-top: -1px;
        }
        .down .arrow {
          margin-bottom: -1px;
        }
        .blue.up .arrow {
          border-top: 16px solid #2563eb;
          filter: drop-shadow(0 6px 6px rgba(37, 99, 235, 0.45));
        }
        .blue.down .arrow {
          border-bottom: 16px solid #2563eb;
          filter: drop-shadow(0 -6px 6px rgba(37, 99, 235, 0.45));
        }
        .green.up .arrow {
          border-top: 16px solid #16a34a;
          filter: drop-shadow(0 6px 6px rgba(5, 150, 105, 0.45));
        }
        .green.down .arrow {
          border-bottom: 16px solid #16a34a;
          filter: drop-shadow(0 -6px 6px rgba(5, 150, 105, 0.45));
        }
        .violet.up .arrow {
          border-top: 16px solid #6d28d9;
          filter: drop-shadow(0 6px 6px rgba(109, 40, 217, 0.45));
        }
        .violet.down .arrow {
          border-bottom: 16px solid #6d28d9;
          filter: drop-shadow(0 -6px 6px rgba(109, 40, 217, 0.45));
        }

        @keyframes bobUp {
          0%,
          100% {
            transform: translate(-50%, -100%) translateY(0);
          }
          50% {
            transform: translate(-50%, -100%) translateY(-7px);
          }
        }
        @keyframes bobDown {
          0%,
          100% {
            transform: translate(-50%, 0) translateY(0);
          }
          50% {
            transform: translate(-50%, 0) translateY(7px);
          }
        }
      `}</style>
    </div>
  );
}
