import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  name: string;
  email: string;
  age: string;
  bio: string;
  interests: string[];
  verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: User & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateVerificationStatus: (verified: boolean) => void;
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

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    const userData = localStorage.getItem("userData");

    if (isLoggedIn && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        // Если данные повреждены, очищаем localStorage
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userData");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Имитация проверки логина
    const userData = localStorage.getItem("userData");

    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.email === email && user.password === password) {
          setUser(user);
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
          return true;
        }
      } catch (error) {
        return false;
      }
    }
    return false;
  };

  const register = async (
    userData: User & { password: string },
  ): Promise<boolean> => {
    // Сохраняем данные пользователя и авторизуем
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");

    setUser(userData);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateVerificationStatus = (verified: boolean) => {
    if (user) {
      const updatedUser = { ...user, verified };
      setUser(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));
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
        updateVerificationStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
