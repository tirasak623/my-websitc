import { motion } from "motion/react";
import { PlayCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/common/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-orange-dark font-semibold uppercase tracking-wide text-sm mb-4">
            Snack Factory Review
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-charcoal leading-tight mb-5">
            ค้นพบขนมคุณภาพจากโรงงาน
            <br />
            พร้อมรีวิวก่อนตัดสินใจ
          </h1>
          <p className="text-charcoal/70 text-base md:text-lg mb-8 max-w-lg">
            รวมข้อมูลสินค้า ราคา และวิดีโอรีวิว เพื่อช่วยให้คุณเลือกขนมที่เหมาะกับความต้องการ
          </p>
          <div className="flex flex-wrap gap-4">
            <Button to="/products" size="lg" icon={<ShoppingBag size={18} aria-hidden="true" />}>
              เลือกชมสินค้า
            </Button>
            <Button
              to="/reviews"
              variant="outline"
              size="lg"
              icon={<PlayCircle size={18} aria-hidden="true" />}
            >
              ดูวิดีโอรีวิว
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative aspect-square rounded-3xl overflow-hidden shadow-xl"
        >
          <img
            src="/images/products/snack-1.svg"
            alt="ตัวอย่างสินค้าขนมแนะนำ"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  );
}
