export enum GiftCategory {
  FLOWERS = "flowers",
  TOYS = "toys",
  JEWELRY = "jewelry",
  SWEETS = "sweets",
  TECH = "tech",
  ROMANTIC = "romantic",
}

export interface Gift {
  id: string;
  name: string;
  emoji: string;
  category: GiftCategory;
  price: number;
  description?: string;
}

export interface SentGift {
  id: string;
  giftId: string;
  gift: Gift;
  fromUserId: number;
  fromUserName: string;
  toUserId: number;
  toUserName: string;
  sentAt: Date;
  message?: string;
}

export interface ReceivedGift {
  id: string;
  giftId: string;
  gift: Gift;
  fromUserId: number;
  fromUserName: string;
  receivedAt: Date;
  message?: string;
}
