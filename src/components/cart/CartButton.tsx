import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartButtonProps {
  className?: string;
}

export function CartButton({ className = "" }: CartButtonProps) {
  const { totalItems, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`เปิดตะกร้าสินค้า (${totalItems} ชิ้น)`}
      className={`relative p-2 text-charcoal hover:text-cocoa transition-colors ${className}`}
    >
      <ShoppingCart size={22} aria-hidden="true" />
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-orange text-charcoal text-[10px] font-bold flex items-center justify-center">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
}
