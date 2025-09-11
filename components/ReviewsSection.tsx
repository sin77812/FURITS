'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote, Star } from 'lucide-react'
import { reviews } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const reviewsRef = useRef<(HTMLDivElement | null)[]>([])
  const bgRef = useRef<HTMLDivElement>(null)

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

      // 리뷰 카드 애니메이션
      reviewsRef.current.forEach((review, index) => {
        if (review) {
          // 따옴표 아이콘 애니메이션
          const quoteIcon = review.querySelector('.quote-icon')
          const content = review.querySelector('.review-content')
          const highlights = review.querySelectorAll('.highlight-word')

          gsap.timeline({
            scrollTrigger: {
              trigger: review,
              start: 'top 85%'
            }
          })
          .fromTo(quoteIcon,
            { opacity: 0, scale: 0, rotation: -180 },
            { opacity: 0.1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out' }
          )
          .fromTo(content,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.4'
          )
          
          // 핵심 단어 하이라이트 애니메이션
          if (highlights.length > 0) {
            gsap.to(highlights, {
              color: '#D4AF37',
              textShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
              duration: 0.6,
              stagger: 0.1,
              scrollTrigger: {
                trigger: review,
                start: 'top 70%'
              }
            })
          }
        }
      })

      // 패럴럭스 배경
      gsap.to(bgRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const highlightKeywords = (text: string) => {
    const keywords = ['신선', '정직', '프리미엄', '최고', '만족']
    let result = text

    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        result = result.replace(
          keyword,
          `<span class="highlight-word transition-colors duration-600">${keyword}</span>`
        )
      }
    })

    return result
  }

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-deep-green relative overflow-hidden"
    >
      {/* 패럴럭스 배경 */}
      <div 
        ref={bgRef}
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url(https://via.placeholder.com/1920x1080/0F3D2E/0F3D2E?text=+)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="container-fluid relative z-10">
        <h2 
          ref={titleRef}
          className="heading-secondary text-center mb-16 text-premium-gold"
        >
          고객님의 <span className="text-soft-beige">소중한 후기</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              ref={el => reviewsRef.current[index] = el}
              className="relative bg-white/5 backdrop-blur-sm p-8 rounded-lg
                         border border-premium-gold/20 hover:border-premium-gold/40
                         transition-all duration-500"
            >
              {/* 큰 따옴표 배경 */}
              <Quote className="quote-icon absolute top-4 right-4 w-20 h-20 text-premium-gold/10" />
              
              <div className="review-content relative z-10">
                {/* 별점 */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-premium-gold fill-current"
                    />
                  ))}
                </div>

                {/* 리뷰 내용 */}
                <p 
                  className="text-soft-beige/90 text-lg leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ 
                    __html: highlightKeywords(review.content) 
                  }}
                />

                {/* 작성자 정보 */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-premium-gold font-bold">
                      {review.name}
                    </p>
                    <p className="text-soft-beige/60 text-sm">
                      {review.product} 구매
                    </p>
                  </div>
                  <p className="text-soft-beige/50 text-sm">
                    {review.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}