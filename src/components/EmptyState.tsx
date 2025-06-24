import Icon from "@/components/ui/icon";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
}

const EmptyState = ({
  title,
  description,
  icon = "Users",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="bg-purple-100 rounded-full p-6 mb-4">
        <Icon name={icon} size={48} className="text-purple-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm max-w-sm">{description}</p>
    </div>
  );
};

export default EmptyState;
