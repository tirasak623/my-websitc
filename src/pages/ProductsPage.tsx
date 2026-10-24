import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductFilters, type SortOption } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/common/Button";
import { products, productCategories } from "@/data/products";

const PAGE_SIZE = 8;

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [sort, setSort] = useState<SortOption>("name");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesCategory = category === "" || p.category === category;
      return matchesSearch && matchesCategory;
    });

    result = [...result].sort((a, b) => {
      if (sort === "price-asc") return (a.price ?? Infinity) - (b.price ?? Infinity);
      if (sort === "price-desc") return (b.price ?? -Infinity) - (a.price ?? -Infinity);
      return a.name.localeCompare(b.name, "th");
    });

    return result;
  }, [search, category, sort]);

  const visibleProducts = filtered.slice(0, visibleCount);

  function handleClear() {
    setSearch("");
    setCategory("");
    setSort("name");
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <>
      <Seo
        title="สินค้าทั้งหมด"
        description="ค้นหาและเลือกชมขนมจากโรงงาน พร้อมตัวกรองหมวดหมู่และราคา"
      />

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading eyebrow="สินค้าทั้งหมด" title="เลือกชมสินค้าขนมจากโรงงาน" />

        <ProductFilters
          search={search}
          onSearchChange={(v) => {
            setSearch(v);
            setVisibleCount(PAGE_SIZE);
          }}
          category={category}
          onCategoryChange={(v) => {
            setCategory(v);
            setVisibleCount(PAGE_SIZE);
          }}
          categories={productCategories}
          sort={sort}
          onSortChange={setSort}
          resultCount={filtered.length}
          onClear={handleClear}
        />

        <ProductGrid products={visibleProducts} onClearFilters={handleClear} />

        {visibleCount < filtered.length && (
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              type="button"
            >
              โหลดสินค้าเพิ่มเติม
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
