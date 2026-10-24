import { useState, type FormEvent } from "react";
import { MessageCircle, Phone, Mail, Info } from "lucide-react";
import { FacebookIcon } from "@/components/common/FacebookIcon";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";

interface FormState {
  name: string;
  contact: string;
  productInterest: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  contact: "",
  productInterest: "",
  message: ""
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "กรุณากรอกชื่อผู้ติดต่อ";
  }

  if (!form.contact.trim()) {
    errors.contact = "กรุณากรอกเบอร์โทรศัพท์หรืออีเมล";
  } else {
    const isPhone = /^[0-9+\-\s]{9,}$/.test(form.contact.trim());
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact.trim());
    if (!isPhone && !isEmail) {
      errors.contact = "รูปแบบเบอร์โทรศัพท์หรืออีเมลไม่ถูกต้อง";
    }
  }

  if (!form.message.trim()) {
    errors.message = "กรุณากรอกข้อความสอบถาม";
  } else if (form.message.trim().length < 10) {
    errors.message = "กรุณากรอกข้อความอย่างน้อย 10 ตัวอักษร";
  }

  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // โหมดทดสอบ: ยังไม่มีระบบรับข้อมูลจริง (ไม่มี backend เชื่อมต่อ)
      setSubmitted(true);
    }
  }

  return (
    <>
      <Seo title="ติดต่อเรา" description="ช่องทางติดต่อโรงงานและฟอร์มสอบถามสินค้า" />

      <section className="max-w-5xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading eyebrow="ติดต่อเรา" title="ติดต่อโรงงานหรือสอบถามสินค้า" />

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5 mb-6">
              <h2 className="font-semibold text-charcoal mb-4">ช่องทางติดต่อ</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <FacebookIcon size={18} className="text-cocoa" />
                  {siteConfig.facebookUrl ? (
                    <a
                      href={siteConfig.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cocoa font-medium hover:underline"
                    >
                      เปิด Facebook Page
                    </a>
                  ) : (
                    <span className="text-charcoal/40">ยังไม่ได้ตั้งค่า Facebook Page</span>
                  )}
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle size={18} className="text-cocoa" aria-hidden="true" />
                  {siteConfig.messengerUrl ? (
                    <a
                      href={siteConfig.messengerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cocoa font-medium hover:underline"
                    >
                      เปิด Facebook Messenger
                    </a>
                  ) : (
                    <span className="text-charcoal/40">ยังไม่ได้ตั้งค่า Messenger</span>
                  )}
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-cocoa" aria-hidden="true" />
                  <span className={siteConfig.phone ? "text-charcoal" : "text-charcoal/40"}>
                    {siteConfig.phone ?? "ยังไม่มีเบอร์ติดต่อ"}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-cocoa" aria-hidden="true" />
                  <span className={siteConfig.email ? "text-charcoal" : "text-charcoal/40"}>
                    {siteConfig.email ?? "ยังไม่มีอีเมล"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex items-start gap-3 text-sm text-charcoal/60 bg-orange/10 rounded-2xl p-4">
              <Info size={18} className="text-cocoa mt-0.5 shrink-0" aria-hidden="true" />
              <p>
                ฟอร์มด้านขวาเป็น<strong>โหมดทดสอบ (Demo)</strong> เนื่องจากเว็บไซต์นี้ยังไม่ได้เชื่อมต่อระบบรับข้อมูลจริง
                กรุณาติดต่อผ่าน Facebook ด้านบนเพื่อสอบถามสินค้าจริง
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-cocoa/5" noValidate>
            <h2 className="font-semibold text-charcoal mb-4">ฟอร์มสอบถามสินค้า</h2>

            {submitted && (
              <div className="mb-4 text-sm bg-orange/15 text-cocoa-dark rounded-lg p-3">
                นี่คือโหมดทดสอบ ข้อมูลของคุณยังไม่ถูกส่งไปที่ใด เนื่องจากยังไม่มีระบบหลังบ้านรองรับ
                กรุณาติดต่อผ่าน Facebook เพื่อสอบถามจริง
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1.5">
                ชื่อผู้ติดต่อ
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-red-600 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="contact" className="block text-sm font-medium text-charcoal mb-1.5">
                เบอร์โทรศัพท์หรืออีเมล
              </label>
              <input
                id="contact"
                type="text"
                value={form.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
                aria-invalid={Boolean(errors.contact)}
                aria-describedby={errors.contact ? "contact-error" : undefined}
              />
              {errors.contact && (
                <p id="contact-error" className="text-xs text-red-600 mt-1">
                  {errors.contact}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="productInterest" className="block text-sm font-medium text-charcoal mb-1.5">
                สินค้าที่สนใจ (ไม่บังคับ)
              </label>
              <select
                id="productInterest"
                value={form.productInterest}
                onChange={(e) => handleChange("productInterest", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
              >
                <option value="">ไม่ระบุ</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1.5">
                ข้อความสอบถาม
              </label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-xs text-red-600 mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              ส่งข้อความ (โหมดทดสอบ)
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
