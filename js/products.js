/**
 * ข้อมูลสินค้าจำลองทั้งหมดของร้าน
 * ทุกหน้า (index, products, cart, checkout) import ไฟล์นี้เพื่อใช้ข้อมูลสินค้าชุดเดียวกัน
 */

const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "electronics",
    price: 1290,
    oldPrice: 1890,
    image: "assets/images/product-1.svg",
    description: "หูฟังไร้สายตัดเสียงรบกวน เสียงคมชัด แบตเตอรี่ใช้งานต่อเนื่อง 24 ชั่วโมง เชื่อมต่อบลูทูธ 5.3",
    rating: 4.7,
    stock: 25
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "electronics",
    price: 2590,
    oldPrice: 3290,
    image: "assets/images/product-2.svg",
    description: "นาฬิกาอัจฉริยะวัดชีพจร วัดออกซิเจนในเลือด แจ้งเตือนข้อความ กันน้ำ IP68",
    rating: 4.5,
    stock: 14
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "fashion",
    price: 1590,
    oldPrice: 1990,
    image: "assets/images/product-3.svg",
    description: "รองเท้าวิ่งน้ำหนักเบา พื้นรองเท้าซับแรงกระแทก ระบายอากาศได้ดี เหมาะกับการวิ่งระยะไกล",
    rating: 4.8,
    stock: 40
  },
  {
    id: 4,
    name: "Travel Backpack",
    category: "fashion",
    price: 890,
    oldPrice: 1190,
    image: "assets/images/product-4.svg",
    description: "กระเป๋าเป้สะพายหลัง กันน้ำ มีช่องใส่โน้ตบุ๊ก 15.6 นิ้ว เหมาะสำหรับเดินทางและใช้ในชีวิตประจำวัน",
    rating: 4.6,
    stock: 32
  },
  {
    id: 5,
    name: "Sunglasses",
    category: "fashion",
    price: 590,
    oldPrice: 790,
    image: "assets/images/product-5.svg",
    description: "แว่นกันแดดเลนส์โพลาไรซ์ ป้องกันรังสี UV400 ทรงคลาสสิกใส่ได้ทุกเพศ",
    rating: 4.3,
    stock: 50
  },
  {
    id: 6,
    name: "Digital Camera",
    category: "electronics",
    price: 8900,
    oldPrice: 10900,
    image: "assets/images/product-6.svg",
    description: "กล้องดิจิทัลมิลเลอร์เลส เซนเซอร์ 24MP ถ่ายวิดีโอ 4K พร้อมเลนส์คิท 18-55mm",
    rating: 4.9,
    stock: 8
  },
  {
    id: 7,
    name: "Casual Sneakers",
    category: "fashion",
    price: 1190,
    oldPrice: 1490,
    image: "assets/images/product-7.svg",
    description: "รองเท้าผ้าใบลำลอง ดีไซน์เรียบง่าย สวมใส่สบาย เหมาะกับทุกชุด",
    rating: 4.4,
    stock: 60
  },
  {
    id: 8,
    name: "Insulated Water Bottle",
    category: "home",
    price: 390,
    oldPrice: 490,
    image: "assets/images/product-8.svg",
    description: "กระบอกน้ำสแตนเลสเก็บความเย็น 24 ชั่วโมง เก็บความร้อน 12 ชั่วโมง ความจุ 750ml",
    rating: 4.6,
    stock: 70
  }
];

/** ดึงสินค้าจาก id */
function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

/** ฟอร์แมตราคาเป็นสกุลเงินบาท เช่น 1,290 */
function formatPrice(number) {
  return Number(number).toLocaleString("th-TH");
}
