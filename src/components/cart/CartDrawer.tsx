import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useCart } from "@/context/CartContext";
import { formatBaht } from "@/utils/formatPrice";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-charcoal/50 z-[60]"
            aria-hidden="true"
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="ตะกร้าสินค้า"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-cream z-[70] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-cocoa/10">
              <h2 className="font-bold text-charcoal flex items-center gap-2">
                <ShoppingBag size={20} aria-hidden="true" />
                ตะกร้าสินค้า
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="ปิดตะกร้าสินค้า"
                className="p-2 rounded-full hover:bg-cocoa/10 text-charcoal"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-charcoal/60">
                  <ShoppingBag size={36} className="mb-3 text-charcoal/30" aria-hidden="true" />
                  <p>ยังไม่มีสินค้าในตะกร้า</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li key={`${item.productId}-${item.optionId}`} className="flex gap-3">
                      <Link
                        to={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-cocoa/10 shrink-0"
                      >
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="font-semibold text-charcoal text-sm leading-snug hover:text-cocoa line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-charcoal/50 mb-1.5">{item.optionLabel}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 border border-cocoa/15 rounded-full px-1.5 py-0.5">
                            <button
                              type="button"
                              aria-label="ลดจำนวน"
                              onClick={() => updateQuantity(item.productId, item.optionId, item.quantity - 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-cocoa hover:bg-cocoa/10"
                            >
                              <Minus size={12} aria-hidden="true" />
                            </button>
                            <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                            <button
                              type="button"
                              aria-label="เพิ่มจำนวน"
                              onClick={() => updateQuantity(item.productId, item.optionId, item.quantity + 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-cocoa hover:bg-cocoa/10"
                            >
                              <Plus size={12} aria-hidden="true" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-cocoa">
                            {formatBaht(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label={`ลบ ${item.name} ออกจากตะกร้า`}
                        onClick={() => removeItem(item.productId, item.optionId)}
                        className="self-start p-1.5 text-charcoal/40 hover:text-red-600"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-cocoa/10 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-charcoal">ยอดรวม</span>
                  <span className="text-xl font-bold text-cocoa">{formatBaht(totalPrice)}</span>
                </div>
                <Button to="/checkout" className="w-full" onClick={closeCart}>
                  ไปที่หน้าชำระเงิน
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
