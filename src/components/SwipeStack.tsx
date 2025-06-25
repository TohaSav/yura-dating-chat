import { useState, useEffect } from "react";
import SwipeCard from "./SwipeCard";
import EmptyState from "./EmptyState";
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

interface SwipeStackProps {
  profiles: SwipeProfile[];
  onSwipe: (direction: "left" | "right", profileId: string) => void;
  onEmpty?: () => void;
}

const SwipeStack = ({ profiles, onSwipe, onEmpty }: SwipeStackProps) => {
  const [currentProfiles, setCurrentProfiles] = useState(profiles);
  const [swipedProfiles, setSwipedProfiles] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCurrentProfiles(profiles);
    setSwipedProfiles(new Set());
  }, [profiles]);

  const handleSwipe = (direction: "left" | "right", profileId: string) => {
    setSwipedProfiles((prev) => new Set([...prev, profileId]));
    onSwipe(direction, profileId);

    // Check if all profiles have been swiped
    setTimeout(() => {
      if (swipedProfiles.size + 1 >= profiles.length && onEmpty) {
        onEmpty();
      }
    }, 300);
  };

  const handleButtonSwipe = (direction: "left" | "right") => {
    const visibleProfiles = currentProfiles.filter(
      (profile) => !swipedProfiles.has(profile.id),
    );

    if (visibleProfiles.length > 0) {
      handleSwipe(direction, visibleProfiles[0].id);
    }
  };

  const visibleProfiles = currentProfiles.filter(
    (profile) => !swipedProfiles.has(profile.id),
  );
  const maxVisible = 3;

  if (profiles.length === 0) {
    return (
      <EmptyState
        title="Пока никого нет"
        description="Станьте первым в вашем регионе! Скоро здесь появятся новые анкеты"
        icon="Heart"
      />
    );
  }

  if (visibleProfiles.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            Вы посмотрели всех!
          </h3>
          <p className="text-gray-500">Скоро появятся новые анкеты</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Swipe Cards */}
      <div className="absolute inset-0 pb-24">
        {visibleProfiles.slice(0, maxVisible).map((profile, index) => {
          const isTop = index === 0;
          const zIndex = maxVisible - index;
          const scale = 1 - index * 0.05;
          const translateY = index * 8;

          return (
            <SwipeCard
              key={profile.id}
              profile={profile}
              onSwipe={isTop ? handleSwipe : () => {}}
              style={{
                zIndex,
                transform: `scale(${scale}) translateY(${translateY}px)`,
                pointerEvents: isTop ? "auto" : "none",
              }}
            />
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6 z-20">
        <button
          onClick={() => handleButtonSwipe("left")}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-red-200 hover:border-red-300 transition-colors"
        >
          <Icon name="X" size={24} className="text-red-500" />
        </button>

        <button
          onClick={() => handleButtonSwipe("right")}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-green-200 hover:border-green-300 transition-colors"
        >
          <Icon name="Heart" size={24} className="text-green-500" />
        </button>
      </div>
    </div>
  );
};

export default SwipeStack;
