import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useGifts } from "@/contexts/GiftContext";
import { useAuth } from "@/contexts/AuthContext";
import { GiftCategory } from "@/types/gifts";
import { giftService } from "@/services/giftService";

interface GiftModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientId: number;
  recipientName: string;
}

export default function GiftModal({
  open,
  onOpenChange,
  recipientId,
  recipientName,
}: GiftModalProps) {
  const { sendGift, isLoading } = useGifts();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<GiftCategory>(
    GiftCategory.FLOWERS,
  );
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const categories = giftService.getCategories();
  const categoryGifts = giftService.getGiftsByCategory(selectedCategory);
  const selectedGift = selectedGiftId
    ? giftService.getGiftById(selectedGiftId)
    : null;

  const handleSendGift = async () => {
    if (!selectedGift || !user) return;

    setIsSending(true);
    try {
      await sendGift(
        selectedGift.id,
        user.id,
        user.name,
        recipientId,
        recipientName,
        message.trim() || undefined,
      );

      // Успешная отправка
      setSelectedGiftId(null);
      setMessage("");
      onOpenChange(false);

      // Показываем уведомление
      console.log(
        `Подарок "${selectedGift.name}" отправлен пользователю ${recipientName}!`,
      );
    } catch (error) {
      console.error("Ошибка при отправке подарка:", error);
    } finally {
      setIsSending(false);
    }
  };

  const getCategoryIcon = (category: GiftCategory): string => {
    const icons: Record<GiftCategory, string> = {
      [GiftCategory.FLOWERS]: "Flower",
      [GiftCategory.TOYS]: "Baby",
      [GiftCategory.JEWELRY]: "Crown",
      [GiftCategory.SWEETS]: "Cookie",
      [GiftCategory.TECH]: "Smartphone",
      [GiftCategory.ROMANTIC]: "Heart",
    };
    return icons[category];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            🎁 Выбрать подарок для {recipientName}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          <Tabs
            value={selectedCategory}
            onValueChange={(value) =>
              setSelectedCategory(value as GiftCategory)
            }
          >
            <TabsList className="grid w-full grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="flex flex-col items-center gap-1 text-xs"
                >
                  <Icon name={getCategoryIcon(category)} size={16} />
                  {giftService.getCategoryName(category)}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-4">
                <ScrollArea className="h-64">
                  <div className="grid grid-cols-4 gap-3">
                    {giftService.getGiftsByCategory(category).map((gift) => (
                      <div
                        key={gift.id}
                        className={`
                          relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                          hover:scale-105 hover:shadow-lg
                          ${
                            selectedGiftId === gift.id
                              ? "border-purple-500 bg-purple-50 shadow-lg scale-105"
                              : "border-gray-200 hover:border-purple-300"
                          }
                        `}
                        onClick={() => setSelectedGiftId(gift.id)}
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-2">{gift.emoji}</div>
                          <div className="font-medium text-sm mb-1">
                            {gift.name}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {gift.price} ₽
                          </Badge>
                        </div>

                        {selectedGiftId === gift.id && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <Icon
                              name="Check"
                              size={12}
                              className="text-white"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>

          {selectedGift && (
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{selectedGift.emoji}</div>
                <div>
                  <h3 className="text-xl font-bold">{selectedGift.name}</h3>
                  <p className="text-purple-600 font-semibold">
                    {selectedGift.price} ₽
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Сообщение (необязательно)
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Добавьте личное сообщение к подарку..."
                    className="resize-none"
                    rows={3}
                    maxLength={200}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {message.length}/200 символов
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                  <Button
                    onClick={handleSendGift}
                    disabled={isSending}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Icon name="Gift" size={16} className="mr-2" />
                        Отправить подарок
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
