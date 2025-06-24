import { Gift, GiftCategory, SentGift, ReceivedGift } from "@/types/gifts";

class GiftService {
  private gifts: Gift[] = [
    // Цветы
    {
      id: "1",
      name: "Красная роза",
      emoji: "🌹",
      category: GiftCategory.FLOWERS,
      price: 50,
    },
    {
      id: "2",
      name: "Букет тюльпанов",
      emoji: "🌷",
      category: GiftCategory.FLOWERS,
      price: 120,
    },
    {
      id: "3",
      name: "Подсолнух",
      emoji: "🌻",
      category: GiftCategory.FLOWERS,
      price: 80,
    },
    {
      id: "4",
      name: "Букет роз",
      emoji: "💐",
      category: GiftCategory.FLOWERS,
      price: 200,
    },

    // Игрушки
    {
      id: "5",
      name: "Плюшевый мишка",
      emoji: "🧸",
      category: GiftCategory.TOYS,
      price: 150,
    },
    {
      id: "6",
      name: "Единорог",
      emoji: "🦄",
      category: GiftCategory.TOYS,
      price: 180,
    },
    {
      id: "7",
      name: "Котёнок",
      emoji: "🐱",
      category: GiftCategory.TOYS,
      price: 120,
    },

    // Украшения
    {
      id: "8",
      name: "Кольцо",
      emoji: "💍",
      category: GiftCategory.JEWELRY,
      price: 500,
    },
    {
      id: "9",
      name: "Алмаз",
      emoji: "💎",
      category: GiftCategory.JEWELRY,
      price: 1000,
    },
    {
      id: "10",
      name: "Корона",
      emoji: "👑",
      category: GiftCategory.JEWELRY,
      price: 800,
    },

    // Сладости
    {
      id: "11",
      name: "Торт",
      emoji: "🎂",
      category: GiftCategory.SWEETS,
      price: 100,
    },
    {
      id: "12",
      name: "Шоколад",
      emoji: "🍫",
      category: GiftCategory.SWEETS,
      price: 60,
    },
    {
      id: "13",
      name: "Конфеты",
      emoji: "🍬",
      category: GiftCategory.SWEETS,
      price: 40,
    },
    {
      id: "14",
      name: "Леденец",
      emoji: "🍭",
      category: GiftCategory.SWEETS,
      price: 30,
    },

    // Техника
    {
      id: "15",
      name: "Смартфон",
      emoji: "📱",
      category: GiftCategory.TECH,
      price: 1200,
    },
    {
      id: "16",
      name: "Наушники",
      emoji: "🎧",
      category: GiftCategory.TECH,
      price: 300,
    },
    {
      id: "17",
      name: "Ноутбук",
      emoji: "💻",
      category: GiftCategory.TECH,
      price: 2000,
    },

    // Романтика
    {
      id: "18",
      name: "Сердце",
      emoji: "❤️",
      category: GiftCategory.ROMANTIC,
      price: 25,
    },
    {
      id: "19",
      name: "Поцелуй",
      emoji: "💋",
      category: GiftCategory.ROMANTIC,
      price: 10,
    },
    {
      id: "20",
      name: "Любовное письмо",
      emoji: "💌",
      category: GiftCategory.ROMANTIC,
      price: 15,
    },
    {
      id: "21",
      name: "Воздушный шар-сердце",
      emoji: "🎈",
      category: GiftCategory.ROMANTIC,
      price: 35,
    },
  ];

  private receivedGifts: ReceivedGift[] = [];

  getAllGifts(): Gift[] {
    return this.gifts;
  }

  getGiftsByCategory(category: GiftCategory): Gift[] {
    return this.gifts.filter((gift) => gift.category === category);
  }

  getGiftById(id: string): Gift | undefined {
    return this.gifts.find((gift) => gift.id === id);
  }

  async sendGift(
    giftId: string,
    fromUserId: number,
    fromUserName: string,
    toUserId: number,
    toUserName: string,
    message?: string,
  ): Promise<SentGift> {
    const gift = this.getGiftById(giftId);
    if (!gift) {
      throw new Error("Подарок не найден");
    }

    // Имитация отправки
    await new Promise((resolve) => setTimeout(resolve, 500));

    const sentGift: SentGift = {
      id: `sent_${Date.now()}_${Math.random()}`,
      giftId,
      gift,
      fromUserId,
      fromUserName,
      toUserId,
      toUserName,
      sentAt: new Date(),
      message,
    };

    // Добавляем в полученные подарки получателя
    const receivedGift: ReceivedGift = {
      id: `received_${Date.now()}_${Math.random()}`,
      giftId,
      gift,
      fromUserId,
      fromUserName,
      receivedAt: new Date(),
      message,
    };

    this.receivedGifts.push(receivedGift);

    return sentGift;
  }

  getReceivedGifts(userId?: number): ReceivedGift[] {
    // Для демонстрации возвращаем все подарки
    return this.receivedGifts;
  }

  getCategories(): GiftCategory[] {
    return Object.values(GiftCategory);
  }

  getCategoryName(category: GiftCategory): string {
    const names: Record<GiftCategory, string> = {
      [GiftCategory.FLOWERS]: "Цветы",
      [GiftCategory.TOYS]: "Игрушки",
      [GiftCategory.JEWELRY]: "Украшения",
      [GiftCategory.SWEETS]: "Сладости",
      [GiftCategory.TECH]: "Техника",
      [GiftCategory.ROMANTIC]: "Романтика",
    };
    return names[category];
  }
}

export const giftService = new GiftService();
