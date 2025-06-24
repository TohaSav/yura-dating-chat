import { User } from "@/types";
import { LoginCredentials, RegistrationData } from "@/types/auth";

export class AuthService {
  static async login({
    email,
    password,
  }: LoginCredentials): Promise<User | null> {
    try {
      const userData = localStorage.getItem("userData");

      if (userData) {
        const user = JSON.parse(userData);
        if (user.email === email && user.password === password) {
          localStorage.setItem("isAuthenticated", "true");
          return user;
        }
      }
      return null;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  }

  static async register(userData: RegistrationData): Promise<User | null> {
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

      return newUser;
    } catch (error) {
      console.error("Registration error:", error);
      return null;
    }
  }

  static logout(): void {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
  }

  static checkAuth(): User | null {
    try {
      const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
      const userData = localStorage.getItem("userData");

      if (isLoggedIn && userData) {
        return JSON.parse(userData);
      }
      return null;
    } catch (error) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userData");
      return null;
    }
  }

  static updateUserData(user: User, updates: Partial<User>): User {
    const updatedUser = { ...user, ...updates };

    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, ...updates }),
      );
    }

    return updatedUser;
  }
}
