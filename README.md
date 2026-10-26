# Snack Factory Review

เว็บไซต์รีวิวสินค้าโรงงานขนม สร้างด้วย React + Vite + TypeScript + Tailwind CSS
รวมข้อมูลสินค้า ราคา และรีวิวรูปภาพจากลูกค้า เพื่อช่วยให้ลูกค้าเลือกขนมที่เหมาะกับความต้องการ

> ⚠️ **สำคัญ**: ข้อมูลสินค้าและราคาทั้งหมดในโปรเจกต์นี้เป็น **ข้อมูลตัวอย่าง (sample data)**
> สำหรับสาธิตการทำงานของเว็บไซต์เท่านั้น ยังไม่ใช่ข้อมูลจริง กรุณาแก้ไขให้เป็นข้อมูลจริงก่อนเปิดใช้งาน
> (ดูวิธีแก้ไขในหัวข้อด้านล่าง)

## เทคโนโลยีที่ใช้

- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS v4
- React Router v7
- lucide-react (ไอคอน)
- motion (แอนิเมชัน)

## วิธีติดตั้ง

ต้องมี [Node.js](https://nodejs.org) เวอร์ชัน 18 ขึ้นไป

```bash
npm install
```

## วิธีเปิดเว็บไซต์ (Development)

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ลิงก์ที่แสดงในเทอร์มินัล (ปกติคือ `http://localhost:5173`)

## ตรวจสอบ TypeScript

```bash
npm run lint
```

## Build สำหรับ Production

```bash
npm run build
```

ไฟล์ที่ build แล้วจะอยู่ในโฟลเดอร์ `dist/` ดูตัวอย่างผลลัพธ์ก่อน deploy ได้ด้วย:

```bash
npm run preview
```

---

## วิธีแก้ไขข้อมูล

ข้อมูลทั้งหมดแยกออกจาก UI ไว้ในโฟลเดอร์ `src/data/` และ `src/config/` แก้ไขค่าตรงนั้นได้ทันทีโดยไม่ต้องแก้โค้ด UI

### 1. เพิ่ม/แก้ไขสินค้าและรูปภาพสินค้า

แก้ไขไฟล์ `src/data/products.ts` เพิ่ม object ใหม่ในอาร์เรย์ `products`

```ts
{
  id: "p9",
  slug: "new-snack",       // ใช้เป็นส่วนหนึ่งของ URL เช่น /products/new-snack และเป็นชื่อโฟลเดอร์รูปภาพ
  name: "ชื่อสินค้าใหม่",
  category: "ขนมอบ",
  description: "คำอธิบายสินค้า...",
  images: productImages("new-snack", 2),  // มีรูป 2 รูป: 1.jpg, 2.jpg
  pricePerPiece: 5,          // ราคาต่อชิ้น ใช้แสดงเป็นป้ายราคาหลักบนการ์ดสินค้า
  packOptions: [
    { id: "pack", label: "ห่อเล็ก (8 ชิ้น)", pieceCount: 8, price: 40 },
    { id: "tub", label: "ยกกระปุก (40 ชิ้น)", pieceCount: 40, price: 180 }
  ],
  featured: false
}
```

**วิธีจัดการรูปภาพสินค้า (ไม่ต้องพิมพ์ path เอง):**

1. สร้างโฟลเดอร์ใหม่ชื่อเดียวกับ `slug` ของสินค้าไว้ที่ `public/images/products/<slug>/`
2. วางไฟล์รูปภาพในโฟลเดอร์นั้น โดยตั้งชื่อไฟล์เป็นเลขเรียงกัน เช่น `1.jpg`, `2.jpg`, `3.jpg`
3. ในไฟล์ `products.ts` ใช้ `images: productImages("<slug>", จำนวนรูปทั้งหมด)` — ระบบจะสร้าง path ให้ทั้งหมดอัตโนมัติ
4. เพิ่มรูปใหม่ภายหลัง = วางไฟล์เลขถัดไปในโฟลเดอร์เดิม แล้วแก้จำนวนในอาร์กิวเมนต์ที่สองของ `productImages(...)`
5. ถ้าไฟล์รูปเป็นนามสกุลอื่นที่ไม่ใช่ `.jpg` (เช่น `.png`, `.webp`, `.svg`) ให้ระบุนามสกุลเป็นอาร์กิวเมนต์ที่สาม เช่น `productImages("new-snack", 2, "png")`

ฟังก์ชัน `productImages` อยู่ในไฟล์ `src/utils/images.ts`

### 2. เปลี่ยนราคา

แก้ไขค่า `pricePerPiece` (ราคาต่อชิ้น ใช้เป็นป้ายราคาหลักบนการ์ดสินค้า) และ `packOptions` (ตัวเลือกห่อเล็ก/ยกกระปุก พร้อมราคาของแต่ละตัวเลือก) ของสินค้านั้นในไฟล์ `src/data/products.ts`
ราคาทุกตัวต้องเป็นตัวเลขจริงเสมอ (ไม่มี `null`) เพราะลูกค้ากดเพิ่มลงตะกร้าและสั่งซื้อได้ทันทีจากหน้าเว็บ

### 3. ตะกร้าสินค้าและการสั่งซื้อ

ลูกค้าเลือกขนาดการซื้อ (ห่อเล็ก/ยกกระปุก) แล้วกด "เพิ่มลงตะกร้า" บนการ์ดสินค้าหรือหน้ารายละเอียดสินค้าได้ทันที
ตะกร้าสินค้าเก็บไว้ใน `localStorage` ของเบราว์เซอร์ลูกค้าเอง (ดู `src/context/CartContext.tsx`) และยังไม่เชื่อมต่อระบบรับคำสั่งซื้อจริง —
หน้า `/checkout` จะให้ลูกค้ากรอกข้อมูลผู้สั่งซื้อและแสดงสรุปคำสั่งซื้อในโหมดทดสอบ (Demo) โดยแนะนำให้ลูกค้ายืนยันคำสั่งซื้อผ่าน Facebook ของร้าน
ถ้าต้องการเชื่อมต่อระบบรับคำสั่งซื้อจริง ให้แก้ `handleSubmit` ในไฟล์ `src/pages/CheckoutPage.tsx` ให้ส่งข้อมูลไปยัง backend/บริการที่ต้องการ

### 4. รีวิวรูปภาพจากลูกค้า

หน้า "รีวิวรูปภาพ" (`/reviews`) มีฟอร์มให้ลูกค้ากรอกชื่อ ข้อความรีวิว และแนบรูปภาพได้เองโดยตรงบนเว็บไซต์ ไม่ต้องแก้โค้ด

> ⚠️ **ข้อจำกัดปัจจุบัน**: เว็บไซต์เวอร์ชันนี้ยังไม่มีฐานข้อมูลส่วนกลาง รีวิวที่ลูกค้ากรอกจะถูกบันทึกไว้ใน
> `localStorage` ของเบราว์เซอร์คนที่กรอกเท่านั้น (ดูไฟล์ `src/utils/photoReviews.ts`) — **ยังไม่แสดงให้ลูกค้าคนอื่นเห็น**
> หากต้องการให้รีวิวของลูกค้าทุกคนแสดงร่วมกันแบบสาธารณะจริง ต้องเพิ่มฐานข้อมูล/พื้นที่เก็บไฟล์ส่วนกลาง
> (เช่น Supabase ตามแนวทางในหัวข้อ "การต่อยอดในอนาคต" ด้านล่าง) แล้วแทนที่ฟังก์ชันใน `src/utils/photoReviews.ts`

หากต้องการเพิ่มรีวิวถาวรที่แสดงให้ทุกคนเห็นทันที (เช่น รีวิวที่ทางร้านคัดเลือกเอง) ให้แก้ไขไฟล์ `src/data/reviews.ts` เพิ่ม object ใหม่ในอาร์เรย์ `photoReviews`:

```ts
{
  id: "r1",
  customerName: "คุณสมหญิง",
  reviewText: "คุกกี้กรอบมาก อร่อยถูกใจมาก",
  photoUrl: "/images/reviews/your-photo.jpg",  // วางไฟล์ไว้ที่ public/images/reviews/
  productId: "p1",            // ผูกกับ id สินค้าที่เกี่ยวข้อง (ไม่บังคับ)
  createdAt: "2026-01-15"
}
```

### 4. เปลี่ยน Facebook Page / ช่องทางติดต่อ

แก้ไขไฟล์ `src/config/site.ts`

```ts
export const siteConfig = {
  siteName: "Snack Factory Review",
  factoryName: "ชื่อโรงงาน",
  facebookUrl: "https://www.facebook.com/yourpage",
  messengerUrl: "https://m.me/yourpage",
  phone: "081-234-5678",
  email: "contact@example.com"
};
```

ปุ่มติดต่อทุกปุ่มในเว็บไซต์ (Navbar, หน้าแรก, หน้าติดต่อเรา, footer) จะอัปเดตลิงก์ตามค่านี้โดยอัตโนมัติ
ถ้าค่าใดเป็น `null` ปุ่ม/ลิงก์ที่เกี่ยวข้องจะแสดงข้อความแจ้งว่ายังไม่ได้ตั้งค่า แทนการใช้ลิงก์ปลอม

---

## วิธี Deploy เว็บไซต์

### Deploy บน Vercel

1. Push โค้ดขึ้น GitHub repository
2. ไปที่ [vercel.com](https://vercel.com) → New Project → เลือก repository นี้
3. Vercel จะตรวจพบ Vite โดยอัตโนมัติ (Build Command: `npm run build`, Output Directory: `dist`)
4. กด Deploy

ไฟล์ `vercel.json` ในโปรเจกต์นี้ตั้งค่า rewrite ให้ React Router ทำงานถูกต้องเมื่อรีเฟรชหน้าย่อย (เช่น `/products/butter-cookie`) ไว้ให้แล้ว

### Deploy บน Netlify

1. Push โค้ดขึ้น GitHub repository
2. ไปที่ [netlify.com](https://netlify.com) → Add new site → Import from Git
3. Build Command: `npm run build`, Publish Directory: `dist`
4. ไฟล์ `public/_redirects` ตั้งค่า rewrite สำหรับ React Router ไว้ให้แล้ว

---

## โครงสร้างโปรเจกต์

```
src/
  components/
    layout/      Navbar, MobileMenu, Footer
    home/        ส่วนประกอบหน้าแรก (Hero, FeaturedProducts, LatestReviews, ...)
    products/    การ์ดสินค้า, ตัวกรอง, แกลเลอรีรูปสินค้า
    reviews/     การ์ดรีวิวรูปภาพ, ฟอร์มเขียนรีวิว, ตัวดูรูปขยาย (lightbox)
    common/      Button, SectionHeading, EmptyState, LoadingState, ErrorBoundary, Seo
  pages/         แต่ละหน้าของเว็บไซต์ (ผูกกับ route ใน src/App.tsx)
  data/          ข้อมูลสินค้า/รีวิวรูปภาพถาวร (แก้ตรงนี้เมื่อมีข้อมูลจริง)
  config/        ค่าตั้งค่าเว็บไซต์ (Facebook, เบอร์โทร, อีเมล)
  types/         TypeScript interfaces ของ Product, PhotoReview
  utils/         ฟังก์ชันช่วย เช่น formatPrice, productImages (จัดการ path รูปสินค้า), photoReviews (localStorage)
```

---

## การต่อยอดในอนาคต (Backend / Supabase)

เวอร์ชันนี้ใช้ข้อมูลตัวอย่างแบบ static (`src/data/*.ts`) เพื่อให้เปิดใช้งานได้ทันทีโดยไม่ต้องมี backend
เมื่อต้องการเชื่อมต่อฐานข้อมูลจริง (เช่น [Supabase](https://supabase.com)) ในอนาคต แนะนำแนวทางดังนี้:

1. สร้างตารางใน Supabase ให้โครงสร้างตรงกับ TypeScript interfaces ใน `src/types/index.ts` (`Product`, `PhotoReview`)
2. แทนที่ฟังก์ชันใน `src/data/*.ts` และ `src/utils/photoReviews.ts` ด้วยการเรียก Supabase client (เช่น `supabase.from("products").select()`, `supabase.from("photo_reviews").insert()`) — เพราะ UI เรียกใช้ผ่านฟังก์ชัน (`getProductBySlug`, `getRelatedProducts`, `getAllPhotoReviews` ฯลฯ) อยู่แล้ว จึงไม่ต้องแก้ UI ใหม่ทั้งหมด
3. เก็บ Supabase URL/Key ไว้ใน Environment Variables (`.env`, ใช้ prefix `VITE_` เพื่อให้ Vite เห็นค่า) **ห้ามใส่ Service Role Key หรือ Secret Key ฝั่ง Frontend โดยเด็ดขาด** ใช้ Anon Key ที่เปิด Row Level Security (RLS) แทน
4. เปิดใช้ Row Level Security บนทุกตาราง และกำหนด policy ให้ฝั่งสาธารณะอ่านได้อย่างเดียว (read-only) ส่วนการเขียนรีวิวใหม่อาจเปิด insert แบบจำกัด (เช่น ผ่าน rate limit) แทนการเปิดให้เขียนอิสระ
5. ถ้าต้องมีหน้า Admin สำหรับแก้ไขข้อมูลสินค้า ให้ใช้ Supabase Auth ยืนยันตัวตนผู้ดูแลก่อนอนุญาตให้เขียนข้อมูล และตรวจสอบข้อมูลฝั่ง Server (ผ่าน RLS policy หรือ Edge Function) เสมอ อย่าเชื่อการตรวจสอบฝั่ง Frontend เพียงอย่างเดียว
6. การอัปโหลดรูปภาพสินค้าและรูปรีวิวจากลูกค้า ให้ใช้ Supabase Storage พร้อมจำกัดประเภทไฟล์และขนาดไฟล์ฝั่ง Server (ปัจจุบันฟอร์มรีวิวจำกัดเฉพาะไฟล์ JPG/PNG/WEBP/GIF ขนาดไม่เกิน 4MB ไว้ที่ฝั่ง Frontend เท่านั้น ต้องตรวจซ้ำฝั่ง Server ด้วยเมื่อมี backend จริง)
7. ฟอร์มติดต่อ (`src/pages/ContactPage.tsx`) และฟอร์มเขียนรีวิว (`src/components/reviews/PhotoReviewForm.tsx`) เมื่อเชื่อม backend จริง ควรเพิ่มการป้องกันสแปม (เช่น rate limiting, CAPTCHA หรือ honeypot field) ก่อนบันทึกข้อมูลลงฐานข้อมูล

ไม่จำเป็นต้องสร้างระบบ Admin หรือฐานข้อมูลในเวอร์ชันนี้ — เพิ่มได้ภายหลังตามแนวทางข้างต้นโดยไม่ต้องรื้อโครงสร้าง UI

---

## หมายเหตุด้าน SEO และประสิทธิภาพ

- ตั้งค่า `<title>` และ meta description ต่อหน้าผ่าน component `<Seo />`
- รองรับ Open Graph metadata พื้นฐาน (og:title, og:description, og:type)
- ใช้ Semantic HTML และ alt text ครบทุกรูปภาพ
- รูปภาพนอกหน้าจอใช้ `loading="lazy"`
- แต่ละหน้าถูกแบ่งโค้ด (code-splitting) ด้วย `React.lazy` เพื่อลดขนาดไฟล์ที่โหลดครั้งแรก
- **หมายเหตุ**: คะแนน SEO/Performance จริง (เช่น Lighthouse) ยังไม่ได้ทดสอบในสภาพแวดล้อมนี้ กรุณาทดสอบด้วยเครื่องมือจริงก่อนเปิดใช้งาน
