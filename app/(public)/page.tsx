import { getMe } from "@/service/getMe";
import { getTopServices } from "./_actions/getTopServices";
import { getTopTechnicians } from "./_actions/getTopTechnicians";
import Footer from "./_components/home/Footer";
import HeroSection from "./_components/home/HeroSection";
import TopServices from "./_components/home/TopServices";
import TopTechnicians from "./_components/home/TopTechnicians";
import FeatureTop from "./_components/home/FeatureTop";
import TopCategories from "./_components/home/TopCategories";
import HowItWorks from "./_components/home/HowItWorks";
import WhyChooseUs from "./_components/home/WhyChooseUs";
import SpecialOffer from "./_components/home/SpecialOffer";
import Statistics from "./_components/home/Statistics";
import Reviews from "./_components/home/Reviews";
import TipsAndUpdates from "./_components/home/TipsAndUpdates";
import ReadyToStart from "./_components/home/ReadyToStart";

export default async function HomePage() {
  const topTechnicians = await getTopTechnicians();
  const topServices = await getTopServices();

  const user = await getMe();
  const role = user?.data?.profile?.role ?? null;



  return (
    <div>
      <div className="mx-auto"><HeroSection user={user} /></div>
      <div><FeatureTop></FeatureTop></div>
      <div><HowItWorks></HowItWorks></div>
      <div><TopCategories></TopCategories></div>
      <div><TopServices topServices={topServices.data} role={role} /></div>
      <div><TopTechnicians topTechnicians={topTechnicians.data} /></div>
      <div><WhyChooseUs></WhyChooseUs></div>
      <div><SpecialOffer></SpecialOffer></div>
      <div><Statistics></Statistics></div>
      <div><Reviews></Reviews></div>
      <div><TipsAndUpdates></TipsAndUpdates></div>
      <div><ReadyToStart></ReadyToStart></div>
      <Footer />
    </div>
  );
}