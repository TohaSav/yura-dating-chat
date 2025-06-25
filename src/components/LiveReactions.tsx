import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LiveReactionsProps {
  onReaction: (type: string) => void;
}

export default function LiveReactions({ onReaction }: LiveReactionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const reactions = [
    { type: "heart", emoji: "❤️", label: "Сердце" },
    { type: "laugh", emoji: "😂", label: "Смех" },
    { type: "wow", emoji: "😮", label: "Вау" },
    { type: "fire", emoji: "🔥", label: "Огонь" },
    { type: "clap", emoji: "👏", label: "Аплодисменты" },
    { type: "thumbs", emoji: "👍", label: "Лайк" },
  ];

  const handleReaction = (type: string) => {
    onReaction(type);
    // Добавляем тактильную обратную связь на мобильных
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  return (
    <div className="relative">
      {/* Reaction Panel */}
      {isOpen && (
        <div className="absolute bottom-full mb-2 left-0 bg-black/80 backdrop-blur-sm rounded-full p-2 flex gap-1 animate-scale-in">
          {reactions.map((reaction) => (
            <Button
              key={reaction.type}
              variant="ghost"
              size="sm"
              onClick={() => handleReaction(reaction.type)}
              className="w-10 h-10 rounded-full hover:bg-white/20 text-2xl p-0 hover-scale"
              title={reaction.label}
            >
              {reaction.emoji}
            </Button>
          ))}
        </div>
      )}

      {/* Main Reaction Button */}
      <Button
        variant="ghost"
        size="sm"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onTouchStart={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white border-0 text-xl"
        title="Реакции"
      >
        ❤️
      </Button>

      {/* Quick Heart Tap for Mobile */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleReaction("heart")}
        className="md:hidden absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 text-white border-0 text-sm animate-pulse"
      >
        ❤️
      </Button>
    </div>
  );
}
