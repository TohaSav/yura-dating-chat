import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import ProfileEditDialog from "@/components/ProfileEditDialog";

export default function Profile() {
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => window.history.back()}
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Мой профиль</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Основная информация */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-2xl">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">
                    {user?.name || "Пользователь"}
                  </h2>
                  <p className="text-gray-600">{user?.email}</p>
                  <Badge variant="secondary" className="mt-2">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {user?.location || "Москва"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">О себе</h3>
                  <p className="text-gray-700">
                    {user?.bio ||
                      "Пока что здесь пусто. Расскажите о себе больше!"}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Интересы</h3>
                  <div className="flex flex-wrap gap-2">
                    {(
                      user?.interests || ["Путешествия", "Книги", "Музыка"]
                    ).map((interest, index) => (
                      <Badge key={index} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Статистика */}
          <Card>
            <CardHeader>
              <CardTitle>Статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Просмотры профиля</span>
                <span className="font-semibold">127</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Лайки</span>
                <span className="font-semibold">43</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Совпадения</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Активность</span>
                <Badge className="bg-green-100 text-green-800">Активен</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Действия */}
        <div className="mt-6 flex gap-4">
          <Button className="flex-1" onClick={() => setEditDialogOpen(true)}>
            <Icon name="Edit" size={20} className="mr-2" />
            Редактировать профиль
          </Button>
          <Button variant="outline" onClick={() => navigate("/settings")}>
            <Icon name="Settings" size={20} className="mr-2" />
            Настройки
          </Button>
        </div>
      </div>

      <ProfileEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </div>
  );
}
