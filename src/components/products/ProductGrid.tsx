import { PackageSearch } from "lucide-react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/common/Button";

interface ProductGridProps {
  products: Product[];
  onClearFilters?: () => void;
}

export function ProductGrid({ products, onClearFilters }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={<PackageSearch size={26} aria-hidden="true" />}
        title="ไม่พบสินค้าที่ตรงกับการค้นหา"
        description="ลองเปลี่ยนคำค้นหาหรือเงื่อนไขการกรองสินค้า"
        action={
          onClearFilters && (
            <Button variant="outline" size="sm" onClick={onClearFilters} type="button">
              ล้างตัวกรอง
            </Button>
          )
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
