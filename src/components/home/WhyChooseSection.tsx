import { LayoutGrid, SlidersHorizontal, Image as ImageIcon, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

const REASONS = [
  {
    icon: LayoutGrid,
    title: "ข้อมูลสินค้าเป็นหมวดหมู่",
    description: "สินค้าทุกรายการจัดกลุ่มตามหมวดหมู่ ช่วยให้ค้นหาได้ง่ายและรวดเร็ว"
  },
  {
    icon: SlidersHorizontal,
    title: "เปรียบเทียบรายละเอียดได้ง่าย",
    description: "ดูราคาและรายละเอียดสินค้าแต่ละรายการเพื่อเปรียบเทียบก่อนตัดสินใจ"
  },
  {
    icon: ImageIcon,
    title: "รับชมรีวิวรูปภาพได้",
    description: "มีรีวิวรูปภาพจากลูกค้าจริงประกอบ ช่วยให้เห็นภาพสินค้าจริงก่อนสอบถามหรือสั่งซื้อ"
  },
  {
    icon: MessageCircle,
    title: "สั่งซื้อได้ทันทีจากเว็บไซต์",
    description: "เลือกขนาดการซื้อ ใส่ตะกร้า และสั่งซื้อได้เลย หรือสอบถามเพิ่มเติมผ่านเพจ Facebook"
  }
];

export function WhyChooseSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionHeading
          align="center"
          eyebrow="ทำไมต้องใช้เว็บไซต์นี้"
          title="ช่วยให้คุณเลือกขนมได้ง่ายขึ้น"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((reason) => (
            <div key={reason.title} className="text-center px-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-orange/15 text-cocoa flex items-center justify-center mb-4">
                <reason.icon size={24} aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-charcoal mb-1.5">{reason.title}</h3>
              <p className="text-sm text-charcoal/60">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
