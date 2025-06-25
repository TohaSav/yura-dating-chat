import { createContext, useContext } from "react";
import { StoriesContextType } from "@/types/stories";
import { StoriesService } from "@/services/storiesService";
import { useAuth } from "@/contexts/AuthContext";

const StoriesContext = createContext<StoriesContextType | undefined>(undefined);

export const useStories = () => {
  const context = useContext(StoriesContext);
  if (context === undefined) {
    throw new Error("useStories must be used within a StoriesProvider");
  }
  return context;
};

export const StoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();

  const addStory = async (
    items: Parameters<typeof StoriesService.addStory>[1],
  ): Promise<boolean> => {
    if (!user) return false;
    return StoriesService.addStory(user, items);
  };

  const getStories = () => {
    return StoriesService.getStories(user);
  };

  const viewStory = (storyId: string, itemId: string) => {
    if (!user) return;
    // Implementation for viewing story
  };

  const deleteStory = (storyId: string) => {
    StoriesService.deleteStory(storyId);
  };

  const deleteStoryItem = (storyId: string, itemId: string) => {
    StoriesService.deleteStoryItem(storyId, itemId);
  };

  const addReaction = (storyId: string, itemId: string, reaction: string) => {
    if (!user) return;
    StoriesService.addReaction(user, storyId, itemId, reaction);
  };

  const archiveStory = (storyId: string) => {
    // Implementation for archiving story
  };

  const unarchiveStory = (storyId: string) => {
    // Implementation for unarchiving story
  };

  const getArchivedStories = () => {
    // Implementation for getting archived stories
    return [];
  };

  const updateStoryPrivacy = (
    storyId: string,
    privacy: "public" | "friends" | "close_friends",
  ) => {
    // Implementation for updating story privacy
  };

  const getStoryViewers = (storyId: string) => {
    // Implementation for getting story viewers
    return [];
  };

  const addToCloseFriends = (userId: string) => {
    // Implementation for adding to close friends
  };

  const removeFromCloseFriends = (userId: string) => {
    // Implementation for removing from close friends
  };

  const getCloseFriends = () => {
    // Implementation for getting close friends
    return [];
  };

  const getStoryStats = (storyId: string) => {
    if (!user) return { views: 0, reactions: 0, shares: 0 };
    return StoriesService.getStoryStats(user.id, storyId);
  };

  return (
    <StoriesContext.Provider
      value={{
        addStory,
        getStories,
        viewStory,
        deleteStory,
        deleteStoryItem,
        addReaction,
        archiveStory,
        unarchiveStory,
        getArchivedStories,
        updateStoryPrivacy,
        getStoryViewers,
        addToCloseFriends,
        removeFromCloseFriends,
        getCloseFriends,
        getStoryStats,
      }}
    >
      {children}
    </StoriesContext.Provider>
  );
};
