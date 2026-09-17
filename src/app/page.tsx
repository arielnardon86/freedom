import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { ServiceTicker } from "@/components/home/ServiceTicker";
import { AboutStory } from "@/components/home/AboutStory";
import { WhyUs } from "@/components/home/WhyUs";
import { Services } from "@/components/home/Services";
import { OnlineGallery } from "@/components/home/OnlineGallery";
import { Location } from "@/components/home/Location";
import { Process } from "@/components/home/Process";
import { Values } from "@/components/home/Values";
import { Manifesto } from "@/components/home/Manifesto";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/home/Footer";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <div className="pt-20 sm:pt-24">
          <ServiceTicker />
        </div>
        <AboutStory />
        <WhyUs />
        <Services />
        <OnlineGallery />
        <Location />
        <Process />
        <Values />
        <Manifesto />
        <Testimonials />
        <FAQ />
        <InstagramFeed />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
