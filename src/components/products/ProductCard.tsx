import { PlayCircle, MessageCircleQuestion, Star } from "lucide-react";
import { Button } from "@/components/common/Button";
import type { Product } from "@/types";
import { formatPriceWithUnit } from "@/utils/formatPrice";
import { getReviewsByProductId } from "@/data/reviews";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasReview = getReviewsByProductId(product.id).length > 0;
  const hasPromo =
    product.promoPrice !== null &&
    product.promoPrice !== undefined &&
    product.price !== null &&
    product.promoPrice < product.price;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-cocoa/5 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-orange text-charcoal text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Star size={12} fill="currentColor" aria-hidden="true" />
            แนะนำ
          </span>
        )}
        {hasPromo && (
          <span className="absolute top-3 right-3 bg-cocoa text-cream text-xs font-bold px-3 py-1 rounded-full">
            โปรโมชั่น
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-2 flex-1">
        <p className="text-xs font-semibold text-orange-dark uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="font-bold text-charcoal text-lg leading-snug">{product.name}</h3>
        {product.packageSize && (
          <p className="text-xs text-charcoal/50">ขนาดบรรจุ: {product.packageSize}</p>
        )}

        <div className="mt-1 mb-2">
          {hasPromo ? (
            <div className="flex items-center gap-2">
              <span className="font-bold text-cocoa text-lg">
                {formatPriceWithUnit(product.promoPrice, product.priceUnit)}
              </span>
              <span className="text-sm text-charcoal/40 line-through">
                {formatPriceWithUnit(product.price, product.priceUnit)}
              </span>
            </div>
          ) : (
            <span className="font-bold text-cocoa text-lg">
              {formatPriceWithUnit(product.price, product.priceUnit)}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <Button to={`/products/${product.slug}`} size="sm" className="w-full">
            ดูรายละเอียด
          </Button>
          <div className="flex gap-2">
            {hasReview && (
              <Button
                to={`/reviews?product=${product.id}`}
                variant="outline"
                size="sm"
                className="flex-1"
                icon={<PlayCircle size={16} aria-hidden="true" />}
              >
                วิดีโอรีวิว
              </Button>
            )}
            <Button
              to="/contact"
              variant="ghost"
              size="sm"
              className="flex-1"
              icon={<MessageCircleQuestion size={16} aria-hidden="true" />}
            >
              สอบถามสินค้า
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
