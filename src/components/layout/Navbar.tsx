import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Cookie } from "lucide-react";
import { Button } from "@/components/common/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";

export const NAV_LINKS = [
  { label: "หน้าแรก", to: "/" },
  { label: "เกี่ยวกับโรงงาน", to: "/factory" },
  { label: "สินค้าทั้งหมด", to: "/products" },
  { label: "วิดีโอรีวิว", to: "/reviews" },
  { label: "ติดต่อเรา", to: "/contact" }
];

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-cocoa/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-bold text-lg text-charcoal">
          <span className="w-9 h-9 rounded-full bg-cocoa text-cream flex items-center justify-center">
            <Cookie size={20} aria-hidden="true" />
          </span>
          Snack Factory Review
        </NavLink>

        <nav className="hidden md:flex items-center gap-7" aria-label="เมนูหลัก">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-cocoa" : "text-charcoal/70 hover:text-cocoa"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button to="/contact" size="sm">
            ติดต่อโรงงาน
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-charcoal"
          aria-label={isMobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen((open) => !open)}
        >
          {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </header>
  );
}
