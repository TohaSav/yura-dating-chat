import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import UserAvatarPlaceholder from "@/components/ui/user-avatar-placeholder";
import ProfileEditDialog from "@/components/ProfileEditDialog";
import LookingForSelector from "@/components/LookingForSelector";
import GiftModal from "@/components/GiftModal";
import GiftSection from "@/components/GiftSection";

const getLookingForLabel = (lookingFor: string | undefined): string => {
  const labels: Record<string, string> = {
    serious: "Серьёзные отношения",
    communication: "Просто общение",
    friendship: "Дружба",
    dating: "Свидания",
    fun: "Развлечения",
  };

  return lookingFor ? labels[lookingFor] || "Неизвестно" : "Неизвестно";
};

export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [lookingFor, setLookingFor] = useState("Серьёзные отношения");
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const { user } = useAuth();

  // Данные пользователей для демонстрации
  const usersData = [
    {
      id: 1,
      name: "Екатерина",
      age: 36,
      city: "Екатеринбург",
      photo:
        "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face",
      isOnline: true,
      likes: 2,
      bio: "Люблю путешествия и новые знакомства",
      lookingFor: "serious",
      photos: [
        "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
      ],
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
      bio: "Художница, ищу единомышленников",
      lookingFor: "communication",
      photos: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      ],
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
      bio: "Активный образ жизни, спорт",
      lookingFor: "dating",
      photos: [
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
      ],
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
      bio: "Работаю в IT, люблю котиков",
      lookingFor: "friendship",
      photos: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      ],
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
      bio: "Психолог, помогаю людям",
      lookingFor: "serious",
      photos: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
      ],
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
      bio: "Фотограф и блогер",
      lookingFor: "fun",
      photos: [
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
      ],
    },
  ];

  // Определяем профиль для отображения
  const profileData = id
    ? usersData.find((userData) => userData.id === parseInt(id))
    : user;

  // Проверяем, является ли это профилем текущего пользователя
  const isOwnProfile = user?.id?.toString() === id;

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);

    try {
      // Имитация API запроса
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsLiked(!isLiked);

      // Показываем уведомление
      if (!isLiked) {
        console.log("Лайк отправлен!");
      } else {
        console.log("Лайк убран");
      }
    } catch (error) {
      console.error("Ошибка при отправке лайка:", error);
    } finally {
      setIsLiking(false);
    }
  };

  // Если профиль не найден и это не собственный профиль
  if (id && !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Профиль не найден
          </h2>
          <p className="text-gray-600 mb-4">
            Пользователь с таким ID не существует
          </p>
          <Button onClick={() => navigate("/people")}>
            Вернуться к поиску
          </Button>
        </div>
      </div>
    );
  }

  const currentProfile = profileData || user;

  if (!currentProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <Icon name="ArrowLeft" size={20} />
            Назад
          </Button>

          {isOwnProfile && (
            <Button
              onClick={() => setEditDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Icon name="Edit" size={16} />
              Редактировать
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Photos */}
          <div className="lg:col-span-2">
            <div className="w-full max-w-sm mx-auto">
              <div className="relative group">
                <div
                  className="w-[330px] h-[470px] max-w-full mx-auto relative overflow-hidden rounded-3xl shadow-2xl 
                              sm:w-[280px] sm:h-[400px] 
                              md:w-[300px] md:h-[430px] 
                              lg:w-[330px] lg:h-[470px]
                              bg-gradient-to-br from-purple-100 to-pink-50"
                >
                  <img
                    src={
                      currentProfile.photos?.[currentPhotoIndex] ||
                      currentProfile.photo
                    }
                    alt={currentProfile.name}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  />

                  {/* Photo Navigation */}
                  {currentProfile.photos &&
                    currentProfile.photos.length > 1 && (
                      <>
                        <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-lg"
                            onClick={() =>
                              setCurrentPhotoIndex((prev) =>
                                prev === 0
                                  ? currentProfile.photos!.length - 1
                                  : prev - 1,
                              )
                            }
                          >
                            <Icon name="ChevronLeft" size={16} />
                          </Button>
                        </div>
                        <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-lg"
                            onClick={() =>
                              setCurrentPhotoIndex((prev) =>
                                prev === currentProfile.photos!.length - 1
                                  ? 0
                                  : prev + 1,
                              )
                            }
                          >
                            <Icon name="ChevronRight" size={16} />
                          </Button>
                        </div>

                        {/* Photo Indicators */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {currentProfile.photos.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                index === currentPhotoIndex
                                  ? "bg-white scale-125"
                                  : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                  {/* Online Status */}
                  {currentProfile.isOnline && (
                    <div className="absolute top-4 right-4 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {currentProfile.photo ||
                  (currentProfile.photos &&
                    currentProfile.photos.length > 0) ? (
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={currentProfile.photo}
                        alt={currentProfile.name}
                      />
                      <AvatarFallback>
                        {currentProfile.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <UserAvatarPlaceholder
                      name={currentProfile.name}
                      size="md"
                    />
                  )}
                  <div>
                    <h1 className="text-2xl font-bold">
                      {currentProfile.name}, {currentProfile.age}
                    </h1>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Icon name="MapPin" size={16} />
                      {currentProfile.city}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentProfile.bio && (
                  <p className="text-gray-700">{currentProfile.bio}</p>
                )}

                {/* Looking For */}
                <div>
                  <h3 className="font-semibold mb-2">Ищу:</h3>
                  <Badge variant="secondary">
                    {getLookingForLabel(currentProfile.lookingFor)}
                  </Badge>
                </div>

                <Separator />

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Icon name="Heart" size={16} />
                    <span>{currentProfile.likes} лайков</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {!isOwnProfile && (
              <div className="space-y-3">
                <Button
                  className={`w-full transition-all duration-300 transform ${
                    isLiked
                      ? "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 scale-105"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  } ${isLiking ? "animate-pulse" : ""}`}
                  onClick={handleLike}
                  disabled={isLiking}
                >
                  <Icon
                    name={isLiked ? "Heart" : "Heart"}
                    size={16}
                    className={`mr-2 transition-all duration-300 ${
                      isLiked ? "fill-current animate-bounce" : ""
                    }`}
                  />
                  {isLiked ? "Лайк отправлен" : "Лайк"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    window.open(`/messenger/${profileData.id}`, "_blank")
                  }
                >
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Написать
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border-pink-200"
                  onClick={() => setGiftModalOpen(true)}
                >
                  <Icon name="Gift" size={16} className="mr-2" />
                  Подарок 🎁
                </Button>
              </div>
            )}

            {isOwnProfile && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Что ищете?</CardTitle>
                </CardHeader>
                <CardContent>
                  <LookingForSelector
                    value={lookingFor}
                    onChange={setLookingFor}
                  />
                </CardContent>
              </Card>
            )}

            {isOwnProfile && (
              <div>
                <GiftSection className="mt-6" />
              </div>
            )}
          </div>
        </div>
      </div>

      {isOwnProfile && (
        <ProfileEditDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
        />
      )}

      {!isOwnProfile && profileData && (
        <GiftModal
          open={giftModalOpen}
          onOpenChange={setGiftModalOpen}
          recipientId={profileData.id}
          recipientName={profileData.name}
        />
      )}
    </div>
  );
}
