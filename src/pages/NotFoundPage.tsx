import { Cookie } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { Button } from "@/components/common/Button";

export default function NotFoundPage() {
  return (
    <>
      <Seo title="ไม่พบหน้าที่ต้องการ" description="ไม่พบหน้าหรือสินค้าที่คุณค้นหา" />
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-full bg-orange/20 text-cocoa flex items-center justify-center mb-6">
          <Cookie size={30} aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-bold text-charcoal mb-2">404</h1>
        <p className="text-charcoal/70 mb-8 max-w-sm">
          ไม่พบหน้าหรือสินค้าที่คุณค้นหา อาจถูกลบหรือย้ายไปแล้ว
        </p>
        <Button to="/products">กลับไปหน้าสินค้าทั้งหมด</Button>
      </section>
    </>
  );
}
