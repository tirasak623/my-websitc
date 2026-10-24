# Snack Factory Review

เว็บไซต์รีวิวสินค้าโรงงานขนม สร้างด้วย React + Vite + TypeScript + Tailwind CSS
รวมข้อมูลสินค้า ราคา และวิดีโอรีวิว เพื่อช่วยให้ลูกค้าเลือกขนมที่เหมาะกับความต้องการ

> ⚠️ **สำคัญ**: ข้อมูลสินค้า โรงงาน และราคาทั้งหมดในโปรเจกต์นี้เป็น **ข้อมูลตัวอย่าง (sample data)**
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

### 1. แก้ไขข้อมูลโรงงาน

แก้ไขไฟล์ `src/data/factory.ts`

```ts
export const factory: Factory = {
  name: "ชื่อโรงงานจริง",
  description: "ประวัติความเป็นมาของโรงงาน...",
  foundedYear: 2015,
  address: "ที่ตั้งโรงงาน...",
  // ...
};
```

ฟิลด์ที่เป็น `null` จะแสดงข้อความ "ยังไม่มีข้อมูล" บนเว็บไซต์โดยอัตโนมัติ — **ห้ามใส่ข้อมูลที่ไม่ยืนยันแล้วลงไปเป็นข้อเท็จจริง**

### 2. เพิ่ม/แก้ไขสินค้า

แก้ไขไฟล์ `src/data/products.ts` เพิ่ม object ใหม่ในอาร์เรย์ `products`

```ts
{
  id: "p9",
  slug: "new-snack",       // ใช้เป็นส่วนหนึ่งของ URL เช่น /products/new-snack
  name: "ชื่อสินค้าใหม่",
  category: "ขนมอบ",
  description: "คำอธิบายสินค้า...",
  images: ["/images/products/your-image.jpg"],
  price: 99,
  priceUnit: "บาทต่อแพ็ก",
  featured: false,
  reviewVideoIds: []
}
```

นำรูปภาพสินค้าไปวางไว้ในโฟลเดอร์ `public/images/products/` แล้วอ้างอิง path แบบ `/images/products/ชื่อไฟล์.jpg`

### 3. เปลี่ยนราคา

แก้ไขค่า `price` (ราคาปกติ), `promoPrice` (ราคาโปรโมชั่น), หรือ `wholesalePrice` (ราคาขายส่ง) ของสินค้านั้นในไฟล์ `src/data/products.ts`
ถ้ายังไม่มีราคาแน่นอน ให้ตั้งค่า `price: null` ระบบจะแสดง "สอบถามราคา" ให้อัตโนมัติ

### 4. เพิ่มวิดีโอ YouTube

แก้ไขไฟล์ `src/data/reviews.ts` เพิ่ม object ใหม่ในอาร์เรย์ `reviewVideos`

```ts
{
  id: "r1",
  title: "รีวิวคุกกี้เนยสด",
  description: "พาชมความกรอบของคุกกี้เนยสด",
  youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
  productId: "p1",            // ผูกกับ id สินค้าที่เกี่ยวข้อง (ไม่บังคับ)
  publishedAt: "2026-01-15"
}
```

ระบบจะตรวจสอบ `youtubeUrl` อัตโนมัติก่อนฝังวิดีโอ รองรับ URL รูปแบบ `youtube.com/watch?v=...`, `youtu.be/...`, `youtube.com/shorts/...`
ถ้ายังไม่มีวิดีโอ หน้า "วิดีโอรีวิว" จะแสดง Empty State ให้อัตโนมัติ

### 5. เปลี่ยน Facebook Page / ช่องทางติดต่อ

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
    home/        ส่วนประกอบหน้าแรก (Hero, FactoryIntro, FeaturedProducts, ...)
    products/    การ์ดสินค้า, ตัวกรอง, แกลเลอรีรูปสินค้า
    reviews/     การ์ดวิดีโอ, ตัวเล่นวิดีโอ (modal)
    common/      Button, SectionHeading, EmptyState, LoadingState, ErrorBoundary, Seo
  pages/         แต่ละหน้าของเว็บไซต์ (ผูกกับ route ใน src/App.tsx)
  data/          ข้อมูลสินค้า/โรงงาน/วิดีโอ (แก้ตรงนี้เมื่อมีข้อมูลจริง)
  config/        ค่าตั้งค่าเว็บไซต์ (Facebook, เบอร์โทร, อีเมล)
  types/         TypeScript interfaces ของ Product, Factory, ReviewVideo
  utils/         ฟังก์ชันช่วย เช่น formatPrice, youtube URL validation
```

---

## การต่อยอดในอนาคต (Backend / Supabase)

เวอร์ชันนี้ใช้ข้อมูลตัวอย่างแบบ static (`src/data/*.ts`) เพื่อให้เปิดใช้งานได้ทันทีโดยไม่ต้องมี backend
เมื่อต้องการเชื่อมต่อฐานข้อมูลจริง (เช่น [Supabase](https://supabase.com)) ในอนาคต แนะนำแนวทางดังนี้:

1. สร้างตารางใน Supabase ให้โครงสร้างตรงกับ TypeScript interfaces ใน `src/types/index.ts` (`Product`, `Factory`, `ReviewVideo`)
2. แทนที่ฟังก์ชันใน `src/data/*.ts` ด้วยการเรียก Supabase client (เช่น `supabase.from("products").select()`) — เพราะ UI เรียกใช้ผ่านฟังก์ชัน (`getProductBySlug`, `getRelatedProducts` ฯลฯ) อยู่แล้ว จึงไม่ต้องแก้ UI ใหม่ทั้งหมด
3. เก็บ Supabase URL/Key ไว้ใน Environment Variables (`.env`, ใช้ prefix `VITE_` เพื่อให้ Vite เห็นค่า) **ห้ามใส่ Service Role Key หรือ Secret Key ฝั่ง Frontend โดยเด็ดขาด** ใช้ Anon Key ที่เปิด Row Level Security (RLS) แทน
4. เปิดใช้ Row Level Security บนทุกตาราง และกำหนด policy ให้ฝั่งสาธารณะอ่านได้อย่างเดียว (read-only)
5. ถ้าต้องมีหน้า Admin สำหรับแก้ไขข้อมูล ให้ใช้ Supabase Auth ยืนยันตัวตนผู้ดูแลก่อนอนุญาตให้เขียนข้อมูล และตรวจสอบข้อมูลฝั่ง Server (ผ่าน RLS policy หรือ Edge Function) เสมอ อย่าเชื่อการตรวจสอบฝั่ง Frontend เพียงอย่างเดียว
6. การอัปโหลดรูปภาพสินค้า ให้ใช้ Supabase Storage พร้อมจำกัดประเภทไฟล์และขนาดไฟล์ฝั่ง Server
7. ฟอร์มติดต่อ (`src/pages/ContactPage.tsx`) เมื่อเชื่อม backend จริง ควรเพิ่มการป้องกันสแปม (เช่น rate limiting, CAPTCHA หรือ honeypot field) ก่อนบันทึกข้อมูลลงฐานข้อมูล

ไม่จำเป็นต้องสร้างระบบ Admin หรือฐานข้อมูลในเวอร์ชันนี้ — เพิ่มได้ภายหลังตามแนวทางข้างต้นโดยไม่ต้องรื้อโครงสร้าง UI

---

## หมายเหตุด้าน SEO และประสิทธิภาพ

- ตั้งค่า `<title>` และ meta description ต่อหน้าผ่าน component `<Seo />`
- รองรับ Open Graph metadata พื้นฐาน (og:title, og:description, og:type)
- ใช้ Semantic HTML และ alt text ครบทุกรูปภาพ
- รูปภาพและวิดีโอนอกหน้าจอใช้ `loading="lazy"`
- แต่ละหน้าถูกแบ่งโค้ด (code-splitting) ด้วย `React.lazy` เพื่อลดขนาดไฟล์ที่โหลดครั้งแรก
- **หมายเหตุ**: คะแนน SEO/Performance จริง (เช่น Lighthouse) ยังไม่ได้ทดสอบในสภาพแวดล้อมนี้ กรุณาทดสอบด้วยเครื่องมือจริงก่อนเปิดใช้งาน
