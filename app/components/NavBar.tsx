
"use client";

import React, { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/**
 * NavBarProps:
 *  - onLanguageChange: 親コンポーネントに言語切り替えを知らせる関数
 * （"language" プロパティは削除）
 */
type NavBarProps = {
  onLanguageChange: (lang: 'en' | 'ja') => void;
};

export default function NavBar({ onLanguageChange }: NavBarProps) {
  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#fff',
    padding: '1rem',
    zIndex: 9999,
    overflow: 'visible',
  };

  // ホバー時にボタンを太字にする
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleScrollTo = (targetId: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: targetId,
      ease: 'power2.out',
    });
  };

  const handleMouseEnter = (targetId: string) => {
    setHoveredButton(targetId);
  };
  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  // Languageドロップダウン
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // 親コンテナ全体で onMouseEnter/Leave → ボタンとドロップダウンの間移動でも消えない
  const handleLangContainerMouseEnter = () => {
    setLangMenuOpen(true);
  };
  const handleLangContainerMouseLeave = () => {
    setLangMenuOpen(false);
  };

  const handleSelectLanguage = (lang: 'en' | 'ja') => {
    onLanguageChange(lang);
    setLangMenuOpen(false);
  };

  // ボタン共通のスタイル
  const buttonBaseStyle: React.CSSProperties = {
    marginRight: '1rem',
    color: '#fff',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'normal',
  };

  return (
    <nav style={navStyle}>
      {/* 左側のセクションボタン */}
      <button
        onClick={() => handleScrollTo('#home')}
        onMouseEnter={() => handleMouseEnter('#home')}
        onMouseLeave={handleMouseLeave}
        style={{
          ...buttonBaseStyle,
          fontWeight: hoveredButton === '#home' ? 'bold' : 'normal',
        }}
      >
        Home
      </button>
      <button
        onClick={() => handleScrollTo('#interests')}
        onMouseEnter={() => handleMouseEnter('#interests')}
        onMouseLeave={handleMouseLeave}
        style={{
          ...buttonBaseStyle,
          fontWeight: hoveredButton === '#interests' ? 'bold' : 'normal',
        }}
      >
        Interests
      </button>
      <button
        onClick={() => handleScrollTo('#publication')}
        onMouseEnter={() => handleMouseEnter('#publication')}
        onMouseLeave={handleMouseLeave}
        style={{
          ...buttonBaseStyle,
          fontWeight: hoveredButton === '#publication' ? 'bold' : 'normal',
        }}
      >
        Publication
      </button>
      <button
        onClick={() => handleScrollTo('#CV')}
        onMouseEnter={() => handleMouseEnter('#CV')}
        onMouseLeave={handleMouseLeave}
        style={{
          ...buttonBaseStyle,
          fontWeight: hoveredButton === '#CV' ? 'bold' : 'normal',
        }}
      >
        CV
      </button>
      <button
        onClick={() => handleScrollTo('#links')}
        onMouseEnter={() => handleMouseEnter('#links')}
        onMouseLeave={handleMouseLeave}
        style={{
          ...buttonBaseStyle,
          fontWeight: hoveredButton === '#links' ? 'bold' : 'normal',
        }}
      >
        Links
      </button>

      {/* 右上に Language コンテナ */}
      <div
        style={{
          position: 'absolute',
          right: '3rem',
          top: '1rem',
          whiteSpace: 'nowrap',
          overflow: 'visible',
        }}
      >
        {/* ホバー領域全体 */}
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
          }}
          onMouseEnter={handleLangContainerMouseEnter}
          onMouseLeave={handleLangContainerMouseLeave}
        >
          {/* Language ボタン */}
          <button style={{ ...buttonBaseStyle, marginRight: 0 }}>
            Language
          </button>

          {/* ドロップダウン */}
          {langMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: '#333',
                border: '1px solid #555',
                padding: '0.5rem',
              }}
            >
              <button
                onClick={() => handleSelectLanguage('en')}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  padding: '0.25rem 1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                English
              </button>
              <button
                onClick={() => handleSelectLanguage('ja')}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  padding: '0.25rem 1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                日本語
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}






