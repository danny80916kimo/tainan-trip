export type LatLng = [lat: number, lng: number]

export type Category = 'food' | 'shop' | 'dessert' | 'photo' | 'temple' | 'sight'

export interface Stop {
  id: string
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
  title: '台南一日遊',
  subtitle: '七股 · 安平 · 中西區 · 東區',
}

/** Default order. The user can reorder in the app; the order is kept in localStorage. */
export const stops: Stop[] = [
  {
    id: 'longshan',
    name: '七股龍山宮',
    emoji: '⛩️',
    category: 'temple',
    address: '台南市七股區龍山里208號',
    position: [23.138105, 120.113486],
    hours: '06:00–21:00',
    phone: '06-787-1058',
    note: '1933 年創建，主祀池府千歲，龍山漁港旁的信仰中心。廟前廣場面向潟湖，附近有蚵嗲、蚵仔煎等海味小攤。',
  },
  {
    id: 'saltmountain',
    name: '七股鹽山',
    emoji: '🧂',
    category: 'sight',
    address: '台南市七股區鹽埕里66號',
    position: [23.155971, 120.101675],
    hours: '3–10 月 09:00–18:00 · 11–2 月 08:30–17:30',
    closed: '除夕、颱風假休園',
    phone: '06-780-0511',
    note: '台灣唯一的雪白鹽山，可以爬上山頂俯瞰鹽田與潟湖。必吃鹹冰棒，園區每年換一隻巨型吉祥物。',
  },
  {
    id: 'tongxing',
    name: '東興洋行',
    emoji: '🏛️',
    category: 'sight',
    address: '台南市安平區安北路233巷3號',
    position: [23.001778, 120.158984],
    hours: '10:00–18:00（以現場公告為準）',
    phone: '06-391-1105',
    note: '安平五洋行之一，德商 1870 年代設立，經營糖與樟腦出口。紅色圓拱迴廊配大榕樹是招牌畫面，市定古蹟免費參觀，館內有輕食與 DIY。',
  },
  {
    id: 'fotoshop',
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
    id: 'tnam',
    name: '臺南國家美術館（原南美館 2 館）',
    emoji: '🎨',
    category: 'sight',
    address: '台南市中西區忠義路二段1號',
    position: [22.9906, 120.2013],
    hours: '10:00–18:00 · 週六 10:00–21:00',
    closed: '週一休館',
    phone: '06-220-2208',
    note: '坂茂設計的純白五角形美術館，以鳳凰花為概念、碎形屋頂灑下的光影是招牌畫面。一般票 160 元、台南市民 80 元；5 樓有景觀咖啡廳，1 館（南門路的老建築）走路 5 分鐘。',
  },
  {
    id: 'xiluo',
    name: '西羅殿',
    emoji: '⛩️',
    category: 'temple',
    address: '台南市中西區和平街90號',
    position: [22.9969282, 120.1959713],
    phone: '06-228-5354',
    note: '康熙 57 年（1718）創建，主祀廣澤尊王，五條港區域的重要廟宇。從民生路康樂街牌樓進去。',
  },
  {
    id: 'komoya',
    name: '小茂屋',
    emoji: '🍜',
    category: 'food',
    address: '台南市東區長榮路三段40號',
    position: [22.993065, 120.221785],
    hours: '10:00–00:00',
    closed: '每月 1 日、15 日公休',
    phone: '06-235-8162',
    note: '成大人的共同回憶，老字號鍋燒意麵。標準吃法是一碗麵配剉冰或豆花，再來杯古早味紅茶。',
  },
  {
    id: 'minde',
    name: '民德虱目魚粥',
    emoji: '🐟',
    category: 'food',
    address: '台南市北區民德路11號',
    position: [23.0046, 120.2038],
    hours: '06:00–13:00',
    closed: '週一及農曆初三、十七公休',
    phone: '06-225-5701',
    note: '在地人的早餐口袋名單，新鮮魚骨熬湯的虱目魚粥，肉燥飯也很有名。只賣到中午，要早點去。',
  },
]

export const categoryLabel: Record<Category, string> = {
  food: '小吃',
  shop: '選物',
  dessert: '甜點',
  photo: '攝影',
  temple: '廟宇',
  sight: '景點',
}
