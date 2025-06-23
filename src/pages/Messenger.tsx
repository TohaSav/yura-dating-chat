import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Messenger = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const chats: any[] = [];

  const EmptyMessengerState = () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <Icon
          name="MessageCircle"
          size={64}
          className="mx-auto text-gray-300 mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          У вас пока нет сообщений
        </h3>
        <p className="text-gray-500">
          Сообщения появятся после знакомства с новыми людьми
        </p>
      </div>
    </div>
  );

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

            <div className="overflow-y-auto h-full">
              {chats.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <Icon
                      name="Users"
                      size={48}
                      className="mx-auto text-gray-300 mb-4"
                    />
                    <p className="text-gray-500">Пока нет чатов</p>
                  </div>
                </div>
              ) : (
                chats.map((chat) => (
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
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {chats.length === 0 ? (
              <EmptyMessengerState />
            ) : (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100"
                        alt="Пользователь"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">Выберите чат</h3>
                        <p className="text-sm text-gray-500">
                          для начала общения
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="text-center py-8">
                    <p className="text-gray-500">Сообщения появятся здесь</p>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Button variant="ghost" size="sm" disabled>
                      <Icon name="Paperclip" size={20} />
                    </Button>
                    <div className="flex-1 flex space-x-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Выберите чат для отправки сообщения..."
                        disabled
                        className="flex-1"
                      />
                    </div>
                    <Button
                      disabled
                      className="bg-gradient-to-r from-purple-600 to-pink-500"
                    >
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messenger;
