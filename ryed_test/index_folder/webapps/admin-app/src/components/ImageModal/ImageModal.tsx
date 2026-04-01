import { Card, CardContent } from '@ryed/ui/ui/Card';
import { X } from 'lucide-react';
import { FC } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  onClose: () => void;
}
export const ImageModal: FC<ImageModalProps> = ({
  isOpen,
  imageUrl,
  onClose,
}) => {
  if (!isOpen || !imageUrl) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <Card className="relative max-w-2xl w-full rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4  hover:text-gray-400 z-10"
        >
          <X className="h-10 w-10" />
        </button>
        <CardContent className="p-4">
          <img
            src={imageUrl}
            alt="Selected"
            className="w-full h-auto rounded"
          />
        </CardContent>
      </Card>
    </div>
  );
};
