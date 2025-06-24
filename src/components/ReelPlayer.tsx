import { useState, useRef, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Reel } from "@/types";

interface ReelPlayerProps {
  reel: Reel;
  isActive: boolean;
  onLike: (reelId: string) => void;
  onComment: (reelId: string) => void;
  onShare: (reelId: string) => void;
  onBookmark: (reelId: string) => void;
  onSubscribe: (authorId: string) => void;
}

const ReelPlayer = ({
  reel,
  isActive,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onSubscribe,
}: ReelPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [videoError, setVideoError] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const hideControlsTimeout = useRef<NodeJS.Timeout>();

  // Auto play/pause based on isActive
  useEffect(() => {
    if (videoRef.current && !videoError) {
      if (isActive) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {
              console.log("Auto play failed");
              setIsPlaying(false);
            });
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, videoError]);

  // Reset controls timeout
  const resetControlsTimeout = useCallback(() => {
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    setShowControls(true);
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (videoRef.current && !videoError) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => console.log("Play failed"));
        }
      }
    }
    resetControlsTimeout();
  }, [isPlaying, videoError, resetControlsTimeout]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  }, [isMuted]);

  // Set volume
  const handleVolumeChange = useCallback((newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  }, []);

  // Seek video
  const handleSeek = useCallback(
    (seekTime: number) => {
      if (videoRef.current && duration > 0) {
        videoRef.current.currentTime = (seekTime / 100) * duration;
      }
    },
    [duration],
  );

  // Video event handlers
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && duration > 0) {
      const current = videoRef.current.currentTime;
      setCurrentTime(current);
      setProgress((current / duration) * 100);
    }
  };

  const handleWaiting = () => setIsBuffering(true);
  const handleCanPlay = () => setIsBuffering(false);
  const handleError = () => {
    setVideoError(true);
    setIsPlaying(false);
    setIsBuffering(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Format count
  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // Handle click on video
  const handleVideoClick = () => {
    togglePlay();
  };

  // Handle mouse move for controls
  const handleMouseMove = () => {
    resetControlsTimeout();
  };

  return (
    <div
      className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Video Container with 9:16 aspect ratio */}
      <div className="relative w-full max-w-sm mx-auto h-full flex items-center justify-center">
        {/* Video or Error */}
        {!videoError ? (
          <video
            ref={videoRef}
            src={reel.video.videoUrl}
            poster={reel.video.thumbnail}
            className="w-full h-full max-h-screen object-cover cursor-pointer"
            style={{ aspectRatio: "9/16" }}
            loop
            playsInline
            muted={isMuted}
            volume={volume}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onWaiting={handleWaiting}
            onCanPlay={handleCanPlay}
            onError={handleError}
            onEnded={handleEnded}
            onClick={handleVideoClick}
          />
        ) : (
          <div
            className="w-full h-full bg-gray-900 flex items-center justify-center"
            style={{ aspectRatio: "9/16" }}
          >
            <img
              src={reel.video.thumbnail}
              alt="Превью"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center px-4">
                <Icon
                  name="AlertCircle"
                  size={32}
                  className="text-white mb-2 mx-auto"
                />
                <p className="text-white text-sm">Не удалось загрузить видео</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white mt-2 text-xs"
                  onClick={() => {
                    setVideoError(false);
                    if (videoRef.current) {
                      videoRef.current.load();
                    }
                  }}
                >
                  Попробовать снова
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Buffering Indicator */}
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Play Button Overlay */}
        {!isPlaying && !videoError && !isBuffering && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
            onClick={togglePlay}
          >
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm hover:bg-white transition-all duration-200">
              <Icon name="Play" size={24} className="text-black ml-1" />
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="absolute bottom-24 sm:bottom-32 left-2 right-16 sm:left-4 sm:right-20 z-10">
          <div
            className="h-0.5 sm:h-1 bg-white/30 rounded-full cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = (clickX / rect.width) * 100;
              handleSeek(percentage);
            }}
          >
            <div
              className="h-full bg-white rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/80 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div
          className={`absolute bottom-28 sm:bottom-36 left-2 sm:left-4 transition-opacity duration-300 ${showControls || !isPlaying ? "opacity-100" : "opacity-0"}`}
        >
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-full backdrop-blur-sm"
            onClick={toggleMute}
          >
            <Icon
              name={isMuted ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"}
              size={16}
            />
          </Button>
        </div>

        {/* Author Info */}
        <div className="absolute bottom-0 left-0 right-20 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={reel.author.avatar}
              alt={reel.author.displayName}
              className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-white font-semibold text-base">
                  {reel.author.displayName}
                </span>
                {reel.author.verified && (
                  <Icon
                    name="CheckCircle"
                    size={16}
                    className="text-blue-400"
                  />
                )}
              </div>
              <p className="text-white/70 text-sm">@{reel.author.username}</p>
            </div>
            {!reel.author.isSubscribed && (
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-medium text-sm rounded-full"
                onClick={() => onSubscribe(reel.author.id)}
              >
                Подписаться
              </Button>
            )}
          </div>

          <p className="text-white text-sm mb-2 line-clamp-2">
            {reel.description}
          </p>

          {reel.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {reel.hashtags.map((tag, index) => (
                <span key={index} className="text-blue-400 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {reel.music && (
            <div className="flex items-center space-x-2 text-white/80 text-sm">
              <Icon name="Music" size={14} />
              <span>
                {reel.music.title} • {reel.music.artist}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute right-4 bottom-32 flex flex-col space-y-6 z-10">
          {/* Like */}
          <div className="flex flex-col items-center">
            <Button
              size="sm"
              variant="ghost"
              className={`w-14 h-14 rounded-full transition-all duration-200 ${
                reel.interaction.isLiked
                  ? "text-red-500 bg-red-500/20 hover:bg-red-500/30"
                  : "text-white bg-black/40 hover:bg-white/20"
              } backdrop-blur-sm border border-white/20`}
              onClick={() => onLike(reel.id)}
            >
              <Icon
                name="Heart"
                size={20}
                fill={reel.interaction.isLiked ? "currentColor" : "none"}
              />
            </Button>
            <span className="text-white text-xs font-medium mt-1">
              {formatCount(reel.interaction.likes)}
            </span>
          </div>

          {/* Comment */}
          <div className="flex flex-col items-center">
            <Button
              size="sm"
              variant="ghost"
              className="w-14 h-14 rounded-full text-white bg-black/40 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200"
              onClick={() => onComment(reel.id)}
            >
              <Icon name="MessageCircle" size={20} />
            </Button>
            <span className="text-white text-xs font-medium mt-1">
              {formatCount(reel.interaction.comments)}
            </span>
          </div>

          {/* Bookmark */}
          <div className="flex flex-col items-center">
            <Button
              size="sm"
              variant="ghost"
              className={`w-14 h-14 rounded-full transition-all duration-200 ${
                reel.interaction.isBookmarked
                  ? "text-yellow-500 bg-yellow-500/20 hover:bg-yellow-500/30"
                  : "text-white bg-black/40 hover:bg-white/20"
              } backdrop-blur-sm border border-white/20`}
              onClick={() => onBookmark(reel.id)}
            >
              <Icon
                name="Bookmark"
                size={20}
                fill={reel.interaction.isBookmarked ? "currentColor" : "none"}
              />
            </Button>
          </div>

          {/* Share */}
          <div className="flex flex-col items-center">
            <Button
              size="sm"
              variant="ghost"
              className="w-14 h-14 rounded-full text-white bg-black/40 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200"
              onClick={() => onShare(reel.id)}
            >
              <Icon name="Share" size={20} />
            </Button>
            <span className="text-white text-xs font-medium mt-1">
              {formatCount(reel.interaction.shares)}
            </span>
          </div>
        </div>

        {/* Views Counter */}
        <div className="absolute top-16 sm:top-20 right-1 sm:right-4 bg-black/60 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs backdrop-blur-sm border border-white/20">
          <Icon name="Eye" size={10} className="inline mr-1" />
          {formatCount(reel.interaction.views)}
        </div>
      </div>
    </div>
  );
};

export default ReelPlayer;
