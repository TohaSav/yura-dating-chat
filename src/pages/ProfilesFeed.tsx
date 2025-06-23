import Layout from "@/components/Layout";
import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const ProfilesFeed = () => {
  const [showFilters, setShowFilters] = useState(false);

  const profiles = [
    {
      id: 1,
      name: "Анна",
      age: 24,
      bio: "Люблю путешествия, йогу и хорошую музыку 🎵",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      interests: ["Путешествия", "Йога", "Музыка"],
      distance: "2 км от вас",
    },
    {
      id: 2,
      name: "Мария",
      age: 26,
      bio: "Фотограф и любитель кофе ☕ Ищу интересные истории",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      interests: ["Фотография", "Кофе", "Искусство"],
      distance: "5 км от вас",
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Знакомства рядом 💕
          </h1>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Icon name="Filter" size={20} />
            <span>Фильтры</span>
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-purple-100">
            <h3 className="text-lg font-semibold mb-4">Настройки поиска</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Возраст
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="От 18"
                    className="flex-1 p-2 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="До 35"
                    className="flex-1 p-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Расстояние
                </label>
                <select className="w-full p-2 border rounded-lg">
                  <option>До 5 км</option>
                  <option>До 10 км</option>
                  <option>До 25 км</option>
                  <option>Любое</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Интересы
                </label>
                <input
                  type="text"
                  placeholder="Поиск по интересам"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Profiles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>

        {/* Match Notification */}
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in hidden">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎉</span>
            <span className="font-semibold">
              Это взаимность! Вы понравились друг другу
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilesFeed;
