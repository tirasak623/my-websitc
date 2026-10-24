/**
 * ฟังก์ชันที่ใช้ร่วมกันทุกหน้า: เมนูมือถือ, การ์ดสินค้า, toast แจ้งเตือน
 */

// ----- เมนูมือถือ -----
function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("is-open");
    toggle.classList.toggle("is-active");
  });
}

// ----- Toast แจ้งเตือนสั้นๆ มุมขวาบน -----
function showToast(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

// ----- สร้าง HTML การ์ดสินค้าหนึ่งใบ -----
function renderProductCard(product) {
  const discount = product.oldPrice
    ? Math.round(100 - (product.price / product.oldPrice) * 100)
    : 0;

  return `
    <div class="product-card">
      ${discount > 0 ? `<span class="badge-discount">-${discount}%</span>` : ""}
      <a href="product.html?id=${product.id}" class="product-card__image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </a>
      <div class="product-card__body">
        <p class="product-card__category">${product.category}</p>
        <h3 class="product-card__name">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-card__rating">★ ${product.rating}</div>
        <div class="product-card__price">
          <span class="price-now">฿${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="price-old">฿${formatPrice(product.oldPrice)}</span>` : ""}
        </div>
        <button class="btn btn-primary btn-block" data-add-to-cart="${product.id}">
          หยิบใส่ตะกร้า
        </button>
      </div>
    </div>
  `;
}

// ----- ผูกอีเวนต์ปุ่ม "หยิบใส่ตะกร้า" ให้การ์ดทุกใบในหน้านี้ -----
function bindAddToCartButtons(root = document) {
  root.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-add-to-cart");
      const qtyInput = btn.closest("[data-product-detail]")?.querySelector("[data-qty-input]");
      const qty = qtyInput ? Number(qtyInput.value) || 1 : 1;

      addToCart(id, qty);
      const product = getProductById(id);
      showToast(`เพิ่ม "${product.name}" ลงตะกร้าแล้ว`);
    });
  });
}

// ----- แสดงสินค้าแนะนำบนหน้าแรก -----
function renderFeaturedProducts() {
  const container = document.querySelector("[data-featured-products]");
  if (!container) return;

  const featured = PRODUCTS.slice(0, 4);
  container.innerHTML = featured.map(renderProductCard).join("");
  bindAddToCartButtons(container);
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  renderFeaturedProducts();
});
