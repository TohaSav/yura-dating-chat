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
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: User & { password: string }) => Promise<boolean>;
  logout: () => void;
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
    const userData = localStorage.getItem("userProfile");

    if (isLoggedIn && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Имитация проверки логина
    const userData = localStorage.getItem("userProfile");

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
  };

  const register = async (
    userData: User & { password: string },
  ): Promise<boolean> => {
    // Сохраняем данные пользователя
    localStorage.setItem("userProfile", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");

    setUser(userData);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userProfile");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
