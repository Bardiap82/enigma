"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const track = {
  title: "RECURSION",
  genre: "AMBIENT TECHNO",
  artist: "KAMBIZ ANSARI",
  duration: "03:35",
  file: "https://res.cloudinary.com/zy3udcd0/video/upload/v1790094159/EniGma.mp3",
};

const waveform = [14, 23, 9, 41, 17, 29, 66, 21, 46, 15, 78, 31, 52, 18, 91, 44, 26, 58, 19, 36, 73, 28, 14, 39, 18, 58, 31, 12, 45, 22, 67, 28, 12, 34, 18, 53, 25, 10, 29, 16, 40, 20, 12, 24];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(215);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => setCurrentTime(audio.currentTime);
    const ready = () => setDuration(audio.duration || 215);
    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", ready);
    const endPlayback = () => setIsPlaying(false);
    audio.addEventListener("ended", endPlayback);
    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", ready);
      audio.removeEventListener("ended", endPlayback);
    };
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }

  return (
    <main className="music-page">
      <audio ref={audioRef} src={track.file} preload="metadata" />
      <div className="texture" aria-hidden="true" />
      <div className="side-binary left" aria-hidden="true">0<br />1<br />0<br />1<br />0<br />1<br />0<br />1<br />0<br />1</div>
      <div className="side-binary right" aria-hidden="true">0<br />1<br />0<br />1<br />0<br />1<br />0<br />1<br />0<br />1</div>

      <header className="masthead">
        <div className="brand">ENIGMA MAGAZINE</div>
        <div className="mast-rule" />
        <div className="university-brand">
          <Image className="university-logo" src="/university-logo.png" alt="Islamic Azad University logo" width={150} height={150} priority />
          <span><b>UNIVERSITY OF SCIENCE</b><em>&amp;</em><b>TECHNOLOGY OF MAZANDARAN</b></span>
        </div>
      </header>

      <section className="track" aria-label="Featured track">
        <p className="edition">ENIGMA MUSIC SERIES / 001</p>
        <h1>{track.title}</h1>
        <p className="meta">{track.genre}</p>
        <p className="byline">BY <strong>{track.artist}</strong><small>COMPOSER, PRODUCER &amp; CS STUDENT</small></p>

        <div className="signal">
          <div className="orbital-ring" />
          <div className={`waveform ${isPlaying ? "is-playing" : ""}`} aria-hidden="true">
            {waveform.map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
          </div>
        </div>

        <div className="player">
          <time>{formatTime(currentTime)}</time>
          <input aria-label="Track progress" type="range" min="0" max={duration || 215} step="0.1" value={currentTime} onChange={(event) => seek(Number(event.target.value))} />
          <button className="play" onClick={togglePlayback} aria-label={isPlaying ? "Pause song" : "Play song"}>
            {isPlaying ? <svg viewBox="0 0 24 24"><path d="M8 6v12M16 6v12" /></svg> : <svg viewBox="0 0 24 24"><path d="m9 6 9 6-9 6V6Z" fill="currentColor" /></svg>}
          </button>
          <a className="player-download" href={track.file} download aria-label="Download Recursion">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 19h14" /></svg>
          </a>
          <time>{formatTime(duration)}</time>
          <button type="button" className="volume" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} aria-pressed={muted}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={muted ? "M4 10v4h4l5 4V6L8 10H4Zm11.3-2.3-6.6 6.6m0-6.6 6.6 6.6" : "M4 10v4h4l5 4V6L8 10H4Zm12.5 2a3.5 3.5 0 0 0-1.5-2.87v5.74A3.5 3.5 0 0 0 16.5 12Zm0-7a1 1 0 0 0-.67 1.74 7 7 0 0 1 0 10.52A1 1 0 0 0 17.17 18a9 9 0 0 0 0-12.04A1 1 0 0 0 16.5 5Z"} fill="currentColor" />
            </svg>
          </button>
        </div>
      </section>

      <section className="description">
        <p>Recursion is a journey into the infinite loops of thought, where patterns repeat, transform, and return — not as an end, but as a new beginning.</p>
        <span />
      </section>
      <footer>
        <div className="footer-main"><span>01001110<br />01101001<br />01110110<br />01111010</span><b>ONE TRACK.<br />ONE SIGNAL.</b></div>
        <div className="contact-bar" aria-label="Contact information">
          <a href="https://t.me/ae_olumcomputer_mazust" target="_blank" rel="noreferrer"><small>TELEGRAM</small>@ae_olumcomputer_mazust</a>
          <a href="https://www.instagram.com/cs_mazust" target="_blank" rel="noreferrer"><small>INSTAGRAM</small>cs_mazust</a>
          <a href="mailto:bardia.p82@gmail.com"><small>EMAIL</small>bardia.p82@gmail.com</a>
        </div>
        <p className="credit">DESIGNED BY SEYED YASIN HOSSEINI AND BARDIA PAKZAD</p>
      </footer>
    </main>
  );
}
