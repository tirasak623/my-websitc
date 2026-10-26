import { useState } from "react";
import { Check, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/common/Button";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatBaht, formatPricePerPiece } from "@/utils/formatPrice";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedOptionId, setSelectedOptionId] = useState(product.packOptions[0].id);
  const [justAdded, setJustAdded] = useState(false);

  const selectedOption =
    product.packOptions.find((o) => o.id === selectedOptionId) ?? product.packOptions[0];
  const isOutOfStock = product.stockStatus === "out_of_stock";

  function handleAddToCart() {
    if (isOutOfStock) return;
    addItem(product, selectedOption);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

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
        {isOutOfStock && (
          <span className="absolute top-3 right-3 bg-charcoal/80 text-cream text-xs font-bold px-3 py-1 rounded-full">
            สินค้าหมด
          </span>
        )}
        <span className="absolute bottom-3 right-3 bg-cocoa text-cream text-sm font-extrabold px-3 py-1.5 rounded-full shadow-md">
          {formatPricePerPiece(product.pricePerPiece)}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-2 flex-1">
        <p className="text-xs font-semibold text-orange-dark uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="font-bold text-charcoal text-lg leading-snug">{product.name}</h3>

        <div className="mt-1 flex flex-wrap gap-1.5" role="radiogroup" aria-label="เลือกขนาดการซื้อ">
          {product.packOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={option.id === selectedOptionId}
              onClick={() => setSelectedOptionId(option.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                option.id === selectedOptionId
                  ? "bg-cocoa text-cream border-cocoa"
                  : "bg-cream text-charcoal/70 border-cocoa/15 hover:border-cocoa/40"
              }`}
            >
              {option.label} · {formatBaht(option.price)}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-3 flex flex-col gap-2">
          <Button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="w-full"
            icon={
              justAdded ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <ShoppingCart size={16} aria-hidden="true" />
              )
            }
          >
            {isOutOfStock ? "สินค้าหมดชั่วคราว" : justAdded ? "เพิ่มลงตะกร้าแล้ว" : "เพิ่มลงตะกร้า"}
          </Button>
          <Button to={`/products/${product.slug}`} variant="outline" size="sm" className="w-full">
            ดูรายละเอียด
          </Button>
        </div>
      </div>
    </article>
  );
}
