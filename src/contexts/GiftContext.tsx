import React, { createContext, useContext, useState, ReactNode } from "react";
import { Gift, SentGift, ReceivedGift, GiftCategory } from "@/types/gifts";
import { giftService } from "@/services/giftService";

interface GiftContextType {
  gifts: Gift[];
  receivedGifts: ReceivedGift[];
  isLoading: boolean;
  sendGift: (
    giftId: string,
    fromUserId: number,
    fromUserName: string,
    toUserId: number,
    toUserName: string,
    message?: string,
  ) => Promise<SentGift>;
  getGiftsByCategory: (category: GiftCategory) => Gift[];
  getReceivedGifts: (userId?: number) => ReceivedGift[];
  refreshReceivedGifts: () => void;
}

const GiftContext = createContext<GiftContextType | undefined>(undefined);

export const useGifts = () => {
  const context = useContext(GiftContext);
  if (!context) {
    throw new Error("useGifts must be used within a GiftProvider");
  }
  return context;
};

interface GiftProviderProps {
  children: ReactNode;
}

export const GiftProvider: React.FC<GiftProviderProps> = ({ children }) => {
  const [gifts] = useState<Gift[]>(giftService.getAllGifts());
  const [receivedGifts, setReceivedGifts] = useState<ReceivedGift[]>(
    giftService.getReceivedGifts(),
  );
  const [isLoading, setIsLoading] = useState(false);

  const sendGift = async (
    giftId: string,
    fromUserId: number,
    fromUserName: string,
    toUserId: number,
    toUserName: string,
    message?: string,
  ): Promise<SentGift> => {
    setIsLoading(true);
    try {
      const sentGift = await giftService.sendGift(
        giftId,
        fromUserId,
        fromUserName,
        toUserId,
        toUserName,
        message,
      );
      // Обновляем полученные подарки
      setReceivedGifts(giftService.getReceivedGifts());
      return sentGift;
    } finally {
      setIsLoading(false);
    }
  };

  const getGiftsByCategory = (category: GiftCategory): Gift[] => {
    return giftService.getGiftsByCategory(category);
  };

  const getReceivedGifts = (userId?: number): ReceivedGift[] => {
    return giftService.getReceivedGifts(userId);
  };

  const refreshReceivedGifts = () => {
    setReceivedGifts(giftService.getReceivedGifts());
  };

  const value: GiftContextType = {
    gifts,
    receivedGifts,
    isLoading,
    sendGift,
    getGiftsByCategory,
    getReceivedGifts,
    refreshReceivedGifts,
  };

  return <GiftContext.Provider value={value}>{children}</GiftContext.Provider>;
};
