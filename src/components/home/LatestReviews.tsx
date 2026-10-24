import { useState } from "react";
import { Video } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/common/Button";
import { VideoCard } from "@/components/reviews/VideoCard";
import { VideoPlayer } from "@/components/reviews/VideoPlayer";
import { reviewVideos } from "@/data/reviews";
import type { ReviewVideo } from "@/types";

export function LatestReviews() {
  const [playing, setPlaying] = useState<ReviewVideo | null>(null);
  const latest = reviewVideos.slice(0, 4);

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
      <SectionHeading
        eyebrow="วิดีโอรีวิว"
        title="รีวิวล่าสุดจากช่องของเรา"
        description="รับชมวิดีโอรีวิวสินค้าก่อนตัดสินใจเลือกซื้อ"
      />

      {latest.length === 0 ? (
        <EmptyState
          icon={<Video size={26} aria-hidden="true" />}
          title="ยังไม่มีวิดีโอรีวิวในขณะนี้"
          description="เรากำลังจัดทำวิดีโอรีวิวสินค้า แล้วกลับมาติดตามใหม่ได้เร็วๆ นี้"
          action={
            <Button to="/reviews" variant="outline" size="sm">
              ไปหน้าวิดีโอรีวิว
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latest.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={setPlaying} />
          ))}
        </div>
      )}

      <VideoPlayer video={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}
