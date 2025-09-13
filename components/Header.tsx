'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useUI } from '@/lib/ui-context'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { totalItems } = useCart()
  const { openCartSidebar } = useUI()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        backgroundColor: isScrolled ? 'rgba(253, 253, 251, 0.7)' : 'transparent',
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
        color: isScrolled ? '#0F3D2E' : '#D4AF37',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        duration: 0.5,
        ease: 'power3.out'
      })
    }
  }, [isScrolled])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 left-0 w-full z-30 transition-all duration-300',
        'text-premium-gold'
      )}
    >
      <div className="container-fluid mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold font-playfair tracking-wider">
          The Fruit
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('products')} className="hover:opacity-75 transition-opacity">Products</button>
          <button onClick={() => scrollToSection('about')} className="hover:opacity-75 transition-opacity">About</button>
          <button onClick={() => scrollToSection('reviews')} className="hover:opacity-75 transition-opacity">Reviews</button>
        </nav>

        <button onClick={openCartSidebar} className="relative">
          <ShoppingCart className="w-7 h-7" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-deep-orange text-white w-5 h-5 
                             rounded-full flex items-center justify-center text-xs font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
