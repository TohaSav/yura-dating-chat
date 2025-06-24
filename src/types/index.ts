export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
  uploadedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  bio: string;
  photos: Photo[];
  interests: string[];
  location?: Location;
  verified: boolean;
  online: boolean;
  lastSeen?: Date;
  height?: number;
  education?: string;
  job?: string;
  smoking?: string;
  alcohol?: string;
  pets?: string;
  children?: string;
  preferences: {
    ageRange: { min: number; max: number };
    maxDistance: number;
    lookingFor: "relationship" | "friendship" | "casual" | "any";
  };
  privacy: {
    showAge: boolean;
    showLocation: boolean;
    showOnline: boolean;
  };
  stats: {
    profileViews: number;
    likes: number;
    matches: number;
  };
  createdAt: Date;
}

export interface Match {
  id: string;
  users: [string, string];
  matchedAt: Date;
  chatId: string;
  isActive: boolean;
}

export interface Like {
  id: string;
  fromUserId: string;
  toUserId: string;
  isLike: boolean; // true = like, false = dislike
  createdAt: Date;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: "text" | "image" | "audio" | "video";
  isRead: boolean;
  sentAt: Date;
  readAt?: Date;
}

export interface Chat {
  id: string;
  matchId: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: "like" | "match" | "message" | "view" | "verification";
  title: string;
  content: string;
  isRead: boolean;
  data?: any;
  createdAt: Date;
}

export interface SwipeFilters {
  ageRange: { min: number; max: number };
  maxDistance: number;
  showVerifiedOnly: boolean;
  showOnlineOnly: boolean;
  interests: string[];
}

export interface Music {
  name: string;
  artist: string;
  coverUrl: string;
}

export interface Reel {
  id: string;
  videoUrl: string;
  thumbnail: string;
  caption: string;
  author: User;
  likes: number;
  comments: Comment[];
  shares: number;
  views: number;
  duration: number;
  createdAt: Date;
  isLiked: boolean;
  music?: Music;
  hashtags: string[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
  likes: number;
  isLiked: boolean;
}

export interface StoryItem {
  id: string;
  type: "image" | "video";
  url: string;
  duration: number; // в секундах, для изображений обычно 5-7 сек
  createdAt: Date;
  viewedBy: string[]; // массив ID пользователей, которые просмотрели
}

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  items: StoryItem[];
  createdAt: Date;
  expiresAt: Date; // через 24 часа
  isViewed: boolean; // просмотрена ли текущим пользователем
  totalViews: number;
}

export interface StoryUser {
  id: string;
  name: string;
  avatar: string;
  hasStory: boolean;
  isViewed: boolean;
}
