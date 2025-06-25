import { useState, useRef, useEffect } from "react";
import { useLiveStream } from "@/contexts/LiveStreamContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";

export default function LiveComments() {
  const { comments, sendComment, currentStream } = useLiveStream();
  const [newComment, setNewComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Автопрокрутка к новым комментариям
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  const handleSendComment = () => {
    if (newComment.trim() && currentStream?.allowComments) {
      sendComment(newComment.trim());
      setNewComment("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Mobile Toggle */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-white hover:bg-white/20 justify-between"
        >
          <div className="flex items-center gap-2">
            <Icon name="MessageCircle" size={16} />
            <span>Комментарии ({comments.length})</span>
          </div>
          <Icon name={isExpanded ? "ChevronDown" : "ChevronUp"} size={16} />
        </Button>
      </div>

      {/* Comments Container */}
      <div
        className={`
        ${isExpanded ? "block" : "hidden"} md:block
        bg-black/50 backdrop-blur-sm rounded-lg
        md:bg-white md:backdrop-blur-none
        flex-1 flex flex-col
        md:max-h-96
      `}
      >
        {/* Header */}
        <div className="p-3 border-b border-white/20 md:border-gray-200">
          <h3 className="font-semibold text-white md:text-gray-900 flex items-center gap-2">
            <Icon name="MessageCircle" size={16} />
            Комментарии
          </h3>
        </div>

        {/* Comments List */}
        <ScrollArea className="flex-1 p-3" ref={scrollRef}>
          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start gap-2 animate-fade-in"
              >
                <Avatar className="w-6 h-6 flex-shrink-0">
                  <AvatarImage src={comment.userAvatar} />
                  <AvatarFallback className="bg-purple-500 text-white text-xs">
                    {comment.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-sm text-white md:text-gray-900 truncate">
                      {comment.userName}
                    </span>
                    <span className="text-xs text-white/60 md:text-gray-500 flex-shrink-0">
                      {new Date(comment.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-white/90 md:text-gray-700 break-words">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}

            {comments.length === 0 && (
              <div className="text-center py-8 text-white/60 md:text-gray-500">
                <Icon
                  name="MessageCircle"
                  size={48}
                  className="mx-auto mb-2 opacity-50"
                />
                <p>Пока нет комментариев</p>
                <p className="text-sm">Будьте первым!</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Comment Input */}
        {currentStream?.allowComments && (
          <div className="p-3 border-t border-white/20 md:border-gray-200">
            <div className="flex gap-2">
              <Input
                placeholder="Написать комментарий..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 
                          md:bg-white md:border-gray-300 md:text-gray-900 md:placeholder:text-gray-500"
                maxLength={200}
              />
              <Button
                onClick={handleSendComment}
                disabled={!newComment.trim()}
                size="sm"
                className="bg-purple-500 hover:bg-purple-600 text-white px-3"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
