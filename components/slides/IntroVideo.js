"use client";
import { useEffect, useState } from "react";

/**
 * Opening slide (shown before slide 1): a full-bleed YouTube teaser.
 * The iframe is mounted only while the slide is active so the video starts
 * fresh on entry and stops (audio included) the moment we navigate away.
 */
const VIDEO_ID = "UHItJUPsrcg";

export default function IntroVideo({ active }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // (re)mount on enter, unmount on leave to start/stop playback cleanly
    setMounted(active);
  }, [active]);

  const src =
    `https://www.youtube.com/embed/${VIDEO_ID}` +
    `?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className="iv">
      <div className="frame">
        {mounted ? (
          <iframe
            src={src}
            title="Smart Energy IQ — Teaser"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        ) : (
          <a
            className="poster"
            href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="play">▶</span>
          </a>
        )}
      </div>

      <div className="brand-tag" style={{ color: "#8aa1c2" }}>
        ⚡ <b>Smart Energy IQ</b> · Team Precise Nextxus · PEA Hackathon 2026
      </div>

      <style jsx>{`
        .iv {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse 1100px 800px at 50% -10%, #0d1f3a 0%, #060e1d 72%);
        }
        .frame {
          position: relative;
          width: 1280px;
          height: 720px;
          background: #000;
        }
        .frame :global(iframe) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .poster {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0d1f3a, #060e1d);
          text-decoration: none;
        }
        .play {
          width: 92px;
          height: 92px;
          border-radius: 50%;
          background: rgba(56, 189, 248, 0.92);
          color: #04101f;
          font-size: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 6px;
          box-shadow: 0 10px 40px rgba(56, 189, 248, 0.5);
        }
      `}</style>
    </div>
  );
}
