/**
 * โครงสร้างข้อมูลหลักของเว็บไซต์ Snack Factory Review
 * ฟิลด์ที่เป็น optional (?) หรือรองรับ null คือข้อมูลที่อาจยังไม่มีจากโรงงานจริง
 * ห้าม mock ค่าเหล่านี้ใน UI เป็นข้อเท็จจริง — ให้แสดงสถานะ "ยังไม่มีข้อมูล" แทน
 */

export interface NutritionInfo {
  servingSize?: string;
  calories?: number;
  protein?: number;
  fat?: number;
  carbohydrate?: number;
  sugar?: number;
  sodium?: number;
}

export type StockStatus = "in_stock" | "out_of_stock" | "unknown";

/**
 * ตัวเลือกขนาดการขายของสินค้าหนึ่งชิ้น เช่น แบ่งขายเป็นห่อเล็ก หรือยกกระปุก
 * ทุกตัวเลือกอ้างอิงจาก "ราคาต่อชิ้น" (pricePerPiece) ของสินค้านั้นเป็นหลัก
 */
export interface PackOption {
  id: string;
  /** ป้ายกำกับที่แสดงให้ลูกค้าเห็น เช่น "ห่อเล็ก (10 ชิ้น)" หรือ "ยกกระปุก (40 ชิ้น)" */
  label: string;
  pieceCount: number;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  highlights?: string[];
  images: string[];
  /** ราคาต่อชิ้น ใช้แสดงเป็นป้ายราคาหลักบนการ์ดสินค้า */
  pricePerPiece: number;
  /** ตัวเลือกการขาย (ห่อเล็ก / ยกกระปุก ฯลฯ) อย่างน้อย 1 ตัวเลือก */
  packOptions: PackOption[];
  ingredients?: string[];
  nutrition?: NutritionInfo;
  storageInstructions?: string;
  expiryInfo?: string;
  stockStatus?: StockStatus;
  featured?: boolean;
}

export interface PhotoReview {
  id: string;
  customerName: string;
  reviewText: string;
  photoUrl: string;
  productId?: string | null;
  createdAt: string;
}
