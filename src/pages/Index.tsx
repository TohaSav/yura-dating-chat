import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const Index = () => {
  const features = [
    {
      icon: "Heart",
      title: "Система лайков и матчинг",
      description:
        "Находите взаимную симпathию и начинайте общение с теми, кто тоже лайкнул вас",
    },
    {
      icon: "Filter",
      title: "Умные фильтры",
      description: "Настройте поиск по возрасту, интересам и другим параметрам",
    },
    {
      icon: "Video",
      title: "Видеозвонки и голосовые",
      description: "Общайтесь голосом и видео, отправляйте аудиосообщения",
    },
    {
      icon: "Shield",
      title: "Верификация и безопасность",
      description:
        "Проверенные профили и полная конфиденциальность ваших данных",
    },
    {
      icon: "MapPin",
      title: "Геолокация",
      description: "Знакомьтесь с людьми рядом с вами или в любой точке мира",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold text-white">💕 Сердца</div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Войти
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-white text-purple-600 hover:bg-gray-100">
                Регистрация
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Найди свою ❤️ половинку
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 animate-fade-in">
            Знакомства нового поколения. Безопасно, весело, эффективно.
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center animate-fade-in">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 w-full md:w-auto"
              >
                Начать знакомства 🚀
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 w-full md:w-auto"
              >
                У меня есть аккаунт
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Почему выбирают нас?
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 py-16 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-lg opacity-90">Активных пользователей</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500K+</div>
              <div className="text-lg opacity-90">Успешных матчей</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-lg opacity-90">Счастливых пар</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Готовы к знакомствам?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Присоединяйтесь к миллионам людей, которые уже нашли свою любовь
          </p>
          <Link to="/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-lg px-12 py-4"
            >
              Создать профиль бесплатно ✨
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
