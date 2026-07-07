import {
  FolderOpen,
  LayoutTemplate,
  History,
  Image,
  Settings,
  Plus,
} from "lucide-react";

function Workspace() {
  return (
    <div className="h-screen overflow-hidden bg-[#070B1A] text-white">

      {/* ================= TOPBAR PLACEHOLDER ================= */}

      {/* ================= TOP TOOLBAR ================= */}

<header className="flex h-[72px] items-center justify-between border-b border-white/10 bg-[#0B1020]/95 px-8 backdrop-blur-xl">

  {/* Left */}

  <div className="flex items-center gap-8">

    {/* Project */}

    <div>

      <h2 className="text-lg font-semibold">
        Untitled Project
      </h2>

      <p className="text-xs text-slate-500">
        Auto Saved • Just now
      </p>

    </div>

    {/* Divider */}

    <div className="h-8 w-px bg-white/10" />

    {/* Controls */}

    <div className="flex items-center gap-3">

      {[
        "Generate",
        "Modify",
        "Theme",
        "Preview",
        "Export",
      ].map((item) => (

        <button
          key={item}
          className="rounded-xl border border-white/10 bg-[#13192B] px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-500 hover:text-white"
        >
          {item} ▼
        </button>

      ))}

    </div>

  </div>

  {/* Right */}

  <div className="flex items-center gap-4">

    {/* Search */}

    <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-2.5 text-sm text-slate-500">

      ⌘ K &nbsp; Search Commands

    </div>

    {/* Avatar */}

    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 font-semibold">

      A

    </div>

  </div>

</header>

      {/* ================= MAIN WORKSPACE ================= */}

      <div className="grid h-[calc(100vh-72px)] grid-cols-[260px_430px_1fr]">

        {/* ================================================= */}
        {/* SIDEBAR */}
        {/* ================================================= */}

        <aside className="flex flex-col border-r border-white/10 bg-[#0B1020]">

          {/* Logo */}

          <div className="flex h-[72px] items-center border-b border-white/10 px-6">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-gradient-to-br from-[#24124D] to-[#5A31F4]">

              <span className="font-bold text-violet-300">
                M
              </span>

            </div>

            <div className="ml-3">

              <h2 className="font-semibold">
                Morph Studio
              </h2>

              <p className="text-xs text-slate-500">
                AI Workspace
              </p>

            </div>

          </div>

          {/* New Project */}

          <div className="p-5">

            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6D4AFF] to-[#8F3FFF] py-3 font-semibold transition hover:brightness-110">

              <Plus size={18} />

              New Project

            </button>

          </div>

          {/* Navigation */}

          <nav className="space-y-2 px-4">

            {[
              {
                icon: FolderOpen,
                title: "Projects",
              },
              {
                icon: LayoutTemplate,
                title: "Templates",
              },
              {
                icon: History,
                title: "History",
              },
              {
                icon: Image,
                title: "Assets",
              },
              {
                icon: Settings,
                title: "Settings",
              },
            ].map((item) => {

              const Icon = item.icon;

              return (

                <button
                  key={item.title}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-[#171C2E] hover:text-white"
                >

                  <Icon size={18} />

                  {item.title}

                </button>

              );

            })}

          </nav>

          {/* Bottom User */}

          <div className="mt-auto border-t border-white/10 p-5">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-semibold">

                A

              </div>

              <div>

                <p className="font-medium">
                  Aishwarya
                </p>

                <p className="text-xs text-slate-500">
                  Free Plan
                </p>

              </div>

            </div>

          </div>

        </aside>

        {/* ================================================= */}
        {/* AI PANEL */}
        {/* ================================================= */}

        <section className="border-r border-white/10 bg-[#0E1323]">

        </section>

        {/* ================================================= */}
        {/* LIVE PREVIEW */}
        {/* ================================================= */}

        <section className="bg-[#0A0F1D]">

        </section>

      </div>

    </div>
  );
}

export default Workspace;