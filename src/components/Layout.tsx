import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/feed", icon: "Heart", label: "Поиск" },
    { path: "/messages", icon: "MessageCircle", label: "Чаты" },
    { path: "/notifications", icon: "Bell", label: "Уведомления" },
    { path: "/profile", icon: "User", label: "Профиль" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
            >
              💕 Сердца
            </Link>

            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                    location.pathname === item.path
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
              <Link
                to="/settings"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
              >
                <Icon name="Settings" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pb-20 md:pb-8">{children}</main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-purple-100">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? "text-purple-700 bg-purple-100"
                  : "text-gray-600"
              }`}
            >
              <Icon name={item.icon} size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
