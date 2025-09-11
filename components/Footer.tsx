'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, Facebook, MapPin, Phone, MessageCircle } from 'lucide-react'
import { storeInfo } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 푸터 전체 슬라이드 다운
      gsap.fromTo(footerRef.current,
        { 
          y: -100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'top center'
          }
        }
      )

      // SNS 아이콘 호버 효과
      const socialIcons = contentRef.current?.querySelectorAll('.social-icon')
      socialIcons?.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.2,
            rotation: 15,
            duration: 0.3
          })
        })
        
        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3
          })
        })
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer 
      ref={footerRef}
      className="bg-deep-black text-white py-16 relative overflow-hidden"
    >
      <div 
        ref={contentRef}
        className="container-fluid"
      >
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* 브랜드 정보 */}
          <div>
            <h3 className="text-3xl font-bold text-premium-gold mb-4 text-premium">
              과일총각
            </h3>
            <p className="text-soft-beige/80 mb-4">
              제철의 정점, 당신의 테이블 위에
            </p>
            <p className="text-soft-beige/60 text-sm">
              20년 전통의 프리미엄 과일 전문점
            </p>
          </div>

          {/* 연락처 정보 */}
          <div>
            <h4 className="text-xl font-bold text-premium-gold mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <a 
                href={`tel:${storeInfo.phone}`}
                className="flex items-center gap-3 text-soft-beige/80 hover:text-premium-gold transition-colors"
              >
                <Phone className="w-5 h-5" />
                {storeInfo.phone}
              </a>
              <a 
                href="#"
                className="flex items-center gap-3 text-soft-beige/80 hover:text-premium-gold transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                카카오톡: {storeInfo.kakao}
              </a>
              <div className="flex items-center gap-3 text-soft-beige/80">
                <MapPin className="w-5 h-5" />
                {storeInfo.address}
              </div>
            </div>
          </div>

          {/* 영업시간 & SNS */}
          <div>
            <h4 className="text-xl font-bold text-premium-gold mb-4">
              Hours & Social
            </h4>
            <div className="mb-6 text-soft-beige/80 text-sm space-y-1">
              <p>평일: {storeInfo.hours.weekday}</p>
              <p>주말: {storeInfo.hours.weekend}</p>
              <p className="text-soft-beige/60">{storeInfo.hours.holiday}</p>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="#"
                className="social-icon w-12 h-12 bg-premium-gold/20 rounded-full 
                         flex items-center justify-center
                         hover:bg-premium-gold hover:text-deep-green
                         transition-all duration-300"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="#"
                className="social-icon w-12 h-12 bg-premium-gold/20 rounded-full 
                         flex items-center justify-center
                         hover:bg-premium-gold hover:text-deep-green
                         transition-all duration-300"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* 하단 구분선 및 카피라이트 */}
        <div className="border-t border-premium-gold/20 pt-8 text-center">
          <p className="text-soft-beige/60 text-sm">
            © 2024 과일총각. All rights reserved. Premium Fruit Boutique
          </p>
        </div>
      </div>

      {/* 장식 요소 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-deep-green via-premium-gold to-deep-green" />
    </footer>
  )
}