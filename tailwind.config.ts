import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-green': '#0F3D2E',
        'dark-wine': '#6B2737',
        'deep-orange': '#D35400',
        'premium-gold': '#D4AF37',
        'soft-beige': '#F5F5DC',
        'off-white': '#FDFDFB',
        'deep-black': '#121212',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'noto-serif': ['Noto Serif KR', 'serif'],
        'pretendard': ['Pretendard', 'sans-serif'],
        'noto-sans': ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
