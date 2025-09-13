import type { Metadata } from 'next'
import Header from '@/components/Header'
import { CartProvider } from '@/lib/cart-context'
import { UIProvider } from '@/lib/ui-context'
import './globals.css'

export const metadata: Metadata = {
  title: '과일총각 - 프리미엄 과일 부티크',
  description: '제철의 정점, 당신의 테이블 위에. 과일총각이 엄선한 프리미엄 과일을 만나보세요.',
  keywords: '프리미엄 과일, 과일총각, 신선한 과일, 과일 배송, 과일 부티크',
  openGraph: {
    title: '과일총각 - 프리미엄 과일 부티크',
    description: '제철의 정점, 당신의 테이블 위에',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <CartProvider>
          <UIProvider>
            <Header />
            {children}
          </UIProvider>
        </CartProvider>
      </body>
    </html>
  )
}