import Layout from "@/components/Layout";
import SwipeStack from "@/components/SwipeStack";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const ProfilesFeed = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [genderFilter, setGenderFilter] = useState("");

  // Пока нет других зарегистрированных пользователей, показываем пустое состояние
  const profiles: any[] = [];

  const handleSwipe = (direction: "left" | "right", profileId: string) => {
    const action = direction === "right" ? "лайк" : "пропуск";
    console.log(`${action} для профиля ${profileId}`);

    // Show match notification for demo (20% chance)
    if (direction === "right" && Math.random() < 0.2) {
      showMatchNotification();
    }
  };

  const showMatchNotification = () => {
    const notification = document.querySelector(".match-notification");
    if (notification) {
      notification.classList.remove("hidden");
      setTimeout(() => {
        notification.classList.add("hidden");
      }, 3000);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-4 md:py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Знакомства 💕
          </h1>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Icon name="Filter" size={20} />
            <span className="hidden sm:inline">Фильтры</span>
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl p-4 md:p-6 mb-6 shadow-lg border border-purple-100">
            <h3 className="text-lg font-semibold mb-4">Настройки поиска</h3>
            <div className="grid md:grid-cols-4 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Кого хотите найти
                </label>
                <Select value={genderFilter} onValueChange={setGenderFilter}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Выберите пол" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Мужчина</SelectItem>
                    <SelectItem value="female">Женщина</SelectItem>
                    <SelectItem value="both">Мужчина и Женщина</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Возраст
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="От 18"
                    className="flex-1 p-2 border rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    placeholder="До 35"
                    className="flex-1 p-2 border rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Расстояние
                </label>
                <select className="w-full p-2 border rounded-lg text-sm">
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
                  className="w-full p-2 border rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Swipe Cards Container */}
        <div
          className="relative w-full max-w-sm mx-auto"
          style={{ height: "70vh", minHeight: "500px", maxHeight: "700px" }}
        >
          <SwipeStack
            profiles={profiles}
            onSwipe={handleSwipe}
            onEmpty={() => console.log("Все профили просмотрены")}
          />
        </div>

        {/* Instructions */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p className="hidden md:block">
            Перетаскивайте карточки или используйте кнопки
          </p>
          <p className="md:hidden">Свайпайте карточки влево или вправо</p>
        </div>

        {/* Match Notification */}
        <div className="match-notification fixed top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in hidden">
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
