'use client'

import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function InterestsSection() {
  const [content, setContent] = useState('')
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // (1) Markdown読み込み
    fetch('/contents/interests.md')
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    // (2) GSAPアニメーション: 左からフェードイン → キープ → 右へフェードアウト
    const el = sectionRef.current
    if (!el) return

    // アニメ対象(.markdown-body)
    const target = el.querySelector('.markdown-body')
    if (!target) return

    // タイムライン設定
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 60%',  // 画面の80%位置で開始
        end: 'top -60%',    // 20%位置までスクロールしたら終了
        scrub: 2,       // スクロール量に応じてリアルタイムに進行/逆再生
        markers: false,    // デバッグ用(本番はfalseでOK)
      },
    })

    // ① 左からフェードイン: x:-800 → x:0, opacity:0→1
    tl.fromTo(
      target,
      { x: -800, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )

    // ② しばらく保持(1.5秒など)
    tl.to(target, {
      duration: 1.5,
      x: 0,
      opacity: 1,
      ease: 'none',
    })

    // ③ 右へフェードアウト: x:0 → x:800, opacity:1→0
    tl.to(target, {
      x: 800,
      opacity: 0,
      duration: 1,
      ease: 'power2.in',
    })
  }, [content])

  return (
    <section
      id="interests"
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
        style={{ width: '80%', maxWidth: '600px', color: '#FFF', textAlign: 'left' }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </section>
  )
}
