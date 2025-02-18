'use client'

import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// CVSection.tsx
type CVProps = {
  language: 'en' | 'ja';
};


/**
 * CVSection:
 *  - /contents/cv.md を読み込んで表示
 *  - スクロール時に「左→中央」フェードイン → 保持 → 「中央→右」フェードアウト
 */
export default function CVSection({ language }: CVProps) {
  const [content, setContent] = useState('')
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // ① Markdown読み込み
    fetch(`/md-contents/${language}/cv.md`)
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error(err))
  }, [language])

  useEffect(() => {
    // ② GSAPアニメーション設定
    const el = sectionRef.current
    if (!el) return

    // アニメのターゲット要素(.markdown-body)を取得
    const target = el.querySelector('.markdown-body') || el
    if (!target) return

    // タイムライン作成
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 60%',   // スクロール開始位置
        end: 'top -180%',    // スクロール終了位置
        scrub: 2,           // スクロールに2秒の慣性を持たせる
        markers: false,     // デバッグ用にtrue/false
      },
    })

    // ① 左からフェードイン: x=-800 → x=0, opacity=0→1
    tl.fromTo(
      target,
      { x: -800, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )

    // ② 保持(1.5秒)
    tl.to(target, {
      duration: 1.5,
      x: 0,
      opacity: 1,
      ease: 'none',
    })

    // ③ 右へフェードアウト: x=0 → x=800, opacity=1→0
    tl.to(target, {
      x: 800,
      opacity: 0,
      duration: 1,
      ease: 'power2.in',
    })
  }, [content])

  return (
    <section
      id="CV"
      ref={sectionRef}
      style={{
        height: '200vh',
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
          fontSize: '12px',
          lineHeight: '1.3',
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

