'use client'

import { Leaf, Award, Truck, Shield } from 'lucide-react'

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
  return (
    <section className="py-24 bg-deep-green">
      <div className="container-fluid">
        <h2 className="heading-secondary text-center mb-20 text-premium-gold">
          과일총각만의 <span className="text-soft-beige">특별함</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 p-8 rounded-lg border border-premium-gold/30 
                         hover:bg-white/10 hover:border-premium-gold/50 transition-all duration-300
                         hover:scale-105 hover:shadow-2xl"
            >
              <div className="mb-6">
                <feature.icon 
                  className="w-16 h-16 text-premium-gold" 
                />
              </div>
              
              <h3 className="text-xl font-bold text-soft-beige mb-3 text-premium">
                {feature.title}
              </h3>
              
              <p className="text-soft-beige leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}