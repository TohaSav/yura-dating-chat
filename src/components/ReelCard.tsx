import { useState, useRef, useEffect } from "react";
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

interface ReelCardProps {
  reel: SimpleReel;
  isActive: boolean;
  onLike: (reelId: string) => void;
  onComment: (reelId: string) => void;
  onShare: (reelId: string) => void;
}

const ReelCard = ({
  reel,
  isActive,
  onLike,
  onComment,
  onShare,
}: ReelCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current && !videoError) {
      if (isActive) {
        videoRef.current.play().catch(() => {
          console.log("Video play failed");
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, videoError]);

  const togglePlay = () => {
    if (videoRef.current && !videoError) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {
          console.log("Video play failed");
        });
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgress = () => {
    if (videoRef.current && videoRef.current.duration) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    setIsPlaying(false);
  };

  const formatCount = (count: number) => {
    if (count > 999) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Video or Error */}
      {!videoError ? (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.thumbnail}
          className="w-full h-full object-cover cursor-pointer"
          loop
          playsInline
          muted={isMuted}
          onTimeUpdate={handleProgress}
          onError={handleVideoError}
          onClick={togglePlay}
        />
      ) : (
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          <img
            src={reel.thumbnail}
            alt="Превью"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center">
              <Icon
                name="AlertCircle"
                size={48}
                className="text-white mb-4 mx-auto"
              />
              <p className="text-white">Не удалось загрузить видео</p>
            </div>
          </div>
        </div>
      )}

      {/* Play Button Overlay */}
      {!isPlaying && !videoError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
            <Icon name="Play" size={24} className="text-black ml-1" />
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-24 left-4 right-24 h-1 bg-white/30 rounded-full">
        <div
          className="h-full bg-white rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Volume Control */}
      <div className="absolute bottom-28 left-4">
        <Button
          size="sm"
          variant="ghost"
          className="text-white hover:bg-white/20 p-2 rounded-full backdrop-blur-sm"
          onClick={toggleMute}
        >
          <Icon name={isMuted ? "VolumeX" : "Volume2"} size={16} />
        </Button>
      </div>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-24 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={reel.authorAvatar}
            alt={reel.authorName}
            className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-white font-semibold text-base">
                {reel.authorName}
              </span>
              {reel.verified && (
                <Icon name="CheckCircle" size={16} className="text-blue-400" />
              )}
            </div>
          </div>
          <Button
            size="sm"
            className="bg-white text-black hover:bg-white/90 px-4 py-2 font-medium text-sm"
            onClick={() => console.log("Подписаться")}
          >
            Подписаться
          </Button>
        </div>

        <p className="text-white text-sm mb-2 line-clamp-2">{reel.caption}</p>
      </div>

      {/* Action Buttons */}
      <div className="absolute right-4 bottom-28 flex flex-col space-y-6">
        {/* Like */}
        <div className="flex flex-col items-center">
          <Button
            size="sm"
            variant="ghost"
            className={`w-14 h-14 rounded-full ${reel.isLiked ? "text-red-500 bg-red-500/20" : "text-white bg-black/40"} hover:bg-white/20 backdrop-blur-sm border border-white/20`}
            onClick={() => onLike(reel.id)}
          >
            <Icon
              name="Heart"
              size={20}
              fill={reel.isLiked ? "currentColor" : "none"}
            />
          </Button>
          <span className="text-white text-sm font-medium mt-1">
            {formatCount(reel.likes)}
          </span>
        </div>

        {/* Comment */}
        <div className="flex flex-col items-center">
          <Button
            size="sm"
            variant="ghost"
            className="w-14 h-14 rounded-full text-white bg-black/40 hover:bg-white/20 backdrop-blur-sm border border-white/20"
            onClick={() => onComment(reel.id)}
          >
            <Icon name="MessageCircle" size={20} />
          </Button>
          <span className="text-white text-sm font-medium mt-1">
            {formatCount(reel.comments)}
          </span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center">
          <Button
            size="sm"
            variant="ghost"
            className="w-14 h-14 rounded-full text-white bg-black/40 hover:bg-white/20 backdrop-blur-sm border border-white/20"
            onClick={() => onShare(reel.id)}
          >
            <Icon name="Share" size={20} />
          </Button>
          <span className="text-white text-sm font-medium mt-1">
            {formatCount(reel.shares)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReelCard;
