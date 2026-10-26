import { ShoppingBag } from "lucide-react";
import { FacebookIcon } from "@/components/common/FacebookIcon";
import { Button } from "@/components/common/Button";
import { siteConfig } from "@/config/site";

export function CtaSection() {
  return (
    <section className="bg-cocoa">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-cream mb-3">
          พร้อมสั่งซื้อขนมอร่อยแล้วหรือยัง?
        </h2>
        <p className="text-cream/70 mb-8">
          เลือกชม ใส่ตะกร้า และสั่งซื้อได้ทันทีจากหน้าเว็บไซต์
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button to="/products" variant="secondary" size="lg" icon={<ShoppingBag size={18} aria-hidden="true" />}>
            เลือกซื้อสินค้า
          </Button>
          {siteConfig.facebookUrl && (
            <a
              href={siteConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 px-8 py-4 text-lg border-2 border-cream/40 text-cream hover:bg-cream/10"
            >
              <FacebookIcon size={18} />
              ติดต่อผ่าน Facebook
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
