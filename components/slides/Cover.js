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
      <img
        src="/img/pea_logo_big.png"
        alt="การไฟฟ้าส่วนภูมิภาค (PEA)"
        className={"seal" + (s >= 1 ? " show" : "")}
      />

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
        <img src="/img/LOGO_ART_PRECISE.png" alt="Precise" className="precise-logo" />
        <span className="nextxus">NEXTXUS</span>
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

        .seal {
          width: 168px;
          height: 168px;
          object-fit: contain;
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
          align-items: flex-end;
          gap: 0px;
          margin-top: 26px;
          opacity: 0;
          transform: translateY(12px);
          transition: all 0.7s ease;
        }
        .brandmark.show { opacity: 1; transform: translateY(0); }
        .precise-logo { height: 90px; width: auto; display: block; }
        .nextxus {
          font-size: 76px;
          font-weight: 800;
          color: #1b9bd8;
          letter-spacing: 1px;
          line-height: 1;
          font-family: "Prompt", "Segoe UI", sans-serif;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
