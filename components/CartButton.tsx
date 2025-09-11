'use client'

import { useState, useEffect, useRef } from 'react'
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

interface CartButtonProps {
  onOrderClick: () => void
}

export default function CartButton({ onOrderClick }: CartButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { items, totalPrice, totalItems, updateQuantity, removeItem } = useCart()
  const cartRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)

  // 장바구니 아이템 추가시 뱃지 애니메이션
  useEffect(() => {
    if (totalItems > 0 && badgeRef.current) {
      gsap.fromTo(badgeRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out' }
      )
    }
  }, [totalItems])

  // 장바구니 열기/닫기 애니메이션
  useEffect(() => {
    if (isOpen && cartRef.current) {
      gsap.fromTo(cartRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      )
    }
  }, [isOpen])

  return (
    <>
      {/* 플로팅 장바구니 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-deep-green text-premium-gold
                   rounded-full shadow-2xl hover:scale-110 transition-transform duration-300
                   flex items-center justify-center group"
      >
        <ShoppingCart className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
        {totalItems > 0 && (
          <span 
            ref={badgeRef}
            className="absolute -top-2 -right-2 bg-deep-orange text-white w-6 h-6 
                       rounded-full flex items-center justify-center text-sm font-bold"
          >
            {totalItems}
          </span>
        )}
      </button>

      {/* 장바구니 사이드바 */}
      {isOpen && (
        <>
          {/* 오버레이 */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 장바구니 컨텐츠 */}
          <div 
            ref={cartRef}
            className="fixed top-0 right-0 h-full w-full md:w-96 bg-white z-50 
                       shadow-2xl overflow-hidden flex flex-col"
          >
            {/* 헤더 */}
            <div className="bg-deep-green text-premium-gold p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-premium">장바구니</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 장바구니 아이템 목록 */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <p className="text-center text-gray-500">장바구니가 비어있습니다</p>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <div 
                      key={item.id}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-deep-green">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.unit}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:bg-red-50 p-1 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-white border border-gray-300 rounded
                                     hover:bg-gray-100 flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-white border border-gray-300 rounded
                                     hover:bg-gray-100 flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-bold text-deep-green">
                          {(item.price * item.quantity).toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 하단 합계 및 주문 버튼 */}
            {items.length > 0 && (
              <div className="border-t p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">총 금액</span>
                  <span className="text-2xl font-bold text-deep-green">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
                
                <button
                  onClick={() => {
                    setIsOpen(false)
                    onOrderClick()
                  }}
                  className="w-full py-4 bg-deep-green text-premium-gold font-bold text-lg
                           rounded-lg hover:bg-deep-green/90 transition-colors duration-300"
                >
                  주문하기
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}