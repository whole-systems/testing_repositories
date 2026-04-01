import { Card, CardContent } from '@ryed/ui/ui/Card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@ryed/ui/ui/Carousel';
import React from 'react';

type CarouselData = {
  imageUrl: string;
  labelText: string;
};

export interface ImageCarouselProps {
  items: CarouselData[];
  onItemSelect?: (item: CarouselData) => void;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  items,
  onItemSelect,
}) => {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card
                className={onItemSelect ? 'cursor-pointer' : ''}
                onClick={() => onItemSelect && onItemSelect(item)}
              >
                <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.labelText}
                    className="w-full h-auto"
                  />
                  <span className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 py-1 px-2 rounded-md text-sm font-medium">
                    {item.labelText}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
