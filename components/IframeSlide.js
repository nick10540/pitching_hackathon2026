"use client";
import { useEffect, useState } from "react";

/**
 * Embeds one of the original self-contained animated HTML slides (1280×720)
 * via an iframe. Remounts the iframe each time the slide becomes active so the
 * built-in animation timeline restarts from the beginning every visit.
 */
export default function IframeSlide({ active, src, scroll = false }) {
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    if (active) setNonce((n) => n + 1);
  }, [active]);

  return (
    <>
      <iframe
        key={nonce}
        src={src}
        title={src}
        className="frame"
        scrolling={scroll ? "yes" : "no"}
        frameBorder="0"
      />
      <style jsx>{`
        .frame {
          position: absolute;
          inset: 0;
          width: 1280px;
          height: 720px;
          border: 0;
          background: #06101f;
        }
      `}</style>
    </>
  );
}
