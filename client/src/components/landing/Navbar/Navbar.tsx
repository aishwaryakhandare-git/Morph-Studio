import { GitHub } from "lucide-react";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#070B1A]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500 bg-violet-600/20">
            <span className="text-lg font-bold text-violet-400">M</span>
          </div>

          <h1 className="text-xl font-semibold text-white">
            Morph Studio
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-sm text-gray-300 lg:flex">
          <a href="#">Features</a>
          <a href="#">How It Works</a>
          <a href="#">Pricing</a>
          <a href="#">Docs</a>
          <a href="#">Roadmap</a>
          <a href="#">Community</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-white transition hover:border-violet-500">
            <GitHub size={18} />
            <span>3.2k</span>
          </button>

          <button className="rounded-lg border border-white/10 px-5 py-2 text-sm text-white transition hover:border-violet-500">
            Sign In
          </button>

          <button className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-violet-500">
            Get Started Free
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;