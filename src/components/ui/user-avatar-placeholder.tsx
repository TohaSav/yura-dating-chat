import Icon from "@/components/ui/icon";

interface UserAvatarPlaceholderProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const UserAvatarPlaceholder = ({
  name,
  size = "md",
  className = "",
}: UserAvatarPlaceholderProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
    xl: "w-[330px] h-[470px] sm:w-[280px] sm:h-[400px] md:w-[300px] md:h-[430px] lg:w-[330px] lg:h-[470px]",
  };

  const iconSizes = {
    sm: 20,
    md: 32,
    lg: 48,
    xl: 120,
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-6xl sm:text-4xl md:text-5xl lg:text-6xl",
  };

  const getInitials = (fullName: string) => {
    const names = fullName.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={`
      ${sizeClasses[size]} 
      bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400
      ${size === "xl" ? "rounded-3xl" : "rounded-full"} 
      flex items-center justify-center relative overflow-hidden
      ${className}
    `}
    >
      {/* Градиентный фон с анимацией */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-orange-500/20 animate-pulse" />

      {/* Иконка пользователя */}
      <Icon
        name="User"
        size={iconSizes[size]}
        className="text-white/90 z-10 drop-shadow-lg"
      />

      {/* Инициалы как альтернатива */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`text-white font-bold text-opacity-30 select-none ${textSizes[size]}`}
        >
          {getInitials(name)}
        </span>
      </div>
    </div>
  );
};

export default UserAvatarPlaceholder;
