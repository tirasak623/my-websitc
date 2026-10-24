/**
 * ตรวจสอบและแปลง URL วิดีโอ YouTube ให้ปลอดภัยก่อนฝัง (embed)
 * รองรับรูปแบบ: youtube.com/watch?v=, youtu.be/, youtube.com/embed/, youtube.com/shorts/
 */

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be"
]);

const VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

/** ดึง YouTube Video ID จาก URL ถ้า URL ไม่ถูกต้องหรือไม่ใช่โดเมน YouTube จะคืนค่า null */
export function extractYouTubeId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if (!YOUTUBE_HOSTS.has(parsed.hostname)) {
    return null;
  }

  let videoId: string | null = null;

  if (parsed.hostname === "youtu.be") {
    videoId = parsed.pathname.slice(1);
  } else if (parsed.pathname.startsWith("/watch")) {
    videoId = parsed.searchParams.get("v");
  } else if (parsed.pathname.startsWith("/embed/")) {
    videoId = parsed.pathname.replace("/embed/", "");
  } else if (parsed.pathname.startsWith("/shorts/")) {
    videoId = parsed.pathname.replace("/shorts/", "");
  }

  if (!videoId || !VIDEO_ID_PATTERN.test(videoId)) {
    return null;
  }

  return videoId;
}

/** คืนค่า true ถ้า URL เป็นลิงก์ YouTube ที่ฝังวิดีโอได้จริง */
export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null;
}

/** สร้าง URL สำหรับฝัง (iframe) จาก YouTube URL ที่ผ่านการตรวจสอบแล้ว คืนค่า null ถ้า URL ไม่ถูกต้อง */
export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}

/** สร้าง URL รูปปกวิดีโอ (thumbnail) อัตโนมัติจาก Video ID เผื่อไม่มีภาพปกที่อัปโหลดเอง */
export function getYouTubeThumbnail(url: string): string | null {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
