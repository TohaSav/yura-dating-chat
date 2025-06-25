import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLiveStream } from "@/contexts/LiveStreamContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import LiveComments from "@/components/LiveComments";
import LiveReactions from "@/components/LiveReactions";

export default function LiveStream() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    currentStream,
    isWatching,
    viewerCount,
    joinStream,
    leaveStream,
    sendReaction,
  } = useLiveStream();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [reactions, setReactions] = useState<
    Array<{ id: string; type: string; x: number; y: number }>
  >([]);

  useEffect(() => {
    if (id && !isWatching) {
      joinStream(id);
    }

    return () => {
      if (isWatching) {
        leaveStream();
      }
    };
  }, [id]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleReaction = (type: string) => {
    sendReaction(type);

    // Добавляем анимированную реакцию
    const newReaction = {
      id: `reaction_${Date.now()}`,
      type,
      x: Math.random() * 80 + 10, // От 10% до 90%
      y: Math.random() * 60 + 20, // От 20% до 80%
    };

    setReactions((prev) => [...prev, newReaction]);

    // Удаляем реакцию через 3 секунды
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 3000);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: currentStream?.title || "Прямой эфир",
        text: `Смотри прямой эфир ${currentStream?.userName}`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      // Показать уведомление о копировании
    }
  };

  if (!currentStream) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Подключение к эфиру...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-black text-white ${isFullscreen ? "fixed inset-0 z-50" : "min-h-screen"} flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>

          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src={currentStream.userAvatar} />
              <AvatarFallback className="bg-purple-500 text-white text-xs">
                {currentStream.userName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">
                  {currentStream.userName}
                </span>
                <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 animate-pulse">
                  LIVE
                </Badge>
              </div>
              <p className="text-white/80 text-xs">{currentStream.title}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-black/50 rounded-full px-3 py-1">
            <Icon name="Eye" size={14} />
            <span className="text-sm font-medium">
              {viewerCount.toLocaleString()}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="text-white hover:bg-white/20"
          >
            <Icon name="Share" size={18} />
          </Button>
        </div>
      </div>

      {/* Video Container */}
      <div className="flex-1 relative">
        {/* Имитация видео стрима */}
        <div className="w-full h-full bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="text-center z-10">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white">
              <AvatarImage src={currentStream.userAvatar} />
              <AvatarFallback className="bg-purple-500 text-white text-2xl">
                {currentStream.userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mb-2">
              {currentStream.userName}
            </h2>
            <p className="text-white/80">{currentStream.title}</p>
          </div>

          {/* Анимированные реакции */}
          {reactions.map((reaction) => (
            <div
              key={reaction.id}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${reaction.x}%`,
                top: `${reaction.y}%`,
                animation: "float 3s ease-out forwards",
              }}
            >
              {reaction.type === "heart" && "❤️"}
              {reaction.type === "laugh" && "😂"}
              {reaction.type === "wow" && "😮"}
              {reaction.type === "fire" && "🔥"}
              {reaction.type === "clap" && "👏"}
            </div>
          ))}
        </div>

        {/* Mobile Controls Overlay */}
        <div className="md:hidden absolute bottom-20 left-4 right-4 flex justify-between items-end">
          <LiveReactions onReaction={handleReaction} />

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/20"
          >
            <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={20} />
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex absolute right-4 top-16 bottom-4 w-80 flex-col gap-4">
        <LiveReactions onReaction={handleReaction} />
        <div className="flex-1">
          <LiveComments />
        </div>
      </div>

      {/* Mobile Comments */}
      <div className="md:hidden flex-shrink-0">
        <LiveComments />
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translateY(-50px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
}
