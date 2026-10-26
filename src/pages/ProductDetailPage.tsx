import { useState } from "react";
import { useParams } from "react-router-dom";
import { Check, MessageCircleQuestion, Image as ImageIcon, Minus, Plus, ShoppingCart } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { Button } from "@/components/common/Button";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductCard } from "@/components/products/ProductCard";
import { PhotoReviewCard } from "@/components/reviews/PhotoReviewCard";
import { PhotoLightbox } from "@/components/reviews/PhotoLightbox";
import NotFoundPage from "@/pages/NotFoundPage";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getPhotoReviewsByProductId } from "@/utils/photoReviews";
import { formatBaht, formatPricePerPiece } from "@/utils/formatPrice";
import { useCart } from "@/context/CartContext";
import type { PhotoReview } from "@/types";

const stockLabel: Record<string, string> = {
  in_stock: "มีสินค้า",
  out_of_stock: "สินค้าหมดชั่วคราว",
  unknown: "ยังไม่มีข้อมูลสต็อก"
};

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [viewing, setViewing] = useState<PhotoReview | null>(null);
  const { addItem } = useCart();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [selectedOptionId, setSelectedOptionId] = useState(product?.packOptions[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return <NotFoundPage />;
  }

  const relatedReviews = getPhotoReviewsByProductId(product.id);
  const relatedProducts = getRelatedProducts(product);
  const isOutOfStock = product.stockStatus === "out_of_stock";
  const selectedOption =
    product.packOptions.find((o) => o.id === selectedOptionId) ?? product.packOptions[0];

  const currentProduct = product;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(currentProduct, selectedOption, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <>
      <Seo title={product.name} description={product.description} />

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <ProductGallery images={product.images} productName={product.name} />

          <div>
            <p className="text-xs font-semibold text-orange-dark uppercase tracking-wide mb-2">
              {product.category}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">{product.name}</h1>
            <p className="text-charcoal/70 mb-6">{product.description}</p>

            {product.highlights && product.highlights.length > 0 && (
              <ul className="flex flex-wrap gap-2 mb-6">
                {product.highlights.map((h) => (
                  <li
                    key={h}
                    className="text-xs font-medium bg-orange/15 text-cocoa px-3 py-1.5 rounded-full"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-cocoa">
                {formatPricePerPiece(product.pricePerPiece)}
              </span>
            </div>

            <p className="text-sm font-medium mb-5">
              สถานะสินค้า:{" "}
              <span
                className={
                  product.stockStatus === "in_stock"
                    ? "text-green-700"
                    : product.stockStatus === "out_of_stock"
                      ? "text-red-600"
                      : "text-charcoal/50"
                }
              >
                {stockLabel[product.stockStatus ?? "unknown"]}
              </span>
            </p>

            <div className="mb-5">
              <p className="text-sm font-semibold text-charcoal mb-2">เลือกขนาดการซื้อ</p>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="เลือกขนาดการซื้อ">
                {product.packOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={option.id === selectedOptionId}
                    onClick={() => setSelectedOptionId(option.id)}
                    className={`text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
                      option.id === selectedOptionId
                        ? "bg-cocoa text-cream border-cocoa"
                        : "bg-white text-charcoal/70 border-cocoa/15 hover:border-cocoa/40"
                    }`}
                  >
                    {option.label} · {formatBaht(option.price)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <p className="text-sm font-semibold text-charcoal">จำนวน</p>
              <div className="flex items-center gap-3 border border-cocoa/15 rounded-full px-2 py-1">
                <button
                  type="button"
                  aria-label="ลดจำนวน"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-cocoa hover:bg-cocoa/10"
                >
                  <Minus size={14} aria-hidden="true" />
                </button>
                <span className="w-6 text-center font-semibold text-charcoal">{quantity}</span>
                <button
                  type="button"
                  aria-label="เพิ่มจำนวน"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-cocoa hover:bg-cocoa/10"
                >
                  <Plus size={14} aria-hidden="true" />
                </button>
              </div>
              <span className="text-sm text-charcoal/60">
                รวม {formatBaht(selectedOption.price * quantity)}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                icon={
                  justAdded ? <Check size={18} aria-hidden="true" /> : <ShoppingCart size={18} aria-hidden="true" />
                }
              >
                {isOutOfStock ? "สินค้าหมดชั่วคราว" : justAdded ? "เพิ่มลงตะกร้าแล้ว" : "เพิ่มลงตะกร้า"}
              </Button>
              <Button to="/contact" variant="outline" icon={<MessageCircleQuestion size={18} aria-hidden="true" />}>
                สอบถามสินค้านี้
              </Button>
              {relatedReviews.length > 0 && (
                <Button
                  variant="ghost"
                  icon={<ImageIcon size={18} aria-hidden="true" />}
                  onClick={() => setViewing(relatedReviews[0])}
                  type="button"
                >
                  ดูรีวิวรูปภาพ
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
              <h2 className="font-semibold text-charcoal mb-3">ส่วนประกอบ</h2>
              <p className="text-sm text-charcoal/70">{product.ingredients.join(", ")}</p>
            </div>
          )}

          {product.nutrition && (
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
              <h2 className="font-semibold text-charcoal mb-3">ข้อมูลโภชนาการ (ต่อหน่วยบริโภค)</h2>
              <dl className="grid grid-cols-2 gap-y-1.5 text-sm text-charcoal/70">
                {product.nutrition.servingSize && (
                  <>
                    <dt>ขนาดหน่วยบริโภค</dt>
                    <dd className="text-right">{product.nutrition.servingSize}</dd>
                  </>
                )}
                {product.nutrition.calories !== undefined && (
                  <>
                    <dt>พลังงาน</dt>
                    <dd className="text-right">{product.nutrition.calories} กิโลแคลอรี</dd>
                  </>
                )}
                {product.nutrition.fat !== undefined && (
                  <>
                    <dt>ไขมัน</dt>
                    <dd className="text-right">{product.nutrition.fat} กรัม</dd>
                  </>
                )}
                {product.nutrition.carbohydrate !== undefined && (
                  <>
                    <dt>คาร์โบไฮเดรต</dt>
                    <dd className="text-right">{product.nutrition.carbohydrate} กรัม</dd>
                  </>
                )}
                {product.nutrition.sugar !== undefined && (
                  <>
                    <dt>น้ำตาล</dt>
                    <dd className="text-right">{product.nutrition.sugar} กรัม</dd>
                  </>
                )}
                {product.nutrition.sodium !== undefined && (
                  <>
                    <dt>โซเดียม</dt>
                    <dd className="text-right">{product.nutrition.sodium} มิลลิกรัม</dd>
                  </>
                )}
              </dl>
            </div>
          )}

          {(product.storageInstructions || product.expiryInfo) && (
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5 md:col-span-2">
              <h2 className="font-semibold text-charcoal mb-3">การเก็บรักษา</h2>
              {product.storageInstructions && (
                <p className="text-sm text-charcoal/70 mb-1">{product.storageInstructions}</p>
              )}
              {product.expiryInfo && (
                <p className="text-sm text-charcoal/70">{product.expiryInfo}</p>
              )}
            </div>
          )}
        </div>

        {relatedReviews.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-charcoal mb-6">รีวิวรูปภาพที่เกี่ยวข้อง</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedReviews.map((review) => (
                <PhotoReviewCard key={review.id} review={review} onViewPhoto={setViewing} />
              ))}
            </div>
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-charcoal mb-6">สินค้าที่เกี่ยวข้อง</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>

      <PhotoLightbox review={viewing} onClose={() => setViewing(null)} />
    </>
  );
}
