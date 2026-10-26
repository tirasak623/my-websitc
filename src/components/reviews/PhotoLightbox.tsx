import { useEffect } from "react";
import { X } from "lucide-react";
import type { PhotoReview } from "@/types";

interface PhotoLightboxProps {
  review: PhotoReview | null;
  onClose: () => void;
}

export function PhotoLightbox({ review, onClose }: PhotoLightboxProps) {
  useEffect(() => {
    if (!review) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [review, onClose]);

  if (!review) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`รูปรีวิวของ ${review.customerName}`}
      className="fixed inset-0 z-[100] bg-charcoal/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-cream rounded-2xl overflow-hidden max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-cocoa/10">
          <h2 className="font-semibold text-charcoal line-clamp-1">{review.customerName}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="ปิดรูปภาพ"
            className="p-1.5 rounded-full hover:bg-cocoa/10 text-charcoal"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <img
          src={review.photoUrl}
          alt={`รูปรีวิวจาก ${review.customerName}`}
          className="w-full max-h-[70vh] object-contain bg-charcoal/5"
        />

        <p className="p-4 text-sm text-charcoal/80">{review.reviewText}</p>
      </div>
    </div>
  );
}
