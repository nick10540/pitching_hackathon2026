"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Opening slide (shown before slide 1): a full-bleed YouTube teaser.
 * The player is created only while the slide is active so the video starts
 * fresh on entry and stops (audio included) the moment we navigate away.
 *
 * Playback runs at 1.25× — YouTube has no URL param for speed, so we drive
 * it via the IFrame Player API (setPlaybackRate on ready + on play, because
 * autoplay can reset the rate back to 1×).
 */
const VIDEO_ID = "96Gc2Jjd6EM";
const PLAYBACK_RATE = 1.25;

// Load the YouTube IFrame API exactly once and resolve when YT is ready.
let ytApiPromise = null;
function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === "function") prev();
      resolve(window.YT);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return ytApiPromise;
}

export default function IntroVideo({ active }) {
  const [mounted, setMounted] = useState(false);
  const hostRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // (re)mount on enter, unmount on leave to start/stop playback cleanly
    setMounted(active);
  }, [active]);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !YT || !hostRef.current) return;
      // YT.Player REPLACES the node it's given with its <iframe>. Hand it a
      // throwaway child we create here — never the React-owned hostRef <div> —
      // so React's own unmount (removeChild of hostRef) always succeeds.
      const inner = document.createElement("div");
      hostRef.current.appendChild(inner);

      const setRate = (e) => {
        try {
          e.target.setPlaybackRate(PLAYBACK_RATE);
        } catch {
          /* rate not yet settable — retried on the next event */
        }
      };
      playerRef.current = new YT.Player(inner, {
        videoId: VIDEO_ID,
        playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady: (e) => {
            setRate(e);
            e.target.playVideo();
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) setRate(e);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        if (playerRef.current && playerRef.current.destroy) playerRef.current.destroy();
      } catch {
        /* iframe already gone — nothing to clean up */
      }
      playerRef.current = null;
    };
  }, [mounted]);

  return (
    <div className="iv">
      <div className="frame">
        {mounted ? (
          <div ref={hostRef} className="ytplayer" />
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
