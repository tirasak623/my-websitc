import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Image as ImageIcon } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { PhotoReviewCard } from "@/components/reviews/PhotoReviewCard";
import { PhotoReviewForm } from "@/components/reviews/PhotoReviewForm";
import { PhotoLightbox } from "@/components/reviews/PhotoLightbox";
import { getAllPhotoReviews } from "@/utils/photoReviews";
import { products } from "@/data/products";
import type { PhotoReview } from "@/types";

export default function ReviewsPage() {
  const [searchParams] = useSearchParams();
  const [reviews, setReviews] = useState<PhotoReview[]>(() => getAllPhotoReviews());
  const [search, setSearch] = useState("");
  const [productId, setProductId] = useState(searchParams.get("product") ?? "");
  const [viewing, setViewing] = useState<PhotoReview | null>(null);

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const matchesSearch =
        r.customerName.toLowerCase().includes(search.trim().toLowerCase()) ||
        r.reviewText.toLowerCase().includes(search.trim().toLowerCase());
      const matchesProduct = productId === "" || r.productId === productId;
      return matchesSearch && matchesProduct;
    });
  }, [reviews, search, productId]);

  const productsWithReviews = products.filter((p) =>
    reviews.some((r) => r.productId === p.id)
  );

  return (
    <>
      <Seo title="รีวิวรูปภาพ" description="รวมรีวิวรูปภาพและความคิดเห็นจากลูกค้าที่ซื้อสินค้าขนมจากโรงงาน" />

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading eyebrow="รีวิวรูปภาพ" title="รีวิวรูปภาพจากลูกค้าจริง" />

        <div className="mb-10">
          <PhotoReviewForm onSubmitted={(review) => setReviews((prev) => [review, ...prev])} />
        </div>

        {reviews.length === 0 ? (
          <EmptyState
            icon={<ImageIcon size={26} aria-hidden="true" />}
            title="ยังไม่มีรีวิวรูปภาพในขณะนี้"
            description="เป็นคนแรกที่เขียนรีวิวพร้อมแนบรูปภาพของคุณได้จากฟอร์มด้านบน"
          />
        ) : (
          <>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-cocoa/5 mb-8 grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ค้นหาชื่อผู้รีวิวหรือข้อความ..."
                  aria-label="ค้นหารีวิว"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
                />
              </div>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                aria-label="กรองตามสินค้า"
                className="w-full py-2.5 px-3 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
              >
                <option value="">สินค้าทั้งหมด</option>
                {productsWithReviews.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {filtered.length === 0 ? (
              <EmptyState title="ไม่พบรีวิวที่ตรงกับการค้นหา" />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((review) => (
                  <PhotoReviewCard key={review.id} review={review} onViewPhoto={setViewing} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <PhotoLightbox review={viewing} onClose={() => setViewing(null)} />
    </>
  );
}
