import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  LiveStream,
  LiveComment,
  LiveViewer,
  StreamSettings,
} from "@/types/liveStream";
import { useAuth } from "@/contexts/AuthContext";

interface LiveStreamContextType {
  currentStream: LiveStream | null;
  isStreaming: boolean;
  isWatching: boolean;
  viewers: LiveViewer[];
  comments: LiveComment[];
  viewerCount: number;
  startStream: (settings: StreamSettings) => Promise<void>;
  endStream: () => Promise<void>;
  joinStream: (streamId: string) => Promise<void>;
  leaveStream: () => void;
  sendComment: (text: string) => void;
  sendReaction: (type: string) => void;
  mediaStream: MediaStream | null;
  isMediaReady: boolean;
}

const LiveStreamContext = createContext<LiveStreamContextType | undefined>(
  undefined,
);

export const useLiveStream = () => {
  const context = useContext(LiveStreamContext);
  if (!context) {
    throw new Error("useLiveStream must be used within a LiveStreamProvider");
  }
  return context;
};

interface LiveStreamProviderProps {
  children: ReactNode;
}

export const LiveStreamProvider: React.FC<LiveStreamProviderProps> = ({
  children,
}) => {
  const { user } = useAuth();
  const [currentStream, setCurrentStream] = useState<LiveStream | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [viewers, setViewers] = useState<LiveViewer[]>([]);
  const [comments, setComments] = useState<LiveComment[]>([]);
  const [viewerCount, setViewerCount] = useState(0);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isMediaReady, setIsMediaReady] = useState(false);

  const startStream = async (settings: StreamSettings) => {
    try {
      // Проверяем доступность медиа-устройств
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Браузер не поддерживает доступ к камере");
      }

      // Получаем доступ к камере и микрофону с улучшенной обработкой ошибок
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user",
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
          },
        });
      } catch (mediaError: any) {
        // Обрабатываем специфичные ошибки доступа к медиа
        if (
          mediaError.name === "NotAllowedError" ||
          mediaError.name === "PermissionDeniedError"
        ) {
          throw new Error(
            "Доступ к камере и микрофону запрещен. Разрешите доступ в настройках браузера.",
          );
        } else if (
          mediaError.name === "NotFoundError" ||
          mediaError.name === "DevicesNotFoundError"
        ) {
          throw new Error(
            "Камера или микрофон не найдены. Проверьте подключение устройств.",
          );
        } else if (
          mediaError.name === "NotReadableError" ||
          mediaError.name === "TrackStartError"
        ) {
          throw new Error(
            "Устройства заняты другим приложением. Закройте другие программы и попробуйте снова.",
          );
        } else if (
          mediaError.name === "OverconstrainedError" ||
          mediaError.name === "ConstraintNotSatisfiedError"
        ) {
          throw new Error(
            "Настройки камеры не поддерживаются. Попробуйте другие параметры качества.",
          );
        } else {
          throw new Error(
            `Ошибка доступа к камере: ${mediaError.message || "Неизвестная ошибка"}`,
          );
        }
      }

      setMediaStream(stream);
      setIsMediaReady(true);

      // Создаем новый стрим
      const newStream: LiveStream = {
        id: `live_${Date.now()}`,
        userId: user?.id || "anonymous",
        userName: user?.name || "Пользователь",
        userAvatar: user?.photo,
        title: settings.title,
        isLive: true,
        startedAt: new Date(),
        viewerCount: 0,
        maxViewers: 0,
        isPrivate: settings.isPrivate,
        allowComments: settings.allowComments,
      };

      setCurrentStream(newStream);
      setIsStreaming(true);

      console.log("Стрим успешно запущен:", newStream);
    } catch (error) {
      console.error("Ошибка запуска стрима:", error);
      // Очищаем состояние в случае ошибки
      setMediaStream(null);
      setIsMediaReady(false);
      setIsStreaming(false);
      throw error;
    }
  };

  const endStream = async () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }

    if (currentStream) {
      setCurrentStream({
        ...currentStream,
        isLive: false,
        endedAt: new Date(),
      });
    }

    setIsStreaming(false);
    setIsMediaReady(false);
    setViewers([]);
    setComments([]);
    setViewerCount(0);
  };

  const joinStream = async (streamId: string) => {
    // Имитация подключения к стриму
    const mockStream: LiveStream = {
      id: streamId,
      userId: "streamer_id",
      userName: "Стример",
      title: "Прямой эфир",
      isLive: true,
      startedAt: new Date(Date.now() - 300000), // 5 минут назад
      viewerCount: Math.floor(Math.random() * 100) + 10,
      maxViewers: 150,
      isPrivate: false,
      allowComments: true,
    };

    setCurrentStream(mockStream);
    setIsWatching(true);
    setViewerCount(mockStream.viewerCount);

    // Имитация зрителей
    const mockViewers: LiveViewer[] = Array.from({ length: 5 }, (_, i) => ({
      id: `viewer_${i}`,
      name: `Зритель ${i + 1}`,
      joinedAt: new Date(Date.now() - Math.random() * 300000),
    }));
    setViewers(mockViewers);
  };

  const leaveStream = () => {
    setCurrentStream(null);
    setIsWatching(false);
    setViewers([]);
    setComments([]);
    setViewerCount(0);
  };

  const sendComment = (text: string) => {
    if (!currentStream || !user) return;

    const comment: LiveComment = {
      id: `comment_${Date.now()}`,
      userId: user.id || "anonymous",
      userName: user.name || "Пользователь",
      userAvatar: user.photo,
      text,
      timestamp: new Date(),
      reactions: [],
    };

    setComments((prev) => [...prev, comment]);
  };

  const sendReaction = (type: string) => {
    console.log("Отправлена реакция:", type);
    // Здесь будет логика отправки реакций
  };

  // Имитация получения комментариев в реальном времени
  useEffect(() => {
    if (!isWatching || !currentStream) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomComments = [
          "Привет! 👋",
          "Отличный эфир!",
          "Как дела?",
          "❤️❤️❤️",
          "Круто!",
          "Покажи что-то интересное",
          "Здорово смотрится!",
        ];

        const comment: LiveComment = {
          id: `comment_${Date.now()}`,
          userId: `viewer_${Math.floor(Math.random() * 100)}`,
          userName: `Зритель${Math.floor(Math.random() * 100)}`,
          text: randomComments[
            Math.floor(Math.random() * randomComments.length)
          ],
          timestamp: new Date(),
          reactions: [],
        };

        setComments((prev) => [...prev.slice(-20), comment]); // Оставляем только последние 20 комментариев
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isWatching, currentStream]);

  const value: LiveStreamContextType = {
    currentStream,
    isStreaming,
    isWatching,
    viewers,
    comments,
    viewerCount,
    startStream,
    endStream,
    joinStream,
    leaveStream,
    sendComment,
    sendReaction,
    mediaStream,
    isMediaReady,
  };

  return (
    <LiveStreamContext.Provider value={value}>
      {children}
    </LiveStreamContext.Provider>
  );
};
