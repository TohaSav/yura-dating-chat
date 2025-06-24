import { Gift, GiftCategory, SentGift, ReceivedGift } from "@/types/gifts";

class GiftService {
  private gifts: Gift[] = [
    // Цветы 🌸
    {
      id: "1",
      name: "Алая роза",
      emoji: "🌹",
      category: GiftCategory.FLOWERS,
      price: 99,
    },
    {
      id: "2",
      name: "Весенние тюльпаны",
      emoji: "🌷",
      category: GiftCategory.FLOWERS,
      price: 149,
    },
    {
      id: "3",
      name: "Солнечный подсолнух",
      emoji: "🌻",
      category: GiftCategory.FLOWERS,
      price: 89,
    },
    {
      id: "4",
      name: "Роскошный букет",
      emoji: "💐",
      category: GiftCategory.FLOWERS,
      price: 299,
    },
    {
      id: "25",
      name: "Нежная сакура",
      emoji: "🌸",
      category: GiftCategory.FLOWERS,
      price: 199,
    },
    {
      id: "26",
      name: "Цветущий кактус",
      emoji: "🌵",
      category: GiftCategory.FLOWERS,
      price: 79,
    },

    // Игрушки 🧸
    {
      id: "5",
      name: "Мягкий мишка",
      emoji: "🧸",
      category: GiftCategory.TOYS,
      price: 199,
    },
    {
      id: "6",
      name: "Магический единорог",
      emoji: "🦄",
      category: GiftCategory.TOYS,
      price: 249,
    },
    {
      id: "7",
      name: "Пушистый котик",
      emoji: "🐱",
      category: GiftCategory.TOYS,
      price: 159,
    },
    {
      id: "27",
      name: "Дракон удачи",
      emoji: "🐉",
      category: GiftCategory.TOYS,
      price: 299,
    },
    {
      id: "28",
      name: "Панда-обнимашка",
      emoji: "🐼",
      category: GiftCategory.TOYS,
      price: 189,
    },

    // Украшения ✨
    {
      id: "8",
      name: "Кольцо мечты",
      emoji: "💍",
      category: GiftCategory.JEWELRY,
      price: 799,
    },
    {
      id: "9",
      name: "Сияющий бриллиант",
      emoji: "💎",
      category: GiftCategory.JEWELRY,
      price: 1499,
    },
    {
      id: "10",
      name: "Королевская корона",
      emoji: "👑",
      category: GiftCategory.JEWELRY,
      price: 999,
    },
    {
      id: "29",
      name: "Звёздные серьги",
      emoji: "⭐",
      category: GiftCategory.JEWELRY,
      price: 599,
    },
    {
      id: "30",
      name: "Лунный браслет",
      emoji: "🌙",
      category: GiftCategory.JEWELRY,
      price: 449,
    },

    // Сладости 🍰
    {
      id: "11",
      name: "Праздничный торт",
      emoji: "🎂",
      category: GiftCategory.SWEETS,
      price: 159,
    },
    {
      id: "12",
      name: "Шоколад премиум",
      emoji: "🍫",
      category: GiftCategory.SWEETS,
      price: 89,
    },
    {
      id: "13",
      name: "Радужные конфеты",
      emoji: "🍬",
      category: GiftCategory.SWEETS,
      price: 69,
    },
    {
      id: "14",
      name: "Сладкий леденец",
      emoji: "🍭",
      category: GiftCategory.SWEETS,
      price: 49,
    },
    {
      id: "31",
      name: "Пончик с глазурью",
      emoji: "🍩",
      category: GiftCategory.SWEETS,
      price: 79,
    },
    {
      id: "32",
      name: "Молочный коктейль",
      emoji: "🥤",
      category: GiftCategory.SWEETS,
      price: 99,
    },

    // Техника 📱
    {
      id: "15",
      name: "iPhone Pro Max",
      emoji: "📱",
      category: GiftCategory.TECH,
      price: 1899,
    },
    {
      id: "16",
      name: "AirPods Pro",
      emoji: "🎧",
      category: GiftCategory.TECH,
      price: 449,
    },
    {
      id: "17",
      name: "MacBook Air",
      emoji: "💻",
      category: GiftCategory.TECH,
      price: 2499,
    },
    {
      id: "33",
      name: "Игровая приставка",
      emoji: "🎮",
      category: GiftCategory.TECH,
      price: 799,
    },
    {
      id: "34",
      name: "Умные часы",
      emoji: "⌚",
      category: GiftCategory.TECH,
      price: 699,
    },
    {
      id: "35",
      name: "VR очки",
      emoji: "🥽",
      category: GiftCategory.TECH,
      price: 899,
    },

    // Романтика 💕
    {
      id: "18",
      name: "Пылающее сердце",
      emoji: "❤️",
      category: GiftCategory.ROMANTIC,
      price: 39,
    },
    {
      id: "19",
      name: "Страстный поцелуй",
      emoji: "💋",
      category: GiftCategory.ROMANTIC,
      price: 19,
    },
    {
      id: "20",
      name: "Любовное послание",
      emoji: "💌",
      category: GiftCategory.ROMANTIC,
      price: 29,
    },
    {
      id: "21",
      name: "Воздушный шар",
      emoji: "🎈",
      category: GiftCategory.ROMANTIC,
      price: 59,
    },
    {
      id: "36",
      name: "Розовое сердце",
      emoji: "💗",
      category: GiftCategory.ROMANTIC,
      price: 49,
    },
    {
      id: "37",
      name: "Искры любви",
      emoji: "💖",
      category: GiftCategory.ROMANTIC,
      price: 69,
    },
    {
      id: "38",
      name: "Романтичная роза",
      emoji: "🥀",
      category: GiftCategory.ROMANTIC,
      price: 79,
    },
    {
      id: "39",
      name: "Купидон",
      emoji: "💘",
      category: GiftCategory.ROMANTIC,
      price: 99,
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
