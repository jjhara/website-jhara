
'use client'  // ← 最初に書く

import React, { useState } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export default function NavBar() {
  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#fff',
    padding: '1rem',
    zIndex: 9999,
  }

  // 「現在どのボタンにホバーしているか」を持つstate
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  // セクションへ移動するボタンのクリックハンドラ
  const handleScrollTo = (targetId: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: targetId,
      ease: 'power2.out',
    })
  }

  // 各ボタンのホバー時に呼ばれる
  const handleMouseEnter = (targetId: string) => {
    setHoveredButton(targetId)
  }

  // ホバーが外れたらnullに戻す
  const handleMouseLeave = () => {
    setHoveredButton(null)
  }

  // ボタン共通のスタイル
  const buttonBaseStyle: React.CSSProperties = {
    marginRight: '1rem',
    color: '#fff',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    // ここではfontWeightは "normal" で、ホバー中にboldへ変えます
    fontWeight: 'normal',
  }

  return (
    <nav style={navStyle}>
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
    </nav>
  )
}
