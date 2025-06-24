import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FullscreenLayout from "@/components/FullscreenLayout";
import ReelPlayer from "@/components/ReelPlayer";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Reel } from "@/types";

const Reels = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const startTouchY = useRef<number>(0);
  const navigate = useNavigate();

  // Mock data
  useEffect(() => {
    const mockReels: Reel[] = [
      {
        id: "1",
        video: {
          id: "v1",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          thumbnail:
            "https://images.unsplash.com/photo-1494790108755-2616c5e0ec8f?w=400",
          duration: 30,
          quality: "720p",
          aspectRatio: "9:16",
        },
        author: {
          id: "u1",
          username: "anna_travel",
          displayName: "Анна Путешествия",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616c5e0ec8f?w=100",
          verified: true,
          subscribersCount: 125000,
          isSubscribed: false,
        },
        title: "Невероятный закат в горах",
        description:
          "Красивый закат в горах Кавказа! Это место просто завораживает своей красотой 🌅",
        hashtags: ["#природа", "#горы", "#закат", "#путешествия"],
        music: {
          id: "m1",
          title: "Mountain Breeze",
          artist: "Nature Sounds",
          url: "",
        },
        interaction: {
          likes: 12340,
          comments: 456,
          shares: 89,
          views: 234567,
          isLiked: false,
          isBookmarked: false,
        },
        createdAt: new Date(),
        isSponsored: false,
      },
      {
        id: "2",
        video: {
          id: "v2",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          thumbnail:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
          duration: 45,
          quality: "1080p",
          aspectRatio: "9:16",
        },
        author: {
          id: "u2",
          username: "dance_maria",
          displayName: "Мария Танцы",
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
          verified: false,
          subscribersCount: 78000,
          isSubscribed: true,
        },
        title: "Танец под любимую музыку",
        description:
          "Новая хореография под хит этого лета! Повторяйте за мной 💃",
        hashtags: ["#танцы", "#музыка", "#хореография", "#тренд"],
        music: {
          id: "m2",
          title: "Summer Hit 2024",
          artist: "DJ Max",
          url: "",
        },
        interaction: {
          likes: 23450,
          comments: 789,
          shares: 156,
          views: 456789,
          isLiked: true,
          isBookmarked: true,
        },
        createdAt: new Date(),
        isSponsored: false,
      },
      {
        id: "3",
        video: {
          id: "v3",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          thumbnail:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
          duration: 60,
          quality: "720p",
          aspectRatio: "9:16",
        },
        author: {
          id: "u3",
          username: "fitness_elena",
          displayName: "Елена Фитнес",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
          verified: true,
          subscribersCount: 89000,
          isSubscribed: false,
        },
        title: "Утренняя тренировка",
        description:
          "Простая, но эффективная тренировка на 10 минут каждое утро! 🏃‍♀️",
        hashtags: ["#фитнес", "#тренировка", "#здоровье", "#утро"],
        interaction: {
          likes: 8900,
          comments: 234,
          shares: 67,
          views: 123456,
          isLiked: false,
          isBookmarked: false,
        },
        createdAt: new Date(),
        isSponsored: false,
      },
    ];

    setTimeout(() => {
      setReels(mockReels);
      setIsLoading(false);
    }, 800);
  }, []);

  // Navigation functions
  const goToNext = useCallback(() => {
    if (currentIndex < reels.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [currentIndex, reels.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [currentIndex, isTransitioning]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startTouchY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const endTouchY = e.changedTouches[0].clientY;
      const diffY = startTouchY.current - endTouchY;

      if (Math.abs(diffY) > 50) {
        if (diffY > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
      }
    },
    [goToNext, goToPrevious],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          goToPrevious();
          break;
        case "ArrowDown":
          e.preventDefault();
          goToNext();
          break;
        case "Escape":
          navigate("/feed");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious, navigate]);

  // Interaction handlers
  const handleLike = useCallback((reelId: string) => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === reelId
          ? {
              ...reel,
              interaction: {
                ...reel.interaction,
                isLiked: !reel.interaction.isLiked,
                likes: reel.interaction.isLiked
                  ? reel.interaction.likes - 1
                  : reel.interaction.likes + 1,
              },
            }
          : reel,
      ),
    );
  }, []);

  const handleBookmark = useCallback((reelId: string) => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === reelId
          ? {
              ...reel,
              interaction: {
                ...reel.interaction,
                isBookmarked: !reel.interaction.isBookmarked,
              },
            }
          : reel,
      ),
    );
  }, []);

  const handleSubscribe = useCallback((authorId: string) => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.author.id === authorId
          ? {
              ...reel,
              author: {
                ...reel.author,
                isSubscribed: !reel.author.isSubscribed,
                subscribersCount: reel.author.isSubscribed
                  ? reel.author.subscribersCount - 1
                  : reel.author.subscribersCount + 1,
              },
            }
          : reel,
      ),
    );
  }, []);

  const handleComment = useCallback((reelId: string) => {
    console.log("Open comments for:", reelId);
  }, []);

  const handleShare = useCallback(
    (reelId: string) => {
      if (navigator.share) {
        navigator.share({
          title: reels[currentIndex]?.title,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
      }
    },
    [reels, currentIndex],
  );

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
      <div
        className="w-full h-screen bg-black relative overflow-hidden safe-area-inset"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-2 sm:p-4 pt-safe-area-inset-top">
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm border border-white/20"
            onClick={() => navigate("/feed")}
          >
            <Icon name="ArrowLeft" size={16} />
          </Button>

          <div className="bg-black/60 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm backdrop-blur-sm border border-white/20">
            {currentIndex + 1} / {reels.length}
          </div>

          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full"
            onClick={() => console.log("Создать Reel")}
          >
            <Icon name="Plus" size={14} className="mr-0.5 sm:mr-1" />
            <span className="hidden xs:inline">Создать</span>
            <span className="xs:hidden">+</span>
          </Button>
        </div>

        {/* Reels Container */}
        <div ref={containerRef} className="h-full w-full relative">
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className={`absolute inset-0 transition-all duration-300 ease-out ${
                index === currentIndex
                  ? "translate-y-0 opacity-100 scale-100"
                  : index < currentIndex
                    ? "-translate-y-full opacity-0 scale-95"
                    : "translate-y-full opacity-0 scale-95"
              }`}
            >
              <ReelPlayer
                reel={reel}
                isActive={index === currentIndex}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onBookmark={handleBookmark}
                onSubscribe={handleSubscribe}
              />
            </div>
          ))}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col space-y-4 z-20">
          {currentIndex > 0 && (
            <Button
              variant="ghost"
              size="lg"
              className="w-12 h-12 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm border border-white/20 transition-all duration-200"
              onClick={goToPrevious}
              disabled={isTransitioning}
            >
              <Icon name="ChevronUp" size={24} />
            </Button>
          )}

          {currentIndex < reels.length - 1 && (
            <Button
              variant="ghost"
              size="lg"
              className="w-12 h-12 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm border border-white/20 transition-all duration-200"
              onClick={goToNext}
              disabled={isTransitioning}
            >
              <Icon name="ChevronDown" size={24} />
            </Button>
          )}
        </div>

        {/* Mobile Swipe Indicators */}
        <div className="lg:hidden absolute left-1/2 -translate-x-1/2 bottom-4 flex space-x-1 z-20">
          {reels.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </FullscreenLayout>
  );
};

export default Reels;
