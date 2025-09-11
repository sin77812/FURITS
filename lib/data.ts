export interface Product {
  id: number
  name: string
  englishName: string
  price: number
  unit: string
  description: string
  image: string
  origin: string
  season: string
}

export const products: Product[] = [
  {
    id: 1,
    name: '사과',
    englishName: 'APPLE',
    price: 25000,
    unit: '2kg',
    description: '아삭하고 달콤한 프리미엄 사과',
    image: '/APPLE.png',
    origin: '경상북도 안동',
    season: '9월 - 12월'
  },
  {
    id: 2,
    name: '오렌지',
    englishName: 'ORANGE',
    price: 32000,
    unit: '3kg',
    description: '비타민C가 풍부한 신선한 오렌지',
    image: '/ORANGE.png',
    origin: '제주도',
    season: '12월 - 3월'
  },
  {
    id: 3,
    name: '애플망고',
    englishName: 'APPLE MANGO',
    price: 48000,
    unit: '6개입 박스',
    description: '열대 과일의 여왕, 프리미엄 완숙 애플망고',
    image: '/APPLEMANGO.png',
    origin: '필리핀',
    season: '4월 - 8월'
  },
  {
    id: 4,
    name: '블루베리',
    englishName: 'BLUEBERRY',
    price: 35000,
    unit: '500g',
    description: '항산화 성분이 풍부한 유기농 블루베리',
    image: '/BLUEBERRY.png',
    origin: '충청북도 괴산',
    season: '6월 - 8월'
  },
  {
    id: 5,
    name: '체리',
    englishName: 'CHERRY',
    price: 55000,
    unit: '500g',
    description: '크고 단단한 프리미엄 체리, 당도 20brix',
    image: '/CHERRY.png',
    origin: '미국 워싱턴',
    season: '5월 - 7월'
  },
  {
    id: 6,
    name: '수박',
    englishName: 'WATERMELON',
    price: 42000,
    unit: '1통(8kg)',
    description: '속이 꽉 찬 달콤한 수박, 당도 12brix 보장',
    image: '/WATERMELON.png',
    origin: '전라남도 함안',
    season: '6월 - 9월'
  }
]

export interface Review {
  id: number
  name: string
  rating: number
  date: string
  content: string
  product: string
}

export const reviews: Review[] = [
  {
    id: 1,
    name: '김*희',
    rating: 5,
    date: '2024.03.15',
    content: '이렇게 신선한 과일은 처음이에요. 샤인머스켓이 정말 알이 꽉 차있고 당도도 최고였습니다.',
    product: '샤인머스켓'
  },
  {
    id: 2,
    name: '이*수',
    rating: 5,
    date: '2024.03.10',
    content: '과일총각에서 구매한 한라봉, 선물했는데 정말 좋아하셨어요. 포장도 고급스럽고 과일 퀄리티는 말할 것도 없네요.',
    product: '한라봉'
  },
  {
    id: 3,
    name: '박*민',
    rating: 5,
    date: '2024.03.08',
    content: '매번 믿고 주문합니다. 사장님이 직접 고르신다는게 느껴져요. 정직함과 신선함, 두 마리 토끼를 다 잡은 곳!',
    product: '애플망고'
  },
  {
    id: 4,
    name: '정*아',
    rating: 5,
    date: '2024.03.05',
    content: '블루베리 500g 주문했는데 알이 굵고 신선해서 놀랐어요. 유기농이라 아이들도 안심하고 먹일 수 있어 좋습니다.',
    product: '블루베리'
  }
]

export const storeInfo = {
  name: '과일총각',
  phone: '010-1234-5678',
  kakao: 'fruit_chonggak',
  address: '인천광역시 연수구 센트럴로 263 센트럴비즈한라 2740호',
  hours: {
    weekday: '오전 9:00 - 오후 8:00',
    weekend: '오전 10:00 - 오후 6:00',
    holiday: '명절 당일 휴무'
  },
  story: `20년간 과일만을 생각해온 과일총각입니다.
  
  좋은 과일을 고르는 것은 단순히 보기 좋은 것을 선택하는 일이 아닙니다.
  산지에서부터 고객님의 식탁까지, 모든 과정을 직접 관리하며
  오직 최상의 과일만을 선별하여 제공합니다.
  
  제철의 정점에서 수확한 과일만을 취급하며,
  당도와 신선도를 직접 확인한 제품만을 판매합니다.`
}