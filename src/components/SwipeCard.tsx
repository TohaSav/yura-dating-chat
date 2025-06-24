import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import UserAvatarPlaceholder from "@/components/ui/user-avatar-placeholder";

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
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [imageStates, setImageStates] = useState<
    Record<number, "loading" | "loaded" | "error">
  >({});
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
      {/* Like/Dislike Indicators */}
      <div
        className="absolute top-4 md:top-8 left-4 md:left-8 bg-green-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-full font-bold text-sm md:text-lg border-2 md:border-4 border-green-400 rotate-12 z-10"
        style={{ opacity: likeOpacity }}
      >
        <span className="hidden sm:inline">НРАВИТСЯ</span>
        <span className="sm:hidden">💚</span>
      </div>
      <div
        className="absolute top-4 md:top-8 right-4 md:right-8 bg-red-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-full font-bold text-sm md:text-lg border-2 md:border-4 border-red-400 -rotate-12 z-10"
        style={{ opacity: dislikeOpacity }}
      >
        <span className="hidden sm:inline">НЕ НРАВИТСЯ</span>
        <span className="sm:hidden">❌</span>
      </div>

      {/* Card Content */}
      <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl bg-white">
        <div className="relative w-full h-[470px] sm:h-[400px] md:h-[430px] lg:h-[470px] overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-100 to-gray-50">
          {profile.photos && profile.photos.length > 0 ? (
            <div className="relative w-full h-full">
              <img
                src={profile.photos[currentPhotoIndex]}
                alt={`${profile.name} - фото ${currentPhotoIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
                onLoad={() =>
                  setImageStates((prev) => ({
                    ...prev,
                    [currentPhotoIndex]: "loaded",
                  }))
                }
                onError={() =>
                  setImageStates((prev) => ({
                    ...prev,
                    [currentPhotoIndex]: "error",
                  }))
                }
              />
              {imageStates[currentPhotoIndex] === "error" && (
                <div className="absolute inset-0">
                  <UserAvatarPlaceholder
                    name={profile.name}
                    size="xl"
                    className="w-full h-full rounded-none"
                  />
                </div>
              )}
            </div>
          ) : (
            <UserAvatarPlaceholder
              name={profile.name}
              size="xl"
              className="w-full h-full rounded-none"
            />
          )}

          {/* Photo Navigation Overlay */}
          <div className="absolute inset-0 flex">
            <div
              className="flex-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (currentPhotoIndex > 0) {
                  setCurrentPhotoIndex(currentPhotoIndex - 1);
                }
              }}
            />
            <div
              className="flex-1 cursor-pointer touch-manipulation active:bg-white/5 hover:bg-white/10 transition-colors duration-200 rounded-r-2xl md:rounded-r-3xl"
              onClick={(e) => {
                e.stopPropagation();
                if (currentPhotoIndex < profile.photos.length - 1) {
                  setCurrentPhotoIndex(currentPhotoIndex + 1);
                }
              }}
              style={{
                minHeight: "470px",
                WebkitTapHighlightColor: "transparent",
              }}
            />
          </div>

          {/* Photo Indicators */}
          {profile.photos.length > 1 && (
            <div className="absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 flex space-x-1">
              {profile.photos.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-0.5 md:h-1 rounded-full transition-all duration-300 ${
                    index === currentPhotoIndex ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Online indicator */}
          {profile.isOnline && (
            <div className="absolute top-3 md:top-6 right-3 md:right-6 w-3 md:w-4 h-3 md:h-4 bg-green-500 rounded-full border-2 border-white"></div>
          )}

          {/* Verified badge */}
          {profile.verified && (
            <div className="absolute top-8 md:top-14 right-3 md:right-6 w-5 md:w-6 h-5 md:h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Icon name="Check" size={12} className="md:hidden text-white" />
              <Icon
                name="Check"
                size={14}
                className="hidden md:block text-white"
              />
            </div>
          )}

          {/* Profile info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 pb-16 md:pb-6">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  {profile.name}, {profile.age}
                </h2>
                {profile.isOnline && (
                  <div className="w-2 md:w-3 h-2 md:h-3 bg-green-500 rounded-full"></div>
                )}
              </div>
              <p className="text-white/90 text-sm md:text-lg">
                {profile.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-2 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 md:gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onSwipe("left", profile.id);
          }}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/90 border-2 border-gray-300 hover:bg-white hover:scale-110 transition-all duration-200"
        >
          <Icon name="X" size={18} className="md:hidden text-gray-600" />
          <Icon name="X" size={24} className="hidden md:block text-gray-600" />
        </Button>

        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onSwipe("right", profile.id);
          }}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 hover:scale-110 transition-all duration-200 border-2 border-white/20"
        >
          <Icon name="Heart" size={18} className="md:hidden text-white" />
          <Icon name="Heart" size={24} className="hidden md:block text-white" />
        </Button>
      </div>
    </div>
  );
};

export default SwipeCard;
