import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";

const Registration = () => {
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    bio: "",
    interests: [] as string[],
  });

  const interests = [
    "Музыка",
    "Путешествия",
    "Спорт",
    "Кино",
    "Книги",
    "Кулинария",
    "Фотография",
    "Танцы",
    "Искусство",
    "Игры",
    "Природа",
    "Мода",
  ];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async () => {
    // Валидация формы
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.age
    ) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    try {
      await register(formData);
      // Автоматически переходим в фид после регистрации
      window.location.href = "/feed";
    } catch (error) {
      alert("Ошибка при регистрации");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
            Создать профиль ✨
          </h1>
          <p className="text-gray-600">Шаг {step} из 3</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ваше имя"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your@email.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="age">Возраст</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                placeholder="25"
                className="mt-2"
              />
            </div>

            <Button
              onClick={nextStep}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500"
            >
              Далее
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="bio">О себе</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Расскажите немного о себе..."
                className="mt-2 min-h-[100px]"
              />
            </div>

            <div>
              <Label>Добавить фото</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <Icon
                  name="Camera"
                  size={48}
                  className="mx-auto text-gray-400 mb-4"
                />
                <p className="text-gray-600">Нажмите для добавления фото</p>
                <p className="text-sm text-gray-400 mt-2">JPG, PNG до 10MB</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={prevStep} className="flex-1">
                Назад
              </Button>
              <Button
                onClick={nextStep}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500"
              >
                Далее
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <Label>Выберите интересы</Label>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`p-3 rounded-full text-sm transition-all ${
                      formData.interests.includes(interest)
                        ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Icon name="MapPin" className="text-purple-600 mr-2" />
                <span className="font-semibold text-purple-800">
                  Разрешить геолокацию
                </span>
              </div>
              <p className="text-sm text-purple-600">
                Это поможет находить людей рядом с вами
              </p>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={prevStep} className="flex-1">
                Назад
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500"
              >
                Создать профиль
              </Button>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Уже есть аккаунт?{" "}
            <Link
              to="/login"
              className="text-purple-600 hover:underline font-semibold"
            >
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
