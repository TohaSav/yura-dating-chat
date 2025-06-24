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
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden shadow-2xl">
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="w-full h-full object-cover cursor-pointer"
        loop
        playsInline
        onTimeUpdate={handleProgress}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
      />

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white/95 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
            <Icon name="Play" size={32} className="text-black ml-1" />
          </div>
        </div>
      )}

      {/* Controls (показывается при наведении на ПК) */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${showControls || !isPlaying ? "opacity-100" : "opacity-0 md:opacity-0"}`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Progress Bar */}
        <div className="absolute bottom-24 md:bottom-28 left-4 right-24 md:right-28 h-1.5 bg-white/30 rounded-full">
          <div
            className="h-full bg-white rounded-full transition-all duration-100 shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Volume Control */}
        <div className="absolute bottom-28 md:bottom-32 left-4 flex items-center space-x-3">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20 p-2.5 md:p-3 rounded-full backdrop-blur-sm"
            onClick={toggleMute}
          >
            <Icon name={isMuted ? "VolumeX" : "Volume2"} size={18} />
          </Button>
          <span className="text-white/80 text-xs hidden md:block">
            {formatTime(videoRef.current?.currentTime || 0)} /{" "}
            {formatTime(reel.duration)}
          </span>
        </div>
      </div>

      {/* User Info Overlay */}
      <div className="absolute bottom-0 left-0 right-24 md:right-28 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <div className="flex items-center space-x-3 md:space-x-4 mb-3">
          <img
            src={reel.author.photos[0]?.url || "/placeholder.svg"}
            alt={reel.author.name}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white shadow-lg"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-white font-semibold text-base md:text-lg">
                {reel.author.name}
              </span>
              {reel.author.verified && (
                <Icon name="CheckCircle" size={18} className="text-blue-400" />
              )}
            </div>
            <p className="text-white/80 text-sm md:text-base">
              {formatTime(reel.duration)}
            </p>
          </div>
          <Button
            size="sm"
            className="bg-white text-black hover:bg-white/90 px-6 py-2 font-medium text-sm md:text-base"
            onClick={() => onFollow(reel.author.id)}
          >
            Подписаться
          </Button>
        </div>

        {/* Caption */}
        <p className="text-white text-sm md:text-base mb-3 line-clamp-3 leading-relaxed">
          {reel.caption}
        </p>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2">
          {reel.hashtags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-blue-300 text-sm md:text-base hover:text-blue-200 cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Music Info */}
        {reel.music && (
          <div className="flex items-center space-x-2 mt-3 p-2 bg-black/40 rounded-lg backdrop-blur-sm">
            <Icon name="Music" size={16} className="text-white" />
            <span className="text-white text-sm md:text-base truncate">
              {reel.music.name} - {reel.music.artist}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute right-4 md:right-6 bottom-24 md:bottom-28 flex flex-col space-y-6">
        {/* Like */}
        <div className="flex flex-col items-center">
          <Button
            size="sm"
            variant="ghost"
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${reel.isLiked ? "text-red-500 bg-red-500/20" : "text-white bg-black/40"} hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200`}
            onClick={() => onLike(reel.id)}
          >
            <Icon
              name="Heart"
              size={28}
              fill={reel.isLiked ? "currentColor" : "none"}
            />
          </Button>
          <span className="text-white text-sm md:text-base font-medium mt-2">
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
            className="w-14 h-14 md:w-16 md:h-16 rounded-full text-white bg-black/40 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200"
            onClick={() => onComment(reel.id)}
          >
            <Icon name="MessageCircle" size={28} />
          </Button>
          <span className="text-white text-sm md:text-base font-medium mt-2">
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
            className="w-14 h-14 md:w-16 md:h-16 rounded-full text-white bg-black/40 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200"
            onClick={() => onShare(reel.id)}
          >
            <Icon name="Share" size={28} />
          </Button>
          <span className="text-white text-sm md:text-base font-medium mt-2">
            {reel.shares > 999
              ? `${(reel.shares / 1000).toFixed(1)}K`
              : reel.shares}
          </span>
        </div>

        {/* Music Avatar (вращающийся) */}
        {reel.music && (
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white overflow-hidden shadow-lg">
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
