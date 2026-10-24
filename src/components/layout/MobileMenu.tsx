import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS } from "@/components/layout/Navbar";
import { Button } from "@/components/common/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          id="mobile-menu"
          aria-label="เมนูมือถือ"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden border-t border-cocoa/10 bg-cream"
        >
          <div className="flex flex-col px-4 py-4 gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg text-sm font-medium ${
                    isActive ? "bg-cocoa/10 text-cocoa" : "text-charcoal/80"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-2">
              <Button to="/contact" className="w-full" onClick={onClose}>
                ติดต่อโรงงาน
              </Button>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
