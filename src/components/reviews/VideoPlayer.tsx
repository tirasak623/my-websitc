import { useEffect } from "react";
import { X } from "lucide-react";
import type { ReviewVideo } from "@/types";
import { getYouTubeEmbedUrl } from "@/utils/youtube";

interface VideoPlayerProps {
  video: ReviewVideo | null;
  onClose: () => void;
}

/** Modal เล่นวิดีโอ YouTube แบบ embed พร้อมตรวจสอบ URL ก่อนแสดงเสมอ */
export function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  useEffect(() => {
    if (!video) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [video, onClose]);

  if (!video) return null;

  const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[100] bg-charcoal/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-cream rounded-2xl overflow-hidden max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-cocoa/10">
          <h2 className="font-semibold text-charcoal line-clamp-1">{video.title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="ปิดวิดีโอ"
            className="p-1.5 rounded-full hover:bg-cocoa/10 text-charcoal"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="aspect-video bg-charcoal">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-cream/70 text-sm px-6 text-center">
              ลิงก์วิดีโอไม่ถูกต้องหรือไม่ใช่ YouTube จึงไม่สามารถแสดงวิดีโอนี้ได้
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
