import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Video } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { VideoCard } from "@/components/reviews/VideoCard";
import { VideoPlayer } from "@/components/reviews/VideoPlayer";
import { reviewVideos } from "@/data/reviews";
import { products } from "@/data/products";
import type { ReviewVideo } from "@/types";

export default function ReviewsPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [productId, setProductId] = useState(searchParams.get("product") ?? "");
  const [playing, setPlaying] = useState<ReviewVideo | null>(null);

  const filtered = useMemo(() => {
    return reviewVideos.filter((v) => {
      const matchesSearch = v.title.toLowerCase().includes(search.trim().toLowerCase());
      const matchesProduct = productId === "" || v.productId === productId;
      return matchesSearch && matchesProduct;
    });
  }, [search, productId]);

  const productsWithVideos = products.filter((p) =>
    reviewVideos.some((v) => v.productId === p.id)
  );

  return (
    <>
      <Seo title="วิดีโอรีวิว" description="รวมวิดีโอรีวิวสินค้าขนมจากโรงงาน" />

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading eyebrow="วิดีโอรีวิว" title="รับชมวิดีโอรีวิวสินค้าทั้งหมด" />

        {reviewVideos.length === 0 ? (
          <EmptyState
            icon={<Video size={26} aria-hidden="true" />}
            title="ยังไม่มีวิดีโอรีวิวในขณะนี้"
            description="เรากำลังจัดทำวิดีโอรีวิวสินค้า สามารถเพิ่มวิดีโอได้ภายหลังผ่านไฟล์ src/data/reviews.ts"
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
                  placeholder="ค้นหาชื่อวิดีโอ..."
                  aria-label="ค้นหาชื่อวิดีโอ"
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
                {productsWithVideos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {filtered.length === 0 ? (
              <EmptyState title="ไม่พบวิดีโอที่ตรงกับการค้นหา" />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((video) => (
                  <VideoCard key={video.id} video={video} onPlay={setPlaying} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <VideoPlayer video={playing} onClose={() => setPlaying(null)} />
    </>
  );
}
