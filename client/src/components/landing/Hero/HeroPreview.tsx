import { Layers, Sparkles, LayoutTemplate, WandSparkles } from "lucide-react";

function HeroPreview() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Glow */}
      <div className="absolute h-[550px] w-[550px] rounded-full bg-violet-600/20 blur-[180px]" />

      {/* Dashboard */}
      <div className="relative w-[560px] rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-2xl">

        {/* Top Bar */}
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-sm text-slate-400">Morph Studio</p>
            <h3 className="mt-1 text-xl font-semibold text-white">
              AI Workspace
            </h3>
          </div>

          <div className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white">
            Generate
          </div>
        </div>

        {/* Prompt */}
        <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
          <p className="text-sm text-slate-400">Prompt</p>

          <p className="mt-3 leading-7 text-slate-200">
            Create a dashboard with a sidebar on the left, analytics cards at
            the top, activity panel on the right, and project timeline in the
            center.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <Layers className="mb-4 text-violet-400" />
            <h4 className="font-semibold text-white">
              Structure Locked
            </h4>
            <p className="mt-2 text-sm text-slate-400">
              Layout understood before generation.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <LayoutTemplate className="mb-4 text-cyan-400" />
            <h4 className="font-semibold text-white">
              Smart Zones
            </h4>
            <p className="mt-2 text-sm text-slate-400">
              Every section stays exactly where you want.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <Sparkles className="mb-4 text-pink-400" />
            <h4 className="font-semibold text-white">
              AI Generation
            </h4>
            <p className="mt-2 text-sm text-slate-400">
              Beautiful UI generated instantly.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <WandSparkles className="mb-4 text-emerald-400" />
            <h4 className="font-semibold text-white">
              Live Editing
            </h4>
            <p className="mt-2 text-sm text-slate-400">
              Modify individual sections without regeneration.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default HeroPreview;