'use client'

import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// InterestsSection.tsx
type MiscProps = {
  language: 'en' | 'ja';
};


/**
 * MiscSection:
 *  - /contents/misc.md を読み込んで表示
 *  - スクロール時に「左→中央フェードイン → 保持 → 右フェードアウト」
 */
export default function MiscSection({ language }: MiscProps) {
  const [content, setContent] = useState('')
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // 1) Markdown読み込み
    fetch(`/md-contents/${language}/misc.md`)
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error(err))
  }, [language])

  useEffect(() => {
    // 2) GSAPアニメーション設定
    const el = sectionRef.current
    if (!el) return

    // アニメのターゲット: .markdown-body
    const target = el.querySelector('.markdown-body') || el
    if (!target) return

    // タイムライン
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 60%',   // スクロール開始位置
        end: 'top -120%',    // スクロール終了位置
        scrub: 2,           // スクロールに2秒の慣性
        markers: false,     // デバッグ用にtrueでもOK
      },
    })

    // ① 左からフェードイン (x:-800 → 0, opacity:0→1)
    tl.fromTo(
      target,
      { x: -800, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )

    // ② 保持 (1.5秒)
    tl.to(target, {
      duration: 1.5,
      x: 0,
      opacity: 1,
      ease: 'none',
    })

    // ③ 右へフェードアウト (x:0 → x:800, opacity:1→0)
    tl.to(target, {
      x: 800,
      opacity: 0,
      duration: 1,
      ease: 'power2.in',
    })
  }, [content])

  return (
    <section
      id="misc"
      ref={sectionRef}
      style={{
        height: '100vh',
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="markdown-body"
        style={{
          width: '80%',
          maxWidth: '600px',
          color: '#FFF',
          textAlign: 'left',
        }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </section>
  )
}

