import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const PersonalCabinet = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Александр",
    age: 28,
    bio: "Увлекаюсь фотографией, путешествиями и хорошей музыкой. Ищу интересного собеседника для долгих прогулок и философских бесед.",
    interests: ["Фотография", "Путешествия", "Музыка", "Книги"],
    verified: true,
  });

  const photos = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={photos[0]}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                {profile.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-2">
                    <Icon name="Shield" size={16} />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.name}, {profile.age}
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="flex items-center text-green-600">
                    <Icon name="CheckCircle" size={16} className="mr-1" />
                    Профиль проверен
                  </span>
                  <span className="text-gray-600">Активен сегодня</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className={
                !isEditing ? "bg-gradient-to-r from-purple-600 to-pink-500" : ""
              }
            >
              <Icon
                name={isEditing ? "X" : "Edit"}
                size={20}
                className="mr-2"
              />
              {isEditing ? "Отменить" : "Редактировать"}
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Возраст
                  </label>
                  <Input
                    type="number"
                    value={profile.age}
                    onChange={(e) =>
                      setProfile({ ...profile, age: parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">О себе</label>
                <Textarea
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  className="min-h-[100px]"
                />
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-500">
                Сохранить изменения
              </Button>
            </div>
          ) : (
            <p className="text-gray-700 text-lg leading-relaxed">
              {profile.bio}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Photos */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Мои фото</h2>
              <Button variant="ghost" size="sm">
                <Icon name="Plus" size={20} />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-white">
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white">
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interests & Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Интересы</h2>
              <div className="flex flex-wrap gap-3">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Статистика</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Просмотры профиля</span>
                  <span className="font-bold text-purple-600">245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Полученные лайки</span>
                  <span className="font-bold text-pink-500">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Матчи</span>
                  <span className="font-bold text-green-500">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalCabinet;
