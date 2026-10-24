import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/common/Button";
import { products } from "@/data/products";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const list = featured.length > 0 ? featured : products.slice(0, 4);

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="สินค้าแนะนำ"
          title="ขนมที่น่าสนใจจากโรงงาน"
          description="รวมสินค้าขนมที่มีข้อมูลและรูปภาพพร้อมให้ชมก่อนตัดสินใจ"
        />
        <Button to="/products" variant="ghost" icon={<ArrowRight size={16} aria-hidden="true" />}>
          ดูสินค้าทั้งหมด
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
