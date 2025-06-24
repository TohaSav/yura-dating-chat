import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Reel } from "@/types";

interface ReelCardProps {
  reel: Reel;
  isActive: boolean;
  onLike: (reelId: string) => void;
  onComment: (reelId: string) => void;
  onShare: (reelId: string) => void;
  onFollow: (userId: string) => void;
}

const ReelCard = ({
  reel,
  isActive,
  onLike,
  onComment,
  onShare,
  onFollow,
}: ReelCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        onTimeUpdate={handleProgress}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
      />

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/20"
          onClick={togglePlay}
        >
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <Icon name="Play" size={24} className="text-black ml-1" />
          </div>
        </div>
      )}

      {/* Controls (показывается при наведении на ПК) */}
      <div
        className={`absolute inset-0 transition-opacity duration-200 ${showControls ? "opacity-100" : "opacity-0"}`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Progress Bar */}
        <div className="absolute bottom-20 left-4 right-20 h-1 bg-white/30 rounded-full">
          <div
            className="h-full bg-white rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Volume Control */}
        <div className="absolute bottom-24 left-4 flex items-center space-x-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20 p-2"
            onClick={toggleMute}
          >
            <Icon name={isMuted ? "VolumeX" : "Volume2"} size={16} />
          </Button>
        </div>
      </div>

      {/* User Info Overlay */}
      <div className="absolute bottom-0 left-0 right-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center space-x-3 mb-2">
          <img
            src={reel.author.photos[0]?.url || "/placeholder.svg"}
            alt={reel.author.name}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-white font-semibold">
                {reel.author.name}
              </span>
              {reel.author.verified && (
                <Icon name="CheckCircle" size={16} className="text-blue-400" />
              )}
            </div>
            <p className="text-white/80 text-sm">{formatTime(reel.duration)}</p>
          </div>
          <Button
            size="sm"
            className="bg-white text-black hover:bg-white/90 px-6"
            onClick={() => onFollow(reel.author.id)}
          >
            Подписаться
          </Button>
        </div>

        {/* Caption */}
        <p className="text-white text-sm mb-2 line-clamp-2">{reel.caption}</p>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1">
          {reel.hashtags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-blue-300 text-sm">
              #{tag}
            </span>
          ))}
        </div>

        {/* Music Info */}
        {reel.music && (
          <div className="flex items-center space-x-2 mt-2">
            <Icon name="Music" size={14} className="text-white" />
            <span className="text-white text-xs truncate">
              {reel.music.name} - {reel.music.artist}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute right-4 bottom-20 flex flex-col space-y-4">
        {/* Like */}
        <div className="flex flex-col items-center">
          <Button
            size="sm"
            variant="ghost"
            className={`w-12 h-12 rounded-full ${reel.isLiked ? "text-red-500" : "text-white"} hover:bg-white/20`}
            onClick={() => onLike(reel.id)}
          >
            <Icon
              name="Heart"
              size={24}
              fill={reel.isLiked ? "currentColor" : "none"}
            />
          </Button>
          <span className="text-white text-xs font-medium mt-1">
            {reel.likes > 999
              ? `${(reel.likes / 1000).toFixed(1)}K`
              : reel.likes}
          </span>
        </div>

        {/* Comment */}
        <div className="flex flex-col items-center">
          <Button
            size="sm"
            variant="ghost"
            className="w-12 h-12 rounded-full text-white hover:bg-white/20"
            onClick={() => onComment(reel.id)}
          >
            <Icon name="MessageCircle" size={24} />
          </Button>
          <span className="text-white text-xs font-medium mt-1">
            {reel.comments.length > 999
              ? `${(reel.comments.length / 1000).toFixed(1)}K`
              : reel.comments.length}
          </span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center">
          <Button
            size="sm"
            variant="ghost"
            className="w-12 h-12 rounded-full text-white hover:bg-white/20"
            onClick={() => onShare(reel.id)}
          >
            <Icon name="Share" size={24} />
          </Button>
          <span className="text-white text-xs font-medium mt-1">
            {reel.shares > 999
              ? `${(reel.shares / 1000).toFixed(1)}K`
              : reel.shares}
          </span>
        </div>

        {/* Music Avatar (вращающийся) */}
        {reel.music && (
          <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
            <img
              src={reel.music.coverUrl}
              alt={reel.music.name}
              className="w-full h-full object-cover animate-spin"
              style={{ animationDuration: "3s" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReelCard;
