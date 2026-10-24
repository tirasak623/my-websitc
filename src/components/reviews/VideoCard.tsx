import { PlayCircle } from "lucide-react";
import type { ReviewVideo } from "@/types";
import { Button } from "@/components/common/Button";
import { getYouTubeThumbnail } from "@/utils/youtube";
import { products } from "@/data/products";

interface VideoCardProps {
  video: ReviewVideo;
  onPlay: (video: ReviewVideo) => void;
}

export function VideoCard({ video, onPlay }: VideoCardProps) {
  const thumbnail = video.thumbnail ?? getYouTubeThumbnail(video.youtubeUrl);
  const relatedProduct = products.find((p) => p.id === video.productId);

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cocoa/5 flex flex-col">
      <button
        type="button"
        onClick={() => onPlay(video)}
        className="relative aspect-video bg-charcoal/10 group"
        aria-label={`เล่นวิดีโอ ${video.title}`}
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={video.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-charcoal/40 text-sm">
            ไม่มีภาพปกวิดีโอ
          </div>
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-charcoal/20 group-hover:bg-charcoal/30 transition-colors">
          <PlayCircle size={48} className="text-cream drop-shadow" aria-hidden="true" />
        </span>
      </button>

      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-semibold text-charcoal leading-snug">{video.title}</h3>
        {video.description && (
          <p className="text-sm text-charcoal/60 line-clamp-2">{video.description}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-charcoal/50">
          <span>{video.publishedAt ?? "ไม่ระบุวันที่เผยแพร่"}</span>
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
