import { Seo } from "@/components/common/Seo";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { LatestReviews } from "@/components/home/LatestReviews";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <Seo
        title="หน้าแรก"
        description="ค้นพบขนมคุณภาพจากโรงงาน พร้อมรีวิวก่อนตัดสินใจ รวมข้อมูลสินค้า ราคา และรีวิวรูปภาพ"
      />
      <HeroSection />
      <FeaturedProducts />
      <LatestReviews />
      <WhyChooseSection />
      <CtaSection />
    </>
  );
}
