'use client'

import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// InterestsSection.tsx
type HomeProps = {
  language: 'en' | 'ja';
};


export default function Home({ language }: HomeProps) {
  const [content, setContent] = useState('')
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // 1) Markdown を読み込む
    fetch(`/md-contents/${language}/home.md`)
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error(err))
  }, [language])

  useEffect(() => {
    // 2) GSAPアニメーション:
    //    画面を開いた時点で既に表示されている(=初期状態) →
    //    スクロールに連動し、しばらくそのまま → フェードアウトする流れ

    const el = sectionRef.current
    if (!el) return

    const target = el.querySelector('.markdown-body')
    if (!target) return

    // Timelineを定義
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,       // セクション全体をトリガー
        start: 'top top',  // 要素の上端が画面上端に来た時点からタイムライン開始
        end: 'top -60%',   // さらにスクロールして 要素の上端が画面の上-20%に到達したら終了
        scrub: 2,       // スクロール量に応じてアニメをリアルタイム進行/逆再生
        markers: false,     // デバッグ用(本番はfalseでOK)
      },
    })

    // ① 最初から画面に表示済みの状態にしておく
    //    x: 0, opacity: 1
    tl.set(target, {
      x: 0,
      opacity: 1,
    })

    // ② しばらく(1.5秒相当)何も変化しない → 表示されたまま時間を稼ぐ
    tl.to(target, {
      duration: 0.3,
      x: 0,
      opacity: 1,
      ease: 'none',
    })

    // ③ 後半でフェードアウト (x方向にスライド + opacityを0に)
    tl.to(target, {
      x: 800,
      opacity: 0,
      duration: 1,
      ease: 'power2.in',
    })

    // これにより:
    //  - ページ読み込み時には すでに x:0, opacity:1 で表示 (フェードインなし)
    //  - スクロールを進めると 中盤までは何も変化せず (表示キープ)
    //  - 最後に x:800, opacity:0 へとフェードアウト
    //  - scrub: trueなので、スクロールを戻すと 逆再生されて再表示される
  }, [content])

  return (
    <section
      id="home"
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
          textAlign: 'center',
        }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </section>
  )
}


