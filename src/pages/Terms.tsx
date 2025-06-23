import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Terms = () => {
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
            Условия использования
          </h1>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Общие положения
              </h2>
              <p className="leading-relaxed">
                Настоящие Условия использования регулируют отношения между
                пользователями и сервисом Noumi Dating. Используя наш сервис, вы
                соглашаетесь с данными условиями.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Требования к пользователям
              </h2>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li>Возраст пользователя должен составлять не менее 18 лет</li>
                <li>Запрещается создание фальшивых профилей</li>
                <li>
                  Использование актуальных и достоверных данных обязательно
                </li>
                <li>
                  Один пользователь может иметь только один активный аккаунт
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Правила поведения
              </h2>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li>Уважительное отношение к другим пользователям</li>
                <li>Запрет на публикацию неприемлемого контента</li>
                <li>Недопустимость спама и рекламы</li>
                <li>Запрет на домогательства и угрозы</li>
                <li>Соблюдение авторских прав при загрузке фотографий</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Безопасность
              </h2>
              <p className="leading-relaxed mb-4">
                Мы принимаем меры для обеспечения безопасности пользователей, но
                рекомендуем:
              </p>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li>Не передавать личную финансовую информацию</li>
                <li>Встречаться в общественных местах</li>
                <li>Сообщать о подозрительной активности</li>
                <li>Доверять своей интуиции</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Ответственность
              </h2>
              <p className="leading-relaxed">
                Сервис не несет ответственности за действия пользователей вне
                платформы. Пользователи несут полную ответственность за свое
                поведение и безопасность.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Модерация
              </h2>
              <p className="leading-relaxed">
                Мы оставляем за собой право модерировать контент, блокировать
                аккаунты при нарушении правил и удалять неподходящие материалы
                без предупреждения.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Изменения условий
              </h2>
              <p className="leading-relaxed">
                Условия могут изменяться. Пользователи будут уведомлены о
                существенных изменениях. Продолжение использования сервиса
                означает согласие с новыми условиями.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Контактная информация
              </h2>
              <p className="leading-relaxed">
                По вопросам условий использования обращайтесь в службу поддержки
                через приложение или на электронную почту
                support@noumidating.com
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Link to="/">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Вернуться на главную
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;
