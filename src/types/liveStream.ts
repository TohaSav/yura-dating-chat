export interface LiveStream {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  isLive: boolean;
  startedAt: Date;
  endedAt?: Date;
  viewerCount: number;
  maxViewers: number;
  isPrivate: boolean;
  allowComments: boolean;
  streamUrl?: string;
}

export interface StreamSettings {
  title: string;
  isPrivate: boolean;
  allowComments: boolean;
  quality: "auto" | "high" | "medium" | "low";
}

export interface LiveComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  timestamp: Date;
  reactions: Reaction[];
}

export interface Reaction {
  type: "heart" | "laugh" | "wow" | "sad" | "angry";
  count: number;
}

export interface LiveViewer {
  id: string;
  name: string;
  avatar?: string;
  joinedAt: Date;
}

export interface StreamMessage {
  type: "comment" | "reaction" | "join" | "leave" | "heart";
  data: any;
  timestamp: Date;
}
