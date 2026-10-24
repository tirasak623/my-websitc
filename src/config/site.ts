/**
 * ค่าตั้งค่าหลักของเว็บไซต์และช่องทางติดต่อ
 * แก้ไขค่าในไฟล์นี้ได้ทันทีเมื่อมีข้อมูลจริงจากโรงงาน
 * ค่าที่เป็น null หมายถึง "ยังไม่ได้ตั้งค่า" — ปุ่มที่เกี่ยวข้องจะถูกปิดหรือแสดงข้อความแจ้งเตือนอัตโนมัติ
 */

export const siteConfig = {
  siteName: "Snack Factory Review",
  factoryName: "โรงงานขนม (รอชื่อทางการจากโรงงาน)",

  /** วางลิงก์ Facebook Page จริง เช่น "https://www.facebook.com/yourpage" */
  facebookUrl: null as string | null,

  /** วางลิงก์ Messenger จริง เช่น "https://m.me/yourpage" */
  messengerUrl: null as string | null,

  /** เบอร์โทรศัพท์ติดต่อ เช่น "081-234-5678" */
  phone: null as string | null,

  /** อีเมลติดต่อ เช่น "contact@example.com" */
  email: null as string | null
};

export type SiteConfig = typeof siteConfig;
