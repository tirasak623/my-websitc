import { Search, X } from "lucide-react";

export type SortOption = "name" | "price-asc" | "price-desc";

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  resultCount: number;
  onClear: () => void;
}

export function ProductFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  sort,
  onSortChange,
  resultCount,
  onClear
}: ProductFiltersProps) {
  const hasActiveFilters = search !== "" || category !== "" || sort !== "name";

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-cocoa/5 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-end">
        <div>
          <label htmlFor="product-search" className="block text-xs font-semibold text-charcoal/60 mb-1.5">
            ค้นหาสินค้า
          </label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40"
              aria-hidden="true"
            />
            <input
              id="product-search"
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="พิมพ์ชื่อสินค้า..."
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
            />
          </div>
        </div>

        <div>
          <label htmlFor="product-category" className="block text-xs font-semibold text-charcoal/60 mb-1.5">
            หมวดหมู่
          </label>
          <select
            id="product-category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full py-2.5 px-3 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
          >
            <option value="">ทั้งหมด</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="product-sort" className="block text-xs font-semibold text-charcoal/60 mb-1.5">
            เรียงลำดับ
          </label>
          <select
            id="product-sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full py-2.5 px-3 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
          >
            <option value="name">ชื่อสินค้า (ก-ฮ)</option>
            <option value="price-asc">ราคา: น้อยไปมาก</option>
            <option value="price-desc">ราคา: มากไปน้อย</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasActiveFilters}
          className="h-fit flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-cocoa border border-cocoa/20 hover:bg-cocoa/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <X size={15} aria-hidden="true" />
          ล้างตัวกรอง
        </button>
      </div>

      <p className="mt-4 text-sm text-charcoal/60">
        พบสินค้า <span className="font-semibold text-charcoal">{resultCount}</span> รายการ
      </p>
    </div>
  );
}
