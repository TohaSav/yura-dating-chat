import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLiveStream } from "@/contexts/LiveStreamContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { StreamSettings } from "@/types/liveStream";

export default function GoLive() {
  const navigate = useNavigate();
  const { startStream, mediaStream, isMediaReady } = useLiveStream();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [settings, setSettings] = useState<StreamSettings>({
    title: "",
    isPrivate: false,
    allowComments: true,
    quality: "auto",
  });

  useEffect(() => {
    requestMediaPermission();
  }, []);

  useEffect(() => {
    if (mediaStream && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  const requestMediaPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setHasPermission(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Ошибка доступа к камере:", error);
      setHasPermission(false);
    }
  };

  const handleStartStream = async () => {
    if (!settings.title.trim()) {
      alert("Введите название эфира");
      return;
    }

    setIsLoading(true);

    try {
      await startStream(settings);
      navigate(`/live/${Date.now()}`);
    } catch (error) {
      console.error("Ошибка запуска эфира:", error);
      alert("Не удалось запустить эфир");
    } finally {
      setIsLoading(false);
    }
  };

  const flipCamera = async () => {
    try {
      const currentStream = videoRef.current?.srcObject as MediaStream;
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Ошибка переключения камеры:", error);
    }
  };

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

          <h1 className="text-2xl font-bold">Начать эфир</h1>
          <div className="w-20"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Camera Preview */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Camera" size={20} />
                  Предпросмотр
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden">
                  {hasPermission ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white">
                      <div className="text-center">
                        <Icon
                          name="Camera"
                          size={48}
                          className="mx-auto mb-4 text-gray-400"
                        />
                        <p className="mb-4">Разрешите доступ к камере</p>
                        <Button
                          onClick={requestMediaPermission}
                          variant="outline"
                        >
                          Разрешить доступ
                        </Button>
                      </div>
                    </div>
                  )}

                  {hasPermission && (
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={flipCamera}
                        className="bg-black/50 hover:bg-black/70 text-white border-0"
                      >
                        <Icon name="RotateCcw" size={16} />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Настройки эфира</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Название эфира *</Label>
                  <Input
                    id="title"
                    placeholder="О чём будет эфир?"
                    value={settings.title}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Приватный эфир</Label>
                    <p className="text-sm text-gray-600">
                      Только для подписчиков
                    </p>
                  </div>
                  <Switch
                    checked={settings.isPrivate}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({ ...prev, isPrivate: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Разрешить комментарии</Label>
                    <p className="text-sm text-gray-600">
                      Зрители смогут писать
                    </p>
                  </div>
                  <Switch
                    checked={settings.allowComments}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        allowComments: checked,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label>Качество</Label>
                  <select
                    className="w-full mt-1 p-2 border rounded-lg"
                    value={settings.quality}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        quality: e.target.value as any,
                      }))
                    }
                  >
                    <option value="auto">Автоматически</option>
                    <option value="high">Высокое (720p)</option>
                    <option value="medium">Среднее (480p)</option>
                    <option value="low">Низкое (360p)</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Lightbulb" size={20} />
                  Советы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Icon
                      name="Check"
                      size={16}
                      className="text-green-500 mt-0.5"
                    />
                    Проверьте освещение
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon
                      name="Check"
                      size={16}
                      className="text-green-500 mt-0.5"
                    />
                    Стабильное интернет-соединение
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon
                      name="Check"
                      size={16}
                      className="text-green-500 mt-0.5"
                    />
                    Придумайте интересную тему
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon
                      name="Check"
                      size={16}
                      className="text-green-500 mt-0.5"
                    />
                    Отвечайте на комментарии
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Start Button */}
            <Button
              onClick={handleStartStream}
              disabled={!hasPermission || !settings.title.trim() || isLoading}
              className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Запуск...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Icon name="Radio" size={20} />
                  Начать эфир
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
