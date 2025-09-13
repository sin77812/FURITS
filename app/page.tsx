'use client'

import { useState } from 'react'
import { useUI } from '@/lib/ui-context'
import HeroSection from '@/components/HeroSection'
import WhyUsSection from '@/components/WhyUsSection'
import ProductsSection from '@/components/ProductsSection'
import ReviewsSection from '@/components/ReviewsSection'
import AboutSection from '@/components/AboutSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import OrderModal from '@/components/OrderModal'
import CartSidebar from '@/components/CartSidebar'

export default function Home() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const { isCartSidebarOpen, closeCartSidebar } = useUI()

  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <WhyUsSection />
      <ProductsSection />
      <ReviewsSection />
      <AboutSection />
      <CTASection />
      <Footer />
      
      <CartSidebar 
        isOpen={isCartSidebarOpen} 
        onClose={closeCartSidebar}
        onOrderClick={() => {
          closeCartSidebar()
          setIsOrderModalOpen(true)
        }} 
      />
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </main>
  )
}