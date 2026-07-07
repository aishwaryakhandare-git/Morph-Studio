import { motion } from "framer-motion";
import screen from "../../assets/screen.png";
import HeroSwirls from "../../components/landing/Hero/HeroSwirls";

import { useNavigate } from "react-router-dom";

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

import {
  PenTool,
  BrainCircuit,
  Download,
} from "lucide-react";

import {
  Bot,
  Lock,
  Pencil,
  Code2,
  LayoutGrid,
} from "lucide-react";

import {
  FaGithub,
  FaDiscord,
  FaXTwitter,
} from "react-icons/fa6";

function Landing() {
  const navigate = useNavigate();
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
                onClick={() => navigate("/workspace")}
                className="group flex h-[56px] items-center gap-4 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-[#5B5EF7] to-[#8B3DFF] px-8 text-[16px] font-semibold text-white shadow-[0_0_25px_rgba(124,58,237,.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(124,58,237,.55)]"
              >
                <span>Start Building</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <button
                onClick={() => navigate("/workspace")}
                className="group flex h-[56px] items-center gap-4 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-[#5B5EF7] to-[#8B3DFF] px-8 text-[16px] font-semibold text-white shadow-[0_0_25px_rgba(124,58,237,.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(124,58,237,.55)]"
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

{/* ================= HOW MORPH WORKS ================= */}

<section className="mx-auto mt-5 mb-20 max-w-[1450px] px-8">

  <div className="mb-10 text-center">

    <p className="text-[12px] font-semibold uppercase tracking-[0.38em] text-violet-400">
      HOW MORPH WORKS
    </p>

    <h2 className="mt-3 text-[30px] font-bold tracking-[-0.5px] text-white">
      From Intent to Interface in Seconds
    </h2>

  </div>

  <div className="flex items-center justify-center">

    {[
      {
        icon: PenTool,
        title: "Describe",
        desc: "Describe your layout\nin simple text.",
        color: "#22C55E",
      },
      {
        icon: BrainCircuit,
        title: "Understand",
        desc: "AI reads structure\nand user intent.",
        color: "#3B82F6",
      },
      {
        icon: Sparkles,
        title: "Generate",
        desc: "Instant UI generation\nwith perfect structure.",
        color: "#A855F7",
      },
      {
        icon: Download,
        title: "Refine & Export",
        desc: "Customize, export code.",
        color: "#F59E0B",
      },
    ].map((item, index) => {

      const Icon = item.icon;

      return (

        <div
          key={item.title}
          className="flex items-center"
        >

          {/* Card */}

          <div
            className="w-[240px] h-[100px] rounded-2xl border border-white/8 bg-[#0F1424] px-6 py-3 backdrop-blur-xl transition hover:border-violet-500/30 flex items-start"
          >

            <div className="flex items-start gap-4">

              <div
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{
                  backgroundColor: `${item.color}12`,
                  boxShadow: `0 0 28px ${item.color}40`,
                  border: `1px solid ${item.color}30`,
                }}
              >
                <Icon
                  size={19}
                  color={item.color}
                />
              </div>

              <div>

                <h3
                  className="whitespace-nowrap text-[18px] font-semibold"
                  style={{ color: item.color }}
                >
                  {item.title}
                </h3>

                <p className="mt-2 whitespace-pre-line text-[13px] leading-5 text-slate-400">
                  {item.desc}
                </p>

              </div>

            </div>

          </div>

          {/* Arrow */}

          {index !== 3 && (

            <div className="mx-5 flex items-center">

              <div className="mr-2 h-px w-7 border-t border-dashed border-violet-500/40" />

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12H19M19 12L14 7M19 12L14 17"
                  stroke="#A78BFA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            </div>

          )}

        </div>

      );

    })}

  </div>

</section>
{/* ================= POWERFUL FEATURES ================= */}

<section className="mx-auto mt-20 w-[92%] max-w-[1700px]">

  <div className="text-center">

    <p className="text-[12px] font-semibold uppercase tracking-[0.32em] text-violet-400">
      POWERFUL FEATURES
    </p>

    <h2 className="mt-2 text-[36px] font-bold tracking-[-0.03em] text-white">
      Everything you need to build better UI
    </h2>

  </div>

  <div className="mt-10 grid grid-cols-6 gap-5">

    {[
      {
        icon: Bot,
        color: "#22C55E",
        title: "Structure First AI",
        desc: "AI understands layout\nbefore generating UI.",
      },
      {
        icon: Lock,
        color: "#EC4899",
        title: "Zone Locking",
        desc: "Lock sections you love.\nAI won't touch them.",
      },
      {
        icon: Pencil,
        color: "#3B82F6",
        title: "Live Edit",
        desc: "Edit in real-time and\nsee changes instantly.",
      },
      {
        icon: Code2,
        color: "#A855F7",
        title: "Code Export",
        desc: "Export clean,\nproduction-ready code.",
      },
      {
        icon: LayoutGrid,
        color: "#F59E0B",
        title: "Design Systems",
        desc: "Build with your own\ncomponents.",
      },
      {
        icon: Users,
        color: "#8B5CF6",
        title: "Team Collaboration",
        desc: "Work together\nin real-time.",
      },
    ].map((feature) => {

      const Icon = feature.icon;

      return (

        <div
          key={feature.title}
          className="group h-[168px] rounded-[18px] border border-[#22283C] bg-[#0F1323] px-5 pt-3 pb-3 transition-all duration-300 hover:border-violet-500/40"
        >

          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              background: `${feature.color}12`,
              border: `1px solid ${feature.color}30`,
              boxShadow: `0 0 18px ${feature.color}20`,
            }}
          >
            <Icon
              size={18}
              color={feature.color}
              strokeWidth={2.2}
            />
          </div>

          <h3 className="mt-5 text-[18px] font-semibold leading-none text-white">
            {feature.title}
          </h3>

          <p className="mt-4 whitespace-pre-line text-[14px] leading-6 text-[#8C96AF]">
            {feature.desc}
          </p>

        </div>

      );

    })}

  </div>

</section>

      {/* ================= CTA BANNER ================= */}

<section className="mx-auto mt-8 w-[96%] max-w-[1700px]">

  <div className="relative overflow-hidden rounded-[18px] border border-violet-500/20 bg-gradient-to-r from-[#24124D] via-[#30145F] to-[#24124D] px-16 py-10">

    {/* Background Glow */}
    <div className="absolute -left-20 top-0 h-[300px] w-[300px] rounded-full bg-violet-600/20 blur-[120px]" />

    <div className="absolute right-20 bottom-0 h-[250px] w-[250px] rounded-full bg-fuchsia-500/20 blur-[100px]" />

    {/* Wave */}
    <div className="absolute right-0 bottom-0 h-full w-[45%] opacity-30">

      <svg
        viewBox="0 0 700 260"
        className="h-full w-full"
        fill="none"
      >

        <path
          d="M0 170 C120 110 200 220 320 160 S520 80 700 150"
          stroke="#6D4AFF"
          strokeWidth="1.5"
        />

        <path
          d="M0 185 C120 125 200 235 320 175 S520 95 700 165"
          stroke="#8B5CF6"
          strokeWidth="1.3"
          opacity=".8"
        />

        <path
          d="M0 200 C120 140 200 250 320 190 S520 110 700 180"
          stroke="#38BDF8"
          strokeWidth="1.2"
          opacity=".7"
        />

      </svg>

    </div>

    <div className="relative z-10 flex items-center justify-between">

      {/* Left */}

      <div className="max-w-[380px]">

        <h2 className="text-[40px] font-bold leading-tight text-white">
          Ready to build the future?
        </h2>

        <p className="mt-4 text-[18px] leading-8 text-slate-300">
          Join thousands of designers and developers building
          better products with Morph Studio.
        </p>

      </div>

      {/* Center */}

      <button
        onClick={() => navigate("/workspace")}
        className="flex h-[64px] items-center gap-4 rounded-xl bg-gradient-to-r from-[#6B4DFF] to-[#9444FF] px-12 text-[18px] font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,.35)] transition hover:scale-[1.02]"
      >
        Start Building for Free
        <span className="text-xl">→</span>
      </button>

      {/* Right */}

      <div className="relative w-[320px]">

        <img
          src={screen}
          alt="Preview"
          className="rounded-xl opacity-90"
        />

        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-transparent to-[#2E135B]/60" />

      </div>

    </div>

  </div>

</section>

      {/* ================= FOOTER ================= */}

<footer className="mx-auto mt-14 w-[96%] max-w-[1700px] border-t border-white/10 pt-12 pb-8">

  <div className="grid grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_0.8fr_1.4fr] gap-10">

    {/* Brand */}

    <div>

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/30 bg-gradient-to-br from-[#25154A] to-[#4C1D95]">
          <span className="text-lg font-semibold text-violet-300">
            M
          </span>
        </div>

        <h3 className="text-[28px] font-bold">
          Morph Studio
        </h3>

      </div>

      <p className="mt-6 max-w-[250px] text-[16px] leading-7 text-slate-400">
        AI that understands structure before style.
      </p>

      <div className="mt-7 flex gap-5 text-slate-400">

  <FaGithub className="cursor-pointer text-xl transition hover:text-white" />

  <FaXTwitter className="cursor-pointer text-xl transition hover:text-white" />

  <FaDiscord className="cursor-pointer text-xl transition hover:text-white" />

</div>

    </div>

    {/* Product */}

    <div>

      <h4 className="mb-5 text-lg font-semibold text-white">
        Product
      </h4>

      <ul className="space-y-4 text-slate-400">

        <li>Features</li>
        <li>How It Works</li>
        <li>Pricing</li>
        <li>Roadmap</li>

      </ul>

    </div>

    {/* Resources */}

    <div>

      <h4 className="mb-5 text-lg font-semibold text-white">
        Resources
      </h4>

      <ul className="space-y-4 text-slate-400">

        <li>Docs</li>
        <li>Templates</li>
        <li>Components</li>
        <li>Changelog</li>

      </ul>

    </div>

    {/* Company */}

    <div>

      <h4 className="mb-5 text-lg font-semibold text-white">
        Company
      </h4>

      <ul className="space-y-4 text-slate-400">

        <li>About Us</li>
        <li>Careers</li>
        <li>Contact</li>
        <li>Privacy</li>

      </ul>

    </div>

    {/* Community */}

    <div>

      <h4 className="mb-5 text-lg font-semibold text-white">
        Community
      </h4>

      <ul className="space-y-4 text-slate-400">

        <li>Discord</li>
        <li>GitHub</li>
        <li>Twitter</li>
        <li>YouTube</li>

      </ul>

    </div>

    {/* Newsletter */}

    <div className="rounded-2xl border border-white/10 bg-[#101524] p-7">

      <h3 className="text-2xl font-semibold text-white">
        Stay in the loop
      </h3>

      <p className="mt-4 text-[15px] leading-7 text-slate-400">
        Get updates on new features and releases.
      </p>

      <div className="mt-8 flex gap-3">

        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 rounded-xl border border-white/10 bg-[#0B1020] px-4 py-3 text-white outline-none placeholder:text-slate-500"
        />

        <button className="rounded-xl bg-gradient-to-r from-[#6D4AFF] to-[#8F3FFF] px-6 font-semibold text-white">
          Subscribe
        </button>

      </div>

    </div>

  </div>

  {/* Bottom */}

  <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8 text-sm text-slate-500">

    <p>
      © 2026 Morph Studio.
    </p>

    <div className="flex gap-8">

      <a href="#">Terms</a>
      <a href="#">Privacy</a>
      <a href="#">Cookies</a>

    </div>

  </div>

</footer>

    </div>
  );
}

export default Landing;
