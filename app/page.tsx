"use client";
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import ParticlesBackground from './components/ParticlesBackground';
import Home from './components/Home';
import InterestsSection from './components/InterestsSection';
import PublicationSection from './components/PublicationSection';
import CVSection from './components/CVSection';
import LinksSection from './components/LinksSection';

export default function HomePage() {
  // 言語を管理 (NavBarでは使わない)
  const [language, setLanguage] = useState<'en'|'ja'>('en');

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}>
        <ParticlesBackground />
      </div>

      {/* NavBar に "language" は渡さず、onLanguageChangeだけ渡す */}
      <NavBar onLanguageChange={setLanguage} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        color: '#fff',
        textAlign: 'center',
        marginTop: '7vh',
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'normal', margin: 0 }}>
          Junya Hara
        </h1>

        {/* 各セクションには language を渡す */}
        <Home language={language} />
        <InterestsSection language={language} />
        <PublicationSection language={language} />
        <CVSection language={language} />
        <LinksSection language={language} />
      </div>
    </div>
  );
}


