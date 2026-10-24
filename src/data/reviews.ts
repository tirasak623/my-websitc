import type { ReviewVideo } from "@/types";

/**
 * วิดีโอรีวิวสินค้า — ยังไม่มีวิดีโอจริง จึงเริ่มต้นเป็นลิสต์เปล่า
 * หน้า "วิดีโอรีวิว" จะแสดง Empty State แนะนำให้เพิ่มวิดีโอโดยอัตโนมัติเมื่อลิสต์นี้ว่าง
 *
 * วิธีเพิ่มวิดีโอ: เพิ่ม object ใหม่ในอาร์เรย์นี้ เช่น
 * {
 *   id: "r1",
 *   title: "รีวิวคุกกี้เนยสด",
 *   description: "พาชมความกรอบของคุกกี้เนยสด",
 *   youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
 *   productId: "p1",
 *   publishedAt: "2026-01-15"
 * }
 * ระบบจะตรวจสอบ youtubeUrl อัตโนมัติก่อนฝังวิดีโอ หากไม่ถูกต้องจะไม่แสดงการ์ดวิดีโอนั้น
 */
export const reviewVideos: ReviewVideo[] = [];

export function getReviewsByProductId(productId: string): ReviewVideo[] {
  return reviewVideos.filter((v) => v.productId === productId);
}
