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

<section className="flex flex-col border-r border-white/10 bg-[#0E1323]">

  {/* Header */}

  <div className="border-b border-white/10 p-6">

    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-400">
      AI DESIGN ASSISTANT
    </p>

    <h2 className="mt-2 text-2xl font-bold">
      What would you like to build?
    </h2>

    <p className="mt-2 text-sm leading-6 text-slate-400">
      Describe your interface in natural language and Morph Studio will
      generate a production-ready UI.
    </p>

  </div>

  {/* Conversation */}

  <div className="flex-1 overflow-y-auto p-6">

    {/* AI */}

    <div className="mb-8 flex gap-4">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 font-semibold">

        M

      </div>

      <div className="max-w-[310px] rounded-2xl border border-violet-500/20 bg-[#13192B] p-4">

        <p className="leading-7 text-slate-300">

          Welcome to Morph Studio 👋

          <br /><br />

          Tell me what you want to design.

          <br /><br />

          I'll generate layouts, components,
          color palettes and production-ready
          React code.

        </p>

      </div>

    </div>

    {/* User */}

    <div className="mb-8 flex justify-end">

      <div className="max-w-[310px] rounded-2xl bg-gradient-to-r from-[#6D4AFF] to-[#8F3FFF] p-4">

        <p className="leading-7">

          Create a modern SaaS landing page
          with pricing, testimonials and dark mode.

        </p>

      </div>

    </div>

    {/* AI Thinking */}

    <div className="flex gap-4">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 font-semibold">

        M

      </div>

      <div className="rounded-2xl border border-white/10 bg-[#13192B] p-5">

        <p className="mb-4 font-medium text-slate-300">

          Generating your design...

        </p>

        <div className="flex gap-2">

          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400"></span>

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-violet-400"
            style={{ animationDelay: ".2s" }}
          ></span>

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-violet-400"
            style={{ animationDelay: ".4s" }}
          ></span>

        </div>

      </div>

    </div>

  </div>

  {/* Prompt Suggestions */}

  <div className="border-t border-white/10 p-5">

    <p className="mb-4 text-xs uppercase tracking-[0.28em] text-slate-500">

      QUICK PROMPTS

    </p>

    <div className="flex flex-wrap gap-3">

      {[
        "Landing Page",
        "Dashboard",
        "Portfolio",
        "Pricing Section",
        "Login UI",
        "E-commerce",
      ].map((item) => (

        <button
          key={item}
          className="rounded-xl border border-white/10 bg-[#13192B] px-4 py-2 text-sm text-slate-300 transition hover:border-violet-500"
        >
          {item}
        </button>

      ))}

    </div>

  </div>

</section>

        {/* ================================================= */}
{/* LIVE PREVIEW */}
{/* ================================================= */}

<section className="flex flex-col bg-[#0A0F1D]">

  {/* ================= Preview Header ================= */}

  <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

    <div>

      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">
        LIVE PREVIEW
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        Website Preview
      </h2>

    </div>

    <div className="flex items-center gap-3">

      {["Desktop", "Tablet", "Mobile"].map((device, index) => (

        <button
          key={device}
          className={`rounded-xl px-4 py-2 text-sm transition ${
            index === 0
              ? "bg-violet-600 text-white"
              : "border border-white/10 bg-[#13192B] text-slate-400 hover:border-violet-500"
          }`}
        >
          {device}
        </button>

      ))}

    </div>

  </div>

  {/* ================= Preview Canvas ================= */}

  <div className="flex-1 overflow-auto p-8">

    <div className="mx-auto w-[900px] rounded-[28px] border border-white/10 bg-[#101726] shadow-[0_30px_80px_rgba(0,0,0,.45)]">

      {/* Browser Bar */}

      <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">

        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />

        <div className="ml-6 flex-1 rounded-lg bg-[#182033] px-4 py-2 text-sm text-slate-500">
          https://preview.morphstudio.ai
        </div>

      </div>

      {/* Website */}

      <div className="p-10">

        {/* Navbar */}

        <div className="flex items-center justify-between">

          <div className="text-xl font-bold">
            SaaSly
          </div>

          <div className="flex gap-8 text-slate-400">

            <span>Features</span>

            <span>Pricing</span>

            <span>Docs</span>

            <span>Contact</span>

          </div>

        </div>

        {/* Hero */}

        <div className="mt-16">

          <div className="h-5 w-44 rounded-full bg-violet-500/30" />

          <div className="mt-6 h-14 w-[500px] rounded-xl bg-gradient-to-r from-violet-500/30 to-cyan-500/30" />

          <div className="mt-5 h-4 w-[420px] rounded bg-slate-700" />

          <div className="mt-3 h-4 w-[340px] rounded bg-slate-700" />

          <div className="mt-8 flex gap-4">

            <div className="h-12 w-40 rounded-xl bg-violet-600" />

            <div className="h-12 w-36 rounded-xl border border-white/10 bg-[#151C2E]" />

          </div>

        </div>

        {/* Cards */}

        <div className="mt-20 grid grid-cols-3 gap-6">

          {[1,2,3].map((item)=>(

            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-[#141B2D] p-6"
            >

              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-500/30" />

              <div className="mt-6 h-5 w-36 rounded bg-slate-600" />

              <div className="mt-5 h-3 w-full rounded bg-slate-700" />

              <div className="mt-3 h-3 w-5/6 rounded bg-slate-700" />

            </div>

          ))}

        </div>

      </div>

    </div>

  </div>

  {/* ================= Bottom Preview Toolbar ================= */}

  <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">

    <div className="flex items-center gap-3">

      <button className="rounded-xl border border-white/10 bg-[#13192B] px-4 py-2 text-sm hover:border-violet-500">
        Zoom 100%
      </button>

      <button className="rounded-xl border border-white/10 bg-[#13192B] px-4 py-2 text-sm hover:border-violet-500">
        Full Screen
      </button>

    </div>

    <button className="rounded-xl bg-gradient-to-r from-[#6D4AFF] to-[#8F3FFF] px-6 py-2.5 font-medium">
      Open Preview →
    </button>

  </div>

</section>

      </div>

{/* ================================================= */}
{/* AI PROMPT BAR */}
{/* ================================================= */}

<div className="border-t border-white/10 bg-[#0B1020] px-8 py-5">

  <div className="mx-auto flex max-w-[1500px] items-end gap-4 rounded-[24px] border border-white/10 bg-[#111827] p-4 shadow-[0_15px_50px_rgba(0,0,0,.35)]">

    {/* Left Actions */}

    <div className="flex gap-2 pb-1">

      <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#181F31] transition hover:border-violet-500">
        📎
      </button>

      <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#181F31] transition hover:border-violet-500">
        🖼️
      </button>

      <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#181F31] transition hover:border-violet-500">
        🎤
      </button>

    </div>

    {/* Prompt */}

    <div className="flex-1">

      <textarea
        rows={2}
        placeholder="Describe the interface you want to create..."
        className="w-full resize-none bg-transparent text-[15px] leading-7 text-white outline-none placeholder:text-slate-500"
      />

      <div className="mt-3 flex items-center gap-3">

        <button className="rounded-lg border border-white/10 bg-[#181F31] px-4 py-2 text-sm text-slate-400 transition hover:border-violet-500">
          GPT-5.5 ▼
        </button>

        <button className="rounded-lg border border-white/10 bg-[#181F31] px-4 py-2 text-sm text-slate-400 transition hover:border-violet-500">
          AI Theme ▼
        </button>

        <button className="rounded-lg border border-white/10 bg-[#181F31] px-4 py-2 text-sm text-slate-400 transition hover:border-violet-500">
          Desktop ▼
        </button>

      </div>

    </div>

    {/* Generate */}

    <button className="rounded-2xl bg-gradient-to-r from-[#6D4AFF] to-[#8F3FFF] px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,.35)] transition hover:brightness-110">

      Generate →

    </button>

  </div>

</div>

</div>
  );
}

export default Workspace;