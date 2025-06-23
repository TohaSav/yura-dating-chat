import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "match",
      title: "Новый матч! 🎉",
      message: "Вы понравились друг другу с Анной",
      time: "2 минуты назад",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
      unread: true,
    },
    {
      id: 2,
      type: "message",
      title: "Новое сообщение",
      message: "Мария: Привет! Как дела?",
      time: "1 час назад",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      unread: true,
    },
    {
      id: 3,
      type: "like",
      title: "Кто-то лайкнул ваш профиль ❤️",
      message: "У вас новый поклонник! Посмотрите кто это",
      time: "3 часа назад",
      avatar: null,
      unread: false,
    },
    {
      id: 4,
      type: "super-like",
      title: "Супер-лайк! ⭐",
      message: "Екатерина поставила вам супер-лайк",
      time: "5 часов назад",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      unread: false,
    },
    {
      id: 5,
      type: "view",
      title: "Просмотр профиля",
      message: "Ваш профиль посмотрели 12 человек сегодня",
      time: "6 часов назад",
      avatar: null,
      unread: false,
    },
  ]);

  const handleDeleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "match":
        return "Heart";
      case "message":
        return "MessageCircle";
      case "like":
        return "Heart";
      case "super-like":
        return "Star";
      case "view":
        return "Eye";
      default:
        return "Bell";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "match":
        return "text-pink-500 bg-pink-100";
      case "message":
        return "text-blue-500 bg-blue-100";
      case "like":
        return "text-red-500 bg-red-100";
      case "super-like":
        return "text-yellow-500 bg-yellow-100";
      case "view":
        return "text-purple-500 bg-purple-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Уведомления 🔔
          </h1>
          <Button variant="outline" size="sm">
            Отметить все как прочитанные
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl ${
                notification.unread ? "border-l-4 border-purple-500" : ""
              }`}
            >
              <div className="flex items-start space-x-4">
                {notification.avatar ? (
                  <img
                    src={notification.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}
                  >
                    <Icon
                      name={getNotificationIcon(notification.type)}
                      size={20}
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className={`font-semibold ${notification.unread ? "text-purple-700" : "text-gray-900"}`}
                      >
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <span className="text-sm text-gray-500 mt-2 block">
                        {notification.time}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {notification.unread && (
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Icon name="MoreVertical" size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              handleDeleteNotification(notification.id)
                            }
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Icon name="Trash2" size={16} className="mr-2" />
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>

              {(notification.type === "match" ||
                notification.type === "super-like") && (
                <div className="mt-4 flex space-x-3">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-500"
                  >
                    Написать сообщение
                  </Button>
                  <Button variant="outline" size="sm">
                    Посмотреть профиль
                  </Button>
                </div>
              )}

              {notification.type === "like" && (
                <div className="mt-4">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-500"
                  >
                    Узнать кто лайкнул
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Bell" size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Уведомлений пока нет
            </h3>
            <p className="text-gray-500">
              Здесь будут появляться ваши матчи, сообщения и лайки
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Notifications;
