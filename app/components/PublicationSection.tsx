'use client'

import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * PublicationSection:
 *  - /contents/publication.md を読み込んで表示
 *  - スクロール時に「左からフェードイン → しばらく保持 → 右へフェードアウト」
 */
export default function PublicationSection() {
  const [content, setContent] = useState('')
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // ① Markdown読み込み
    fetch('/contents/publication.md')
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    // ② GSAPアニメーション設定
    const el = sectionRef.current
    if (!el) return

    // アニメ対象 (markdown表示部分)
    const target = el.querySelector('.markdown-body') || el
    // 念のため nullチェック
    if (!target) return

    // タイムライン作成
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 60%',  // 60%位置で開始
        end: 'top -180%',   // -60%位置までスクロールしたら終了
        scrub: 2,          // スクロール量に応じて進行/逆再生 (2秒の慣性)
        markers: false,    // デバッグ用に true/false
      },
    })

    // (1) 左からフェードイン (x: -800 → 0, opacity: 0 → 1)
    tl.fromTo(
      target,
      { x: -800, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )

    // (2) 保持 (1.5秒)
    tl.to(target, {
      duration: 1.5,
      x: 0,
      opacity: 1,
      ease: 'none',
    })

    // (3) 右へフェードアウト (x: 0 → 800, opacity: 1 → 0)
    tl.to(target, {
      x: 800,
      opacity: 0,
      duration: 1,
      ease: 'power2.in',
    })
  }, [content])

  return (
    <section
      id="publication"
      ref={sectionRef}
      style={{
        // 高さ200vh
        height: '200vh',
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Markdownを表示する要素 */}
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
