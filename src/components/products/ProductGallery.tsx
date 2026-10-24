import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div>
      <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-cocoa/5 mb-4">
        <img
          src={activeImage}
          alt={`${productName} - ภาพที่ ${activeIndex + 1}`}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3" role="tablist" aria-label="เลือกรูปภาพสินค้า">
          {images.map((img, index) => (
            <button
              key={img + index}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                index === activeIndex ? "border-cocoa" : "border-transparent"
              }`}
            >
              <img
                src={img}
                alt={`${productName} - ภาพย่อที่ ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
