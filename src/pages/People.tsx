import React, { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  age: number;
  city: string;
  photo: string;
  isOnline: boolean;
  likes: number;
}

const People: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [displayedUsers, setDisplayedUsers] = useState(6);

  const [users] = useState<User[]>([
    {
      id: 1,
      name: "Екатерина",
      age: 36,
      city: "Екатеринбург",
      photo:
        "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face",
      isOnline: true,
      likes: 2,
    },
    {
      id: 2,
      name: "Алина",
      age: 38,
      city: "Екатеринбург",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      isOnline: false,
      likes: 8,
    },
    {
      id: 3,
      name: "Елизавета",
      age: 36,
      city: "Екатеринбург",
      photo:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
      isOnline: true,
      likes: 2,
    },
    {
      id: 4,
      name: "Мария",
      age: 29,
      city: "Москва",
      photo:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      isOnline: true,
      likes: 5,
    },
    {
      id: 5,
      name: "Анна",
      age: 32,
      city: "Санкт-Петербург",
      photo:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
      isOnline: false,
      likes: 12,
    },
    {
      id: 6,
      name: "София",
      age: 28,
      city: "Новосибирск",
      photo:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
      isOnline: true,
      likes: 7,
    },
  ]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Люди рядом</h1>
          <p className="text-gray-600">Найди того, кто тебе подходит</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.slice(0, displayedUsers).map((user) => (
            <Link
              key={user.id}
              to={`/profile/${user.id}`}
              className="group block"
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                {/* Profile Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Online Status */}
                  {user.isOnline && (
                    <div className="absolute top-3 left-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                  )}

                  {/* Likes Badge */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Icon name="Heart" size={12} className="text-white" />
                    <span className="text-white text-xs font-medium">
                      {user.likes}
                    </span>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* User Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">
                    {user.name}, {user.age}
                  </h3>
                  <p className="text-white/80 text-sm flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    {user.city}
                  </p>
                </div>

                {/* Hover Action */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Icon
                      name="MessageCircle"
                      size={20}
                      className="text-purple-600"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setDisplayedUsers((prev) => prev + 6);
                setCurrentPage((prev) => prev + 1);
                setLoading(false);
              }, 800);
            }}
            disabled={loading || displayedUsers >= users.length}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon
              name={loading ? "Loader2" : "RefreshCw"}
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            {loading
              ? "Загружаем..."
              : displayedUsers >= users.length
                ? "Все загружено"
                : "Показать ещё"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default People;
