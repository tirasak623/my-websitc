import { MapPin, Calendar, Factory as FactoryIcon } from "lucide-react";
import { FacebookIcon } from "@/components/common/FacebookIcon";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { factory } from "@/data/factory";

function InfoRow({
  icon: Icon,
  label,
  value
}: {
  icon: typeof MapPin;
  label: string;
  value: string | number | null;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-cocoa/10 last:border-0">
      <Icon size={18} className="text-cocoa mt-0.5" aria-hidden="true" />
      <div>
        <p className="text-xs text-charcoal/50">{label}</p>
        <p className="font-medium text-charcoal">
          {value ?? <span className="text-charcoal/40">ยังไม่มีข้อมูล</span>}
        </p>
      </div>
    </div>
  );
}

export default function FactoryPage() {
  return (
    <>
      <Seo
        title="เกี่ยวกับโรงงาน"
        description="ข้อมูลโรงงาน ที่ตั้ง ประวัติความเป็นมา และขั้นตอนการผลิตขนม"
      />

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading
          eyebrow="เกี่ยวกับโรงงาน"
          title={factory.name ?? "รอข้อมูลชื่อโรงงาน"}
        />

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10">
          <div>
            <div className="rounded-3xl overflow-hidden mb-6">
              <img
                src={factory.images[0]?.url ?? "/images/factory/placeholder.svg"}
                alt={factory.images[0]?.caption ?? "รอรูปภาพจากโรงงาน"}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <h2 className="text-xl font-bold text-charcoal mb-3">ประวัติความเป็นมา</h2>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              {factory.description ?? "ยังไม่มีข้อมูลประวัติความเป็นมาของโรงงาน รอการอัปเดตจากผู้ประกอบการ"}
            </p>

            <h2 className="text-xl font-bold text-charcoal mb-3">ขั้นตอนการผลิต</h2>
            {factory.productionSteps && factory.productionSteps.length > 0 ? (
              <ol className="space-y-2 list-decimal list-inside text-charcoal/70">
                {factory.productionSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            ) : (
              <p className="text-charcoal/40">ยังไม่มีข้อมูลขั้นตอนการผลิต</p>
            )}

            {factory.videoUrl && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-charcoal mb-3">วิดีโอแนะนำโรงงาน</h2>
                <div className="aspect-video rounded-2xl overflow-hidden bg-charcoal">
                  <iframe
                    src={factory.videoUrl}
                    title="วิดีโอแนะนำโรงงาน"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          <aside className="bg-white rounded-2xl p-6 border border-cocoa/5 h-fit">
            <h2 className="font-semibold text-charcoal mb-2">ข้อมูลโรงงาน</h2>
            <InfoRow icon={Calendar} label="ปีที่ก่อตั้ง" value={factory.foundedYear} />
            <InfoRow icon={MapPin} label="ที่ตั้ง" value={factory.address} />
            <InfoRow
              icon={FactoryIcon}
              label="ประเภทสินค้าที่ผลิต"
              value={factory.productCategories.length > 0 ? factory.productCategories.join(", ") : null}
            />

            <div className="mt-6">
              {factory.facebookUrl ? (
                <Button
                  href={factory.facebookUrl}
                  variant="outline"
                  className="w-full"
                  icon={<FacebookIcon size={18} />}
                >
                  ติดต่อผ่าน Facebook
                </Button>
              ) : (
                <p className="text-xs text-charcoal/40 text-center">
                  ยังไม่ได้ตั้งค่าช่องทางติดต่อ
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
