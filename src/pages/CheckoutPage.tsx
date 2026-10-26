import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Info, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { FacebookIcon } from "@/components/common/FacebookIcon";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import { formatBaht } from "@/utils/formatPrice";

interface FormState {
  name: string;
  phone: string;
  address: string;
  note: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = { name: "", phone: "", address: "", note: "" };

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "กรุณากรอกชื่อผู้สั่งซื้อ";
  if (!form.phone.trim()) {
    errors.phone = "กรุณากรอกเบอร์โทรศัพท์";
  } else if (!/^[0-9+\-\s]{9,}$/.test(form.phone.trim())) {
    errors.phone = "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง";
  }
  if (!form.address.trim()) errors.address = "กรุณากรอกที่อยู่สำหรับจัดส่ง";
  return errors;
}

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [lastOrderTotal, setLastOrderTotal] = useState(0);

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // โหมดทดสอบ: ยังไม่มีระบบรับคำสั่งซื้อจริง (ไม่มี backend เชื่อมต่อ)
      setLastOrderTotal(totalPrice);
      setOrderPlaced(true);
      clearCart();
      setForm(initialForm);
    }
  }

  if (orderPlaced) {
    return (
      <>
        <Seo title="สั่งซื้อสำเร็จ" description="ยืนยันคำสั่งซื้อสินค้าขนมจากร้าน" />
        <section className="max-w-2xl mx-auto px-4 md:px-6 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={32} aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal mb-2">ได้รับคำสั่งซื้อของคุณแล้ว</h1>
          <p className="text-charcoal/70 mb-1">
            ยอดสั่งซื้อทั้งหมด <span className="font-bold text-cocoa">{formatBaht(lastOrderTotal)}</span>
          </p>

          <div className="flex items-start gap-3 text-sm text-left text-charcoal/60 bg-orange/10 rounded-2xl p-4 my-6">
            <Info size={18} className="text-cocoa mt-0.5 shrink-0" aria-hidden="true" />
            <p>
              หน้านี้เป็น<strong>โหมดทดสอบ (Demo)</strong> เนื่องจากเว็บไซต์ยังไม่ได้เชื่อมต่อระบบรับคำสั่งซื้อจริง
              กรุณายืนยันคำสั่งซื้อผ่าน Facebook หรือช่องทางติดต่ออื่นของร้านเพื่อให้คำสั่งซื้อสมบูรณ์
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {siteConfig.facebookUrl && (
              <Button
                href={siteConfig.facebookUrl}
                icon={<FacebookIcon size={18} />}
              >
                ยืนยันคำสั่งซื้อผ่าน Facebook
              </Button>
            )}
            <Button to="/products" variant="outline">
              เลือกซื้อสินค้าต่อ
            </Button>
          </div>
        </section>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Seo title="ตะกร้าสินค้า" description="ตรวจสอบสินค้าในตะกร้าและสั่งซื้อ" />
        <section className="max-w-2xl mx-auto px-4 md:px-6 py-16">
          <EmptyState
            icon={<ShoppingBag size={26} aria-hidden="true" />}
            title="ยังไม่มีสินค้าในตะกร้า"
            description="เลือกชมสินค้าขนมของร้านแล้วกดเพิ่มลงตะกร้าเพื่อสั่งซื้อ"
            action={<Button to="/products">เลือกชมสินค้า</Button>}
          />
        </section>
      </>
    );
  }

  return (
    <>
      <Seo title="สั่งซื้อสินค้า" description="ตรวจสอบตะกร้าสินค้าและกรอกข้อมูลเพื่อสั่งซื้อ" />

      <section className="max-w-5xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading eyebrow={`ตะกร้าสินค้า (${totalItems} ชิ้น)`} title="ตรวจสอบและสั่งซื้อสินค้า" />

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl p-6 border border-cocoa/5 h-fit">
            <h2 className="font-semibold text-charcoal mb-4">รายการสินค้า</h2>
            <ul className="flex flex-col gap-4 mb-5">
              {items.map((item) => (
                <li key={`${item.productId}-${item.optionId}`} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-cocoa/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-charcoal text-sm leading-snug">{item.name}</p>
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
            <div className="flex items-center justify-between pt-4 border-t border-cocoa/10">
              <span className="font-semibold text-charcoal">ยอดรวมทั้งหมด</span>
              <span className="text-xl font-bold text-cocoa">{formatBaht(totalPrice)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-cocoa/5 h-fit" noValidate>
            <h2 className="font-semibold text-charcoal mb-4">ข้อมูลผู้สั่งซื้อ</h2>

            <div className="mb-4">
              <label htmlFor="checkout-name" className="block text-sm font-medium text-charcoal mb-1.5">
                ชื่อผู้สั่งซื้อ
              </label>
              <input
                id="checkout-name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "checkout-name-error" : undefined}
              />
              {errors.name && (
                <p id="checkout-name-error" className="text-xs text-red-600 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="checkout-phone" className="block text-sm font-medium text-charcoal mb-1.5">
                เบอร์โทรศัพท์
              </label>
              <input
                id="checkout-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "checkout-phone-error" : undefined}
              />
              {errors.phone && (
                <p id="checkout-phone-error" className="text-xs text-red-600 mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="checkout-address" className="block text-sm font-medium text-charcoal mb-1.5">
                ที่อยู่สำหรับจัดส่ง
              </label>
              <textarea
                id="checkout-address"
                rows={3}
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
                aria-invalid={Boolean(errors.address)}
                aria-describedby={errors.address ? "checkout-address-error" : undefined}
              />
              {errors.address && (
                <p id="checkout-address-error" className="text-xs text-red-600 mt-1">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="checkout-note" className="block text-sm font-medium text-charcoal mb-1.5">
                หมายเหตุ (ไม่บังคับ)
              </label>
              <textarea
                id="checkout-note"
                rows={2}
                value={form.note}
                onChange={(e) => handleChange("note", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
              />
            </div>

            <Button type="submit" className="w-full" icon={<ShoppingBag size={18} aria-hidden="true" />}>
              ยืนยันสั่งซื้อ ({formatBaht(totalPrice)})
            </Button>

            <p className="text-xs text-charcoal/50 mt-3 text-center">
              การกดยืนยันถือเป็นการส่งคำสั่งซื้อเบื้องต้น ทางร้านจะติดต่อกลับเพื่อยืนยันและนัดชำระเงิน
            </p>
          </form>
        </div>

        <p className="text-center text-sm mt-10">
          <Link to="/products" className="text-cocoa font-medium hover:underline">
            ← เลือกซื้อสินค้าเพิ่มเติม
          </Link>
        </p>
      </section>
    </>
  );
}
