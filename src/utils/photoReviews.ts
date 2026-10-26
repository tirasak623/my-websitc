import type { PhotoReview } from "@/types";
import { photoReviews as seedPhotoReviews } from "@/data/reviews";

/**
 * รีวิวที่ลูกค้ากรอกเองผ่านหน้าเว็บ จะถูกบันทึกไว้ใน localStorage ของเบราว์เซอร์นั้นเท่านั้น
 * (เว็บไซต์นี้ยังไม่มีฐานข้อมูลส่วนกลาง) จึงมองเห็นได้เฉพาะคนที่กรอกบนอุปกรณ์/เบราว์เซอร์เดียวกัน
 * ไม่ถูกส่งไปแสดงให้ลูกค้าคนอื่นเห็น — ถ้าต้องการให้ทุกคนเห็นรีวิวเดียวกันจริง ต้องต่อกับฐานข้อมูลส่วนกลางในอนาคต
 */
const STORAGE_KEY = "snack-factory-photo-reviews";
const MAX_PHOTO_SIZE_BYTES = 4 * 1024 * 1024;

export function getLocalPhotoReviews(): PhotoReview[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addLocalPhotoReview(review: PhotoReview): void {
  const existing = getLocalPhotoReviews();
  existing.unshift(review);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage อาจเต็มหรือถูกปิดใช้งาน — ไม่สามารถบันทึกได้ แต่ไม่ควรทำให้หน้าเว็บพัง
  }
}

/** รวมรีวิวถาวร (seed) กับรีวิวที่ลูกค้ากรอกไว้ในเบราว์เซอร์นี้ โดยรีวิวใหม่สุดจะอยู่ก่อน */
export function getAllPhotoReviews(): PhotoReview[] {
  return [...getLocalPhotoReviews(), ...seedPhotoReviews];
}

export function getPhotoReviewsByProductId(productId: string): PhotoReview[] {
  return getAllPhotoReviews().filter((r) => r.productId === productId);
}

export function isSupportedPhotoFile(file: File): boolean {
  return ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type);
}

export function isPhotoFileWithinSizeLimit(file: File): boolean {
  return file.size <= MAX_PHOTO_SIZE_BYTES;
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
