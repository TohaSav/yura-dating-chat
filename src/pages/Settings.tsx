import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const Settings = () => {
  const [settings, setSettings] = useState({
    // Account settings
    twoFactor: false,
    // Notification settings
    newMatches: true,
    messages: true,
    likes: false,
    superLikes: true,
    // Privacy settings
    showAge: true,
    showDistance: true,
    onlineStatus: false,
    readReceipts: true,
    // Search settings
    showMe: true,
    globalSearch: false,
    // Discovery settings
    maxDistance: "25",
    minAge: "18",
    maxAge: "35",
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Здесь будет логика сохранения в API
    console.log("Сохраняем настройки:", settings);
    setHasChanges(false);
    toast.success("Настройки успешно сохранены! ✅");
  };

  const settingsGroups = [
    {
      title: "Уведомления",
      icon: "Bell",
      settings: [
        { id: "newMatches", label: "Новые матчи", key: "newMatches" },
        { id: "messages", label: "Новые сообщения", key: "messages" },
        { id: "likes", label: "Лайки профиля", key: "likes" },
        { id: "superLikes", label: "Супер-лайки", key: "superLikes" },
      ],
    },
    {
      title: "Конфиденциальность",
      icon: "Shield",
      settings: [
        { id: "showAge", label: "Показывать возраст", key: "showAge" },
        {
          id: "showDistance",
          label: "Показывать расстояние",
          key: "showDistance",
        },
        { id: "onlineStatus", label: "Статус онлайн", key: "onlineStatus" },
        {
          id: "readReceipts",
          label: "Уведомления о прочтении",
          key: "readReceipts",
        },
      ],
    },
    {
      title: "Поиск",
      icon: "Search",
      settings: [
        { id: "showMe", label: "Показывать меня", key: "showMe" },
        { id: "globalSearch", label: "Глобальный поиск", key: "globalSearch" },
      ],
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Настройки ⚙️
        </h1>

        <div className="space-y-6">
          {/* Account Settings */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Icon name="User" className="text-purple-600 mr-3" size={24} />
              <h2 className="text-xl font-bold">Аккаунт</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Изменить email</span>
                <Button variant="ghost" size="sm">
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span>Изменить пароль</span>
                <Button variant="ghost" size="sm">
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span>Двухфакторная аутентификация</span>
                <Switch
                  checked={settings.twoFactor}
                  onCheckedChange={(checked) =>
                    updateSetting("twoFactor", checked)
                  }
                />
              </div>
            </div>
          </div>

          {/* Dynamic Settings Groups */}
          {settingsGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="bg-white rounded-3xl shadow-lg p-6"
            >
              <div className="flex items-center mb-6">
                <Icon
                  name={group.icon}
                  className="text-purple-600 mr-3"
                  size={24}
                />
                <h2 className="text-xl font-bold">{group.title}</h2>
              </div>
              <div className="space-y-4">
                {group.settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex justify-between items-center"
                  >
                    <span>{setting.label}</span>
                    <Switch
                      checked={
                        settings[
                          setting.key as keyof typeof settings
                        ] as boolean
                      }
                      onCheckedChange={(checked) =>
                        updateSetting(setting.key, checked)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Discovery Settings */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Icon name="Target" className="text-purple-600 mr-3" size={24} />
              <h2 className="text-xl font-bold">Параметры поиска</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Максимальное расстояние
                </label>
                <Select
                  value={settings.maxDistance}
                  onValueChange={(value) => updateSetting("maxDistance", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 км</SelectItem>
                    <SelectItem value="10">10 км</SelectItem>
                    <SelectItem value="25">25 км</SelectItem>
                    <SelectItem value="50">50 км</SelectItem>
                    <SelectItem value="100">100 км</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Возрастной диапазон
                </label>
                <div className="flex space-x-2">
                  <Select
                    value={settings.minAge}
                    onValueChange={(value) => updateSetting("minAge", value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 63 }, (_, i) => i + 18).map(
                        (age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <span className="self-center">—</span>
                  <Select
                    value={settings.maxAge}
                    onValueChange={(value) => updateSetting("maxAge", value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 63 }, (_, i) => i + 18).map(
                        (age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Icon
                name="AlertTriangle"
                className="text-red-500 mr-3"
                size={24}
              />
              <h2 className="text-xl font-bold text-red-600">Опасная зона</h2>
            </div>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full text-orange-600 border-orange-200 hover:bg-orange-50"
              >
                Временно скрыть профиль
              </Button>
              <Button
                variant="outline"
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                Удалить аккаунт
              </Button>
            </div>
          </div>

          {/* Save Button */}
          {hasChanges && (
            <div className="sticky bottom-4 flex justify-center">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-3 rounded-full shadow-lg"
              >
                <Icon name="Save" className="mr-2" size={20} />
                Сохранить изменения
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
