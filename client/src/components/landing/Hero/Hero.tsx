import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroPreview from "./HeroPreview";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#070B1A]">
      <HeroBackground />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-between gap-16 px-8 pt-32 pb-20">
        <HeroContent />
        <HeroPreview />
      </div>
    </section>
  );
}

export default Hero;