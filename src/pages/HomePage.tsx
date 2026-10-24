import { Seo } from "@/components/common/Seo";
import { HeroSection } from "@/components/home/HeroSection";
import { FactoryIntro } from "@/components/home/FactoryIntro";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { LatestReviews } from "@/components/home/LatestReviews";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <Seo
        title="หน้าแรก"
        description="ค้นพบขนมคุณภาพจากโรงงาน พร้อมรีวิวก่อนตัดสินใจ รวมข้อมูลสินค้า ราคา และวิดีโอรีวิว"
      />
      <HeroSection />
      <FactoryIntro />
      <FeaturedProducts />
      <LatestReviews />
      <WhyChooseSection />
      <CtaSection />
    </>
  );
}
