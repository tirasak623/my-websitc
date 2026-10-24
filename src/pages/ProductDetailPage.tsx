import { useState } from "react";
import { useParams } from "react-router-dom";
import { MessageCircleQuestion, PlayCircle } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { Button } from "@/components/common/Button";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductCard } from "@/components/products/ProductCard";
import { VideoCard } from "@/components/reviews/VideoCard";
import { VideoPlayer } from "@/components/reviews/VideoPlayer";
import NotFoundPage from "@/pages/NotFoundPage";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getReviewsByProductId } from "@/data/reviews";
import { formatPriceWithUnit } from "@/utils/formatPrice";
import type { ReviewVideo } from "@/types";

const stockLabel: Record<string, string> = {
  in_stock: "มีสินค้า",
  out_of_stock: "สินค้าหมดชั่วคราว",
  unknown: "ยังไม่มีข้อมูลสต็อก"
};

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [playing, setPlaying] = useState<ReviewVideo | null>(null);
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return <NotFoundPage />;
  }

  const relatedVideos = getReviewsByProductId(product.id);
  const relatedProducts = getRelatedProducts(product);
  const hasPromo =
    product.promoPrice !== null &&
    product.promoPrice !== undefined &&
    product.price !== null &&
    product.promoPrice < product.price;

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

            <div className="flex items-baseline gap-3 mb-2">
              {hasPromo ? (
                <>
                  <span className="text-2xl font-bold text-cocoa">
                    {formatPriceWithUnit(product.promoPrice, product.priceUnit)}
                  </span>
                  <span className="text-base text-charcoal/40 line-through">
                    {formatPriceWithUnit(product.price, product.priceUnit)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-cocoa">
                  {formatPriceWithUnit(product.price, product.priceUnit)}
                </span>
              )}
            </div>

            {product.packageSize && (
              <p className="text-sm text-charcoal/60 mb-1">ขนาดบรรจุ: {product.packageSize}</p>
            )}
            {product.wholesalePrice && (
              <p className="text-sm text-charcoal/60 mb-1">
                ราคาขายส่ง: {formatPriceWithUnit(product.wholesalePrice, product.priceUnit)}
              </p>
            )}
            {product.minimumOrder && (
              <p className="text-sm text-charcoal/60 mb-1">จำนวนขั้นต่ำในการสั่งซื้อ: {product.minimumOrder}</p>
            )}

            <p className="text-sm font-medium mt-3 mb-6">
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

            <div className="flex flex-wrap gap-3">
              <Button to="/contact" icon={<MessageCircleQuestion size={18} aria-hidden="true" />}>
                ติดต่อสอบถามสินค้านี้
              </Button>
              {relatedVideos.length > 0 && (
                <Button
                  variant="outline"
                  icon={<PlayCircle size={18} aria-hidden="true" />}
                  onClick={() => setPlaying(relatedVideos[0])}
                  type="button"
                >
                  ดูวิดีโอรีวิว
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

        {relatedVideos.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-charcoal mb-6">วิดีโอรีวิวที่เกี่ยวข้อง</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedVideos.map((video) => (
                <VideoCard key={video.id} video={video} onPlay={setPlaying} />
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

      <VideoPlayer video={playing} onClose={() => setPlaying(null)} />
    </>
  );
}
