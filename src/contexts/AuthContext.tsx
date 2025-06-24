import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, Like, Match, Story, StoryItem } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    userData: Partial<User> & { password: string },
  ) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  updateVerificationStatus: (verified: boolean) => void;
  likeUser: (userId: string) => Promise<boolean>;
  passUser: (userId: string) => Promise<void>;
  blockUser: (userId: string) => Promise<void>;
  addStory: (items: StoryItem[]) => Promise<boolean>;
  getStories: () => Story[];
  viewStory: (storyId: string, itemId: string) => void;
  deleteStory: (storyId: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
      const userData = localStorage.getItem("userData");

      if (isLoggedIn && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userData");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userData = localStorage.getItem("userData");

      if (userData) {
        const user = JSON.parse(userData);
        if (user.email === email && user.password === password) {
          setUser(user);
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    userData: Partial<User> & { password: string },
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || "",
        email: userData.email || "",
        age: userData.age || 18,
        bio: userData.bio || "",
        photos: [],
        interests: userData.interests || [],
        verified: false,
        online: true,
        preferences: {
          ageRange: { min: 18, max: 35 },
          maxDistance: 25,
          lookingFor: "any",
        },
        privacy: {
          showAge: true,
          showLocation: true,
          showOnline: true,
        },
        stats: {
          profileViews: 0,
          likes: 0,
          matches: 0,
        },
        createdAt: new Date(),
      };

      localStorage.setItem(
        "userData",
        JSON.stringify({ ...newUser, password: userData.password }),
      );
      localStorage.setItem("isAuthenticated", "true");

      setUser(newUser);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      // Сохраняем обновленные данные в localStorage
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        const userData = JSON.parse(storedData);
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...userData, ...updates }),
        );
      }
    }
  };

  const updateVerificationStatus = (verified: boolean) => {
    if (user) {
      updateProfile({ verified });
    }
  };

  const likeUser = async (userId: string): Promise<boolean> => {
    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Проверяем взаимность (имитация)
    const isMatch = Math.random() > 0.7; // 30% шанс матча

    if (isMatch) {
      // Создаем уведомление о матче
      console.log("Match created!", userId);
      return true;
    }

    return false;
  };

  const passUser = async (userId: string): Promise<void> => {
    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 200));
    console.log("User passed:", userId);
  };

  const blockUser = async (userId: string): Promise<void> => {
    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log("User blocked:", userId);
  };

  const deleteStory = (storyId: string) => {
    const stories = getStories();
    const updatedStories = stories.filter((story) => story.id !== storyId);
    localStorage.setItem("user_stories", JSON.stringify(updatedStories));
  };

  const addStory = async (items: StoryItem[]): Promise<boolean> => {
    if (!user) return false;

    try {
      const stories = getStories();
      const existingStoryIndex = stories.findIndex(
        (story) => story.userId === user.id,
      );

      const newStory: Story = {
        id:
          existingStoryIndex >= 0
            ? stories[existingStoryIndex].id
            : Date.now().toString(),
        userId: user.id,
        userName: user.name,
        userAvatar:
          user.photos[0]?.url ||
          `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000)}?w=100&h=100&fit=crop&crop=faces`,
        items:
          existingStoryIndex >= 0
            ? [...stories[existingStoryIndex].items, ...items]
            : items,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 часа
        isViewed: false,
        totalViews: 0,
      };

      if (existingStoryIndex >= 0) {
        stories[existingStoryIndex] = newStory;
      } else {
        stories.push(newStory);
      }

      localStorage.setItem("user_stories", JSON.stringify(stories));
      return true;
    } catch (error) {
      return false;
    }
  };

  const getStories = (): Story[] => {
    try {
      const stories = localStorage.getItem("user_stories");
      if (!stories) return [];

      const parsed = JSON.parse(stories) as Story[];
      // Фильтруем истечённые stories
      const validStories = parsed.filter(
        (story) => new Date(story.expiresAt) > new Date(),
      );

      // Обновляем localStorage если были удалены истечённые
      if (validStories.length !== parsed.length) {
        localStorage.setItem("user_stories", JSON.stringify(validStories));
      }

      return validStories;
    } catch (error) {
      return [];
    }
  };

  const viewStory = (storyId: string, itemId: string) => {
    if (!user) return;

    const stories = getStories();
    const story = stories.find((s) => s.id === storyId);
    if (!story) return;

    const item = story.items.find((i) => i.id === itemId);
    if (!item) return;

    // Добавляем ID пользователя в список просмотревших
    if (!item.viewedBy.includes(user.id)) {
      item.viewedBy.push(user.id);
      story.totalViews++;
      story.isViewed = true;

      localStorage.setItem("user_stories", JSON.stringify(stories));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        updateVerificationStatus,
        likeUser,
        passUser,
        blockUser,
        addStory,
        getStories,
        viewStory,
        deleteStory,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
