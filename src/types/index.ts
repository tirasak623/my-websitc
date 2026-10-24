/**
 * โครงสร้างข้อมูลหลักของเว็บไซต์ Snack Factory Review
 * ฟิลด์ที่เป็น optional (?) หรือรองรับ null คือข้อมูลที่อาจยังไม่มีจากโรงงานจริง
 * ห้าม mock ค่าเหล่านี้ใน UI เป็นข้อเท็จจริง — ให้แสดงสถานะ "ยังไม่มีข้อมูล" แทน
 */

export type PriceUnit =
  | "บาทต่อแพ็ก"
  | "บาทต่อกล่อง"
  | "บาทต่อถุง"
  | "บาทต่อกิโลกรัม"
  | "บาทต่อชิ้น";

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

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  highlights?: string[];
  images: string[];
  packageSize?: string;
  price: number | null;
  priceUnit?: PriceUnit;
  promoPrice?: number | null;
  wholesalePrice?: number | null;
  minimumOrder?: string | null;
  ingredients?: string[];
  nutrition?: NutritionInfo;
  storageInstructions?: string;
  expiryInfo?: string;
  stockStatus?: StockStatus;
  featured?: boolean;
  reviewVideoIds?: string[];
}

export interface FactoryImage {
  url: string;
  caption?: string;
}

export interface Factory {
  name: string | null;
  description: string | null;
  foundedYear: number | null;
  address: string | null;
  productCategories: string[];
  productionSteps?: string[];
  images: FactoryImage[];
  videoUrl?: string | null;
  facebookUrl?: string | null;
}

export interface ReviewVideo {
  id: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  thumbnail?: string;
  productId?: string | null;
  publishedAt?: string | null;
}
