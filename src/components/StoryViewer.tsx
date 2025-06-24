import { useState, useEffect, useRef } from "react";
import { Story, StoryItem } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const { user, viewStory, deleteStory, deleteStoryItem, addReaction } =
    useAuth();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showViewers, setShowViewers] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const currentStory = stories[currentStoryIndex];
  const currentItem = currentStory?.items[currentItemIndex];

  const reactions = ["❤️", "😂", "😮", "😢", "😡", "👍"];

  useEffect(() => {
    if (!currentStory || !currentItem) return;

    // Отмечаем как просмотренное
    viewStory(currentStory.id, currentItem.id);

    // Сброс прогресса
    setProgress(0);

    if (isPaused) return;

    // Запуск прогресс-бара
    const duration = currentItem.duration * 1000;
    const interval = 50;
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const deltaX = touchEnd.x - touchStartRef.current.x;
    const deltaY = touchEnd.y - touchStartRef.current.y;

    // Свайп влево/вправо для переключения историй
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevStory();
      } else {
        nextStory();
      }
    }

    // Свайп вверх для реакций
    if (deltaY < -50) {
      setShowReactions(true);
    }

    // Свайп вниз для ответа
    if (deltaY > 50) {
      setShowReply(true);
    }

    touchStartRef.current = null;
  };

  const handleReaction = (reaction: string) => {
    if (currentStory && currentItem) {
      addReaction(currentStory.id, currentItem.id, reaction);
      setShowReactions(false);
    }
  };

  const handleReply = () => {
    if (replyText.trim()) {
      // Логика отправки ответа
      console.log("Reply sent:", replyText);
      setReplyText("");
      setShowReply(false);
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

      if (currentStory.items.length === 1) {
        onClose();
      }
    }
  };

  if (!currentStory || !currentItem) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-full h-full max-h-screen p-0 border-0 bg-black">
        <div
          className="relative w-full h-full flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Progress bars */}
          <div className="absolute top-4 left-4 right-4 z-20 flex space-x-1">
            {currentStory.items.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
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
          <div className="absolute top-12 left-4 right-4 z-20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={currentStory.userAvatar}
                alt={currentStory.userName}
                className="w-10 h-10 rounded-full border-2 border-white/50"
              />
              <div>
                <p className="text-white text-sm font-semibold">
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
              {currentStory.userId === user?.id && (
                <>
                  <button
                    onClick={() => setShowViewers(true)}
                    className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm"
                  >
                    <Icon name="Eye" size={16} className="text-white" />
                  </button>
                  <button
                    onClick={handleDeleteItem}
                    className="w-8 h-8 rounded-full bg-red-500/80 flex items-center justify-center backdrop-blur-sm"
                  >
                    <Icon name="Trash2" size={16} className="text-white" />
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm"
              >
                <Icon name="X" size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 relative" onClick={handlePause}>
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
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                <div className="w-20 h-20 rounded-full bg-black/60 flex items-center justify-center">
                  <Icon name="Play" size={40} className="text-white ml-2" />
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
          <div className="absolute bottom-6 left-4 right-4 z-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowReactions(true)}
                  className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm"
                >
                  <Icon name="Heart" size={20} className="text-white" />
                </button>
                <button
                  onClick={() => setShowReply(true)}
                  className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm"
                >
                  <Icon name="MessageCircle" size={20} className="text-white" />
                </button>
                <button className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
                  <Icon name="Send" size={20} className="text-white" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevStory}
                  disabled={currentStoryIndex === 0}
                  className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center disabled:opacity-30 backdrop-blur-sm"
                >
                  <Icon name="ChevronLeft" size={20} className="text-white" />
                </button>
                <button
                  onClick={nextStory}
                  disabled={currentStoryIndex === stories.length - 1}
                  className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center disabled:opacity-30 backdrop-blur-sm"
                >
                  <Icon name="ChevronRight" size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Reactions overlay */}
          {showReactions && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
              <div className="flex space-x-4 p-6 bg-black/70 rounded-2xl backdrop-blur-md">
                {reactions.map((reaction) => (
                  <button
                    key={reaction}
                    onClick={() => handleReaction(reaction)}
                    className="text-4xl hover:scale-125 transition-transform duration-200"
                  >
                    {reaction}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowReactions(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center"
              >
                <Icon name="X" size={20} className="text-white" />
              </button>
            </div>
          )}

          {/* Reply overlay */}
          {showReply && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 z-30 backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Ответить..."
                  className="flex-1 bg-white/20 text-white placeholder-white/70 px-4 py-2 rounded-full border border-white/30 focus:outline-none focus:border-blue-400"
                  autoFocus
                />
                <Button
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6"
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
              <button
                onClick={() => setShowReply(false)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center"
              >
                <Icon name="X" size={16} className="text-white" />
              </button>
            </div>
          )}

          {/* Viewers overlay */}
          {showViewers && currentStory.userId === user?.id && (
            <div className="absolute inset-0 bg-black/90 z-30 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <h3 className="text-white text-lg font-semibold">Просмотры</h3>
                <button
                  onClick={() => setShowViewers(false)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                >
                  <Icon name="X" size={20} className="text-white" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  {currentItem.viewedBy.map((viewerId) => (
                    <div key={viewerId} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                      <div>
                        <p className="text-white text-sm">
                          Пользователь {viewerId}
                        </p>
                        <p className="text-white/70 text-xs">5 мин назад</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryViewer;
