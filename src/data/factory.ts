import type { Factory } from "@/types";
import { siteConfig } from "@/config/site";
import { productCategories } from "@/data/products";

/**
 * ข้อมูลโรงงาน — ยังไม่มีข้อมูลจริงจากโรงงาน จึงปล่อยฟิลด์ข้อเท็จจริงไว้เป็น null ทั้งหมด
 * ห้ามเติมประวัติ ปีที่ก่อตั้ง หรือที่ตั้งขึ้นมาเอง
 * เมื่อได้ข้อมูลจริงแล้ว ให้แก้ไขค่าด้านล่างนี้โดยตรง (ดูวิธีแก้ไขใน README.md)
 */
export const factory: Factory = {
  name: null,
  description: null,
  foundedYear: null,
  address: null,
  productCategories,
  productionSteps: undefined,
  images: [
    {
      url: "/images/factory/placeholder.svg",
      caption: "ภาพตัวอย่าง รอรูปจริงจากโรงงาน"
    }
  ],
  videoUrl: null,
  facebookUrl: siteConfig.facebookUrl
};
