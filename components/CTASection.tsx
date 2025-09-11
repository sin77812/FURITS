'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, MessageCircle } from 'lucide-react'
import { storeInfo } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const bgImageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 배경 이미지 패럴럭스
      gsap.to(bgImageRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

      // 타이틀과 버튼 애니메이션
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      })

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo(buttonsRef.current?.children || [],
        { 
          opacity: 0,
          y: 30,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out'
        },
        '-=0.5'
      )

      // CTA 버튼 흔들림 효과
      const shakeButtons = () => {
        gsap.to(buttonsRef.current?.children[0], {
          x: [-2, 2, -2, 2, 0],
          duration: 0.5,
          ease: 'power2.inOut'
        })
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        onEnter: shakeButtons,
        onEnterBack: shakeButtons
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handlePhoneCall = () => {
    window.location.href = `tel:${storeInfo.phone}`
  }

  const handleKakaoChat = () => {
    // 카카오톡 채널 연결 (실제로는 카카오톡 채널 URL 필요)
    window.open('https://pf.kakao.com/_xXxXxX', '_blank')
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <div 
          ref={bgImageRef}
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: 'url(https://via.placeholder.com/1920x1080/0F3D2E/D4AF37?text=Premium+Fruits+Box)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-deep-black/80" />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 container-fluid text-center">
        <h2 
          ref={titleRef}
          className="heading-primary text-premium-gold mb-8"
        >
          놓치면 <span className="text-soft-beige">후회하는</span> 프리미엄
        </h2>
        
        <p className="text-xl text-soft-beige/80 mb-12 max-w-2xl mx-auto">
          오늘 주문하신 과일이 내일 아침 
          <br className="md:hidden" />
          당신의 식탁 위에 놓입니다
        </p>

        <div 
          ref={buttonsRef}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <button
            onClick={handlePhoneCall}
            className="group relative px-12 py-6 bg-premium-gold text-deep-green
                     font-bold text-lg rounded-lg overflow-hidden
                     hover:scale-105 transition-transform duration-300"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Phone className="w-6 h-6" />
              전화로 주문하기
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                          -translate-x-full group-hover:translate-x-full
                          transition-transform duration-700" />
          </button>

          <button
            onClick={handleKakaoChat}
            className="group relative px-12 py-6 bg-transparent text-premium-gold
                     font-bold text-lg rounded-lg overflow-hidden
                     border-2 border-premium-gold
                     hover:scale-105 transition-all duration-300
                     hover:bg-premium-gold hover:text-deep-green"
          >
            <span className="relative z-10 flex items-center gap-3">
              <MessageCircle className="w-6 h-6" />
              카카오톡 상담
            </span>
          </button>
        </div>

        <p className="mt-8 text-soft-beige/60 text-sm">
          영업시간: {storeInfo.hours.weekday} | 전화: {storeInfo.phone}
        </p>
      </div>
    </section>
  )
}