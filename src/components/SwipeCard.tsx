import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface SwipeProfile {
  id: string;
  name: string;
  age: number;
  image: string;
  location: string;
  isOnline?: boolean;
}

interface SwipeCardProps {
  profile: SwipeProfile;
  onSwipe: (direction: "left" | "right", profileId: string) => void;
  style?: React.CSSProperties;
}

const SwipeCard = ({ profile, onSwipe, style }: SwipeCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
  }, []);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging) return;

      const deltaX = clientX - startPos.x;
      const deltaY = clientY - startPos.y;
      setDragOffset({ x: deltaX, y: deltaY });
    },
    [isDragging, startPos],
  );

  const handleEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    const threshold = window.innerWidth * 0.25;

    if (Math.abs(dragOffset.x) > threshold) {
      const direction = dragOffset.x > 0 ? "right" : "left";
      onSwipe(direction, profile.id);
    }

    setDragOffset({ x: 0, y: 0 });
  }, [isDragging, dragOffset.x, onSwipe, profile.id]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const rotation = dragOffset.x * 0.1;
  const opacity = 1 - Math.abs(dragOffset.x) / (window.innerWidth * 0.5);
  const scale = isDragging ? 1.05 : 1;

  const likeOpacity = Math.max(0, dragOffset.x / (window.innerWidth * 0.25));
  const dislikeOpacity = Math.max(
    0,
    -dragOffset.x / (window.innerWidth * 0.25),
  );

  return (
    <div
      ref={cardRef}
      className="absolute inset-0 select-none cursor-grab active:cursor-grabbing"
      style={{
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg) scale(${scale})`,
        opacity,
        transition: isDragging ? "none" : "all 0.3s ease-out",
        zIndex: isDragging ? 10 : 1,
        ...style,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Like/Dislike Indicators */}
      <div
        className="absolute top-8 left-8 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg border-4 border-green-400 rotate-12 z-10"
        style={{ opacity: likeOpacity }}
      >
        НРАВИТСЯ
      </div>
      <div
        className="absolute top-8 right-8 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg border-4 border-red-400 -rotate-12 z-10"
        style={{ opacity: dislikeOpacity }}
      >
        НЕ НРАВИТСЯ
      </div>

      {/* Card Content */}
      <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-white">
        <div className="relative h-full">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover"
            draggable={false}
          />

          {/* Online indicator */}
          {profile.isOnline && (
            <div className="absolute top-6 right-6 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          )}

          {/* Profile info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {profile.name}, {profile.age}
                </h2>
                {profile.isOnline && (
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                )}
              </div>
              <p className="text-white/90 text-lg">{profile.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            onSwipe("left", profile.id);
          }}
          className="w-14 h-14 rounded-full bg-white/90 border-2 border-gray-300 hover:bg-white hover:scale-110 transition-all duration-200"
        >
          <Icon name="X" size={24} className="text-gray-600" />
        </Button>

        <Button
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            onSwipe("right", profile.id);
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 hover:scale-110 transition-all duration-200 border-2 border-white/20"
        >
          <Icon name="Heart" size={24} className="text-white" />
        </Button>
      </div>
    </div>
  );
};

export default SwipeCard;
