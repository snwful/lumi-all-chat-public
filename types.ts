
export enum Platform {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  LINE = 'LINE OA',
  TikTok = 'TikTok Shop',
  Shopee = 'Shopee',
  Lazada = 'Lazada',
  Unknown = 'Unknown'
}

export interface Customer {
  id: string;
  name: string;
  avatarUrl?: string;
  platform: Platform;
  lastMessage: string;
  lastMessageTimestamp: number;
  unreadCount: number;
  tags: string[];
  orderHistory: Order[];
  notes: string;
}

export interface Order {
  id: string;
  productName: string;
  status: string;
  date: string;
  price: number;
}

export enum MessageSender {
  Customer = 'customer',
  Agent = 'agent',
  AI = 'ai',
  System = 'system'
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: number;
  avatarUrl?: string;
  name?: string; // Name of sender (customer or agent)
  isAISuggestion?: boolean; // For semi-auto mode
}

export enum AIMode {
  Auto = 'Auto',
  SemiAuto = 'Semi-auto',
  Manual = 'Manual'
}

export interface SubscriptionPlan {
  name: string;
  price: string;
  priceDetails: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export interface DashboardMetric {
  title: string;
  value: string;
  change?: string; // e.g., "+5%"
  changeType?: 'positive' | 'negative';
}

// For Recharts
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any; // For additional properties like fill color for pie charts
}
