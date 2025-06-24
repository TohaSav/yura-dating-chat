import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import ProfileEditDialog from "@/components/ProfileEditDialog";
import LookingForSelector from "@/components/LookingForSelector";

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
  const isOwnProfile = !id || (user && parseInt(id || "0") === user.id);

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
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/5] bg-gray-100">
                <img
                  src={
                    currentProfile.photos?.[currentPhotoIndex] ||
                    currentProfile.photo
                  }
                  alt={currentProfile.name}
                  className="w-full h-full object-cover"
                />

                {/* Photo Navigation */}
                {currentProfile.photos && currentProfile.photos.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentPhotoIndex((prev) =>
                          prev === 0
                            ? currentProfile.photos!.length - 1
                            : prev - 1,
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPhotoIndex((prev) =>
                          prev === currentProfile.photos!.length - 1
                            ? 0
                            : prev + 1,
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    >
                      <Icon name="ChevronRight" size={20} />
                    </button>

                    {/* Photo Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {currentProfile.photos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPhotoIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentPhotoIndex
                              ? "bg-white"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Online Status */}
                {currentProfile.isOnline && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    Онлайн
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Profile Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={currentProfile.photo}
                      alt={currentProfile.name}
                    />
                    <AvatarFallback>
                      {currentProfile.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
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
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Icon name="Heart" size={16} className="mr-2" />
                  Лайк
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Написать
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
          </div>
        </div>
      </div>

      {isOwnProfile && (
        <ProfileEditDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
        />
      )}
    </div>
  );
}
