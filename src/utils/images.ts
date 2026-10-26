/**
 * ช่วยสร้างลิสต์ path รูปภาพสินค้าจากไฟล์ที่เรียงเลขไว้ในโฟลเดอร์ของสินค้านั้น
 * วิธีเพิ่ม/จัดการรูปสินค้า: วางไฟล์รูปไว้ที่ public/images/products/<slug>/1.jpg, 2.jpg, 3.jpg, ...
 * แล้วเรียก productImages("<slug>", จำนวนรูปทั้งหมด) — ไม่ต้องพิมพ์ path ของแต่ละรูปเอง
 * เพิ่มรูปใหม่ = วางไฟล์เลขถัดไปในโฟลเดอร์ + เพิ่มจำนวนในอาร์กิวเมนต์ที่สอง
 */
export function productImages(slug: string, count: number, extension = "jpg"): string[] {
  return Array.from({ length: count }, (_, index) => `/images/products/${slug}/${index + 1}.${extension}`);
}
