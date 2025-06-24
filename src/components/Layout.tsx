import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    {
      path: "/feed",
      icon: "Search",
      label: "Поиск",
      activeIcon: "Search",
    },
    {
      path: "/chats",
      icon: "MessageCircle",
      label: "Чаты",
      activeIcon: "MessageCircle",
    },
    {
      path: "/roulette",
      icon: "Shuffle",
      label: "Рулетка",
      activeIcon: "Shuffle",
    },
    {
      path: "/notifications",
      icon: "Bell",
      label: "Уведомления",
      activeIcon: "Bell",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Desktop Header */}
      <nav className="bg-white/95 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent flex items-center gap-2"
            >
              <Icon name="Heart" size={24} className="text-pink-500" />
              Noumi Dating
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              <div className="ml-4 pl-4 border-l border-gray-200">
                <Link
                  to="/settings"
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
                >
                  <Icon name="Settings" size={20} />
                </Link>
              </div>
            </div>

            {/* User Avatar */}
            <div className="flex items-center space-x-3">
              {user?.verified && (
                <div className="hidden md:flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-sm">
                  <Icon name="CheckCircle" size={16} className="mr-1" />
                  Verified
                </div>
              )}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <Icon name="User" size={16} className="text-white" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg border py-2 w-48 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium">
                        {user?.name || "Пользователь"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                      >
                        <Icon name="User" size={16} className="mr-2" />
                        Профиль
                      </button>
                      <button
                        onClick={() => {
                          navigate("/settings");
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                      >
                        <Icon name="Settings" size={16} className="mr-2" />
                        Настройки
                      </button>
                      <button
                        onClick={() => setShowProfileMenu(false)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center text-red-600"
                      >
                        <Icon name="LogOut" size={16} className="mr-2" />
                        Выйти
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-20 md:pb-8 min-h-[calc(100vh-4rem)]">{children}</main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-purple-100 shadow-lg">
        <div className="flex justify-around py-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                location.pathname === item.path
                  ? "text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-md"
                  : "text-gray-600"
              }`}
            >
              <Icon name={item.icon} size={24} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
