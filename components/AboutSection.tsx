'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Clock, Phone } from 'lucide-react'
import { storeInfo } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ownerRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const typewriterRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 타이틀 애니메이션
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%'
          }
        }
      )

      // 사장님 사진 흑백 → 컬러 전환
      const ownerImage = ownerRef.current
      if (ownerImage) {
        gsap.set(ownerImage, { filter: 'grayscale(100%)' })
        
        ownerImage.addEventListener('mouseenter', () => {
          gsap.to(ownerImage, { filter: 'grayscale(0%)', duration: 0.8 })
        })
        
        ownerImage.addEventListener('mouseleave', () => {
          gsap.to(ownerImage, { filter: 'grayscale(100%)', duration: 0.8 })
        })
      }

      // 스토리 텍스트 타이핑 효과
      if (typewriterRef.current) {
        const text = storeInfo.story
        const chars = text.split('')
        typewriterRef.current.innerHTML = ''
        
        let timeline = gsap.timeline({
          scrollTrigger: {
            trigger: typewriterRef.current,
            start: 'top 80%'
          }
        })
        
        chars.forEach((char, index) => {
          const span = document.createElement('span')
          span.textContent = char
          span.style.opacity = '0'
          typewriterRef.current?.appendChild(span)
          
          timeline.to(span, {
            opacity: 1,
            duration: 0.03,
            ease: 'none'
          }, index * 0.03)
        })
      }

      // 지도 패럴럭스 효과
      if (mapRef.current) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = mapRef.current!.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5
          
          gsap.to(mapRef.current!.querySelector('.map-image'), {
            x: x * 20,
            y: y * 20,
            rotateY: x * 5,
            rotateX: -y * 5,
            duration: 0.5
          })
        }
        
        mapRef.current.addEventListener('mousemove', handleMouseMove)
      }

      // 섹션 전체 페이드 인
      gsap.fromTo(storyRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 80%'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-off-white"
    >
      <div className="container-fluid">
        <h2 
          ref={titleRef}
          className="heading-secondary text-center mb-16 text-deep-green"
        >
          과일총각 <span className="text-deep-orange">이야기</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* 왼쪽: 사장님 소개 & 스토리 */}
          <div ref={storyRef} className="space-y-8">
            <div 
              ref={ownerRef}
              className="relative overflow-hidden rounded-lg cursor-pointer h-[400px]"
            >
              <Image
                src="/OWNER.png"
                alt="과일총각 대표"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-800"
                quality={85}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep-black/80 to-transparent p-8">
                <h3 className="text-2xl font-bold text-premium-gold mb-2 text-premium">
                  과일총각 대표
                </h3>
                <p className="text-soft-beige">
                  20년 경력의 과일 전문가
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p 
                ref={typewriterRef}
                className="text-deep-green leading-relaxed whitespace-pre-line"
              />
            </div>
          </div>

          {/* 오른쪽: 매장 정보 & 지도 */}
          <div className="space-y-8">
            <div className="bg-deep-green p-8 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-6 text-premium-gold text-premium">
                매장 정보
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-premium-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold mb-1">주소</p>
                    <p className="text-soft-beige">{storeInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-premium-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold mb-1">영업시간</p>
                    <p className="text-soft-beige">평일: {storeInfo.hours.weekday}</p>
                    <p className="text-soft-beige">주말: {storeInfo.hours.weekend}</p>
                    <p className="text-soft-beige text-sm mt-1">{storeInfo.hours.holiday}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-premium-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold mb-1">연락처</p>
                    <p className="text-soft-beige">{storeInfo.phone}</p>
                    <p className="text-soft-beige text-sm">카카오톡: {storeInfo.kakao}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 지도 영역 */}
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.6789!2d126.6789!3d37.3890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z7J247LKc6rSR7Jet7IucIOyXsOyImOq1rCDshLztiujtrabro5wgMjYzIOyEvO2KuOudvOu5hOyngOudvCDkn73vr70!5e0!3m2!1sko!2skr!4v1620000000000!5m2!1sko!2skr&q=인천광역시+연수구+센트럴로+263+센트럴비즈한라"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
              <div className="absolute bottom-4 right-4">
                <button 
                  onClick={() => window.open('https://maps.google.com/maps?q=인천광역시+연수구+센트럴로+263+센트럴비즈한라+2740호', '_blank')}
                  className="bg-deep-green text-premium-gold px-4 py-2 rounded-lg 
                           hover:bg-deep-green/90 transition-colors shadow-lg"
                >
                  길찾기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}