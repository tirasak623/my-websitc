import type { Product } from "@/types";

/**
 * ข้อมูลสินค้าตัวอย่าง (SAMPLE DATA) สำหรับสาธิตการทำงานของเว็บไซต์เท่านั้น
 * ราคา โภชนาการ และรายละเอียดทั้งหมดในไฟล์นี้เป็นข้อมูลจำลอง ไม่ใช่ข้อมูลจริงจากโรงงาน
 * ก่อนเปิดใช้งานจริง ให้แทนที่ทุกรายการด้วยข้อมูลสินค้าจริง (ดูวิธีแก้ไขใน README.md)
 */
export const products: Product[] = [
  {
    id: "p1",
    slug: "butter-cookie",
    name: "คุกกี้เนยสด",
    category: "ขนมอบ",
    description:
      "คุกกี้เนยสดอบกรอบ ขนาดพอดีคำ เหมาะสำหรับทานเล่นหรือแจกจ่ายในโอกาสต่างๆ",
    highlights: ["เนื้อกรอบ", "ขนาดพอดีคำ", "แพ็กสะดวกพกพา"],
    images: ["/images/products/snack-1.svg"],
    packageSize: "200 กรัม / แพ็ก",
    price: 89,
    priceUnit: "บาทต่อแพ็ก",
    promoPrice: null,
    wholesalePrice: null,
    minimumOrder: null,
    ingredients: ["แป้งสาลี", "เนยสด", "น้ำตาล", "ไข่ไก่", "เกลือ"],
    nutrition: {
      servingSize: "30 กรัม",
      calories: 150,
      protein: 2,
      fat: 8,
      carbohydrate: 18,
      sugar: 7,
      sodium: 90
    },
    storageInstructions: "เก็บในที่แห้ง พ้นแสงแดดโดยตรง",
    expiryInfo: "ควรบริโภคภายใน 6 เดือนจากวันผลิต",
    stockStatus: "in_stock",
    featured: true,
    reviewVideoIds: []
  },
  {
    id: "p2",
    slug: "crispy-cracker",
    name: "ขนมปังกรอบ",
    category: "ขนมอบ",
    description: "ขนมปังกรอบอบใหม่ เนื้อบางกรอบ รสชาติไม่หวานจัด เหมาะทานคู่เครื่องดื่ม",
    highlights: ["เนื้อบางกรอบ", "หวานน้อย"],
    images: ["/images/products/snack-2.svg"],
    packageSize: "150 กรัม / ถุง",
    price: 45,
    priceUnit: "บาทต่อถุง",
    wholesalePrice: 35,
    minimumOrder: "สั่งขั้นต่ำ 20 ถุง",
    ingredients: ["แป้งสาลี", "น้ำมันพืช", "เกลือ", "ยีสต์"],
    storageInstructions: "เก็บในที่แห้ง ปิดปากถุงให้สนิทหลังเปิดใช้งาน",
    stockStatus: "in_stock",
    featured: false,
    reviewVideoIds: []
  },
  {
    id: "p3",
    slug: "choco-wafer",
    name: "เวเฟอร์ช็อกโกแลต",
    category: "ช็อกโกแลตและเวเฟอร์",
    description: "เวเฟอร์กรอบหลายชั้น สอดไส้ครีมช็อกโกแลต เคลือบช็อกโกแลตรอบชิ้น",
    highlights: ["กรอบหลายชั้น", "ไส้ครีมช็อกโกแลต"],
    images: ["/images/products/snack-3.svg"],
    packageSize: "18 กรัม / ชิ้น",
    price: 65,
    priceUnit: "บาทต่อแพ็ก",
    promoPrice: 55,
    wholesalePrice: 48,
    minimumOrder: "สั่งขั้นต่ำ 10 แพ็ก",
    ingredients: ["แป้งสาลี", "น้ำตาล", "โกโก้", "นมผง", "น้ำมันปาล์ม"],
    nutrition: {
      servingSize: "18 กรัม",
      calories: 95,
      protein: 1,
      fat: 5,
      carbohydrate: 12,
      sugar: 6,
      sodium: 40
    },
    storageInstructions: "เก็บในที่เย็น หลีกเลี่ยงอุณหภูมิสูงเพื่อป้องกันช็อกโกแลตละลาย",
    stockStatus: "in_stock",
    featured: true,
    reviewVideoIds: []
  },
  {
    id: "p4",
    slug: "black-sesame-cracker",
    name: "ข้าวเกรียบงาดำ",
    category: "ข้าวเกรียบ",
    description: "ข้าวเกรียบทอดกรอบ โรยงาดำ รสชาติกลมกล่อม",
    images: ["/images/products/snack-4.svg"],
    packageSize: "100 กรัม / ถุง",
    price: 35,
    priceUnit: "บาทต่อถุง",
    ingredients: ["แป้งมันสำปะหลัง", "งาดำ", "น้ำมันปาล์ม", "เกลือ"],
    storageInstructions: "เก็บในที่แห้ง",
    stockStatus: "in_stock",
    featured: false,
    reviewVideoIds: []
  },
  {
    id: "p5",
    slug: "egg-tart",
    name: "ทาร์ตไข่",
    category: "เบเกอรี่",
    description: "ทาร์ตไข่เนื้อเนียน อบใหม่ทุกวัน แป้งกรอบ ไส้คัสตาร์ดนิ่ม",
    images: ["/images/products/snack-5.svg"],
    packageSize: "1 ชิ้น",
    price: null,
    priceUnit: undefined,
    ingredients: ["แป้งสาลี", "ไข่ไก่", "นม", "น้ำตาล", "เนย"],
    storageInstructions: "แนะนำให้แช่เย็นและบริโภคโดยเร็ว",
    expiryInfo: "ควรบริโภคภายใน 3 วัน (สินค้าสดใหม่)",
    stockStatus: "unknown",
    featured: false,
    reviewVideoIds: []
  },
  {
    id: "p6",
    slug: "crispy-nuts",
    name: "ขนมถั่วกรอบ",
    category: "ถั่วและนัท",
    description: "ถั่วอบกรอบคลุกเคลือบรสหวานเค็ม ทานง่าย ไม่เลี่ยน",
    images: ["/images/products/snack-6.svg"],
    packageSize: "120 กรัม / แพ็ก",
    price: 59,
    priceUnit: "บาทต่อแพ็ก",
    wholesalePrice: 45,
    minimumOrder: "สั่งขั้นต่ำ 10 แพ็ก",
    ingredients: ["ถั่วลิสง", "น้ำตาล", "เกลือ", "น้ำมันพืช"],
    storageInstructions: "เก็บในภาชนะปิดสนิท ป้องกันความชื้น",
    stockStatus: "in_stock",
    featured: false,
    reviewVideoIds: []
  },
  {
    id: "p7",
    slug: "choco-brownie",
    name: "บราวนี่ช็อกโกแลต",
    category: "เบเกอรี่",
    description: "บราวนี่เนื้อหนึบ รสช็อกโกแลตเข้มข้น โรยหน้าด้วยอัลมอนด์สไลซ์",
    highlights: ["เนื้อหนึบ", "ช็อกโกแลตเข้มข้น"],
    images: ["/images/products/snack-7.svg"],
    packageSize: "250 กรัม / กล่อง",
    price: 99,
    priceUnit: "บาทต่อกล่อง",
    ingredients: ["แป้งสาลี", "ช็อกโกแลต", "เนย", "ไข่ไก่", "น้ำตาล", "อัลมอนด์"],
    storageInstructions: "เก็บในที่เย็น บริโภคได้ทั้งแบบเย็นและอุณหภูมิห้อง",
    stockStatus: "out_of_stock",
    featured: true,
    reviewVideoIds: []
  },
  {
    id: "p8",
    slug: "herb-cracker",
    name: "ขนมปังกรอบสมุนไพร",
    category: "ขนมอบ",
    description: "ขนมปังกรอบปรุงรสด้วยสมุนไพร กลิ่นหอม ทานเพลิน",
    images: ["/images/products/snack-8.svg"],
    packageSize: "150 กรัม / ถุง",
    price: 50,
    priceUnit: "บาทต่อถุง",
    ingredients: ["แป้งสาลี", "สมุนไพรผสม", "น้ำมันพืช", "เกลือ"],
    storageInstructions: "เก็บในที่แห้ง ปิดปากถุงให้สนิทหลังเปิดใช้งาน",
    stockStatus: "in_stock",
    featured: false,
    reviewVideoIds: []
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export const productCategories = Array.from(
  new Set(products.map((p) => p.category))
);
