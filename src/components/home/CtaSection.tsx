import { FacebookIcon } from "@/components/common/FacebookIcon";
import { Button } from "@/components/common/Button";
import { siteConfig } from "@/config/site";

export function CtaSection() {
  return (
    <section className="bg-cocoa">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-cream mb-3">
          สนใจสินค้าหรืออยากทราบราคาล่าสุด?
        </h2>
        <p className="text-cream/70 mb-8">
          ทีมงานพร้อมตอบคำถามและให้ข้อมูลสินค้าผ่านช่องทาง Facebook
        </p>

        {siteConfig.facebookUrl ? (
          <Button
            href={siteConfig.facebookUrl}
            variant="secondary"
            size="lg"
            icon={<FacebookIcon size={18} />}
          >
            ติดต่อผ่าน Facebook
          </Button>
        ) : (
          <p className="text-cream/50 text-sm">
            ยังไม่ได้ตั้งค่า Facebook Page — โปรดเพิ่มลิงก์ใน{" "}
            <code className="bg-cream/10 px-1.5 py-0.5 rounded">src/config/site.ts</code>
          </p>
        )}
      </div>
    </section>
  );
}
