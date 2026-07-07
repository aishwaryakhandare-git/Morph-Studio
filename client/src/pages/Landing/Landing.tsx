import { motion } from "framer-motion";
import screen from "../../assets/screen.png";
import HeroSwirls from "../../components/landing/Hero/HeroSwirls";

import {
  LayoutDashboard,
  FolderOpen,
  LayoutTemplate,
  Boxes,
  Palette,
  Sparkles,
  Users,
  Settings,
  CreditCard,
} from "lucide-react";

function Landing() {
  return (
    <div className="min-h-screen bg-[#070B1A] text-white">
      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 left-0 z-50 w-full bg-[#070B1A]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/30 bg-gradient-to-br from-[#25154A] to-[#4C1D95] shadow-[0_0_18px_rgba(124,58,237,.25)]">
              <span className="text-[18px] font-semibold text-[#C084FC]">
                M
              </span>
            </div>
            <h1 className="text-[17px] font-semibold tracking-[-0.3px] text-[#F4F4F6]">Morph Studio</h1>
          </div>

          <nav className="hidden gap-10 lg:flex text-gray-300">
            <a href="#">Features</a>
            <a href="#">Showcase</a>
            <a href="#">Pricing</a>
            <a href="#">Docs</a>
            <a href="#">Roadmap</a>
          </nav>

          <div className="flex gap-3">
            <button className="rounded-xl border border-white/10 bg-transparent px-6 py-2.5 text-[15px] font-medium text-[#ECECEC] transition hover:border-violet-500 px-5 py-2">
              Sign In
            </button>

            <button className="rounded-xl bg-gradient-to-r from-[#6D4AFF] to-[#8F3FFF] px-7 py-2.5 text-[15px] font-semibold text-white shadow-[0_0_25px_rgba(124,58,237,.3)] transition hover:brightness-110">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen overflow-hidden pt-28">
        {/* Background */}
        <div className="absolute inset-0 bg-[#070B1A]" />

        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_25%_35%,rgba(124,58,237,.18),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(6,182,212,.12),transparent_25%)]" />

        {/* Aurora */}
        <div className="absolute left-[18%] top-[22%] h-[420px] w-[700px] rotate-[-12deg] rounded-full bg-gradient-to-r from-violet-600/20 via-fuchsia-500/15 to-cyan-500/20 blur-[110px]" />

        <div className="absolute left-0 top-0 h-[220px] w-[180px] rounded-full bg-fuchsia-500/15 blur-[80px]" />

        <HeroSwirls/>

        <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-[0.95fr_1.05fr] items-center gap-10 px-14 pt-10">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            className="max-w-[560px]"
          >
            <div className="mb-6 inline-flex items-center">
              <span className="text-[14px] font-semibold uppercase tracking-[0.35em] text-[#8B5CF6]">
                AI THAT UNDERSTANDS
              </span>
            </div>

            <h1 className="mt-1 text-[92px] font-[600] leading-[0.88] tracking-[2px] text-white">
              Structure
              <br />
              Before{" "}
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#B76DFF] to-[#7AA8FF] bg-clip-text text-transparent">
                Style.
              </span>
            </h1>

            <p className="mt-7 max-w-[430px] text-[18px] leading-8 text-[#A5ADC4]">
              Morph Studio reads your layout, understands your intent,
              and generates production-ready UI —
              pixel perfect, every time.
            </p>

            <div className="mt-12 flex items-center gap-5">
              <button
                className="group flex h-[56px] items-center gap-4 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-[#5B5EF7] to-[#8B3DFF] px-8 text-[16px] font-semibold text-white shadow-[0_0_25px_rgba(124,58,237,.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(124,58,237,.55)]"
              >
                <span>Start Building</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <button
  className="flex h-[56px] items-center gap-3 rounded-2xl border border-white/10 bg-[#10172A]/70 px-8 text-[16px] font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-violet-400"
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 6L18 12L8 18V6Z"
      stroke="white"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>

  Watch Demo
</button>
            </div>

          <div className="mt-10 w-[720px] flex items-center gap-4">

            {[
              {
                icon: "🍀",
                title: "Structure First",
                color: "text-green-400",
              },
              {
                icon: "◎",
                title: "AI Powered",
                color: "text-sky-400",
              },
              {
                icon: "◈",
                title: "Live Preview",
                color: "text-violet-400",
              },
              {
                icon: "✦",
                title: "Export Code",
                color: "text-fuchsia-400",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-2 rounded-xl border border-[#2B3048] bg-[#0E1323]/90 px-5 py-3 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/40"
              >
                <span className={`text-sm ${item.color}`}>
                  {item.icon}
                </span>

                <span className="text-[14px] font-medium text-slate-200">
                  {item.title}
                </span>
              </div>
            ))}

          </div>

          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative -mt-8 flex justify-end"
          >
            {/* Gradient Border */}
            <div className="rounded-[22px] bg-[linear-gradient(90deg,#d946ef_0%,#8b5cf6_45%,#2563eb_75%,#22d3ee_100%)] p-[1px] shadow-[0_0_45px_rgba(139,92,246,.25)]">

              {/* Inner Background */}
              <div className="h-[500px] w-[700px] overflow-hidden rounded-[18px]">
            <img
              src={screen}
              alt="Dashboard"
              className="w-full object-top"
            />
          </div>

          
          
             </div>

          </motion.div>

        </div>

      </section>
    
      {/* ================= DASHBOARD SECTION ================= */}

<section className="mx-auto mt-32 mb-32 max-w-[1450px] px-8">

  <div className="rounded-[28px] border border-white/10 bg-[#0B1020]/95 p-6 shadow-[0_25px_80px_rgba(0,0,0,.45)]">

    <div className="grid grid-cols-[220px_1fr_300px] gap-6">

      {/* ================= SIDEBAR ================= */}

      <aside className="rounded-2xl border border-white/10 bg-[#0E1323]">

        {/* Logo */}

        <div className="border-b border-white/10 p-5">

          <div className="flex items-center gap-3">

  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/30 bg-gradient-to-br from-[#25154A] to-[#4C1D95]">

    <span className="font-bold text-violet-300">
      M
    </span>

  </div>

  <div>

    <h3 className="font-semibold">
      Morph Studio
    </h3>

    <p className="text-xs text-slate-500">
      AI Workspace
    </p>

  </div>

</div>

        </div>

        {/* New Project */}

        <div className="p-5">

          <button className="w-full rounded-xl bg-gradient-to-r from-[#6D4AFF] to-[#8B3DFF] py-3 text-sm font-semibold">
            + New Project
          </button>

        </div>

        {/* Navigation */}

        <nav className="space-y-1 px-4 pb-6">

  {[
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: FolderOpen, label: "Projects" },
    { icon: LayoutTemplate, label: "Templates" },
    { icon: Boxes, label: "Components" },
    { icon: Palette, label: "Design Systems" },
    { icon: Sparkles, label: "AI Tools" },
    { divider: true },
    { icon: Users, label: "Team" },
    { icon: Settings, label: "Settings" },
    { icon: CreditCard, label: "Billing" },
  ].map((item, index) => {

    if ("divider" in item)
      return (
        <div
          key={index}
          className="my-4 border-t border-white/10"
        />
      );

    const Icon = item.icon;

    return (
      <button
        key={item.label}
        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
          item.label === "Dashboard"
            ? "bg-violet-600/20 text-white"
            : "text-slate-400 hover:bg-[#171D30]"
        }`}
      >
        <Icon size={18} />

        <span>{item.label}</span>
      </button>
    );

  })}

</nav>
        {/* User */}

        <div className="mt-auto border-t border-white/10 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold">
              A
            </div>

            <div>

              <p className="text-sm font-medium">
                Aishwarya
              </p>

              <p className="text-xs text-slate-400">
                Pro Plan
              </p>

            </div>

          </div>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

<div>

  {/* Header */}

  <div className="mb-8 flex items-center justify-between">

    <div>

      <h2 className="text-3xl font-bold text-white">
        Welcome back, Aishwarya 👋
      </h2>

      <p className="mt-2 text-slate-400">
        Continue building your AI interfaces.
      </p>

    </div>

    <div className="flex gap-3">

      <button className="rounded-xl border border-white/10 bg-[#111827] px-5 py-3 text-sm hover:border-violet-500">
        Import Design
      </button>

      <button className="rounded-xl border border-white/10 bg-[#111827] px-5 py-3 text-sm">
        Recent ▼
      </button>

    </div>

  </div>

  {/* ================= RECENT PROJECTS ================= */}

  <h3 className="mb-5 text-xl font-semibold">
    Recent Projects
  </h3>

  <div className="grid grid-cols-2 gap-5">

    {[
      {
        name: "Landing Page",
        updated: "2 min ago",
      },
      {
        name: "Analytics Dashboard",
        updated: "25 min ago",
      },
      {
        name: "Pricing Page",
        updated: "Yesterday",
      },
      {
        name: "Portfolio",
        updated: "2 days ago",
      },
    ].map((project) => (

      <div
        key={project.name}
        className="rounded-2xl border border-white/10 bg-[#101528] p-5 transition hover:border-violet-500"
      >

        <div className="mb-5 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/20 via-[#171D30] to-cyan-500/20">

  <div className="w-full rounded-xl border border-white/10 bg-[#0F1526] p-4">

  {/* Browser Bar */}

  <div className="mb-4 flex items-center gap-2">

    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />

    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />

    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />

  </div>

  {/* Hero */}

  <div className="h-6 w-3/4 rounded bg-violet-500/30" />

  <div className="mt-3 h-3 w-full rounded bg-slate-700" />

  <div className="mt-2 h-3 w-2/3 rounded bg-slate-700" />

  {/* Cards */}

  <div className="mt-5 grid grid-cols-2 gap-2">

    <div className="h-12 rounded bg-violet-500/20" />

    <div className="h-12 rounded bg-cyan-500/20" />

  </div>

</div>

</div>

        <div className="flex items-center justify-between">

          <div>

            <h4 className="font-semibold">
              {project.name}
            </h4>

            <p className="mt-1 text-sm text-slate-400">
              Updated {project.updated}
            </p>

          </div>

          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
            React
          </span>

        </div>

      </div>

    ))}

  </div>

  {/* ================= ACTIVITY OVERVIEW ================= */}

  <h3 className="mb-5 mt-10 text-xl font-semibold">
    Activity Overview
  </h3>

  <div className="grid grid-cols-4 gap-4">

    {[
      ["Projects","12"],
      ["AI Generations","148"],
      ["Exports","32"],
      ["Templates","9"],
    ].map(([title,value]) => (

      <div
        key={title}
        className="rounded-2xl border border-white/10 bg-[#101528] p-5"
      >

        <p className="text-sm text-slate-400">
          {title}
        </p>

        <h3 className="mt-3 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent">
          {value}
        </h3>

      </div>

    ))}

  </div>

</div>

      {/* ================= RIGHT PANEL ================= */}

<div className="space-y-6">

  {/* Workspace Activity */}

  <div className="rounded-2xl border border-white/10 bg-[#101528] p-5">

    <h3 className="mb-5 text-lg font-semibold">
      Workspace Activity
    </h3>

    {[
      ["Generated Landing Page", "2 min ago"],
      ["Edited Hero Section", "8 min ago"],
      ["Exported React Code", "35 min ago"],
      ["Saved Pricing Component", "1 hr ago"],
      ["Created New Project", "Yesterday"],
    ].map(([title, time]) => (
      <div
        key={title}
        className="mb-4 flex items-start justify-between last:mb-0"
      >
        <div>
          <p className="text-sm font-medium text-white">
            {title}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {time}
          </p>
        </div>

        <div className="mt-1 h-2 w-2 rounded-full bg-violet-500" />
      </div>
    ))}

  </div>

  {/* Prompt History */}

  <div className="rounded-2xl border border-white/10 bg-[#101528] p-5">

    <h3 className="mb-5 text-lg font-semibold">
      Recent Prompts
    </h3>

    {[
      "Modern SaaS Landing Page",
      "Glassmorphism Login UI",
      "Analytics Dashboard",
      "Pricing Section",
    ].map((prompt) => (
      <button
        key={prompt}
        className="mb-3 w-full rounded-xl border border-white/10 bg-[#0B1020] p-3 text-left text-sm text-slate-300 transition hover:border-violet-500"
      >
        {prompt}
      </button>
    ))}

  </div>

  {/* Quick Actions */}

  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/20 to-cyan-500/10 p-5">

    <h3 className="mb-5 text-lg font-semibold">
      Quick Actions
    </h3>

    <div className="space-y-3">

      <button className="w-full rounded-xl bg-violet-600 py-3 font-medium transition hover:brightness-110">
        Generate Hero
      </button>

      <button className="w-full rounded-xl border border-white/10 bg-[#101528] py-3 transition hover:border-violet-500">
        Generate Dashboard
      </button>

      <button className="w-full rounded-xl border border-white/10 bg-[#101528] py-3 transition hover:border-violet-500">
        Generate Pricing
      </button>

    </div>

  </div>

</div>

    </div>

  </div>

</section>

      {/* ================= FEATURES ================= */}
      <section className="mx-auto mt-32 max-w-7xl px-8">
        <div className="mb-14 text-center">
          <h2 className="text-5xl font-black">
            Build Faster with AI
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Morph Studio understands structure first, then generates beautiful,
            production-ready interfaces that can be edited visually.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {[
            {
              title:"Structure Lock",
              desc:"Lock layout before generating UI."
            },
            {
              title:"AI Components",
              desc:"Generate reusable production-ready components."
            },
            {
              title:"One Click Export",
              desc:"Export directly to React + Tailwind."
            },
            {
              title:"Smart Editing",
              desc:"Regenerate only selected sections."
            },
            {
              title:"Team Workspace",
              desc:"Collaborate with designers and developers."
            },
            {
              title:"Version History",
              desc:"Restore previous generations anytime."
            }
          ].map((item)=>(
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div className="mb-6 h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500"/>

              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="mx-auto mt-32 mb-24 max-w-7xl px-8">
        <div className="mb-14 text-center">
          <h2 className="text-5xl font-black">
            How Morph Studio Works
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            ["01","Describe your interface"],
            ["02","AI understands structure"],
            ["03","Export production-ready code"]
          ].map(([no,title])=>(
            <div
              key={no}
              className="rounded-3xl border border-white/10 bg-[#111528] p-8"
            >
              <span className="text-5xl font-black text-violet-500">
                {no}
              </span>

              <h3 className="mt-6 text-2xl font-bold">
                {title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                Fast, collaborative and optimized for modern React development.
              </p>
            </div>
          ))}
        </div>
      </section>

    
      {/* ================= CTA ================= */}
      <section className="mx-auto mt-32 max-w-7xl px-8">
        <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-violet-700/20 to-cyan-600/10 p-16 text-center backdrop-blur-xl">
          <h2 className="text-5xl font-black">
            Ready to Build with Morph Studio?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Turn natural language into beautiful production-ready interfaces.
            Design faster, iterate visually and export clean React code.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button className="rounded-xl bg-violet-600 px-8 py-4 font-semibold">
              Start Free
            </button>

            <button className="rounded-xl border border-white/10 bg-white/5 px-8 py-4">
              Book Demo
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="mx-auto mt-32 max-w-7xl border-t border-white/10 px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">

          <div>
            <h3 className="text-2xl font-bold">Morph Studio</h3>
            <p className="mt-4 leading-7 text-slate-400">
              AI-powered UI generation platform for modern product teams.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Product</h4>
            <ul className="space-y-3 text-slate-400">
              <li>Features</li>
              <li>Roadmap</li>
              <li>Pricing</li>
              <li>Integrations</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Resources</h4>
            <ul className="space-y-3 text-slate-400">
              <li>Documentation</li>
              <li>Blog</li>
              <li>Community</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-3 text-slate-400">
              <li>About</li>
              <li>Careers</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-slate-500">
          © 2026 Morph Studio. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

export default Landing;
