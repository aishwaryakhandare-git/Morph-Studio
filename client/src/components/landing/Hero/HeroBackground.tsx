function HeroBackground() {
  return (
    <>
      {/* Main Background */}
      <div className="absolute inset-0 -z-20 bg-[#070B1A]" />

      {/* Purple Glow */}
      <div className="absolute left-1/4 top-40 -z-10 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[180px]" />

      {/* Blue Glow */}
      <div className="absolute right-20 top-52 -z-10 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[180px]" />

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -z-10 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[180px]" />
    </>
  );
}

export default HeroBackground;