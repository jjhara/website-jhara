// components/ScrollAnimation.jsx

"use client"; 
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    // GSAPアニメーション
    gsap.fromTo(
      el.querySelector('.box'),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: el.querySelector('.box'),
          start: 'top 80%', // この位置までスクロールされたら実行開始
        },
      }
    );
  }, []);

  return (
    <div ref={ref} style={{ height: '200vh' }}>
      {/* スクロール位置が分かりやすいように高さを200vh確保 */}
      <div
        className="box"
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'red',
          margin: '100vh auto',
          textAlign: 'center',
          lineHeight: '200px',
          color: '#fff',
        }}
      >
        スクロールアニメーション
      </div>
    </div>
  );
};

export default ScrollAnimation;
