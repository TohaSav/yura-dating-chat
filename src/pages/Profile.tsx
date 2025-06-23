import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import ProfileEditDialog from "@/components/ProfileEditDialog";

export default function Profile() {
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const { user } = useAuth();

  // Проверяем, смотрит ли пользователь свой собственный профиль
  const isOwnProfile = true; // В данном случае это всегда собственный профиль

  // Мок данные для демонстрации
  const profileData = {
    name: user?.name || "Анна",
    age: 27,
    photos: [], // Убираем все захардкоженные фото - будут только загруженные пользователем
    bio: "Люблю путешествовать, открывать новые места и знакомиться с интересными людьми. В свободное время читаю книги, хожу в театры и занимаюсь йогой 🧘‍♀️",
    location: "Москва",
    education: "МГУ, Факультет журналистики",
    work: "Маркетинг-менеджер в IT",
    height: "165 см",
    interests: [
      "Путешествия",
      "Йога",
      "Театр",
      "Фотография",
      "Кулинария",
      "Книги",
    ],
    languages: ["Русский", "Английский", "Французский"],
    lookingFor: "Серьёзные отношения",
    lifestyle: {
      smoking: "Не курю",
      drinking: "Иногда в компании",
      pets: "Люблю кошек",
      children: "Хочу детей",
    },
    verified: true,
    distance: "2 км от вас",
  };

  const handleLike = () => {
    console.log("Profile liked");
  };

  const handleMessage = () => {
    navigate("/messages");
  };

  const handleShare = () => {
    console.log("Profile shared");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/feed")}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditDialogOpen(true)}
          >
            <Icon name="Edit" size={20} className="mr-2" />
            Редактировать
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Фото галерея */}
        <Card className="overflow-hidden">
          <div className="relative">
            {profileData.photos.length > 0 ? (
              <img
                src={profileData.photos[currentPhotoIndex]}
                alt={profileData.name}
                className="w-full h-96 object-cover"
              />
            ) : (
              // Красивая дефолтная аватарка когда нет фото
              <div className="w-full h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                    <Icon name="User" size={48} className="text-white" />
                  </div>
                  <p className="text-white text-lg font-medium">
                    Добавьте фото
                  </p>
                  <p className="text-white/80 text-sm">
                    Нажмите "Редактировать" чтобы загрузить
                  </p>
                </div>
              </div>
            )}

            {/* Индикаторы фото - показываем только если есть фото */}
            {profileData.photos.length > 1 && (
              <div className="absolute top-4 left-4 flex space-x-1">
                {profileData.photos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentPhotoIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Верификация и расстояние */}
            <div className="absolute top-4 right-4 flex space-x-2">
              {profileData.verified && (
                <Badge className="bg-blue-500">
                  <Icon name="CheckCircle" size={12} className="mr-1" />
                  Подтверждён
                </Badge>
              )}
              {!isOwnProfile && (
                <Badge variant="secondary" className="bg-white/90">
                  {profileData.distance}
                </Badge>
              )}
            </div>

            {/* Навигация по фото - показываем только если есть несколько фото */}
            {profileData.photos.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                  onClick={() =>
                    setCurrentPhotoIndex(Math.max(0, currentPhotoIndex - 1))
                  }
                  disabled={currentPhotoIndex === 0}
                >
                  <Icon name="ChevronLeft" size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                  onClick={() =>
                    setCurrentPhotoIndex(
                      Math.min(
                        profileData.photos.length - 1,
                        currentPhotoIndex + 1,
                      ),
                    )
                  }
                  disabled={currentPhotoIndex === profileData.photos.length - 1}
                >
                  <Icon name="ChevronRight" size={20} />
                </Button>
              </>
            )}

            {/* Основная информация поверх фото */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                {profileData.name}, {profileData.age}
              </h1>
              <div className="flex items-center text-white/90 space-x-4">
                <span className="flex items-center">
                  <Icon name="MapPin" size={16} className="mr-1" />
                  {profileData.location}
                </span>
                <span className="flex items-center">
                  <Icon name="Heart" size={16} className="mr-1" />
                  {profileData.lookingFor}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Действия */}
        <div className="flex space-x-4">
          {/* Кнопка "Пропустить" только для чужих профилей */}
          {!isOwnProfile && (
            <Button
              variant="outline"
              className="flex-1 border-red-200 hover:bg-red-50 text-red-600"
              onClick={() => navigate("/feed")}
            >
              <Icon name="X" size={20} className="mr-2" />
              Пропустить
            </Button>
          )}
          {!isOwnProfile && (
            <Button
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              onClick={handleLike}
            >
              <Icon name="Heart" size={20} className="mr-2" />
              Нравится
            </Button>
          )}
          {!isOwnProfile && (
            <Button
              variant="outline"
              className="flex-1 border-blue-200 hover:bg-blue-50 text-blue-600"
              onClick={handleMessage}
            >
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Написать
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* О себе */}
          <Card className="md:col-span-2">
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Icon name="User" size={20} className="mr-2" />О себе
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {profileData.bio}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Icon name="Heart" size={20} className="mr-2" />
                  Интересы
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-pink-100 text-pink-700"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Icon name="Globe" size={20} className="mr-2" />
                  Языки
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.languages.map((lang, index) => (
                    <Badge key={index} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Детали профиля */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Info" size={20} className="mr-2" />
                  Детали
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Рост</span>
                  <span className="font-medium">{profileData.height}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Образование</span>
                  <span className="font-medium text-right text-sm">
                    {profileData.education}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Работа</span>
                  <span className="font-medium text-right text-sm">
                    {profileData.work}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Coffee" size={20} className="mr-2" />
                  Образ жизни
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Курение</span>
                  <span className="font-medium">
                    {profileData.lifestyle.smoking}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Алкоголь</span>
                  <span className="font-medium">
                    {profileData.lifestyle.drinking}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Питомцы</span>
                  <span className="font-medium">
                    {profileData.lifestyle.pets}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Дети</span>
                  <span className="font-medium">
                    {profileData.lifestyle.children}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Дополнительные действия */}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Icon name="Share" size={16} className="mr-1" />
                Поделиться
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Flag" size={16} className="mr-1" />
                Пожаловаться
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ProfileEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </div>
  );
}
