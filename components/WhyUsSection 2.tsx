'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Leaf, Award, Truck, Shield } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Leaf,
    title: '산지 직거래',
    description: '농장에서 직접 엄선한 최상급 과일만을 취급합니다'
  },
  {
    icon: Award,
    title: '20년 전통',
    description: '과일 하나만을 생각해온 20년의 노하우와 신뢰'
  },
  {
    icon: Truck,
    title: '당일 배송',
    description: '신선함을 그대로, 당일 수확 당일 배송 시스템'
  },
  {
    icon: Shield,
    title: '품질 보증',
    description: '만족하지 못하시면 100% 환불 보장'
  }
]

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 타이틀 애니메이션 - 더 빠르게
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // 아이템들 애니메이션 - 딜레이 없이 동시에
      gsap.fromTo(itemsRef.current,
        { 
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // 배경 색상 전환
      gsap.to(bgRef.current, {
        backgroundColor: '#0F3D2E',
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      <div 
        ref={bgRef}
        className="absolute inset-0 transition-colors duration-1000"
      />
      
      <div className="relative z-10 container-fluid">
        <h2 
          ref={titleRef}
          className="heading-secondary text-center mb-20 text-premium-gold"
        >
          과일총각만의 <span className="text-soft-beige">특별함</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => itemsRef.current[index] = el}
              className="group bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-premium-gold/20 
                         hover:bg-white/20 hover:border-premium-gold/40 transition-all duration-500
                         hover:scale-105 hover:shadow-2xl"
            >
              <div className="mb-6 relative">
                <feature.icon 
                  className="w-16 h-16 text-premium-gold group-hover:text-soft-beige transition-colors duration-500" 
                />
                <div className="absolute inset-0 bg-premium-gold/20 blur-xl group-hover:bg-premium-gold/30 transition-all duration-500" />
              </div>
              
              <h3 className="text-xl font-bold text-soft-beige mb-3 text-premium">
                {feature.title}
              </h3>
              
              <p className="text-soft-beige/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}