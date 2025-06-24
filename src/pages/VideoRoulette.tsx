import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

interface User {
  id: string;
  name: string;
  isOnline: boolean;
}

const VideoRoulette = () => {
  const { user } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentPartner, setCurrentPartner] = useState<User | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [onlineUsers] = useState<User[]>([
    { id: "1", name: "Анна", isOnline: true },
    { id: "2", name: "Михаил", isOnline: true },
    { id: "3", name: "Елена", isOnline: true },
    { id: "4", name: "Дмитрий", isOnline: true },
  ]);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      setIsCameraOn(true);
      setIsMicOn(true);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Ошибка доступа к камере:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraOn(false);
    setIsMicOn(false);
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
  };

  const toggleCamera = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  };

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  const findPartner = () => {
    setIsSearching(true);

    // Симуляция поиска собеседника
    setTimeout(() => {
      const randomPartner =
        onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
      setCurrentPartner(randomPartner);
      setIsConnected(true);
      setIsSearching(false);

      // Симуляция видео партнера
      if (remoteVideoRef.current) {
        remoteVideoRef.current.src =
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
      }
    }, 2000);
  };

  const nextPartner = () => {
    setIsConnected(false);
    setCurrentPartner(null);
    if (remoteVideoRef.current) {
      remoteVideoRef.current.src = "";
    }
    findPartner();
  };

  const endChat = () => {
    setIsConnected(false);
    setCurrentPartner(null);
    if (remoteVideoRef.current) {
      remoteVideoRef.current.src = "";
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
            Видео Рулетка
          </h1>
          <p className="text-gray-600">
            Знакомьтесь с новыми людьми через видео чат
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">
              {onlineUsers.length} пользователей онлайн
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Видео область */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[400px] md:min-h-[500px]">
                {/* Локальное видео */}
                <div className="relative bg-gray-900 flex items-center justify-center">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {!isCameraOn && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200">
                      <Icon
                        name="Camera"
                        size={48}
                        className="text-gray-400 mb-2"
                      />
                      <p className="text-gray-500">Камера выключена</p>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    Вы
                  </div>
                </div>

                {/* Удаленное видео */}
                <div className="relative bg-gray-100 flex items-center justify-center">
                  {isSearching ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-gray-600 text-lg font-medium">
                        Поиск собеседника...
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        Подключаем вас к случайному пользователю
                      </p>
                    </div>
                  ) : isConnected ? (
                    <>
                      <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                        {currentPartner?.name}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Icon
                        name="Users"
                        size={64}
                        className="text-gray-300 mb-4"
                      />
                      <p className="text-gray-500 text-lg">
                        Нажмите "Найти собеседника"
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        чтобы начать общение
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Панель управления */}
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex justify-center items-center gap-4 flex-wrap">
                  {/* Камера */}
                  <Button
                    variant={isCameraOn ? "default" : "destructive"}
                    size="lg"
                    onClick={isCameraOn ? toggleCamera : startCamera}
                    className="rounded-full w-12 h-12 p-0"
                  >
                    <Icon
                      name={isCameraOn ? "Camera" : "CameraOff"}
                      size={20}
                    />
                  </Button>

                  {/* Микрофон */}
                  <Button
                    variant={isMicOn ? "default" : "destructive"}
                    size="lg"
                    onClick={toggleMic}
                    className="rounded-full w-12 h-12 p-0"
                    disabled={!stream}
                  >
                    <Icon name={isMicOn ? "Mic" : "MicOff"} size={20} />
                  </Button>

                  {/* Основные кнопки */}
                  {!isConnected && !isSearching ? (
                    <Button
                      onClick={findPartner}
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8"
                    >
                      <Icon name="Search" size={20} className="mr-2" />
                      Найти собеседника
                    </Button>
                  ) : isConnected ? (
                    <>
                      <Button
                        onClick={nextPartner}
                        size="lg"
                        variant="outline"
                        className="px-6"
                      >
                        <Icon name="SkipForward" size={20} className="mr-2" />
                        Следующий
                      </Button>
                      <Button
                        onClick={endChat}
                        size="lg"
                        variant="destructive"
                        className="px-6"
                      >
                        <Icon name="PhoneOff" size={20} className="mr-2" />
                        Завершить
                      </Button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Статус подключения */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="font-semibold mb-3 flex items-center">
                <Icon name="Wifi" size={20} className="mr-2 text-green-500" />
                Статус
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Камера:</span>
                  <span
                    className={`text-sm font-medium ${isCameraOn ? "text-green-600" : "text-red-600"}`}
                  >
                    {isCameraOn ? "Включена" : "Выключена"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Микрофон:</span>
                  <span
                    className={`text-sm font-medium ${isMicOn ? "text-green-600" : "text-red-600"}`}
                  >
                    {isMicOn ? "Включен" : "Выключен"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Соединение:</span>
                  <span
                    className={`text-sm font-medium ${isConnected ? "text-green-600" : "text-gray-500"}`}
                  >
                    {isConnected ? "Подключено" : "Не подключено"}
                  </span>
                </div>
              </div>
            </div>

            {/* Пользователи онлайн */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="font-semibold mb-3 flex items-center">
                <Icon name="Users" size={20} className="mr-2 text-blue-500" />
                Онлайн ({onlineUsers.length})
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {onlineUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Правила */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
              <h3 className="font-semibold mb-2 text-purple-700">
                Правила общения
              </h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Будьте вежливы и уважительны</li>
                <li>• Запрещен неприемлемый контент</li>
                <li>• Нарушения могут привести к блокировке</li>
                <li>• Получайте удовольствие от общения!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoRoulette;
