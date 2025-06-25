import { useState, useRef, useCallback } from "react";
import UserAvatarPlaceholder from "@/components/ui/user-avatar-placeholder";
import Icon from "@/components/ui/icon";

interface SwipeProfile {
  id: string;
  name: string;
  age: number;
  photos: string[];
  location: string;
  isOnline?: boolean;
  verified?: boolean;
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
  const [showMatch, setShowMatch] = useState(false);
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

      if (direction === "right") {
        setShowMatch(true);
        setTimeout(() => {
          onSwipe(direction, profile.id);
          setShowMatch(false);
        }, 1500);
      } else {
        onSwipe(direction, profile.id);
      }
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

  // Визуальные индикаторы при свайпе
  const getSwipeIndicator = () => {
    const absX = Math.abs(dragOffset.x);
    if (absX < 50) return null;

    const isRight = dragOffset.x > 0;
    const intensity = Math.min(absX / 150, 1);

    return (
      <div className={`absolute top-8 ${isRight ? "right-8" : "left-8"} z-10`}>
        <div
          className={`flex items-center justify-center w-16 h-16 rounded-full ${
            isRight ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ opacity: intensity }}
        >
          <Icon
            name={isRight ? "Heart" : "X"}
            size={32}
            className="text-white"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        ref={cardRef}
        className="absolute inset-0 select-none cursor-grab active:cursor-grabbing touch-none"
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
        {/* Fullscreen Photo Background */}
        <div className="w-full h-full bg-gray-200 rounded-3xl shadow-lg overflow-hidden relative">
          {profile.photos && profile.photos.length > 0 ? (
            <img
              src={profile.photos[0]}
              alt={profile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400">
              <UserAvatarPlaceholder
                name={profile.name}
                size="2xl"
                className="w-32 h-32 rounded-full"
              />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">
              {profile.name}, {profile.age}
            </h2>
            {profile.location && (
              <p className="text-white/80 flex items-center gap-2">
                <Icon name="MapPin" size={16} />
                {profile.location}
              </p>
            )}
            {profile.isOnline && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-white/80">Онлайн</span>
              </div>
            )}
          </div>

          {/* Swipe Indicators */}
          {getSwipeIndicator()}
        </div>
      </div>

      {/* Match Effect */}
      {showMatch && (
        <div className="fixed inset-0 bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center z-50 animate-fade-in">
          <div className="text-center text-white animate-scale-in">
            <div className="text-8xl mb-4">💖</div>
            <h1 className="text-6xl font-bold mb-4">MATCH!</h1>
            <p className="text-xl">Вам понравились друг другу</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SwipeCard;
