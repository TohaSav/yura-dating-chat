import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-600">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-white flex items-center gap-2"
          >
            <Icon name="Heart" size={24} className="text-pink-300" />
            Noumi Dating
          </Link>
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            О нас
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-purple-600 mb-4 flex items-center gap-2">
                <Icon name="Heart" size={24} />
                Наша миссия
              </h2>
              <p>
                Noumi Dating — это современная платформа знакомств, созданная
                для того, чтобы помочь людям найти настоящую любовь и
                долгосрочные отношения. Мы верим, что каждый человек заслуживает
                быть счастливым в любви.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-600 mb-4 flex items-center gap-2">
                <Icon name="Users" size={24} />
                Что нас отличает
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                    <Icon name="Shield" size={20} />
                    Безопасность превыше всего
                  </h3>
                  <p className="text-sm">
                    Все профили проходят модерацию, а ваши данные защищены
                    современными технологиями шифрования.
                  </p>
                </div>
                <div className="bg-pink-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-pink-700 mb-2 flex items-center gap-2">
                    <Icon name="Brain" size={20} />
                    Умный алгоритм подбора
                  </h3>
                  <p className="text-sm">
                    Наша система анализирует совместимость по интересам,
                    ценностям и целям.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-600 mb-4 flex items-center gap-2">
                <Icon name="Target" size={24} />
                Наши принципы
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Icon
                    name="Check"
                    size={20}
                    className="text-green-500 mt-1 flex-shrink-0"
                  />
                  <span>
                    <strong>Честность:</strong> Мы поощряем искренность в
                    профилях и общении
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon
                    name="Check"
                    size={20}
                    className="text-green-500 mt-1 flex-shrink-0"
                  />
                  <span>
                    <strong>Уважение:</strong> Создаем пространство взаимного
                    уважения и понимания
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon
                    name="Check"
                    size={20}
                    className="text-green-500 mt-1 flex-shrink-0"
                  />
                  <span>
                    <strong>Инновации:</strong> Постоянно улучшаем функции для
                    лучшего опыта знакомств
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-600 mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={24} />
                Наши достижения
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    1M+
                  </div>
                  <div className="text-sm text-gray-600">
                    Довольных пользователей
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-rose-100 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-pink-600 mb-2">
                    50K+
                  </div>
                  <div className="text-sm text-gray-600">Успешных пар</div>
                </div>
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    99%
                  </div>
                  <div className="text-sm text-gray-600">Безопасность</div>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-purple-600 mb-4 flex items-center gap-2">
                <Icon name="Mail" size={24} />
                Свяжитесь с нами
              </h2>
              <p className="mb-4">
                У вас есть вопросы или предложения? Мы всегда рады помочь!
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
                  <Icon name="Mail" size={16} className="mr-2" />
                  Написать нам
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Чат поддержки
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
