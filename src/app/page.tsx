import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { Services } from "@/components/home/Services";
import { Galleries } from "@/components/home/Galleries";
import { AboutStory } from "@/components/home/AboutStory";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <Galleries />
        <AboutStory />
        <Testimonials />
        <InstagramFeed />
      </main>
      <Footer />
    </>
  );
}
