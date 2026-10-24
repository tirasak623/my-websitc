import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { factory } from "@/data/factory";

export function FactoryIntro() {
  const hasFoundedYear = factory.foundedYear !== null;

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
      <div className="rounded-3xl overflow-hidden">
        <img
          src={factory.images[0]?.url ?? "/images/factory/placeholder.svg"}
          alt={factory.images[0]?.caption ?? "รอรูปภาพจากโรงงาน"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div>
        <p className="text-orange-dark font-semibold uppercase tracking-wide text-sm mb-2">
          รู้จักโรงงานของเรา
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
          {factory.name ?? "รอข้อมูลชื่อโรงงานจากผู้ประกอบการ"}
        </h2>
        <p className="text-charcoal/70 mb-6">
          {factory.description ?? "ยังไม่มีข้อมูลประวัติโรงงาน รอการอัปเดตจากทางโรงงาน"}
        </p>

        <dl className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/70 rounded-xl p-4">
            <dt className="text-xs text-charcoal/50 mb-1">ปีที่ก่อตั้ง</dt>
            <dd className="font-semibold text-charcoal">
              {hasFoundedYear ? factory.foundedYear : "ยังไม่มีข้อมูล"}
            </dd>
          </div>
          <div className="bg-white/70 rounded-xl p-4">
            <dt className="text-xs text-charcoal/50 mb-1">ประเภทขนมที่ผลิต</dt>
            <dd className="font-semibold text-charcoal">
              {factory.productCategories.length > 0
                ? factory.productCategories.join(", ")
                : "ยังไม่มีข้อมูล"}
            </dd>
          </div>
        </dl>

        <Button to="/factory" variant="outline" icon={<ArrowRight size={18} aria-hidden="true" />}>
          รู้จักโรงงานเพิ่มเติม
        </Button>
      </div>
    </section>
  );
}
