'use client'

import { useState, useEffect, useRef } from 'react'
import { X, CheckCircle } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { gsap } from 'gsap'

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    memo: ''
  })
  
  const { items, totalPrice, clearCart } = useCart()
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      gsap.fromTo(contentRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out' }
      )
    }
  }, [isOpen])

  useEffect(() => {
    if (step === 'success' && successRef.current) {
      const timeline = gsap.timeline()
      
      timeline
        .fromTo(successRef.current.querySelector('.success-icon'),
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out' }
        )
        .fromTo(successRef.current.querySelectorAll('.success-text'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3'
        )
      
      setTimeout(() => {
        clearCart()
        onClose()
        setStep('form')
        setFormData({ name: '', phone: '', address: '', memo: '' })
      }, 3000)
    }
  }, [step, clearCart, onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 'form') {
      setStep('confirm')
    } else if (step === 'confirm') {
      setStep('success')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div 
        ref={contentRef}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {step === 'success' ? (
          <div 
            ref={successRef}
            className="p-12 text-center"
          >
            <div className="success-icon mb-6">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
            </div>
            <h2 className="success-text text-3xl font-bold text-deep-green mb-4">
              주문이 완료되었습니다!
            </h2>
            <p className="success-text text-gray-600">
              잠시 후 담당자가 연락드릴 예정입니다
            </p>
          </div>
        ) : (
          <>
            {/* 헤더 */}
            <div className="bg-deep-green text-premium-gold p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-premium">
                {step === 'form' ? '주문 정보 입력' : '주문 확인'}
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 컨텐츠 */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {step === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg
                               focus:ring-2 focus:ring-deep-green focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg
                               focus:ring-2 focus:ring-deep-green focus:border-transparent"
                      placeholder="010-0000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      배송 주소 *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg
                               focus:ring-2 focus:ring-deep-green focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      요청사항
                    </label>
                    <textarea
                      name="memo"
                      value={formData.memo}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg
                               focus:ring-2 focus:ring-deep-green focus:border-transparent"
                      placeholder="배송 시 요청사항을 입력해주세요"
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* 주문 내역 */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">주문 내역</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.name} x {item.quantity}</span>
                          <span className="font-semibold">
                            {(item.price * item.quantity).toLocaleString()}원
                          </span>
                        </div>
                      ))}
                      <div className="border-t pt-3 flex justify-between font-bold text-lg">
                        <span>총 금액</span>
                        <span className="text-deep-green">
                          {totalPrice.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 배송 정보 */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">배송 정보</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <p><strong>이름:</strong> {formData.name}</p>
                      <p><strong>연락처:</strong> {formData.phone}</p>
                      <p><strong>주소:</strong> {formData.address}</p>
                      {formData.memo && (
                        <p><strong>요청사항:</strong> {formData.memo}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 하단 버튼 */}
            <div className="border-t p-6 bg-gray-50 flex gap-4">
              {step === 'confirm' && (
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="flex-1 py-3 border-2 border-deep-green text-deep-green
                           font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  이전
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-deep-green text-premium-gold
                         font-semibold rounded-lg hover:bg-deep-green/90 transition-colors"
              >
                {step === 'form' ? '다음' : '주문하기'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}