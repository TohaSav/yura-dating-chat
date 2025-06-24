import { User } from "./index";

export interface AuthContextType {
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
  isLoading: boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData extends Partial<User> {
  password: string;
}
