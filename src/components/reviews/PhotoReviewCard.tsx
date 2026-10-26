import type { PhotoReview } from "@/types";
import { Button } from "@/components/common/Button";
import { products } from "@/data/products";

interface PhotoReviewCardProps {
  review: PhotoReview;
  onViewPhoto: (review: PhotoReview) => void;
}

export function PhotoReviewCard({ review, onViewPhoto }: PhotoReviewCardProps) {
  const relatedProduct = products.find((p) => p.id === review.productId);

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cocoa/5 flex flex-col">
      <button
        type="button"
        onClick={() => onViewPhoto(review)}
        className="relative aspect-square bg-charcoal/10"
        aria-label={`ดูรูปรีวิวของ ${review.customerName}`}
      >
        <img
          src={review.photoUrl}
          alt={`รูปรีวิวจาก ${review.customerName}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </button>

      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-semibold text-charcoal leading-snug">{review.customerName}</h3>
        <p className="text-sm text-charcoal/70 line-clamp-4">{review.reviewText}</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-charcoal/50">
          <span>{review.createdAt}</span>
        </div>

        {relatedProduct && (
          <Button
            to={`/products/${relatedProduct.slug}`}
            variant="ghost"
            size="sm"
            className="mt-2 self-start"
          >
            ดูสินค้า: {relatedProduct.name}
          </Button>
        )}
      </div>
    </article>
  );
}
