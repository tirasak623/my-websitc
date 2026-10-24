/**
 * ตะกร้าสินค้า (Shopping Cart)
 * เก็บข้อมูลไว้ใน localStorage ภายใต้คีย์ "shop_cart"
 * โครงสร้างข้อมูล: [{ id, qty }, ...]
 */

const CART_KEY = "shop_cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("อ่านตะกร้าสินค้าไม่สำเร็จ", err);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

/** เพิ่มสินค้าลงตะกร้า ถ้ามีอยู่แล้วให้เพิ่มจำนวน */
function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === Number(productId));

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: Number(productId), qty });
  }

  saveCart(cart);
}

/** แก้ไขจำนวนสินค้าในตะกร้า (ลบออกถ้าจำนวน <= 0) */
function updateCartQty(productId, qty) {
  let cart = getCart();

  if (qty <= 0) {
    cart = cart.filter((item) => item.id !== Number(productId));
  } else {
    const item = cart.find((item) => item.id === Number(productId));
    if (item) item.qty = qty;
  }

  saveCart(cart);
}

/** ลบสินค้าออกจากตะกร้า */
function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== Number(productId));
  saveCart(cart);
}

/** ล้างตะกร้าทั้งหมด (ใช้ตอนสั่งซื้อสำเร็จ) */
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

/** รวมจำนวนสินค้าทั้งหมดในตะกร้า (ใช้แสดงที่ badge) */
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

/** รวมสินค้าในตะกร้ากับข้อมูลสินค้าจริง พร้อมราคารวมย่อย */
function getCartDetails() {
  return getCart()
    .map((item) => {
      const product = getProductById(item.id);
      if (!product) return null;
      return {
        ...product,
        qty: item.qty,
        subtotal: product.price * item.qty
      };
    })
    .filter(Boolean);
}

/** ยอดรวมราคาสินค้าทั้งหมดในตะกร้า */
function getCartTotal() {
  return getCartDetails().reduce((sum, item) => sum + item.subtotal, 0);
}

/** อัปเดตตัวเลข badge บนไอคอนตะกร้าทุกหน้า */
function updateCartBadge() {
  const badges = document.querySelectorAll("[data-cart-badge]");
  const count = getCartCount();
  badges.forEach((badge) => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-flex" : "none";
  });
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
