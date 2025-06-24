import { Story, StoryItem } from "./index";

export interface StoriesContextType {
  addStory: (items: StoryItem[]) => Promise<boolean>;
  getStories: () => Story[];
  viewStory: (storyId: string, itemId: string) => void;
  deleteStory: (storyId: string) => void;
  deleteStoryItem: (storyId: string, itemId: string) => void;
  addReaction: (storyId: string, itemId: string, reaction: string) => void;
  archiveStory: (storyId: string) => void;
  unarchiveStory: (storyId: string) => void;
  getArchivedStories: () => Story[];
  updateStoryPrivacy: (
    storyId: string,
    privacy: "public" | "friends" | "close_friends",
  ) => void;
  getStoryViewers: (
    storyId: string,
  ) => Array<{ userId: string; userName: string; viewedAt: Date }>;
  addToCloseFriends: (userId: string) => void;
  removeFromCloseFriends: (userId: string) => void;
  getCloseFriends: () => string[];
  getStoryStats: (storyId: string) => {
    views: number;
    reactions: number;
    shares: number;
  };
}

export interface StoryViewer {
  userId: string;
  userName: string;
  viewedAt: Date;
}

export interface StoryStats {
  views: number;
  reactions: number;
  shares: number;
}
