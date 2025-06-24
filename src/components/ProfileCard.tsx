import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import UserAvatarPlaceholder from "@/components/ui/user-avatar-placeholder";

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  image: string;
  interests: string[];
  distance: string;
}

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const handleLike = () => {
    console.log("Liked profile:", profile.id);
  };

  const handlePass = () => {
    console.log("Passed profile:", profile.id);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300">
      <div className="relative">
        {profile.image ? (
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-80 object-cover"
          />
        ) : (
          <div className="w-full h-80 relative">
            <UserAvatarPlaceholder
              name={profile.name}
              size="xl"
              className="rounded-none"
            />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
          {profile.distance}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h3 className="text-2xl font-bold text-white mb-1">
            {profile.name}, {profile.age}
          </h3>
          <p className="text-white/90 text-sm">{profile.bio}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {profile.interests.map((interest, index) => (
            <span
              key={index}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={handlePass}
            className="flex-1 border-gray-300 hover:bg-gray-50"
          >
            <Icon name="X" size={20} className="mr-2" />
            Пропустить
          </Button>
          <Button
            onClick={handleLike}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
          >
            <Icon name="Heart" size={20} className="mr-2" />
            Нравится
          </Button>
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          <Button variant="ghost" size="sm" className="text-purple-600">
            <Icon name="MessageCircle" size={16} className="mr-1" />
            Написать
          </Button>
          <Button variant="ghost" size="sm" className="text-purple-600">
            <Icon name="Video" size={16} className="mr-1" />
            Видеозвонок
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
