'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingCart, Plus } from 'lucide-react'
import { products } from '@/lib/data'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const productsRef = useRef<(HTMLDivElement | null)[]>([])
  const { addItem } = useCart()
  const [addedProducts, setAddedProducts] = useState<number[]>([])

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

      // 상품 카드 애니메이션
      productsRef.current.forEach((product, index) => {
        if (product) {
          gsap.fromTo(product,
            { 
              opacity: 0,
              y: 100,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: product,
                start: 'top 85%'
              },
              delay: index * 0.1
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleAddToCart = (product: typeof products[0]) => {
    addItem(product)
    setAddedProducts([...addedProducts, product.id])
    
    setTimeout(() => {
      setAddedProducts(prev => prev.filter(id => id !== product.id))
    }, 2000)
  }

  return (
    <section 
      ref={sectionRef}
      id="products"
      className="py-24 bg-off-white"
    >
      <div className="container-fluid">
        <h2 
          ref={titleRef}
          className="heading-secondary text-center mb-4 text-deep-green"
        >
          오늘의 과일
        </h2>
        <p className="text-center text-deep-green/60 mb-16 text-lg">
          매일 새벽, 엄선된 최상급 과일만을 준비합니다
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={el => { productsRef.current[index] = el }}
              className="group relative bg-white rounded-lg overflow-hidden shadow-xl
                         hover:shadow-2xl transition-all duration-500"
            >
              {/* 와인 라벨 스타일의 상품 카드 */}
              <div className="relative h-[500px] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={index < 3}
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent" />
                
                {/* 상품 정보 오버레이 */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white
                              transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-premium-gold text-sm tracking-widest mb-2">
                    {product.origin}
                  </p>
                  <h3 className="text-3xl font-bold mb-1 text-premium">
                    {product.name}
                  </h3>
                  <p className="text-soft-beige text-sm tracking-[0.3em] mb-4 uppercase">
                    {product.englishName}
                  </p>
                  <p className="text-soft-beige/80 mb-6 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-500 delay-100">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-premium-gold">
                        {product.price.toLocaleString()}원
                      </p>
                      <p className="text-soft-beige/60 text-sm">{product.unit}</p>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={cn(
                        "p-4 rounded-full transition-all duration-500",
                        "bg-premium-gold/20 hover:bg-premium-gold",
                        "text-premium-gold hover:text-deep-green",
                        "border-2 border-premium-gold/40 hover:border-premium-gold",
                        "hover:scale-110 active:scale-95",
                        addedProducts.includes(product.id) && "bg-green-500 border-green-500"
                      )}
                    >
                      {addedProducts.includes(product.id) ? (
                        <ShoppingCart className="w-6 h-6" />
                      ) : (
                        <Plus className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* 호버 시 빛 효과 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700
                            bg-gradient-to-tr from-transparent via-premium-gold/10 to-transparent
                            pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}