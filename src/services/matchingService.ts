export class MatchingService {
  static async likeUser(userId: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 30% шанс матча
    const isMatch = Math.random() > 0.7;

    if (isMatch) {
      console.log("Match created!", userId);
      return true;
    }

    return false;
  }

  static async passUser(userId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    console.log("User passed:", userId);
  }

  static async blockUser(userId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log("User blocked:", userId);
  }
}
