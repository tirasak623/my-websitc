import type { Product } from "@/types";
import { productImages } from "@/utils/images";

/**
 * ข้อมูลสินค้าขนม 8 ชนิดที่ร้านขายจริง (ใช้รูปสินค้าจริงที่ร้านถ่ายไว้)
 * ราคาต่อชิ้นและราคาต่อห่อ/กระปุกในไฟล์นี้เป็น "ราคาตัวอย่าง" เพื่อสาธิตการแสดงผลเท่านั้น
 * ก่อนเปิดขายจริง ให้แก้ pricePerPiece และ packOptions ของแต่ละรายการให้ตรงกับราคาขายจริงของร้าน
 */
export const products: Product[] = [
  {
    id: "p1",
    slug: "dice-bean",
    name: "ลูกเต๋า (ไส้ถั่ว)",
    category: "ขนมลูกเต๋า",
    description: "ขนมลูกเต๋าไส้ถั่วเหลืองกวนหอมหวาน เนื้อแป้งนุ่มเหนียวกำลังดี ห่อทีละชิ้นสะอาด ทานง่าย",
    highlights: ["ไส้ถั่วกวนหอม", "ห่อทีละชิ้น", "ขายดี"],
    images: productImages("dice-bean", 1, "jpg"),
    pricePerPiece: 4,
    packOptions: [
      { id: "pack", label: "ห่อเล็ก (8 ชิ้น)", pieceCount: 8, price: 32 },
      { id: "tub", label: "ยกกระปุก (40 ชิ้น)", pieceCount: 40, price: 144 }
    ],
    ingredients: ["แป้งสาลี", "ถั่วเหลืองกวน", "น้ำตาล", "น้ำมันพืช"],
    storageInstructions: "เก็บในที่แห้ง พ้นแสงแดดโดยตรง",
    stockStatus: "in_stock",
    featured: true
  },
  {
    id: "p2",
    slug: "vanilla-cookie",
    name: "คุกกี้วนิลลา",
    category: "คุกกี้",
    description: "คุกกี้วนิลลาเนื้อนุ่มหอม สอดไส้ช็อกโกแลตชิพ อบใหม่ทุกรอบ ขนาดพอดีคำ",
    highlights: ["เนื้อนุ่มหอมวนิลลา", "ช็อกโกแลตชิพ"],
    images: productImages("vanilla-cookie", 1, "jpg"),
    pricePerPiece: 5,
    packOptions: [
      { id: "pack", label: "ห่อเล็ก (8 ชิ้น)", pieceCount: 8, price: 40 },
      { id: "tub", label: "ยกกระปุก (40 ชิ้น)", pieceCount: 40, price: 180 }
    ],
    ingredients: ["แป้งสาลี", "เนยสด", "น้ำตาล", "ไข่ไก่", "ช็อกโกแลตชิพ", "กลิ่นวนิลลา"],
    storageInstructions: "เก็บในที่แห้ง พ้นแสงแดดโดยตรง",
    stockStatus: "in_stock",
    featured: true
  },
  {
    id: "p3",
    slug: "pineapple-pie",
    name: "พายสับปะรด",
    category: "พาย",
    description: "พายเนยกรอบ สอดไส้สับปะรดกวนรสเปรี้ยวหวานกำลังดี หอมเนยแท้ ทานเพลินไม่เลี่ยน",
    highlights: ["ไส้สับปะรดกวน", "เนื้อพายกรอบ"],
    images: productImages("pineapple-pie", 1, "jpg"),
    pricePerPiece: 4,
    packOptions: [
      { id: "pack", label: "ห่อเล็ก (8 ชิ้น)", pieceCount: 8, price: 32 },
      { id: "tub", label: "ยกกระปุก (40 ชิ้น)", pieceCount: 40, price: 144 }
    ],
    ingredients: ["แป้งสาลี", "เนย", "สับปะรดกวน", "น้ำตาล"],
    storageInstructions: "เก็บในที่แห้ง พ้นแสงแดดโดยตรง",
    stockStatus: "in_stock",
    featured: true
  },
  {
    id: "p4",
    slug: "pia-winter-melon",
    name: "ขนมเปี๊ยะไส้ฟัก",
    category: "ขนมเปี๊ยะ",
    description: "ขนมเปี๊ยะแป้งเนียนนุ่ม สอดไส้ฟักเชื่อมหอมหวานสไตล์ดั้งเดิม รสชาติกลมกล่อม",
    highlights: ["ไส้ฟักเชื่อมสูตรดั้งเดิม", "แป้งเนียนนุ่ม"],
    images: productImages("pia-winter-melon", 1, "jpg"),
    pricePerPiece: 4,
    packOptions: [
      { id: "pack", label: "ห่อเล็ก (8 ชิ้น)", pieceCount: 8, price: 32 },
      { id: "tub", label: "ยกกระปุก (40 ชิ้น)", pieceCount: 40, price: 144 }
    ],
    ingredients: ["แป้งสาลี", "ฟักเชื่อม", "น้ำตาล", "น้ำมันพืช"],
    storageInstructions: "เก็บในที่แห้ง พ้นแสงแดดโดยตรง",
    stockStatus: "in_stock",
    featured: false
  },
  {
    id: "p5",
    slug: "cocoon-pineapple",
    name: "ขนมรังไหมไส้สับปะรด",
    category: "ขนมรังไหม",
    description: "ขนมรังไหมแป้งกรอบร่วน สอดไส้สับปะรดกวนหอมหวาน รูปทรงน่ารักเป็นเอกลักษณ์",
    highlights: ["แป้งกรอบร่วน", "ไส้สับปะรดกวน"],
    images: productImages("cocoon-pineapple", 1, "svg"),
    pricePerPiece: 4,
    packOptions: [
      { id: "pack", label: "ห่อเล็ก (8 ชิ้น)", pieceCount: 8, price: 32 },
      { id: "tub", label: "ยกกระปุก (40 ชิ้น)", pieceCount: 40, price: 144 }
    ],
    ingredients: ["แป้งสาลี", "สับปะรดกวน", "น้ำตาล", "น้ำมันพืช"],
    storageInstructions: "เก็บในที่แห้ง พ้นแสงแดดโดยตรง",
    stockStatus: "in_stock",
    featured: false
  },
  {
    id: "p6",
    slug: "pia-bean-egg",
    name: "ขนมเปี๊ยะไส้ถั่วไข่เค็ม",
    category: "ขนมเปี๊ยะ",
    description: "ขนมเปี๊ยะไส้ถั่วเหลืองกวนตัดเค็มด้วยไข่เค็มตรงกลาง รสชาติเข้มข้นหวานมันกลมกล่อม",
    highlights: ["ไส้ถั่วกวนไข่เค็ม", "รสชาติเข้มข้น"],
    images: productImages("pia-bean-egg", 1, "jpg"),
    pricePerPiece: 5,
    packOptions: [
      { id: "pack", label: "ห่อเล็ก (8 ชิ้น)", pieceCount: 8, price: 40 },
      { id: "tub", label: "ยกกระปุก (40 ชิ้น)", pieceCount: 40, price: 180 }
    ],
    ingredients: ["แป้งสาลี", "ถั่วเหลืองกวน", "ไข่เค็ม", "น้ำตาล"],
    storageInstructions: "เก็บในที่แห้ง พ้นแสงแดดโดยตรง",
    stockStatus: "in_stock",
    featured: true
  },
  {
    id: "p7",
    slug: "pia-bean",
    name: "ขนมเปี๊ยะไส้ถั่ว",
    category: "ขนมเปี๊ยะ",
    description: "ขนมเปี๊ยะไส้ถั่วเหลืองกวนสูตรคลาสสิก แป้งนุ่ม ไม่หวานจัด ทานง่ายทุกวัย",
    highlights: ["สูตรคลาสสิก", "ไม่หวานจัด"],
    images: productImages("pia-bean", 1, "jpg"),
    pricePerPiece: 4,
    packOptions: [
      { id: "pack", label: "ห่อเล็ก (8 ชิ้น)", pieceCount: 8, price: 32 },
      { id: "tub", label: "ยกกระปุก (40 ชิ้น)", pieceCount: 40, price: 144 }
    ],
    ingredients: ["แป้งสาลี", "ถั่วเหลืองกวน", "น้ำตาล", "น้ำมันพืช"],
    storageInstructions: "เก็บในที่แห้ง พ้นแสงแดดโดยตรง",
    stockStatus: "in_stock",
    featured: false
  },
  {
    id: "p8",
    slug: "duck-neck",
    name: "ขนมคอเป็ด",
    category: "ขนมคอเป็ด",
    description: "ขนมแป้งทอดกรอบรูปทรงบิดเกลียวเอกลักษณ์ โรยน้ำตาลทรายบางๆ หอมกรอบ ทานเพลิน",
    highlights: ["แป้งกรอบทอดใหม่", "รูปทรงเอกลักษณ์"],
    images: productImages("duck-neck", 1, "svg"),
    pricePerPiece: 3,
    packOptions: [
      { id: "pack", label: "ห่อเล็ก (8 ชิ้น)", pieceCount: 8, price: 24 },
      { id: "tub", label: "ยกกระปุก (40 ชิ้น)", pieceCount: 40, price: 108 }
    ],
    ingredients: ["แป้งสาลี", "น้ำตาลทราย", "น้ำมันพืช"],
    storageInstructions: "เก็บในที่แห้ง พ้นแสงแดดโดยตรง",
    stockStatus: "in_stock",
    featured: false
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
