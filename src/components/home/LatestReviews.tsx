import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/common/Button";
import { PhotoReviewCard } from "@/components/reviews/PhotoReviewCard";
import { PhotoLightbox } from "@/components/reviews/PhotoLightbox";
import { getAllPhotoReviews } from "@/utils/photoReviews";
import type { PhotoReview } from "@/types";

export function LatestReviews() {
  const [viewing, setViewing] = useState<PhotoReview | null>(null);
  const latest = getAllPhotoReviews().slice(0, 4);

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
      <SectionHeading
        eyebrow="รีวิวรูปภาพ"
        title="รีวิวล่าสุดจากลูกค้า"
        description="ชมรูปภาพและความคิดเห็นจากลูกค้าที่ซื้อสินค้าไปแล้ว"
      />

      {latest.length === 0 ? (
        <EmptyState
          icon={<ImageIcon size={26} aria-hidden="true" />}
          title="ยังไม่มีรีวิวรูปภาพในขณะนี้"
          description="เป็นคนแรกที่เขียนรีวิวพร้อมแนบรูปภาพของคุณได้"
          action={
            <Button to="/reviews" variant="outline" size="sm">
              ไปหน้ารีวิวรูปภาพ
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latest.map((review) => (
            <PhotoReviewCard key={review.id} review={review} onViewPhoto={setViewing} />
          ))}
        </div>
      )}

      <PhotoLightbox review={viewing} onClose={() => setViewing(null)} />
    </section>
  );
}
