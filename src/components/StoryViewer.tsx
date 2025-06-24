import { useState, useEffect, useRef } from "react";
import { Story, StoryItem } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
  onStoryDeleted?: () => void;
}

const StoryViewer = ({
  stories,
  initialStoryIndex,
  onClose,
  onStoryDeleted,
}: StoryViewerProps) => {
  const { user, viewStory, deleteStory, deleteStoryItem } = useAuth();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentStory = stories[currentStoryIndex];
  const currentItem = currentStory?.items[currentItemIndex];

  useEffect(() => {
    if (!currentStory || !currentItem) return;

    // Отмечаем как просмотренное
    viewStory(currentStory.id, currentItem.id);

    // Сброс прогресса
    setProgress(0);

    if (isPaused) return;

    // Запуск прогресс-бара
    const duration = currentItem.duration * 1000; // в миллисекундах
    const interval = 50; // обновление каждые 50мс
    const increment = (interval / duration) * 100;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextItem();
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentStoryIndex, currentItemIndex, isPaused]);

  const nextItem = () => {
    if (currentItemIndex < currentStory.items.length - 1) {
      setCurrentItemIndex((prev) => prev + 1);
    } else {
      nextStory();
    }
  };

  const prevItem = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex((prev) => prev - 1);
    } else {
      prevStory();
    }
  };

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setCurrentItemIndex(0);
    } else {
      onClose();
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      setCurrentItemIndex(0);
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickedIndex = Math.floor(
      (clickX / width) * currentStory.items.length,
    );

    if (clickedIndex !== currentItemIndex) {
      setCurrentItemIndex(
        Math.max(0, Math.min(clickedIndex, currentStory.items.length - 1)),
      );
    }
  };

  const handleDeleteStory = () => {
    if (currentStory.userId === user?.id) {
      deleteStory(currentStory.id);
      onStoryDeleted?.();
      onClose();
    }
  };

  const handleDeleteItem = () => {
    if (currentStory.userId === user?.id) {
      deleteStoryItem(currentStory.id, currentItem.id);
      onStoryDeleted?.();

      // Если это был последний элемент, закрываем просмотрщик
      if (currentStory.items.length === 1) {
        onClose();
      }
    }
  };

  if (!currentStory || !currentItem) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-full h-full max-h-screen p-0 border-0 bg-black">
        <div className="relative w-full h-full flex flex-col">
          {/* Progress bars */}
          <div className="absolute top-4 left-4 right-4 z-10 flex space-x-1">
            {currentStory.items.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width:
                      index === currentItemIndex
                        ? `${progress}%`
                        : index < currentItemIndex
                          ? "100%"
                          : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-12 left-4 right-4 z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={currentStory.userAvatar}
                alt={currentStory.userName}
                className="w-8 h-8 rounded-full border border-white/50"
              />
              <div>
                <p className="text-white text-sm font-medium">
                  {currentStory.userName}
                </p>
                <p className="text-white/70 text-xs">
                  {new Date(currentItem.createdAt).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Кнопки удаления для владельца */}
              {currentStory.userId === user?.id && (
                <>
                  <button
                    onClick={handleDeleteItem}
                    className="w-8 h-8 rounded-full bg-red-500/80 flex items-center justify-center"
                    title="Удалить элемент"
                  >
                    <Icon name="Trash2" size={16} className="text-white" />
                  </button>
                  <button
                    onClick={handleDeleteStory}
                    className="w-8 h-8 rounded-full bg-red-600/80 flex items-center justify-center"
                    title="Удалить всю историю"
                  >
                    <Icon name="X" size={16} className="text-white" />
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center"
              >
                <Icon name="X" size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 relative cursor-pointer" onClick={handlePause}>
            {currentItem.type === "image" ? (
              <img
                src={currentItem.url}
                alt="Story"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                src={currentItem.url}
                className="w-full h-full object-cover"
                autoPlay
                muted
                onLoadedData={() => {
                  if (videoRef.current && !isPaused) {
                    videoRef.current.play();
                  }
                }}
              />
            )}

            {/* Pause indicator */}
            {isPaused && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                  <Icon name="Play" size={32} className="text-white ml-1" />
                </div>
              </div>
            )}

            {/* Navigation areas */}
            <div
              className="absolute left-0 top-0 w-1/3 h-full"
              onClick={(e) => {
                e.stopPropagation();
                prevItem();
              }}
            />
            <div
              className="absolute right-0 top-0 w-1/3 h-full"
              onClick={(e) => {
                e.stopPropagation();
                nextItem();
              }}
            />
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="flex items-center space-x-3">
              <button
                onClick={prevStory}
                disabled={currentStoryIndex === 0}
                className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center disabled:opacity-30"
              >
                <Icon name="ChevronLeft" size={20} className="text-white" />
              </button>

              <div className="flex-1 text-center">
                <p className="text-white/70 text-xs">
                  {currentItemIndex + 1} из {currentStory.items.length}
                </p>
              </div>

              <button
                onClick={nextStory}
                disabled={currentStoryIndex === stories.length - 1}
                className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center disabled:opacity-30"
              >
                <Icon name="ChevronRight" size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryViewer;
