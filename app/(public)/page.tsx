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

export default async function HomePage() {
  const topTechnicians = await getTopTechnicians();
  const topServices = await getTopServices();

  const user = await getMe();
  const role = user?.data?.profile?.role ?? null;

  return (
    <div>
      <div className="max-w-screen mx-auto"><HeroSection user={user} /></div>
      <div><FeatureTop></FeatureTop></div>
      <div><TopCategories></TopCategories></div>
      <div><HowItWorks></HowItWorks></div>
      <div><WhyChooseUs></WhyChooseUs></div>
      <div><SpecialOffer></SpecialOffer></div>
      <div className="max-w-350 mx-auto"><TopServices topServices={topServices.data} role={role} /></div>
      <div className="max-w-350 mx-auto"><TopTechnicians topTechnicians={topTechnicians.data} /></div>
      <Footer />
    </div>
  );
}