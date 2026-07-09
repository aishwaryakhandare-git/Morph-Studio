import { useState, useEffect, useRef } from "react";

import {
  FolderOpen,
  LayoutTemplate,
  History,
  Image,
  Settings,
  Plus,
  PanelLeft,
} from "lucide-react";

function Workspace() {
    const [prompt, setPrompt] = useState("");

const [messages, setMessages] = useState([
  {
    id: 1,
    sender: "ai",
    text:
      "Welcome to Morph Studio 👋\n\nDescribe the interface you'd like to build.\n\nI'll generate layouts, components, color palettes and production-ready React code.",
  },
]);

const [isGenerating, setIsGenerating] = useState(false);

const [previewTitle, setPreviewTitle] = useState("Website Preview");

const messagesEndRef = useRef<HTMLDivElement>(null);

const [sidebarOpen, setSidebarOpen] = useState(false);

const handleGenerate = () => {
  if (!prompt.trim() || isGenerating) return;

  const userPrompt = prompt.trim();

  setMessages((prev) => [
    ...prev,
    {
      id: Date.now(),
      sender: "user",
      text: userPrompt,
    },
  ]);

  setPreviewTitle(userPrompt);

  setPrompt("");

  setIsGenerating(true);

  setTimeout(() => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: "ai",
        text:
          "Your interface has been generated successfully.\n\nYou can now refine the layout, switch themes, modify sections or export the generated code.",
      },
    ]);

    setIsGenerating(false);
  }, 1800);
};

const handleGenerateFromPrompt = (userPrompt: string) => {

  setMessages((prev) => [
    ...prev,
    {
      id: Date.now(),
      sender: "user",
      text: userPrompt,
    },
  ]);

  setPreviewTitle(userPrompt);

  setPrompt("");

  setIsGenerating(true);

  setTimeout(() => {

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: "ai",
        text:
          "Your interface has been generated successfully.\n\nYou can now refine the layout, switch themes or export the generated code.",
      },
    ]);

    setIsGenerating(false);

  }, 1800);

};

const handleQuickPrompt = (text: string) => {
  if (isGenerating) return;

  setPrompt(text);

  setTimeout(() => {
    handleGenerateFromPrompt(text);
  }, 100);
};

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, isGenerating]);

  return (
    <div className="flex h-screen flex-col bg-[#070B1A] text-white">

      {/* ================= TOPBAR PLACEHOLDER ================= */}

      {/* ================= TOP TOOLBAR ================= */}

<header className="flex h-[72px] items-center justify-between border-b border-white/10 bg-[#0B1020]/95 px-8 backdrop-blur-xl">

  {/* Left */}

  <div className="flex items-center gap-5">

    <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-[#111827] transition hover:bg-[#171C2E]"
    >
    <PanelLeft size={20} />
    </button>

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

    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 font-semibold">

      A

    </div>

  </div>

</header>

      {/* ================= MAIN WORKSPACE ================= */}

      <div

      className="grid flex-1 transition-all duration-300"
              style={{
              gridTemplateColumns: sidebarOpen
                  ? "260px 430px 1fr"
                  : "72px 430px 1fr",
              }}
              >



        {/* ================================================= */}
        {/* SIDEBAR */}
        {/* ================================================= */}

        <aside
        className={`border-r border-white/10 bg-[#0B1020] transition-all duration-300 overflow-hidden ${
            sidebarOpen ? "w-[260px]" : "w-[72px]"
        }`}
        >

          {/* Logo */}

          <div className="flex h-[72px] items-center border-b border-white/10 px-6">

            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-violet-500/30 bg-gradient-to-br from-[#24124D] to-[#5A31F4]">
                <span className="font-bold text-violet-300">M</span>
            </div>

            {sidebarOpen && (
                <div className="ml-3">
                <h2 className="font-semibold">
                    Morph Studio
                </h2>

                <p className="text-xs text-slate-500">
                    AI Workspace
                </p>
                </div>
            )}

            </div>

          {/* New Project */}

          <div className="p-5">

            <button
              className={`flex items-center rounded-xl
              bg-gradient-to-r from-[#6D4AFF] to-[#8F3FFF]
              transition
              ${
                sidebarOpen
                  ? "w-full justify-center gap-2 py-3"
                  : "mx-auto h-10 w-10 justify-center"
              }`}
            >
              <Plus size={18} />

              {sidebarOpen && "New Project"}
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
                className={`flex items-center rounded-xl py-3 transition
                ${
                    sidebarOpen
                    ? "w-full gap-3 px-4 justify-start"
                    : "h-12 w-12 mx-auto justify-center"
                }
                text-slate-400 hover:bg-[#171C2E] hover:text-white`}
                >
                <Icon size={18} />
                {sidebarOpen && item.title}
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

              {sidebarOpen && (
                <div>

                <p>Aishwarya</p>

                <p>Free Plan</p>

                </div>
                )}

            </div>

          </div>

        </aside>

        {/* ================================================= */}
{/* AI PANEL */}
{/* ================================================= */}

<section className="flex h-full flex-col border-r border-white/10 bg-[#0E1323]">

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
  
  {messages.map((message) => (
  <div
    key={message.id}
    className={`mb-8 flex ${
      message.sender === "user"
        ? "justify-end"
        : "justify-start gap-4"
    }`}
  >
    {message.sender === "ai" && (
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 font-semibold">
        M
      </div>
    )}

    <div
      className={`max-w-[330px] rounded-2xl p-5 ${
        message.sender === "ai"
          ? "border border-violet-500/20 bg-[#13192B]"
          : "bg-gradient-to-r from-[#6D4AFF] to-[#8F3FFF]"
      }`}
    >
      <p className="whitespace-pre-line leading-7 text-slate-200">
        {message.text}
      </p>
    </div>
  </div>
))}

{isGenerating && (
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
)}

</div>

<div ref={messagesEndRef} />

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
  disabled={isGenerating}
  key={item}
  onClick={() => handleQuickPrompt(item)}
  className="rounded-xl border border-white/10 bg-[#13192B] px-4 py-2 text-sm text-slate-300 transition hover:border-violet-500 hover:bg-violet-500/10"
>
  {item}
</button>

      ))}

    </div>

  </div>

{/* ================================================= */}
{/* AI PROMPT BAR */}
{/* ================================================= */}

<div className="mt-auto border-t border-white/10 bg-[#0B1020] px-8 py-5">

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
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleGenerate();
          }
        }}
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

    <button
    onClick={handleGenerate}
    disabled={isGenerating}
    className="rounded-2xl bg-gradient-to-r from-[#6D4AFF] to-[#8F3FFF] px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,.35)] transition hover:brightness-110"
    >
    {isGenerating ? "Generating..." : "Generate →"}
    </button>

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
        {previewTitle}
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

    <div
    className={`flex items-center ${
        sidebarOpen
        ? "gap-3"
        : "justify-center"
    }`}
    >

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
</div>
  );
}

export default Workspace;