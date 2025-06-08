
import { Customer, Platform, ChatMessage, MessageSender, Order, DashboardMetric, ChartDataPoint, AIMode } from '../types';

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'cust1', name: 'คุณสมศรี มีสุข', platform: Platform.Facebook, avatarUrl: 'https://picsum.photos/seed/cust1/40/40',
    lastMessage: 'สนใจสินค้าค่ะ ขอรายละเอียดเพิ่มเติม', lastMessageTimestamp: Date.now() - 1000 * 60 * 5, unreadCount: 2,
    tags: ['ลูกค้าใหม่', 'สนใจกระเป๋า'],
    orderHistory: [
        {id: 'order1', productName: 'กระเป๋าสะพายข้างสีดำ', status: 'จัดส่งแล้ว', date: '2024-07-15', price: 1290},
    ],
    notes: 'ลูกค้าทักมาครั้งแรก ถามเยอะหน่อย'
  },
  {
    id: 'cust2', name: 'John Doe', platform: Platform.Instagram, avatarUrl: 'https://picsum.photos/seed/cust2/40/40',
    lastMessage: 'Hey, is this still available?', lastMessageTimestamp: Date.now() - 1000 * 60 * 30, unreadCount: 0,
    tags: ['VIP', 'รอโอน'],
    orderHistory: [
        {id: 'order2', productName: 'Limited Edition T-Shirt', status: 'รอชำระเงิน', date: '2024-07-20', price: 890},
        {id: 'order3', productName: 'Cool Cap', status: 'จัดส่งแล้ว', date: '2024-06-10', price: 450},
    ],
    notes: 'ลูกค้าประจำ ชอบสินค้าแนวสตรีท'
  },
  {
    id: 'cust3', name: 'ร้านค้าออนไลน์ ByA', platform: Platform.LINE, avatarUrl: 'https://picsum.photos/seed/cust3/40/40',
    lastMessage: 'ขอบคุณครับ', lastMessageTimestamp: Date.now() - 1000 * 60 * 60 * 2, unreadCount: 0,
    tags: [],
    orderHistory: [],
    notes: ''
  },
   {
    id: 'cust4', name: 'Lazada Buyer 123', platform: Platform.Lazada, avatarUrl: 'https://picsum.photos/seed/cust4/40/40',
    lastMessage: 'สถานะพัสดุเป็นยังไงบ้างคะ?', lastMessageTimestamp: Date.now() - 1000 * 60 * 120, unreadCount: 1,
    tags: ['สอบถามสถานะ', 'Lazada'],
    orderHistory: [ {id: 'order4', productName: 'แก้วน้ำเก็บความเย็น', status: 'กำลังจัดส่ง', date: '2024-07-24', price: 350},],
    notes: 'ติดตามสินค้าเลขพัสดุ XYZ123'
  },
  {
    id: 'cust5', name: 'Shopee User XYZ', platform: Platform.Shopee, avatarUrl: 'https://picsum.photos/seed/cust5/40/40',
    lastMessage: 'ใช้โค้ดส่วนลดยังไงคะ', lastMessageTimestamp: Date.now() - 1000 * 60 * 10, unreadCount: 0,
    tags: ['สอบถามโปรโมชั่น', 'Shopee'],
    orderHistory: [],
    notes: ''
  },
];

const MOCK_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  'cust1': [
    { id: 'msg1-1', sender: MessageSender.Customer, text: 'สวัสดีค่ะ สนใจกระเป๋ารุ่น ABC ยังมีของไหมคะ?', timestamp: Date.now() - 1000 * 60 * 10, avatarUrl: 'https://picsum.photos/seed/cust1/40/40', name: 'คุณสมศรี มีสุข' },
    { id: 'msg1-2', sender: MessageSender.AI, text: 'สวัสดีค่ะคุณสมศรี รุ่น ABC สียอดนิยมยังมีสินค้าพร้อมส่งค่ะ สนใจรับสีไหนดีคะ?', timestamp: Date.now() - 1000 * 60 * 9, isAISuggestion: false },
    { id: 'msg1-3', sender: MessageSender.Customer, text: 'สนใจสีดำค่ะ ราคาเท่าไหร่คะ?', timestamp: Date.now() - 1000 * 60 * 7, avatarUrl: 'https://picsum.photos/seed/cust1/40/40', name: 'คุณสมศรี มีสุข' },
    { id: 'msg1-4', sender: MessageSender.AI, text: 'สีดำราคา 1,290 บาทค่ะ จัดส่งฟรีนะคะ', timestamp: Date.now() - 1000 * 60 * 6, isAISuggestion: false },
    { id: 'msg1-5', sender: MessageSender.Customer, text: 'สนใจสินค้าค่ะ ขอรายละเอียดเพิ่มเติม', timestamp: Date.now() - 1000 * 60 * 5, avatarUrl: 'https://picsum.photos/seed/cust1/40/40', name: 'คุณสมศรี มีสุข' },
  ],
  'cust2': [
    { id: 'msg2-1', sender: MessageSender.Customer, text: 'Hey, is this still available?', timestamp: Date.now() - 1000 * 60 * 30, avatarUrl: 'https://picsum.photos/seed/cust2/40/40', name: 'John Doe' },
    { id: 'msg2-2', sender: MessageSender.Agent, text: 'Hi John! Yes, the Limited Edition T-Shirt is still in stock. We have M and L sizes.', timestamp: Date.now() - 1000 * 60 * 28, name: 'Admin Jane' },
  ],
  'cust3': [
     { id: 'msg3-1', sender: MessageSender.Customer, text: 'สอบถามโปรโมชั่นล่าสุดค่ะ', timestamp: Date.now() - 1000 * 60 * 60 * 3, avatarUrl: 'https://picsum.photos/seed/cust3/40/40', name: 'ร้านค้าออนไลน์ ByA' },
     { id: 'msg3-2', sender: MessageSender.Agent, text: 'สวัสดีค่ะ ตอนนี้มีโปรโมชั่นซื้อ 2 แถม 1 สำหรับสินค้าที่ร่วมรายการค่ะ', timestamp: Date.now() - 1000 * 60 * 60 * 2.5, name: 'Admin Tom' },
     { id: 'msg3-3', sender: MessageSender.Customer, text: 'ขอบคุณครับ', timestamp: Date.now() - 1000 * 60 * 60 * 2, avatarUrl: 'https://picsum.photos/seed/cust3/40/40', name: 'ร้านค้าออนไลน์ ByA' },
  ],
  'cust4': [
     { id: 'msg4-1', sender: MessageSender.Customer, text: 'สถานะพัสดุเป็นยังไงบ้างคะ?', timestamp: Date.now() - 1000 * 60 * 120, avatarUrl: 'https://picsum.photos/seed/cust4/40/40', name: 'Lazada Buyer 123' },
  ],
   'cust5': [
     { id: 'msg5-1', sender: MessageSender.Customer, text: 'ใช้โค้ดส่วนลดยังไงคะ', timestamp: Date.now() - 1000 * 60 * 10, avatarUrl: 'https://picsum.photos/seed/cust5/40/40', name: 'Shopee User XYZ' },
     { id: 'msg5-2', sender: MessageSender.AI, text: 'คุณลูกค้าสามารถใส่โค้ดส่วนลดได้ในหน้าชำระเงิน ตรงช่อง "โค้ดส่วนลด Shopee" ค่ะ หากมีโค้ดจากร้านค้า สามารถใส่ในช่อง "โค้ดส่วนลดของร้านค้า" ได้เลยค่ะ', timestamp: Date.now() - 1000 * 60 * 9 },
  ],
};

export const getMockCustomers = (): Customer[] => MOCK_CUSTOMERS;

export const getMockChatMessages = (customerId: string): ChatMessage[] => {
  return MOCK_CHAT_MESSAGES[customerId] || [];
};

export const addMockChatMessage = (customerId: string, message: ChatMessage): ChatMessage[] => {
    if (!MOCK_CHAT_MESSAGES[customerId]) {
        MOCK_CHAT_MESSAGES[customerId] = [];
    }
    MOCK_CHAT_MESSAGES[customerId].push(message);
    
    // Update last message on customer
    const customer = MOCK_CUSTOMERS.find(c => c.id === customerId);
    if (customer) {
        customer.lastMessage = message.text;
        customer.lastMessageTimestamp = message.timestamp;
        if (message.sender === MessageSender.Customer) {
            customer.unreadCount = (customer.unreadCount || 0) + 1;
        }
    }
    return MOCK_CHAT_MESSAGES[customerId];
}


export const getMockDashboardMetrics = (): DashboardMetric[] => [
    { title: 'Total Chats Today', value: '152', change: '+12%', changeType: 'positive' },
    { title: 'Avg. Response Time', value: '2m 15s', change: '-10s', changeType: 'positive' },
    { title: 'Sales from Chat (Today)', value: '฿12,500', change: '+฿1,200', changeType: 'positive' },
    { title: 'AI Assistance Rate', value: '65%', change: '+5%', changeType: 'positive' },
];

export const getMockChatVolumeData = (): ChartDataPoint[] => [
    { name: Platform.Facebook, value: 400 },
    { name: Platform.Instagram, value: 300 },
    { name: Platform.LINE, value: 200 },
    { name: Platform.TikTok, value: 250 },
    { name: Platform.Shopee, value: 150 },
    { name: Platform.Lazada, value: 100 },
];

export const getMockChatsOverTimeData = (): ChartDataPoint[] => [
    { name: 'Mon', value: 20 },
    { name: 'Tue', value: 35 },
    { name: 'Wed', value: 25 },
    { name: 'Thu', value: 45 },
    { name: 'Fri', value: 50 },
    { name: 'Sat', value: 60 },
    { name: 'Sun', value: 40 },
];

export const getMockTagDistributionData = (): ChartDataPoint[] => [
    { name: 'ลูกค้าใหม่', value: 40, fill: '#8884d8' },
    { name: 'VIP', value: 25, fill: '#82ca9d' },
    { name: 'รอโอน', value: 15, fill: '#ffc658' },
    { name: 'เคลมสินค้า', value: 10, fill: '#ff8042'},
    { name: 'สนใจโปรโมชั่น', value: 10, fill: '#00C49F'},
];

export const ALL_TAGS = ['ลูกค้าใหม่', 'VIP', 'รอโอน', 'เคลมสินค้า', 'สนใจโปรโมชั่น', 'สอบถามสถานะ', 'Lazada', 'Shopee', 'สนใจกระเป๋า'];

export const MOCK_QUICK_REPLIES = [
    "สวัสดีค่ะ มีอะไรให้ช่วยคะ?",
    "สินค้าพร้อมส่งค่ะ",
    "ขอทราบชื่อและเบอร์โทรติดต่อกลับด้วยค่ะ",
    "ขอบคุณที่ใช้บริการค่ะ",
    "โปรโมชั่นปัจจุบันคือ...",
];
