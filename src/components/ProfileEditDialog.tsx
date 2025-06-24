import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

interface ProfileEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileEditDialog = ({ open, onOpenChange }: ProfileEditDialogProps) => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    interests: user?.interests || [],
    lookingFor: user?.lookingFor || "",
    height: user?.height || "",
    education: user?.education || "",
    job: user?.job || "",
    smoking: user?.smoking || "",
    alcohol: user?.alcohol || "",
    pets: user?.pets || "",
    children: user?.children || "",
  });
  const [newInterest, setNewInterest] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSave = () => {
    let updatedData = { ...formData };

    // Если выбрано новое фото, создаем URL для аватара
    if (selectedFile) {
      const avatarUrl = URL.createObjectURL(selectedFile);
      updatedData.avatar = avatarUrl;
    }

    updateProfile(updatedData);
    onOpenChange(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const addInterest = () => {
    if (
      newInterest.trim() &&
      !formData.interests.includes(newInterest.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактировать профиль</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Аватар */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={previewUrl || user?.avatar} />
              <AvatarFallback className="text-xl">
                {formData.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="relative">
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  document.getElementById("avatar-upload")?.click()
                }
                type="button"
              >
                <Icon name="Camera" size={16} className="mr-2" />
                Изменить фото
              </Button>
            </div>
          </div>

          {/* Имя */}
          <div className="space-y-2">
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Введите ваше имя"
            />
          </div>

          {/* Местоположение */}
          <div className="space-y-2">
            <Label htmlFor="location">Местоположение</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              placeholder="Ваш город"
            />
          </div>

          {/* О себе */}
          <div className="space-y-2">
            <Label htmlFor="bio">О себе</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="Расскажите о себе..."
              rows={3}
            />
          </div>

          {/* Что ищу */}
          <div className="space-y-2">
            <Label htmlFor="lookingFor">Что ищу</Label>
            <Select
              value={formData.lookingFor}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, lookingFor: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите что вы ищете" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="serious">Серьёзные отношения</SelectItem>
                <SelectItem value="communication">Просто общение</SelectItem>
                <SelectItem value="flirt">Флирт</SelectItem>
                <SelectItem value="nothing">Не чего не ищу</SelectItem>
                <SelectItem value="walks">Прогулки</SelectItem>
                <SelectItem value="goodtime">Провести хорошо время</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Интересы */}
          <div className="space-y-2">
            <Label>Интересы</Label>
            <div className="flex gap-2">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Добавить интерес"
                onKeyPress={(e) => e.key === "Enter" && addInterest()}
              />
              <Button type="button" size="sm" onClick={addInterest}>
                <Icon name="Plus" size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.interests.map((interest, index) => (
                <Badge key={index} variant="outline" className="group">
                  {interest}
                  <button
                    onClick={() => removeInterest(interest)}
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Рост */}
          <div className="space-y-2">
            <Label htmlFor="height">Рост</Label>
            <Select
              value={formData.height.toString()}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, height: parseInt(value) }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите рост" />
              </SelectTrigger>
              <SelectContent className="max-h-48">
                {Array.from({ length: 91 }, (_, i) => 120 + i).map((height) => (
                  <SelectItem key={height} value={height.toString()}>
                    {height} см
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Образование */}
          <div className="space-y-2">
            <Label htmlFor="education">Образование</Label>
            <Input
              id="education"
              value={formData.education}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, education: e.target.value }))
              }
              placeholder="Укажите ваше образование"
            />
          </div>

          {/* Работа */}
          <div className="space-y-2">
            <Label htmlFor="job">Работа</Label>
            <Input
              id="job"
              value={formData.job}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, job: e.target.value }))
              }
              placeholder="Укажите вашу профессию"
            />
          </div>

          {/* Курение */}
          <div className="space-y-2">
            <Label htmlFor="smoking">Курение</Label>
            <Select
              value={formData.smoking}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, smoking: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите отношение к курению" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Не курю</SelectItem>
                <SelectItem value="rarely">Курю редко</SelectItem>
                <SelectItem value="regularly">Курю регулярно</SelectItem>
                <SelectItem value="quitting">Бросаю</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Алкоголь */}
          <div className="space-y-2">
            <Label htmlFor="alcohol">Алкоголь</Label>
            <Select
              value={formData.alcohol}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, alcohol: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите отношение к алкоголю" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Не пью</SelectItem>
                <SelectItem value="rarely">Пью редко</SelectItem>
                <SelectItem value="moderate">Пью умеренно</SelectItem>
                <SelectItem value="often">Пью часто</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Питомцы */}
          <div className="space-y-2">
            <Label htmlFor="pets">Питомцы</Label>
            <Input
              id="pets"
              value={formData.pets}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, pets: e.target.value }))
              }
              placeholder="Расскажите о ваших питомцах"
            />
          </div>

          {/* Дети */}
          <div className="space-y-2">
            <Label htmlFor="children">Дети</Label>
            <Select
              value={formData.children}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, children: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите отношение к детям" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">Нет детей</SelectItem>
                <SelectItem value="have">Есть дети</SelectItem>
                <SelectItem value="want">Хочу детей</SelectItem>
                <SelectItem value="dont-want">Не хочу детей</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              Сохранить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
