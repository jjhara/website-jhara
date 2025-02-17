// app/page.tsx (修正版)

"use client";
import React from 'react';
import ParticlesBackground from './components/ParticlesBackground';

// 使っている各セクションコンポーネント
import Home from './components/Home';
import InterestsSection from './components/InterestsSection';
import PublicationSection from './components/PublicationSection';
import CVSection from './components/CVSection';
import LinksSection from './components/LinksSection';

// ※ ScrollAnimation が不要なら削除
// import ScrollAnimation from './components/ScrollAnimation';

export default function HomePage() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* パーティクル背景 (react-tsparticles) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <ParticlesBackground />
      </div>

      {/* コンテンツ部分 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          color: '#fff',
          textAlign: 'center',
          marginTop: '7vh',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 'normal', margin: 0 }}>
          Junya Hara
        </h1>

        {/* 各セクション */}
        <Home />
        <InterestsSection />
        <PublicationSection />
        <CVSection />
        {/*<MiscSection />*/}
        <LinksSection />
      </div>
    </div>
  );
}

