import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FullscreenLayout from "@/components/FullscreenLayout";
import ReelCard from "@/components/ReelCard";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface SimpleReel {
  id: string;
  videoUrl: string;
  thumbnail: string;
  caption: string;
  authorName: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  verified: boolean;
}

const Reels = () => {
  const [reels, setReels] = useState<SimpleReel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const mockReels: SimpleReel[] = [
        {
          id: "1",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          thumbnail:
            "https://images.unsplash.com/photo-1494790108755-2616c5e0ec8f?w=400",
          caption: "Красивый закат в горах! 🌅 #природа #горы #закат",
          authorName: "Анна Иванова",
          authorAvatar:
            "https://images.unsplash.com/photo-1494790108755-2616c5e0ec8f?w=100",
          likes: 1234,
          comments: 45,
          shares: 89,
          isLiked: false,
          verified: true,
        },
        {
          id: "2",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          thumbnail:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
          caption: "Танцы под любимую музыку 💃 #танцы #музыка #настроение",
          authorName: "Мария Петрова",
          authorAvatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
          likes: 2340,
          comments: 89,
          shares: 156,
          isLiked: true,
          verified: false,
        },
        {
          id: "3",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          thumbnail:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
          caption: "Утренняя пробежка в парке 🏃‍♀️ #спорт #здоровье #утро",
          authorName: "Елена Смирнова",
          authorAvatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
          likes: 890,
          comments: 23,
          shares: 34,
          isLiked: false,
          verified: true,
        },
      ];

      setTimeout(() => {
        setReels(mockReels);
        setIsLoading(false);
      }, 800);
    } catch (err) {
      console.error("Error loading reels:", err);
      setError("Ошибка загрузки Reels");
      setIsLoading(false);
    }
  }, []);

  const goToNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleLike = (reelId: string) => {
    try {
      setReels(
        reels.map((reel) =>
          reel.id === reelId
            ? {
                ...reel,
                isLiked: !reel.isLiked,
                likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1,
              }
            : reel,
        ),
      );
    } catch (err) {
      console.error("Error handling like:", err);
    }
  };

  const handleComment = (reelId: string) => {
    console.log("Открыть комментарии для", reelId);
  };

  const handleShare = (reelId: string) => {
    console.log("Поделиться", reelId);
  };

  if (error) {
    return (
      <FullscreenLayout>
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <Icon
              name="AlertCircle"
              size={48}
              className="text-red-500 mx-auto mb-4"
            />
            <p className="text-white text-lg mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Попробовать снова
            </Button>
          </div>
        </div>
      </FullscreenLayout>
    );
  }

  if (isLoading) {
    return (
      <FullscreenLayout>
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Загрузка Reels...</p>
          </div>
        </div>
      </FullscreenLayout>
    );
  }

  if (reels.length === 0) {
    return (
      <FullscreenLayout>
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <Icon
              name="Video"
              size={48}
              className="text-gray-500 mx-auto mb-4"
            />
            <p className="text-white text-lg">Нет доступных Reels</p>
          </div>
        </div>
      </FullscreenLayout>
    );
  }

  return (
    <FullscreenLayout>
      <div className="w-full h-screen bg-black relative overflow-hidden">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4 z-30 w-12 h-12 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm border border-white/20"
          onClick={() => navigate("/feed")}
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>

        {/* Counter */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm z-20 backdrop-blur-sm border border-white/20">
          {currentIndex + 1} / {reels.length}
        </div>

        {/* Create Button */}
        <Button
          className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white z-20 px-6 py-2 text-sm font-medium"
          onClick={() => console.log("Создать Reel")}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Создать
        </Button>

        {/* Reels Container */}
        <div ref={containerRef} className="h-full w-full relative">
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className={`absolute inset-0 transition-transform duration-300 ${
                index === currentIndex
                  ? "translate-y-0 opacity-100"
                  : index < currentIndex
                    ? "-translate-y-full opacity-0"
                    : "translate-y-full opacity-0"
              }`}
            >
              <ReelCard
                reel={reel}
                isActive={index === currentIndex}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col space-y-4 z-20">
          {currentIndex > 0 && (
            <Button
              variant="ghost"
              size="lg"
              className="w-12 h-12 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm border border-white/20"
              onClick={goToPrevious}
            >
              <Icon name="ChevronUp" size={24} />
            </Button>
          )}

          {currentIndex < reels.length - 1 && (
            <Button
              variant="ghost"
              size="lg"
              className="w-12 h-12 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm border border-white/20"
              onClick={goToNext}
            >
              <Icon name="ChevronDown" size={24} />
            </Button>
          )}
        </div>
      </div>
    </FullscreenLayout>
  );
};

export default Reels;
