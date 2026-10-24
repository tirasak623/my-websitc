import { Link } from "react-router-dom";
import { Cookie, Mail, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/common/FacebookIcon";
import { NAV_LINKS } from "@/components/layout/Navbar";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/80 mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg text-cream mb-3">
            <span className="w-9 h-9 rounded-full bg-orange text-charcoal flex items-center justify-center">
              <Cookie size={20} aria-hidden="true" />
            </span>
            Snack Factory Review
          </div>
          <p className="text-sm text-cream/60">
            รวมข้อมูลสินค้า ราคา และวิดีโอรีวิวขนมจากโรงงาน เพื่อช่วยให้คุณเลือกขนมที่เหมาะกับความต้องการ
          </p>
        </div>

        <div>
          <h3 className="text-cream font-semibold mb-3 text-sm">เมนู</h3>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-orange transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-cream font-semibold mb-3 text-sm">ช่องทางติดต่อ</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FacebookIcon size={16} />
              {siteConfig.facebookUrl ? (
                <a
                  href={siteConfig.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange transition-colors"
                >
                  Facebook Page
                </a>
              ) : (
                <span className="text-cream/40">ยังไม่ได้ตั้งค่า Facebook Page</span>
              )}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} aria-hidden="true" />
              <span>{siteConfig.phone ?? <span className="text-cream/40">ยังไม่มีเบอร์ติดต่อ</span>}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} aria-hidden="true" />
              <span>{siteConfig.email ?? <span className="text-cream/40">ยังไม่มีอีเมล</span>}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-cream font-semibold mb-3 text-sm">{siteConfig.factoryName}</h3>
          <p className="text-sm text-cream/60">
            เว็บไซต์นี้เป็นเว็บรีวิวสินค้าโรงงานขนม ไม่ใช่หน้าร้านค้าออนไลน์ สั่งซื้อ/สอบถามราคาได้ผ่าน Facebook
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        &copy; {currentYear} Snack Factory Review. สงวนลิขสิทธิ์
      </div>
    </footer>
  );
}
