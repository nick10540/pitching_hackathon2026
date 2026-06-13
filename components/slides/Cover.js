"use client";
import { useSteps } from "../anim";

/**
 * Title cover — the very first slide, shown before the teaser video.
 * Recreates the PEA Hackathon title card: round PEA seal, product name,
 * tagline, and the Precise Nextxus wordmark. The PEA seal is isolated from
 * the horizontal lockup (224×80) by cropping to its left ~80px.
 */
export default function Cover({ active }) {
  const s = useSteps(active, [150, 500, 850, 1150, 1450]);

  return (
    <div className="cover">
      <div className={"seal" + (s >= 1 ? " show" : "")} role="img" aria-label="การไฟฟ้าส่วนภูมิภาค (PEA)" />

      <h1 className={"name" + (s >= 2 ? " show" : "")}>
        Smart Energy<span className="iq">IQ</span>
      </h1>

      <div className={"tag" + (s >= 3 ? " show" : "")}>
        <div className="t1">Powering Decisions. Saving Millions.</div>
        <div className="t1">Empowering Operators.</div>
      </div>

      <div className={"event" + (s >= 4 ? " show" : "")}>
        PEA Hackathon 2026 <b>Track&nbsp;4</b>
      </div>

      <div className={"brandmark" + (s >= 5 ? " show" : "")}>
        <svg className="mark" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M7 30 L18 12" stroke="#f39c12" strokeWidth="6" strokeLinecap="round" />
          <path d="M16 36 L31 9" stroke="#27ae60" strokeWidth="6" strokeLinecap="round" />
          <path d="M26 36 L41 9" stroke="#1b9bd8" strokeWidth="6" strokeLinecap="round" />
          <circle cx="33" cy="38" r="4.2" fill="#1b9bd8" />
        </svg>
        <span className="wm">
          <span className="p1">PRECISE</span> <span className="p2">NEXTXUS</span>
        </span>
      </div>

      <style jsx>{`
        .cover {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          background:
            radial-gradient(ellipse 1100px 760px at 50% 24%, #ffffff 0%, #eef5fb 62%, #e3eef8 100%);
          font-family: "Prompt", "Segoe UI", sans-serif;
          text-align: center;
        }

        /* PEA round seal cropped from the horizontal lockup */
        .seal {
          width: 168px;
          height: 168px;
          background: url("/img/partners/pea.png") no-repeat left center;
          background-size: ${(224 / 80) * 168}px ${168}px;
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.9, 0.3, 1.3);
        }
        .seal.show { opacity: 1; transform: scale(1); }

        .name {
          font-size: 58px;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #1b9bd8;
          line-height: 1.05;
          margin-top: 8px;
          opacity: 0;
          transform: translateY(16px);
          transition: all 0.7s ease;
        }
        .name.show { opacity: 1; transform: translateY(0); }
        .name .iq { color: #1b9bd8; }

        .tag {
          opacity: 0;
          transform: translateY(14px);
          transition: all 0.7s ease;
        }
        .tag.show { opacity: 1; transform: translateY(0); }
        .tag .t1 {
          font-size: 30px;
          font-weight: 700;
          color: #1b9bd8;
          line-height: 1.35;
        }

        .event {
          font-size: 27px;
          font-weight: 700;
          color: #1b9bd8;
          opacity: 0;
          transform: translateY(12px);
          transition: all 0.7s ease;
        }
        .event.show { opacity: 1; transform: translateY(0); }
        .event b { font-weight: 800; }

        .brandmark {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 26px;
          opacity: 0;
          transform: translateY(12px);
          transition: all 0.7s ease;
        }
        .brandmark.show { opacity: 1; transform: translateY(0); }
        .mark { width: 52px; height: 52px; flex-shrink: 0; }
        .wm {
          font-size: 42px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #1b9bd8;
        }
        .wm .p2 { text-decoration: underline; text-underline-offset: 4px; }
      `}</style>
    </div>
  );
}
