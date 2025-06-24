import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useGifts } from "@/contexts/GiftContext";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface GiftSectionProps {
  userId?: number;
  className?: string;
}

export default function GiftSection({
  userId,
  className = "",
}: GiftSectionProps) {
  const { receivedGifts } = useGifts();

  if (receivedGifts.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Gift" size={20} />
            Подарки
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <Icon name="Gift" size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm">Подарков пока нет</p>
            <p className="text-xs mt-1">
              Когда вам отправят подарки, они появятся здесь
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Gift" size={20} />
          Подарки ({receivedGifts.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48">
          <div className="grid grid-cols-2 gap-3">
            {receivedGifts.map((receivedGift) => (
              <div
                key={receivedGift.id}
                className="p-3 rounded-lg border bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{receivedGift.gift.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {receivedGift.gift.name}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      от {receivedGift.fromUserName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(receivedGift.receivedAt, "dd MMM", {
                        locale: ru,
                      })}
                    </div>
                  </div>
                </div>

                {receivedGift.message && (
                  <div className="mt-2 p-2 bg-white/50 rounded text-xs text-gray-700">
                    "{receivedGift.message}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
