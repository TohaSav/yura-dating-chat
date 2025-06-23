import Layout from "@/components/Layout";
import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const ProfilesFeed = () => {
  const [showFilters, setShowFilters] = useState(false);

  const profiles: any[] = [];

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="mb-8">
        <Icon name="Users" size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">
          Пока здесь никого нет
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Станьте одним из первых пользователей! Пригласите друзей или дождитесь
          новых участников
        </p>
      </div>
      <Button className="bg-gradient-to-r from-purple-600 to-pink-500">
        <Icon name="UserPlus" size={20} className="mr-2" />
        Пригласить друзей
      </Button>
    </div>
  );

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
        <div className="min-h-[400px]">
          {profiles.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          )}
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
