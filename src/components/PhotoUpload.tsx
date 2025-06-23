import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Photo {
  id: string;
  url: string;
  name: string;
  age: number;
}

const PhotoUpload = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto: Photo = {
            id: Date.now().toString() + Math.random(),
            url: e.target?.result as string,
            name: `Пользователь ${photos.length + 1}`,
            age: Math.floor(Math.random() * 20) + 20,
          };
          setPhotos((prev) => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handlePlayClick = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  return (
    <div className="mb-8">
      {/* Upload Section */}
      <div className="flex items-center space-x-4 mb-6">
        <Button
          onClick={handlePlayClick}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 p-0"
          size="icon"
        >
          <Icon name="Play" size={20} />
        </Button>
        <div>
          <h3 className="font-semibold text-lg">Загрузить фотографии</h3>
          <p className="text-gray-500 text-sm">Добавьте фото для знакомств</p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Photo Gallery */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group"
              onMouseEnter={() => setHoveredPhoto(photo.id)}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              <Card className="overflow-hidden aspect-square">
                <img
                  src={photo.url}
                  alt={`Фото ${photo.name}`}
                  className="w-full h-full object-cover"
                />
              </Card>

              {/* Remove Button */}
              <button
                onClick={() => removePhoto(photo.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="X" size={12} />
              </button>

              {/* Tooltip */}
              {hoveredPhoto === photo.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10">
                  {photo.name}, {photo.age} лет
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-4 border-transparent border-b-black"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
