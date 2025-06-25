import { useState, useRef, useCallback } from "react";
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
      {/* Card Content */}
      <div className="w-full h-full bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col items-center justify-center p-8">
        {/* Profile Photo */}
        <div className="w-32 h-32 mb-6">
          {profile.photos && profile.photos.length > 0 ? (
            <img
              src={profile.photos[0]}
              alt={profile.name}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div
            className={
              profile.photos && profile.photos.length > 0 ? "hidden" : ""
            }
          >
            <UserAvatarPlaceholder
              name={profile.name}
              size="xl"
              className="w-full h-full rounded-full"
            />
          </div>
        </div>

        {/* Name and Age */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">
            {profile.name}, {profile.age}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
