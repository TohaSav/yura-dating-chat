import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  isMine: boolean;
  time: string;
  type: "text" | "voice" | "image";
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          message.isMine
            ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {message.type === "voice" ? (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className={
                message.isMine
                  ? "text-white hover:bg-white/20"
                  : "text-gray-600"
              }
            >
              <Icon name="Play" size={16} />
            </Button>
            <div className="flex-1">
              <div
                className={`h-1 rounded-full ${message.isMine ? "bg-white/30" : "bg-gray-300"}`}
              >
                <div
                  className={`h-1 rounded-full w-1/3 ${message.isMine ? "bg-white" : "bg-purple-500"}`}
                ></div>
              </div>
            </div>
            <span className="text-xs opacity-75">0:15</span>
          </div>
        ) : (
          <p>{message.text}</p>
        )}
        <div
          className={`text-xs mt-1 ${message.isMine ? "text-white/75" : "text-gray-500"}`}
        >
          {message.time}
          {message.isMine && (
            <Icon name="Check" size={12} className="inline ml-1" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
