import type { LatLng } from '../lib/geo'

export type Category = 'food' | 'shop' | 'dessert' | 'photo' | 'temple'

export interface Stop {
  id: string
  time: string // "HH:MM", start time
  name: string
  emoji: string
  category: Category
  address: string
  position: LatLng
  hours?: string
  closed?: string
  phone?: string
  note: string
}

export const trip = {
  title: '台南一日散步',
  subtitle: '中西區 · 老店 × 復古選物 × 小吃',
}

export const stops: Stop[] = [
  {
    id: 'chunxianfang',
    time: '11:30',
    name: '醇涎坊古早味鍋燒意麵',
    emoji: '🍜',
    category: 'food',
    address: '台南市中西區保安路53號',
    position: [22.9902512, 120.1963613],
    hours: '06:00–20:30',
    phone: '06-221-5033',
    note: '保安路排隊名店，銅板價大碗鍋燒意麵。想豐盛一點可以加炸料。',
  },
  {
    id: 'shuangquanchang',
    time: '12:30',
    name: '雙全昌鞋行',
    emoji: '👡',
    category: 'shop',
    address: '台南市中西區西門路二段316號',
    position: [22.9971251, 120.2004968],
    hours: '09:00–22:00',
    phone: '06-225-9360',
    note: '西門圓環旁的百年老鞋店。彩色藍白拖、木屐、雨鞋都在這裡。',
  },
  {
    id: 'chongji',
    time: '13:15',
    name: '衝極商店',
    emoji: '🪩',
    category: 'shop',
    address: '台南市中西區青年路53號',
    position: [22.9923292, 120.2068892],
    hours: '11:30–19:30',
    note: '一秒回到 70 年代的復古選物店，很多可愛小物與飾品。',
  },
  {
    id: 'miyuki',
    time: '14:15',
    name: '美雪冰菓室 2.0',
    emoji: '🍧',
    category: 'dessert',
    address: '台南市中西區中山路79巷22-71號 2樓',
    position: [22.99418, 120.20705],
    hours: '12:30–17:00',
    closed: '週二、三、四公休',
    note: '在旭峯號旁的巷子裡、走上 2 樓，位置隱密請跟著導航。廢墟風老宅，手工布丁與剉冰是招牌。',
  },
  {
    id: 'kouran',
    time: '15:15',
    name: '香蘭男子電棒燙',
    emoji: '💈',
    category: 'shop',
    address: '台南市中西區國華街三段123號 2樓193室（永樂市場）',
    position: [22.9969368, 120.1985199],
    hours: '13:30–18:00',
    closed: '週二至週四公休',
    phone: '0937-570-078',
    note: '永樂市場 2 樓，老派理髮廳改造的復古小潮店。「純」字系列商品很有台味。',
  },
  {
    id: 'fotoshop',
    time: '16:15',
    name: '又又美 FotoShop',
    emoji: '📷',
    category: 'photo',
    address: '台南市中西區大埔街51號',
    position: [22.9869312, 120.2085882],
    hours: '12:00–20:00',
    phone: '0989-115-816',
    note: '復古照相館 + 底片相機專賣。多個懷舊場景可以拍，也能請店家拍一張復古拍立得。',
  },
  {
    id: 'xiluo',
    time: '17:30',
    name: '西羅殿',
    emoji: '⛩️',
    category: 'temple',
    address: '台南市中西區和平街90號',
    position: [22.9969282, 120.1959713],
    phone: '06-228-5354',
    note: '康熙 57 年（1718）創建，主祀廣澤尊王，五條港區域的重要廟宇。從民生路康樂街牌樓進去。',
  },
  {
    id: 'ajiang',
    time: '18:15',
    name: '阿江鱔魚意麵',
    emoji: '🍜',
    category: 'food',
    address: '台南市中西區民族路三段89號',
    position: [22.9983576, 120.1970408],
    hours: '17:00–00:00',
    closed: '週一公休',
    phone: '0937-671-052',
    note: '40 年老店，乾炒鱔魚滿滿鑊氣。越晚人越多，早點到排隊。',
  },
]

export const categoryLabel: Record<Category, string> = {
  food: '小吃',
  shop: '選物',
  dessert: '甜點',
  photo: '攝影',
  temple: '廟宇',
}
