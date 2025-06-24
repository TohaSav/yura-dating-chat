import { createContext, useState, useEffect } from "react";
import { User } from "@/types";
import { AuthContextType, AuthProviderProps } from "@/types/auth";
import { AuthService } from "@/services/authService";
import { StoriesService } from "@/services/storiesService";
import { MatchingService } from "@/services/matchingService";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const userData = AuthService.checkAuth();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const interval = setInterval(StoriesService.cleanupExpiredStories, 60000);
    StoriesService.cleanupExpiredStories();
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userData = await AuthService.login({ email, password });
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    userData: Parameters<typeof AuthService.register>[0],
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newUser = await AuthService.register(userData);
      if (newUser) {
        setUser(newUser);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = AuthService.updateUserData(user, updates);
      setUser(updatedUser);
    }
  };

  const updateVerificationStatus = (verified: boolean) => {
    if (user) {
      updateProfile({ verified });
    }
  };

  const likeUser = async (userId: string): Promise<boolean> => {
    return await MatchingService.likeUser(userId);
  };

  const passUser = async (userId: string): Promise<void> => {
    await MatchingService.passUser(userId);
  };

  const blockUser = async (userId: string): Promise<void> => {
    await MatchingService.blockUser(userId);
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
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Re-export useAuth hook for convenience
export { useAuth } from "@/hooks/useAuth";
