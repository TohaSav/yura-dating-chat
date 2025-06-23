import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationSuccess: () => void;
  hasProfilePhotos: boolean;
}

const VerificationModal = ({
  isOpen,
  onClose,
  onVerificationSuccess,
  hasProfilePhotos,
}: VerificationModalProps) => {
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedPhoto(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleVerification = async () => {
    if (!uploadedPhoto) return;

    setIsVerifying(true);

    // Имитация AI-проверки
    setTimeout(() => {
      setIsVerifying(false);
      onVerificationSuccess();
      onClose();
    }, 2000);
  };

  if (!hasProfilePhotos) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Верификация недоступна</DialogTitle>
            <DialogDescription>
              Вы должны загрузить свои фотографии в профиль, прежде чем
              проходить верификацию.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={onClose} className="w-full">
            Понятно
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Верификация профиля
          </DialogTitle>
          <DialogDescription>
            Чтобы подтвердить свой профиль, загрузите фотографию, максимально
            имитирующую эту позу.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Reference Image */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Имитировать жест</h3>
            <div className="bg-gray-50 rounded-lg p-4 inline-block">
              <img
                src="https://cdn.poehali.dev/files/a1e61f38-d734-4921-a779-88ed8b61e70a.jpg"
                alt="Референсный жест для верификации"
                className="max-w-xs mx-auto rounded-lg"
              />
            </div>
          </div>

          {/* Upload Section */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {previewUrl ? (
                <div className="space-y-4">
                  <img
                    src={previewUrl}
                    alt="Загруженное фото"
                    className="max-w-xs mx-auto rounded-lg"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      setUploadedPhoto(null);
                      setPreviewUrl(null);
                    }}
                  >
                    Загрузить другое фото
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Icon
                    name="Camera"
                    size={48}
                    className="mx-auto text-gray-400"
                  />
                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      Загрузите фото с жестом
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Сделайте фото, повторяя жест с картинки выше
                    </p>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button asChild>
                        <span>
                          <Icon name="Upload" size={20} className="mr-2" />
                          Выбрать фото
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isVerifying}
            >
              Отмена
            </Button>
            <Button
              onClick={handleVerification}
              disabled={!uploadedPhoto || isVerifying}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500"
            >
              {isVerifying ? (
                <>
                  <Icon
                    name="Loader2"
                    size={20}
                    className="mr-2 animate-spin"
                  />
                  Проверяем...
                </>
              ) : (
                <>
                  <Icon name="CheckCircle" size={20} className="mr-2" />
                  Верифицировать
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationModal;
