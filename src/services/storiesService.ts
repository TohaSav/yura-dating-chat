import { Story, StoryItem, User } from "@/types";
import { StoryViewer, StoryStats } from "@/types/stories";

export class StoriesService {
  static addStory(user: User, items: StoryItem[]): boolean {
    try {
      const stories = JSON.parse(localStorage.getItem("stories") || "[]");
      const existingStory = stories.find((s: Story) => s.userId === user.id);

      if (existingStory) {
        existingStory.items = [...existingStory.items, ...items];
        existingStory.createdAt = new Date();
      } else {
        const newStory: Story = {
          id: `story_${Date.now()}`,
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar || "/placeholder.svg",
          items,
          createdAt: new Date(),
          isViewed: false,
        };
        stories.push(newStory);
      }

      localStorage.setItem("stories", JSON.stringify(stories));
      return true;
    } catch (error) {
      console.error("Add story error:", error);
      return false;
    }
  }

  static getStories(user: User | null): Story[] {
    const stories = JSON.parse(localStorage.getItem("stories") || "[]");

    return stories.map((story: Story) => {
      if (story.userId === user?.id) {
        return {
          ...story,
          userAvatar: user.avatar || "/placeholder.svg",
          userName: user.name,
        };
      }
      return story;
    });
  }

  static deleteStory(storyId: string): void {
    const stories = JSON.parse(localStorage.getItem("stories") || "[]");
    const updatedStories = stories.filter((s: Story) => s.id !== storyId);
    localStorage.setItem("stories", JSON.stringify(updatedStories));
  }

  static deleteStoryItem(storyId: string, itemId: string): void {
    const stories = JSON.parse(localStorage.getItem("stories") || "[]");
    const story = stories.find((s: Story) => s.id === storyId);

    if (story) {
      story.items = story.items.filter((item: StoryItem) => item.id !== itemId);

      if (story.items.length === 0) {
        this.deleteStory(storyId);
        return;
      }

      localStorage.setItem("stories", JSON.stringify(stories));
    }
  }

  static cleanupExpiredStories(): void {
    const stories = JSON.parse(localStorage.getItem("stories") || "[]");
    const now = new Date();
    const validStories = stories.filter((story: Story) => {
      if (story.expiresAt) {
        return new Date(story.expiresAt) > now;
      }
      return true;
    });

    if (validStories.length !== stories.length) {
      localStorage.setItem("stories", JSON.stringify(validStories));
    }
  }

  static addReaction(
    user: User,
    storyId: string,
    itemId: string,
    reaction: string,
  ): void {
    const stories = JSON.parse(localStorage.getItem("stories") || "[]");
    const story = stories.find((s: Story) => s.id === storyId);
    if (!story) return;

    const item = story.items.find((i: StoryItem) => i.id === itemId);
    if (!item) return;

    if (!item.reactions) {
      item.reactions = [];
    }

    const existingReaction = item.reactions.find((r) => r.userId === user.id);

    if (existingReaction) {
      existingReaction.reaction = reaction;
      existingReaction.createdAt = new Date();
    } else {
      item.reactions.push({
        userId: user.id,
        userName: user.name,
        reaction,
        createdAt: new Date(),
      });
    }

    localStorage.setItem("stories", JSON.stringify(stories));
  }

  static getStoryStats(userId: string, storyId: string): StoryStats {
    const stories = JSON.parse(localStorage.getItem("stories") || "[]");
    const story = stories.find(
      (s: Story) => s.id === storyId && s.userId === userId,
    );

    if (!story) return { views: 0, reactions: 0, shares: 0 };

    let totalReactions = 0;
    story.items.forEach((item: StoryItem) => {
      if (item.reactions) {
        totalReactions += item.reactions.length;
      }
    });

    return {
      views: story.totalViews || 0,
      reactions: totalReactions,
      shares: story.shares || 0,
    };
  }
}
