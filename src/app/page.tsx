import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { ServiceTicker } from "@/components/home/ServiceTicker";
import { Services } from "@/components/home/Services";
import { Galleries } from "@/components/home/Galleries";
import { AboutStory } from "@/components/home/AboutStory";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";
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
        <Services />
        <Galleries />
        <AboutStory />
        <Testimonials />
        <InstagramFeed />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
