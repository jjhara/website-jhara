'use client'

import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// InterestsSection.tsx
type LinksProps = {
  language: 'en' | 'ja';
};


/**
 * LinksSection:
 *  - /contents/links.md を読み込んで表示
 *  - スクロール時に「左→中央フェードイン → 保持 → 右フェードアウト」
 */
export default function LinksSection({ language }: LinksProps) {
  const [content, setContent] = useState('')
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // 1) Markdown読み込み
    fetch(`/md-contents/${language}/links.md`)
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error(err))
  }, [language])

  useEffect(() => {
    // 2) GSAPアニメ設定
    const el = sectionRef.current
    if (!el) return

    // アニメのターゲット(.markdown-body)
    const target = el.querySelector('.markdown-body') || el
    if (!target) return

    // タイムライン作成
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 60%',   // スクロール開始位置
        end: 'top -120%',    // 終了位置
        scrub: 2,           // スクロールに2秒の慣性
        markers: false,     // デバッグ時にtrue
      },
    })

    // ① 左からフェードイン
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

    // ③ 右へフェードアウト
    tl.to(target, {
      x: 800,
      opacity: 0,
      duration: 1,
      ease: 'power2.in',
    })
  }, [content])

  return (
    <section
      id="links"
      ref={sectionRef}
      style={{
        height: '150vh', // ご要望どおり 150vh
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
