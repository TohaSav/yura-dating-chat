import Layout from "@/components/Layout";
import ChatMessage from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Messenger = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const chats = [
    {
      id: 1,
      name: "Анна",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
      lastMessage: "Привет! Как дела? 😊",
      time: "2 мин",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Мария",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      lastMessage: "Увидимся завтра?",
      time: "1 час",
      unread: 0,
      online: false,
    },
  ];

  const messages = [
    {
      id: 1,
      text: "Привет! Классные фото у тебя в профиле 📸",
      isMine: false,
      time: "14:20",
      type: "text",
    },
    {
      id: 2,
      text: "Спасibo! А ты где такие красивые места находишь?",
      isMine: true,
      time: "14:22",
      type: "text",
    },
    {
      id: 3,
      text: "🎵 Голосовое сообщение (0:15)",
      isMine: false,
      time: "14:25",
      type: "voice",
    },
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)]">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex">
          {/* Chat List */}
          <div className="w-1/3 border-r border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Сообщения 💬
              </h2>
            </div>

            <div className="overflow-y-auto">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedChat === chat.id
                      ? "bg-purple-50 border-r-4 border-purple-500"
                      : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {chat.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {chat.time}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600 truncate">
                          {chat.lastMessage}
                        </p>
                        {chat.unread > 0 && (
                          <span className="bg-purple-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100"
                    alt="Анна"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">Анна</h3>
                    <p className="text-sm text-green-600">в сети</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Phone" size={20} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Video" size={20} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="MoreVertical" size={20} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  <Icon name="Paperclip" size={20} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Camera" size={20} />
                </Button>
                <div className="flex-1 flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Напишите сообщение..."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm">
                    <Icon name="Mic" size={20} />
                  </Button>
                </div>
                <Button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-purple-600 to-pink-500"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messenger;
