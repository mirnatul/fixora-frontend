import { getMe } from "@/service/getMe";
import { getTopServices } from "./_actions/getTopServices";
import { getTopTechnicians } from "./_actions/getTopTechnicians";
import FeatureSection from "./_components/home/FeatureSection";
import Footer from "./_components/home/Footer";
import HeroSection from "./_components/home/HeroSection";
import TopServices from "./_components/home/TopServices";
import TopTechnicians from "./_components/home/TopTechnicians";

export default async function HomePage() {
  const topTechnicians = await getTopTechnicians();
  const topServices = await getTopServices();

  const user = await getMe();
  const role = user?.data?.profile?.role ?? null;

  return (
    <div className="max-w-350 mx-auto">
      <HeroSection />
      <FeatureSection />
      <TopServices topServices={topServices.data} role={role} />
      <TopTechnicians topTechnicians={topTechnicians.data} />
      <Footer />
    </div>
  );
}