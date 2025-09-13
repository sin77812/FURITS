'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 이미지 페이드인 + 줌인 효과
      gsap.fromTo(imageRef.current, 
        { 
          scale: 1.2, 
          opacity: 0 
        },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 2,
          ease: 'power3.out'
        }
      )

      // 타이틀 텍스트 애니메이션
      if (titleRef.current) {
        const chars = titleRef.current.textContent?.split('') || []
        titleRef.current.innerHTML = chars.map(char => 
          `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('')
        
        gsap.fromTo(titleRef.current.children,
          { 
            opacity: 0,
            y: 50,
            rotateX: -90
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
            delay: 0.5
          }
        )
      }

      // 서브타이틀 애니메이션
      gsap.fromTo(subtitleRef.current,
        { 
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 1.5
        }
      )

      // CTA 버튼 애니메이션
      gsap.fromTo(ctaRef.current,
        { 
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 2
        }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleScroll = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-deep-black"
    >
      <div 
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/BENNER.png)',
        }}
      />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 
          ref={titleRef}
          className="heading-primary text-white mb-6 perspective-1000"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
        >
          제철의 정점
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white mb-12 font-light tracking-widest"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
        >
          당신의 테이블 위에
        </p>
        
        <button
          ref={ctaRef}
          onClick={handleScroll}
          className="btn-premium text-lg tracking-widest uppercase"
        >
          Premium Collection
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-premium-gold"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}