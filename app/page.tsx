'use client'

import { useState } from 'react'
import { CartProvider } from '@/lib/cart-context'
import HeroSection from '@/components/HeroSection'
import WhyUsSection from '@/components/WhyUsSection'
import ProductsSection from '@/components/ProductsSection'
import ReviewsSection from '@/components/ReviewsSection'
import AboutSection from '@/components/AboutSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import CartButton from '@/components/CartButton'
import OrderModal from '@/components/OrderModal'

export default function Home() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  return (
    <CartProvider>
      <main className="overflow-x-hidden">
        <HeroSection />
        <WhyUsSection />
        <ProductsSection />
        <ReviewsSection />
        <AboutSection />
        <CTASection />
        <Footer />
        
        <CartButton onOrderClick={() => setIsOrderModalOpen(true)} />
        <OrderModal 
          isOpen={isOrderModalOpen} 
          onClose={() => setIsOrderModalOpen(false)} 
        />
      </main>
    </CartProvider>
  )
}