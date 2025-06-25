import { useState, useRef } from "react";
import { useStories } from "@/contexts/StoriesContext";
import { useAuth } from "@/contexts/AuthContext";
import { Story, StoryItem } from "@/types";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import StoryViewer from "@/components/StoryViewer";

const StoriesSection = () => {
  const { getStories, addStory } = useStories();
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>(getStories());
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddStory = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Ограничиваем до 30 файлов
    const selectedFiles = files.slice(0, 30);

    const storyItems: StoryItem[] = await Promise.all(
      selectedFiles.map(async (file, index) => {
        const url = URL.createObjectURL(file);
        const type = file.type.startsWith("video/") ? "video" : "image";

        return {
          id: `${Date.now()}-${index}`,
          type,
          url,
          duration: type === "video" ? 15 : 5, // видео 15 сек, фото 5 сек
          createdAt: new Date(),
          viewedBy: [],
        };
      }),
    );

    const success = await addStory(storyItems);
    if (success) {
      setStories(getStories());
    }
  };

  const openStory = (story: Story, index: number) => {
    setSelectedStory(story);
    setSelectedIndex(index);
  };

  const closeStory = () => {
    setSelectedStory(null);
    setStories(getStories()); // Обновляем после просмотра
  };

  const handleStoryDeleted = () => {
    setStories(getStories());
  };

  const currentUserStory = stories.find((story) => story.userId === user?.id);
  const otherStories = stories.filter((story) => story.userId !== user?.id);

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl p-4 mb-6 shadow-xl border border-purple-200/30">
        {/* Декоративные элементы фона */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-transparent to-yellow-300/20 rounded-2xl"></div>
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-pink-300/20 rounded-full blur-xl"></div>

        <div className="relative z-10 flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {/* Добавить историю */}
          <div className="flex-shrink-0 text-center">
            <div
              onClick={handleAddStory}
              className="relative w-16 h-16 rounded-full bg-white border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 transition-all duration-200 flex items-center justify-center touch-manipulation group"
            >
              {currentUserStory ? (
                <>
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 p-0.5 animate-pulse">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <img
                        src={currentUserStory.userAvatar}
                        alt="Ваша история"
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <Icon name="Plus" size={12} className="text-white" />
                  </div>
                </>
              ) : (
                <Icon
                  name="Plus"
                  size={24}
                  className="text-gray-400 group-hover:text-blue-500 transition-colors"
                />
              )}
            </div>
            <p className="text-xs mt-2 text-gray-700 w-16 truncate font-medium">
              Добавить
            </p>
          </div>

          {/* Истории других пользователей */}
          {otherStories.map((story, index) => (
            <div
              key={story.id}
              onClick={() => openStory(story, index + 1)}
              className="flex-shrink-0 text-center cursor-pointer touch-manipulation group"
            >
              <div className="relative">
                <div
                  className={`relative w-16 h-16 rounded-full p-0.5 transition-all duration-300 ${
                    story.isViewed
                      ? "bg-gradient-to-tr from-gray-300 to-gray-400"
                      : "bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 group-hover:scale-105"
                  }`}
                >
                  <img
                    src={story.userAvatar}
                    alt={story.userName}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
                {!story.isViewed && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping"></div>
                )}
              </div>
              <p className="text-xs mt-2 text-gray-700 truncate w-16 font-medium">
                {story.userName}
              </p>
            </div>
          ))}

          {/* Показать текущую историю пользователя */}
          {currentUserStory && (
            <div
              onClick={() => openStory(currentUserStory, 0)}
              className="flex-shrink-0 text-center cursor-pointer touch-manipulation group"
            >
              <div className="relative">
                <div className="relative w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 group-hover:scale-105 transition-all duration-300">
                  <img
                    src={currentUserStory.userAvatar}
                    alt="Ваша история"
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <Icon name="Eye" size={10} className="text-white" />
                </div>
              </div>
              <p className="text-xs mt-2 text-gray-700 w-16 truncate font-medium">
                Смотреть
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Скрытый input для файлов */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Просмотрщик историй */}
      {selectedStory && (
        <StoryViewer
          stories={stories}
          initialStoryIndex={selectedIndex}
          onClose={closeStory}
          onStoryDeleted={handleStoryDeleted}
        />
      )}
    </>
  );
};

export default StoriesSection;
