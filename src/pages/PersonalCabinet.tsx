import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import VerificationModal from "@/components/VerificationModal";

const PersonalCabinet = () => {
  const { user, logout, updateVerificationStatus } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    bio: "",
    interests: [],
    verified: false,
  });
  const [isNewUser, setIsNewUser] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSaveProfile = () => {
    // Сохраняем изменения в localStorage
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setIsEditing(false);
    alert("Профиль успешно обновлен!");
  };

  const photos: string[] = [];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          {isNewUser ? (
            <div className="text-center py-12">
              <Icon
                name="User"
                size={64}
                className="mx-auto text-gray-300 mb-6"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Создайте свой профиль
              </h2>
              <p className="text-gray-600 mb-8">
                Заполните информацию о себе, чтобы начать знакомства
              </p>
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Имя
                    </label>
                    <Input
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      placeholder="Ваше имя"
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
                        setProfile({ ...profile, age: e.target.value })
                      }
                      placeholder="Ваш возраст"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    О себе
                  </label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    placeholder="Расскажите о себе..."
                    className="min-h-[100px]"
                  />
                </div>
                <Button
                  onClick={() => {
                    if (profile.name && profile.age && profile.bio) {
                      setIsNewUser(false);
                      handleSaveProfile();
                    }
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 w-full"
                  disabled={!profile.name || !profile.age || !profile.bio}
                >
                  Создать профиль
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <Icon name="User" size={32} className="text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {profile.name}, {profile.age}
                      </h1>
                      {profile.verified && (
                        <Icon
                          name="CheckCircle"
                          size={24}
                          className="text-blue-500"
                        />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-gray-600">Новый пользователь</span>
                      {!profile.verified && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsVerificationModalOpen(true)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <Icon name="Shield" size={16} className="mr-1" />
                          Верификация
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                    className={
                      !isEditing
                        ? "bg-gradient-to-r from-purple-600 to-pink-500"
                        : ""
                    }
                  >
                    <Icon
                      name={isEditing ? "X" : "Edit"}
                      size={20}
                      className="mr-2"
                    />
                    {isEditing ? "Отменить" : "Редактировать"}
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Icon name="LogOut" size={20} className="mr-2" />
                    Выйти
                  </Button>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Имя
                      </label>
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
                          setProfile({ ...profile, age: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      О себе
                    </label>
                    <Textarea
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-purple-600 to-pink-500"
                  >
                    Сохранить изменения
                  </Button>
                </div>
              ) : (
                <p className="text-gray-700 text-lg leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </>
          )}
        </div>

        {!isNewUser && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Photos */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Мои фото</h2>
                <Button variant="ghost" size="sm">
                  <Icon name="Plus" size={20} />
                </Button>
              </div>
              <div className="text-center py-12">
                <Icon
                  name="Camera"
                  size={48}
                  className="mx-auto text-gray-300 mb-4"
                />
                <p className="text-gray-500">Добавьте свои фотографии</p>
              </div>
            </div>

            {/* Interests & Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Интересы</h2>
                <div className="text-center py-8">
                  <Icon
                    name="Heart"
                    size={48}
                    className="mx-auto text-gray-300 mb-4"
                  />
                  <p className="text-gray-500">Добавьте свои интересы</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Статистика</h2>
                <div className="space-y-4 text-center py-8">
                  <Icon
                    name="BarChart3"
                    size={48}
                    className="mx-auto text-gray-300 mb-4"
                  />
                  <p className="text-gray-500">
                    Статистика появится после активности на платформе
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <VerificationModal
          isOpen={isVerificationModalOpen}
          onClose={() => setIsVerificationModalOpen(false)}
          onVerificationSuccess={() => {
            setProfile({ ...profile, verified: true });
            updateVerificationStatus(true);
          }}
          hasProfilePhotos={photos.length > 0}
        />
      </div>
    </Layout>
  );
};

export default PersonalCabinet;
