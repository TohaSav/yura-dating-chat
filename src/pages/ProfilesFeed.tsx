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
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const ProfilesFeed = () => {
  const { user } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [genderFilter, setGenderFilter] = useState("both");
  const [showProfiles, setShowProfiles] = useState(true); // Показываем профили сразу

  // Генерируем случайные профили для демонстрации
  const generateRandomProfiles = () => {
    const names = [
      "Анна",
      "Мария",
      "Елена",
      "Дарья",
      "Александра",
      "Иван",
      "Михаил",
      "Дмитрий",
      "Алексей",
      "Николай",
    ];
    const interests = [
      "Путешествия",
      "Спорт",
      "Музика",
      "Кино",
      "Книги",
      "Готовка",
      "Танцы",
      "Фотография",
    ];
    const bios = [
      "Люблю активный отдых и новые впечатления 🌟",
      "В поисках интересного общения и совместных приключений ✨",
      "Ценю искренность и чувство юмора 😊",
      "Обожаю путешествовать и открывать новые места 🌍",
    ];

    const generatePhotos = (baseIndex: number) => {
      const photoCount = Math.floor(Math.random() * 4) + 2; // 2-5 фото
      return Array.from(
        { length: photoCount },
        (_, i) =>
          `https://images.unsplash.com/photo-${1500000000000 + baseIndex + i * 1000}?w=400&h=600&fit=crop&crop=faces`,
      );
    };

    return Array.from({ length: 10 }, (_, i) => ({
      id: `demo-${i}`,
      name: names[Math.floor(Math.random() * names.length)],
      age: Math.floor(Math.random() * 15) + 20, // 20-35 лет
      bio: bios[Math.floor(Math.random() * bios.length)],
      photos: generatePhotos(i),
      interests: interests.slice(0, Math.floor(Math.random() * 4) + 2),
      verified: true, // Показываем только проверенных
      online: Math.random() > 0.3,
      location: "Москва",
    })).filter((profile) => profile.verified && profile.photos.length >= 2); // Фильтр зарегистрированных
  };

  const [profiles, setProfiles] = useState(() => generateRandomProfiles());

  // Обновляем профили при применении фильтров
  const handleSearch = () => {
    setProfiles(generateRandomProfiles());
    setShowProfiles(true);
  };

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
      <div className="max-w-4xl mx-auto px-4 py-4 md:py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Знакомства 💕
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-1 md:space-x-2"
          >
            <Icon name="Filter" size={16} className="md:hidden" />
            <Icon name="Filter" size={20} className="hidden md:block" />
            <span className="hidden sm:inline text-sm md:text-base">
              Фильтры
            </span>
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
            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
              >
                <Icon name="Search" size={20} className="mr-2" />
                Найти
              </Button>
            </div>
          </div>
        )}

        {/* Profiles Grid - показываем только после поиска */}
        {showProfiles && (
          <>
            {/* Swipe Cards Container */}
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mb-4">
              <div
                className="relative w-full"
                style={{
                  height: "calc(100vh - 280px)",
                  minHeight: "400px",
                  maxHeight: "600px",
                }}
              >
                <SwipeStack
                  profiles={profiles}
                  onSwipe={handleSwipe}
                  onEmpty={() => console.log("Все профили просмотрены")}
                />
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center mt-2 text-gray-500 text-xs md:text-sm px-4">
              <p className="hidden md:block">
                Используйте кнопки или свайпы для выбора
              </p>
              <p className="md:hidden">
                Свайпайте карточки или используйте кнопки
              </p>
            </div>
          </>
        )}

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
