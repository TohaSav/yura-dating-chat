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
  interests: string[];
  education?: string[];
  job?: string[];
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
  content: string;
  createdAt: Date;
  likes: number;
  replies?: Comment[];
}

export interface StoryItem {
  id: string;
  type: "image" | "video";
  url: string;
  duration: number; // в секундах
  createdAt: Date;
  viewedBy: string[];
  reactions?: {
    userId: string;
    userName: string;
    reaction: string;
    createdAt: Date;
  }[];
  replies?: {
    userId: string;
    userName: string;
    message: string;
    createdAt: Date;
  }[];
}

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  items: StoryItem[];
  createdAt: Date;
  isViewed: boolean;
  totalViews?: number;
  privacy?: "public" | "friends" | "close_friends";
  archived?: boolean;
}

export interface StoryUser {
  id: string;
  name: string;
  avatar: string;
  hasStory: boolean;
  isViewed: boolean;
}

// Reels Types
export interface ReelVideo {
  id: string;
  videoUrl: string;
  thumbnail: string;
  duration: number;
  quality: "auto" | "360p" | "480p" | "720p" | "1080p";
  aspectRatio: "9:16" | "16:9" | "1:1";
}

export interface ReelAuthor {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified: boolean;
  subscribersCount: number;
  isSubscribed: boolean;
}

export interface ReelComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: Date;
  likesCount: number;
  isLiked: boolean;
  replies?: ReelComment[];
}

export interface ReelInteraction {
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface Reel {
  id: string;
  video: ReelVideo;
  author: ReelAuthor;
  title: string;
  description: string;
  hashtags: string[];
  music?: {
    id: string;
    title: string;
    artist: string;
    url: string;
  };
  interaction: ReelInteraction;
  createdAt: Date;
  isSponsored: boolean;
}

export interface ReelPlaylist {
  id: string;
  name: string;
  reels: Reel[];
  totalCount: number;
  nextPageToken?: string;
}

export interface ReelAnalytics {
  reelId: string;
  views: number;
  watchTime: number;
  completionRate: number;
  engagementRate: number;
  clickThroughRate: number;
}
