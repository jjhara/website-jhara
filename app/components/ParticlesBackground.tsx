// components/ParticlesBackground.jsx
"use client";
import type { Engine } from 'tsparticles-engine';  // ← これがポイント
import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles'; // ← 'tsparticles' から import

export default function ParticlesBackground() {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine); // engine.checkVersion もこのバージョンならエラーになりにくい
  };


  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        // 背景の色設定
        background: {
          color: { value: "#000000" },
        },
        // パーティクルの設定（数、形、インタラクションなど）
        particles: {
          number: { value: 80 },
          move: {
            enable: true,
            speed: 2,
            outModes: { default: "bounce" },
          },
          shape: {
            type: "circle",
          },
          color: {
            value: ["#0000FF", "#001CFF", "#0039FF", "#0055FF", "#0071FF",
 "#008EFF", "#00AAFF", "#00C6FF", "#00E3FF", "#00FFFF"]

          },
          opacity: {
            value: 1,
          },
          size: {
            value: 3,
          },
          // マウスホバー時などの反応
          links: {
            enable: true,
            distance: 100,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
        },
      }}
    />
  );
};

