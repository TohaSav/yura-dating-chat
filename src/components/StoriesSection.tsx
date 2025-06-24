import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Story, StoryItem } from "@/types";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import StoryViewer from "@/components/StoryViewer";

const StoriesSection = () => {
  const { user, getStories, addStory } = useAuth();
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

  const currentUserStory = stories.find((story) => story.userId === user?.id);
  const otherStories = stories.filter((story) => story.userId !== user?.id);

  return (
    <>
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6 overflow-x-auto pb-2 scrollbar-hide">
          {/* Добавить историю */}
          <div className="flex-shrink-0 text-center">
            <div
              onClick={handleAddStory}
              className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 cursor-pointer hover:border-purple-400 transition-colors flex items-center justify-center touch-manipulation"
            >
              <Icon
                name="Plus"
                size={20}
                className="text-gray-500 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
              />
              {currentUserStory && (
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <img
                      src={currentUserStory.userAvatar}
                      alt="Ваша история"
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-18 lg:h-18 rounded-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs sm:text-sm lg:text-base mt-1 sm:mt-2 text-gray-600 w-14 sm:w-16 lg:w-20 truncate">
              {currentUserStory ? "Ваша история" : "Добавить"}
            </p>
          </div>

          {/* Истории других пользователей */}
          {otherStories.map((story, index) => (
            <div
              key={story.id}
              onClick={() => openStory(story, index + 1)}
              className="flex-shrink-0 text-center cursor-pointer touch-manipulation"
            >
              <div
                className={`relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full p-0.5 ${
                  story.isViewed
                    ? "bg-gray-300"
                    : "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                }`}
              >
                <img
                  src={story.userAvatar}
                  alt={story.userName}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
              <p className="text-xs sm:text-sm lg:text-base mt-1 sm:mt-2 text-gray-600 truncate w-14 sm:w-16 lg:w-20">
                {story.userName}
              </p>
            </div>
          ))}

          {/* Показать текущую историю пользователя */}
          {currentUserStory && (
            <div
              onClick={() => openStory(currentUserStory, 0)}
              className="flex-shrink-0 text-center cursor-pointer touch-manipulation"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full p-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                <img
                  src={currentUserStory.userAvatar}
                  alt="Ваша история"
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Icon
                    name="Play"
                    size={10}
                    className="text-white sm:w-3 sm:h-3 lg:w-4 lg:h-4"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-sm lg:text-base mt-1 sm:mt-2 text-gray-600 w-14 sm:w-16 lg:w-20 truncate">
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
        />
      )}
    </>
  );
};

export default StoriesSection;
