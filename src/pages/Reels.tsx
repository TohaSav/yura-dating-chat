import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import ReelCard from "@/components/ReelCard";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Reel } from "@/types";

const Reels = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  // Моковые данные
  useEffect(() => {
    const mockReels: Reel[] = [
      {
        id: "1",
        videoUrl:
          "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1494790108755-2616c5e0ec8f?w=400",
        caption: "Красивый закат в горах! 🌅 #природа #горы #закат",
        author: {
          id: "user1",
          name: "Анна Иванова",
          email: "anna@example.com",
          age: 25,
          bio: "Люблю путешествия",
          photos: [
            {
              id: "1",
              url: "https://images.unsplash.com/photo-1494790108755-2616c5e0ec8f?w=100",
              isMain: true,
              uploadedAt: new Date(),
            },
          ],
          interests: ["путешествия"],
          verified: true,
          online: true,
          preferences: {
            ageRange: { min: 20, max: 35 },
            maxDistance: 50,
            lookingFor: "relationship",
          },
          privacy: { showAge: true, showLocation: true, showOnline: true },
          stats: { profileViews: 100, likes: 50, matches: 25 },
          createdAt: new Date(),
        },
        likes: 1234,
        comments: [],
        shares: 89,
        views: 5670,
        duration: 30,
        createdAt: new Date(),
        isLiked: false,
        music: {
          name: "Летняя мелодия",
          artist: "Неизвестный исполнитель",
          coverUrl:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100",
        },
        hashtags: ["природа", "горы", "закат"],
      },
      {
        id: "2",
        videoUrl:
          "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
        caption: "Танцы под любимую музыку 💃 #танцы #музыка #настроение",
        author: {
          id: "user2",
          name: "Мария Петрова",
          email: "maria@example.com",
          age: 23,
          bio: "Танцовщица",
          photos: [
            {
              id: "2",
              url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
              isMain: true,
              uploadedAt: new Date(),
            },
          ],
          interests: ["танцы"],
          verified: false,
          online: true,
          preferences: {
            ageRange: { min: 20, max: 30 },
            maxDistance: 30,
            lookingFor: "friendship",
          },
          privacy: { showAge: true, showLocation: true, showOnline: true },
          stats: { profileViews: 200, likes: 100, matches: 50 },
          createdAt: new Date(),
        },
        likes: 2340,
        comments: [],
        shares: 156,
        views: 8920,
        duration: 45,
        createdAt: new Date(),
        isLiked: true,
        music: {
          name: "Dance Hit",
          artist: "DJ Mix",
          coverUrl:
            "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=100",
        },
        hashtags: ["танцы", "музыка", "настроение"],
      },
    ];

    setTimeout(() => {
      setReels(mockReels);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Навигация
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

  // Touch события для мобильных устройств
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const deltaY = startY.current - currentY.current;
    const threshold = 50;

    if (deltaY > threshold) {
      goToNext();
    } else if (deltaY < -threshold) {
      goToPrevious();
    }
  };

  // Обработчики действий
  const handleLike = (reelId: string) => {
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
  };

  const handleComment = (reelId: string) => {
    console.log("Открыть комментарии для", reelId);
  };

  const handleShare = (reelId: string) => {
    console.log("Поделиться", reelId);
  };

  const handleFollow = (userId: string) => {
    console.log("Подписаться на", userId);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка Reels...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-screen bg-black relative overflow-hidden">
        {/* Reels Container */}
        <div
          ref={containerRef}
          className="h-full w-full max-w-sm mx-auto relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
              style={{ aspectRatio: "9/16" }}
            >
              <ReelCard
                reel={reel}
                isActive={index === currentIndex}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onFollow={handleFollow}
              />
            </div>
          ))}
        </div>

        {/* Desktop Navigation Buttons */}
        <div className="hidden md:block">
          {currentIndex > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 z-10"
              onClick={goToPrevious}
            >
              <Icon name="ChevronUp" size={24} />
            </Button>
          )}

          {currentIndex < reels.length - 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 bottom-20 w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 z-10"
              onClick={goToNext}
            >
              <Icon name="ChevronDown" size={24} />
            </Button>
          )}
        </div>

        {/* Reel Counter */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
          {currentIndex + 1} / {reels.length}
        </div>

        {/* Create Reel Button */}
        <Button
          className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white z-10"
          onClick={() => console.log("Создать Reel")}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Создать
        </Button>
      </div>
    </Layout>
  );
};

export default Reels;
