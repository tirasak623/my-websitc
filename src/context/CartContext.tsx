import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import type { PackOption, Product } from "@/types";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  optionId: string;
  optionLabel: string;
  pieceCount: number;
  unitPrice: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, option: PackOption, quantity?: number) => void;
  removeItem: (productId: string, optionId: string) => void;
  updateQuantity: (productId: string, optionId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const STORAGE_KEY = "snack-factory-cart";

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage อาจเต็มหรือถูกปิดใช้งาน — ไม่สามารถบันทึกได้ แต่ไม่ควรทำให้หน้าเว็บพัง
    }
  }, [items]);

  const addItem = useCallback((product: Product, option: PackOption, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id && item.optionId === option.id
      );
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          image: product.images[0],
          optionId: option.id,
          optionLabel: option.label,
          pieceCount: option.pieceCount,
          unitPrice: option.price,
          quantity
        }
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, optionId: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.optionId === optionId))
    );
  }, []);

  const updateQuantity = useCallback((productId: string, optionId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => !(item.productId === productId && item.optionId === optionId));
      }
      return prev.map((item) =>
        item.productId === productId && item.optionId === optionId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart ต้องถูกเรียกใช้ภายใน CartProvider");
  }
  return ctx;
}
