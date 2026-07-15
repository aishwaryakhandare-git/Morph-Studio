import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Archive,
  ArrowUp,
  BarChart3,
  Bell,
  ChevronDown,
  Clock3,
  Command,
  Download,
  Expand,
  FolderKanban,
  Image,
  Laptop,
  LayoutDashboard,
  Menu,
  Mic,
  Monitor,
  Moon,
  PanelLeft,
  Paperclip,
  Plus,
  Rocket,
  Search,
  Settings,
  Smartphone,
  Sparkles,
  Tablet,
  Wand2,
} from "lucide-react";

type Role = "user" | "assistant";
type PreviewType = "landing" | "dashboard" | "portfolio" | "login" | "pricing" | "ecommerce" | "default";
type Device = "desktop" | "tablet" | "mobile";

interface Message {
  id: number;
  role: Role;
  content: string;
}

interface PreviewCopy {
  title: string;
  description: string;
  type: PreviewType;
}

interface ActionButton {
  label: string;
  icon: React.ElementType;
  options: string[];
}

const actionButtons: ActionButton[] = [
  { label: "Generate", icon: Sparkles, options: ["Generate from prompt", "Landing page", "Dashboard", "Pricing section"] },
  { label: "Modify", icon: Wand2, options: ["Make it cleaner", "Add more contrast", "Improve spacing", "Add conversion CTA"] },
  { label: "Theme", icon: Moon, options: ["Midnight violet", "Graphite pro", "Neon glass", "High contrast"] },
  { label: "Preview", icon: Monitor, options: ["Desktop canvas", "Tablet canvas", "Mobile canvas", "Open preview"] },
  { label: "Export", icon: Download, options: ["Download HTML", "Copy React summary", "Export design notes"] },
];

const quickPrompts = ["Landing Page", "Dashboard", "Portfolio", "Login UI", "Pricing Section", "E-commerce"];

const sidebarItems = [
  { label: "Projects", icon: FolderKanban },
  { label: "Templates", icon: LayoutDashboard },
  { label: "History", icon: Clock3 },
  { label: "Assets", icon: Archive },
  { label: "Settings", icon: Settings },
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Welcome to Morph Studio. Describe the interface you want and I will shape the preview, structure, and visual direction in real time.",
  },
];


export default function Workspace(): React.ReactElement {
  // Core workspace state
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("Modern Product Website");
  const [previewDescription, setPreviewDescription] = useState(
    "A clean AI-generated interface with hero content, feature modules, and polished conversion areas.",
  );
  const [previewType, setPreviewType] = useState<PreviewType>("default");
  const [pageData, setPageData] = useState<any>(null);
const [theme, setTheme] = useState("Dark");
const [accentColors, setAccentColors] = useState<string[]>([]);
  const [device, setDevice] = useState<Device>("desktop");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSidebarItem, setActiveSidebarItem] = useState("Projects");
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Ready");
  const conversationRef = useRef<HTMLDivElement | null>(null);
  const previewFrameRef = useRef<HTMLDivElement | null>(null);
  const messageIdRef = useRef(2);

  // Device canvas sizing
  const deviceWidth = useMemo(() => {
    const widths: Record<Device, string> = {
      desktop: "900px",
      tablet: "650px",
      mobile: "380px",
    };

    return widths[device];
  }, [device]);

  const visibleZoom = `${zoomLevel}%`;

  const sidebarContext = useMemo(() => {
    const descriptions: Record<string, string> = {
      Projects: "Active project list loaded",
      Templates: "Template gallery ready",
      History: "Recent generations visible",
      Assets: "Asset browser prepared",
      Settings: "Workspace preferences opened",
    };

    return descriptions[activeSidebarItem] ?? "Workspace ready";
  }, [activeSidebarItem]);

  // Chat auto-scroll
  useEffect(() => {
    conversationRef.current?.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isGenerating]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }

      if (event.key === "Escape") {
        setActiveDropdown(null);
        setCommandOpen(false);
        setNotificationOpen(false);
      }
    };

    const handleFullscreenChange = (): void => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Generation flow
  const updatePreview = (value: string): PreviewCopy => {
    const copy = getPreviewCopy(value);
    setPreviewTitle(copy.title);
    setPreviewDescription(copy.description);
    setPreviewType(copy.type);
    return copy;
  };

  const submitPrompt = async (value: string): Promise<void> => {

    const trimmed = value.trim();

    if (!trimmed || isGenerating) return;

    const userMessage: Message = {
        id: messageIdRef.current++,
        role: "user",
        content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsGenerating(true);

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/generate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    prompt: trimmed,
                }),
            }
        );

        const data = await response.json();

        setPreviewTitle(data.title);

        setPreviewDescription(data.description);

        setPreviewType(data.type);

        setPageData(data.page);

        setTheme(data.theme);

        setAccentColors(data.accentColors);

        const assistantMessage: Message = {

            id: messageIdRef.current++,

            role: "assistant",

            content: data.assistantMessage,

        };

        setMessages((prev) => [...prev, assistantMessage]);

    } catch (error) {

    console.error(error);

    const assistantMessage: Message = {

        id: messageIdRef.current++,

        role: "assistant",

        content: "Unable to connect to Morph Studio backend."

    };

    setMessages((prev) => [...prev, assistantMessage]);

} finally {

        setPrompt("");

        setIsGenerating(false);

    }

};

  const addAssistantMessage = (content: string): void => {
    const assistantMessage: Message = {
      id: messageIdRef.current,
      role: "assistant",
      content,
    };
    messageIdRef.current += 1;
    setMessages((current) => [...current, assistantMessage]);
  };

  const handleToolbarOption = (label: string, option: string): void => {
    setActiveDropdown(null);
    setStatusMessage(`${label}: ${option}`);

    if (label === "Generate") {
      submitPrompt(option === "Generate from prompt" ? prompt || "Landing page" : option);
      return;
    }

    if (label === "Modify") {
      setPrompt(option);
      addAssistantMessage(`Modifier loaded: "${option}". Press Generate to apply it to the current preview.`);
      return;
    }

    if (label === "Theme") {
      addAssistantMessage(`Theme preference set to ${option}. The current dark Morph Studio palette remains active for this prototype.`);
      return;
    }

    if (label === "Preview") {
      if (option.includes("Desktop")) {
        setDevice("desktop");
      } else if (option.includes("Tablet")) {
        setDevice("tablet");
      } else if (option.includes("Mobile")) {
        setDevice("mobile");
      } else {
        openPreview();
      }
      return;
    }

    if (label === "Export") {
      if (option.includes("HTML")) {
        exportPreview();
      } else {
        addAssistantMessage(`${option} is prepared in the conversation summary for this single-file prototype.`);
      }
    }
  };

  const handleSidebarSelect = (label: string): void => {
    setActiveSidebarItem(label);
    setStatusMessage(`${label} selected`);
  };

  const handleNewProject = (): void => {
    setMessages(initialMessages);
    setPrompt("");
    setIsGenerating(false);
    setPreviewTitle("Modern Product Website");
    setPreviewDescription("A clean AI-generated interface with hero content, feature modules, and polished conversion areas.");
    setPreviewType("default");
    setDevice("desktop");
    setZoomLevel(100);
    setStatusMessage("New project created");
  };

  const handlePromptTool = (tool: string): void => {
    const inserts: Record<string, string> = {
      Attach: "Use the attached product brief to generate a polished interface.",
      Image: "Create an image-forward hero with rich product visuals and strong contrast.",
      Voice: "Build a voice-first assistant interface with recording states and transcript review.",
    };

    setPrompt((current) => (current ? `${current}\n${inserts[tool]}` : inserts[tool]));
    setStatusMessage(`${tool} context added`);
  };

  const changeZoom = (): void => {
    setZoomLevel((current) => {
      const next = current === 100 ? 85 : current === 85 ? 70 : 100;
      setStatusMessage(`Preview zoom set to ${next}%`);
      return next;
    });
  };

  const toggleFullscreen = (): void => {
    const target = previewFrameRef.current;
    if (!target) {
      return;
    }

    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void target.requestFullscreen();
    }
  };

  const exportPreview = (): void => {
    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${previewTitle}</title>
  </head>
  <body>
    <main>
      <h1>${previewTitle}</h1>
      <p>${previewDescription}</p>
      <p>Generated by Morph Studio as a ${previewType} preview.</p>
    </main>
  </body>
</html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${previewType}-preview.html`;
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage("Preview HTML exported");
  };

  const runCommand = (command: string): void => {
    setCommandOpen(false);
    setCommandQuery("");

    if (command === "Generate") {
      submitPrompt(prompt || "Landing page");
    } else if (command === "Open Preview") {
      openPreview();
    } else if (command === "Export") {
      exportPreview();
    } else if (command === "Toggle Sidebar") {
      setSidebarOpen((open) => !open);
    } else if (command === "Mobile Preview") {
      setDevice("mobile");
    }

    setStatusMessage(`${command} executed`);
  };

  const handlePreviewAction = (action: string): void => {
    setStatusMessage(action);
    addAssistantMessage(`Preview action triggered: ${action}. This prototype is ready to connect that control to a real route, form, or API.`);
  };

  // External preview window
  const openPreview = (): void => {
    const previewWindow = window.open("", "_blank", "noopener,noreferrer");
    if (!previewWindow) {
      return;
    }

    previewWindow.document.write(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${previewTitle}</title>
          <style>
            body {
              margin: 0;
              min-height: 100vh;
              display: grid;
              place-items: center;
              color: white;
              font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              background: radial-gradient(circle at top, #312e81, transparent 28rem), #070B1A;
            }
            main {
              width: min(880px, calc(100vw - 40px));
              border: 1px solid rgba(255,255,255,.12);
              border-radius: 28px;
              padding: 48px;
              background: rgba(11,16,32,.86);
              box-shadow: 0 24px 90px rgba(0,0,0,.42);
            }
            p { color: #94a3b8; font-size: 18px; line-height: 1.7; }
          </style>
        </head>
        <body>
          <main>
            <p>Morph Studio Preview</p>
            <h1>${previewTitle}</h1>
            <p>${previewDescription}</p>
          </main>
        </body>
      </html>
    `);
    previewWindow.document.close();
  };

  // Toolbar and shell
  const renderDropdownButton = ({ label, icon: Icon, options }: ActionButton): React.ReactElement => (
    <div key={label} className="relative">
      <button
        className={`group inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition ${
          activeDropdown === label
            ? "border-violet-400/50 bg-violet-500/15 text-white"
            : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-violet-400/40 hover:bg-white/[0.07] hover:text-white"
        }`}
        onClick={() => setActiveDropdown((current) => (current === label ? null : label))}
        type="button"
      >
        <Icon className="h-4 w-4 text-slate-400 transition group-hover:text-violet-200" />
        {label}
        <ChevronDown className={`h-3.5 w-3.5 text-slate-500 transition ${activeDropdown === label ? "rotate-180" : ""}`} />
      </button>

      {activeDropdown === label ? (
        <div className="absolute left-0 top-11 z-40 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#0B1020] p-1 shadow-2xl shadow-black/40">
          {options.map((option) => (
            <button
              key={option}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-medium text-slate-300 transition hover:bg-violet-500/15 hover:text-white"
              onClick={() => handleToolbarOption(label, option)}
              type="button"
            >
              {option}
              <ArrowUp className="h-3.5 w-3.5 rotate-45 text-slate-600" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );

  const renderSidebar = (): React.ReactElement => (
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-white/10 bg-[#0B1020]/95 transition-[width] duration-300 ease-out ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex h-16 items-center justify-center border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 font-black text-white shadow-lg shadow-violet-950/50">
            M
          </div>
          {sidebarOpen ? <span className="text-sm font-semibold tracking-wide text-white">Morph Studio</span> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <button
          className={`flex h-11 items-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-sm font-semibold text-white shadow-lg shadow-violet-950/35 transition hover:scale-[1.02] ${
            sidebarOpen ? "justify-start gap-3 px-4" : "justify-center"
          }`}
          onClick={handleNewProject}
          type="button"
        >
          <Plus className="h-4 w-4" />
          {sidebarOpen ? <span>New Project</span> : null}
        </button>

        <nav className="mt-3 space-y-2">
          {sidebarItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`flex h-11 w-full items-center rounded-xl text-sm transition ${
                activeSidebarItem === label ? "bg-violet-500/15 text-white" : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
              } ${sidebarOpen ? "justify-start gap-3 px-4" : "justify-center"}`}
              onClick={() => handleSidebarSelect(label)}
              type="button"
            >
              <Icon className="h-4.5 w-4.5" />
              {sidebarOpen ? <span>{label}</span> : null}
            </button>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10 p-4">
        <button
          className={`flex h-11 w-full items-center rounded-xl bg-[#13192B] text-left transition hover:bg-white/[0.08] ${
            sidebarOpen ? "gap-3 px-3" : "justify-center"
          }`}
          onClick={() => {
            setSidebarOpen(true);
            handleSidebarSelect("Settings");
          }}
          type="button"
        >
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-slate-200 to-slate-500 text-xs font-bold text-[#070B1A]">
            A
          </div>
          {sidebarOpen ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">Aishwarya</p>
              <p className="truncate text-xs text-slate-500">Free Plan</p>
            </div>
          ) : null}
        </button>
      </div>
    </aside>
  );

  const renderTopToolbar = (): React.ReactElement => (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#0B1020]/90 px-4 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
          onClick={() => setSidebarOpen((open) => !open)}
          type="button"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-white">Untitled Project</h1>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
              Auto Saved
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">Auto Saved / Just now</p>
        </div>
      </div>

      <div className="hidden items-center gap-2 xl:flex">{actionButtons.map(renderDropdownButton)}</div>

      <div className="flex items-center gap-3">
        <button
          className="hidden h-9 items-center gap-2 rounded-lg border border-white/10 bg-[#13192B] px-3 text-sm text-slate-400 transition hover:border-violet-400/30 hover:text-white lg:flex"
          onClick={() => setCommandOpen(true)}
          type="button"
        >
          <Command className="h-4 w-4" />
          <span>Command Search</span>
          <Search className="h-3.5 w-3.5" />
        </button>
        <div className="relative">
          <button
            className={`grid h-9 w-9 place-items-center rounded-lg border border-white/10 transition hover:bg-white/[0.08] hover:text-white ${
              notificationOpen ? "bg-violet-500/15 text-white" : "bg-white/[0.03] text-slate-400"
            }`}
            onClick={() => setNotificationOpen((open) => !open)}
            type="button"
          >
            <Bell className="h-4 w-4" />
          </button>
          {notificationOpen ? (
            <div className="absolute right-0 top-11 z-40 w-72 rounded-xl border border-white/10 bg-[#0B1020] p-4 shadow-2xl shadow-black/40">
              <p className="text-sm font-semibold text-white">Activity</p>
              <div className="mt-3 space-y-3 text-xs text-slate-400">
                <p>Autosave completed just now.</p>
                <p>{sidebarContext}.</p>
                <p>{statusMessage}.</p>
              </div>
            </div>
          ) : null}
        </div>
        <button
          className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-400 text-sm font-bold text-white transition hover:scale-105"
          onClick={() => {
            setSidebarOpen(true);
            handleSidebarSelect("Settings");
          }}
          type="button"
        >
          A
        </button>
      </div>
    </header>
  );

  const renderAssistant = (): React.ReactElement => (
    <section className="flex min-w-0 basis-[40%] flex-col border-r border-white/10 bg-[#0B1020]">
      <div className="border-b border-white/10 px-6 py-6">
        <p className="text-xs font-semibold tracking-[0.24em] text-violet-300">AI DESIGN ASSISTANT</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">What would you like to build?</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
          Prompt Morph with a product idea, section, or workflow. The assistant will respond and reshape the live preview.
        </p>
      </div>

      <div ref={conversationRef} className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex animate-[fadeIn_.35s_ease-out] gap-3 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" ? (
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-sm font-black text-white">
                M
              </div>
            ) : null}
            <div
              className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-xl ${
                message.role === "user"
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-violet-950/30"
                  : "border border-white/10 bg-[#13192B] text-slate-200"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isGenerating ? (
          <div className="flex animate-[fadeIn_.35s_ease-out] gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-sm font-black text-white">
              M
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#13192B] px-4 py-3">
              <span className="h-2 w-2 animate-bounce rounded-full bg-violet-300" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-fuchsia-300 [animation-delay:120ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-violet-300 [animation-delay:240ms]" />
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-white/10 px-6 py-4">
        <div className="mb-4 flex flex-wrap gap-2">
          {quickPrompts.map((item) => (
            <button
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-45"
              disabled={isGenerating}
              onClick={() => {
                setPrompt(item);
                submitPrompt(item);
              }}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );

  const renderPromptBar = (): React.ReactElement => (
    <div className="shrink-0 border-t border-white/10 bg-[#070B1A]/95 px-5 py-4">
      <div className="mx-auto flex max-w-5xl items-end gap-3 rounded-2xl border border-white/10 bg-[#0B1020] p-3 shadow-2xl shadow-black/30">
        <div className="flex gap-1.5 pb-1">
          {[
            { label: "Attach", icon: Paperclip },
            { label: "Image", icon: Image },
            { label: "Voice", icon: Mic },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-white/[0.07] hover:text-white"
              onClick={() => handlePromptTool(label)}
              title={label}
              type="button"
            >
              <Icon className="h-4.5 w-4.5" />
            </button>
          ))}
        </div>

        <textarea
          className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-1 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-500"
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submitPrompt(prompt);
            }
          }}
          placeholder="Ask Morph to build a dashboard, landing page, login flow, pricing section..."
          rows={1}
          value={prompt}
        />

        <button
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-950/40 transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:scale-100"
          disabled={isGenerating || !prompt.trim()}
          onClick={() => submitPrompt(prompt)}
          type="button"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  // Generated preview variants
  const renderLandingPreview = (): React.ReactElement => (
    <div className="space-y-8">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Rocket className="h-5 w-5 text-fuchsia-300" />
          NovaFlow
        </div>
        <div className="hidden gap-5 text-xs text-slate-400 sm:flex">
          <span>Product</span>
          <span>Teams</span>
          <span>Pricing</span>
        </div>
        <button className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#070B1A]" onClick={() => handlePreviewAction("Landing signup opened")} type="button">
          Start free
        </button>
      </nav>
      <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">AI launch system</p>
          <h3 className="mt-4 text-5xl font-semibold leading-[1.03] tracking-tight text-white">
            Build sharper launches in half the time.
          </h3>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Plan, generate, and ship refined marketing surfaces with an adaptive AI workspace for modern teams.
          </p>
          <div className="mt-6 flex gap-3">
            <button className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3 text-sm font-bold text-white" onClick={() => handlePreviewAction("Landing page generation CTA clicked")} type="button">
              Generate site
            </button>
            <button className="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-200" onClick={() => handlePreviewAction("Landing demo opened")} type="button">
              View demo
            </button>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="h-44 rounded-xl bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-cyan-400/20 p-4">
            <div className="h-full rounded-xl border border-white/10 bg-[#0B1020]/70 p-4">
              <div className="h-3 w-24 rounded-full bg-white/30" />
              <div className="mt-8 grid grid-cols-3 gap-2">
                <span className="h-16 rounded-lg bg-white/10" />
                <span className="h-24 rounded-lg bg-violet-400/30" />
                <span className="h-12 rounded-lg bg-fuchsia-400/25" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {["AI wireframes", "Brand systems", "Instant export"].map((item) => (
          <div key={item} className="rounded-xl border border-white/10 bg-[#13192B] p-4">
            <div className="h-8 w-8 rounded-lg bg-violet-500/20" />
            <p className="mt-4 text-sm font-semibold text-white">{item}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">Production-minded blocks for fast iteration.</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDashboardPreview = (): React.ReactElement => (
    <div className="grid min-h-[620px] grid-cols-[180px_1fr] overflow-hidden rounded-2xl border border-white/10 bg-[#070B1A]">
      <aside className="border-r border-white/10 bg-[#0B1020] p-4">
        <div className="mb-8 flex items-center gap-2 text-sm font-bold text-white">
          <BarChart3 className="h-4 w-4 text-violet-300" />
          MetricOS
        </div>
        {["Overview", "Revenue", "Customers", "Reports"].map((item, index) => (
          <div
            key={item}
            className={`mb-2 rounded-lg px-3 py-2 text-xs ${index === 0 ? "bg-violet-500/20 text-white" : "text-slate-500"}`}
          >
            {item}
          </div>
        ))}
      </aside>
      <main className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Executive Overview</h3>
            <p className="text-xs text-slate-500">Live performance across all channels</p>
          </div>
          <button className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300" onClick={exportPreview} type="button">
            Export
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {["$128.4K", "42.8K", "8.9%"].map((metric, index) => (
            <div key={metric} className="rounded-xl border border-white/10 bg-[#13192B] p-4">
              <p className="text-xs text-slate-500">{["Revenue", "Visitors", "Conversion"][index]}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{metric}</p>
              <p className="mt-1 text-xs text-emerald-300">+12.4%</p>
            </div>
          ))}
        </div>
        <div className="grid gap-3 lg:grid-cols-[1.4fr_.8fr]">
          <div className="rounded-xl border border-white/10 bg-[#13192B] p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Revenue Trend</p>
              <p className="text-xs text-slate-500">Last 30 days</p>
            </div>
            <div className="flex h-48 items-end gap-2">
              {[48, 64, 52, 78, 70, 86, 92, 76, 96, 88, 104, 112].map((height) => (
                <span
                  key={height}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-violet-700 to-fuchsia-400"
                  style={{ height }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#13192B] p-4">
            <p className="text-sm font-semibold text-white">Pipeline</p>
            {["Discovery", "Proposal", "Closed"].map((item, index) => (
              <div key={item} className="mt-4">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{item}</span>
                  <span>{[74, 48, 31][index]}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" style={{ width: `${[74, 48, 31][index]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#13192B] p-4">
          {["Acme Labs", "Northstar", "Linear Field"].map((item, index) => (
            <div key={item} className="grid grid-cols-3 border-b border-white/5 py-3 text-xs last:border-0">
              <span className="font-medium text-white">{item}</span>
              <span className="text-slate-500">{["Enterprise", "Growth", "Startup"][index]}</span>
              <span className="text-right text-emerald-300">${[42, 18, 9][index]}K</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

  const renderPortfolioPreview = (): React.ReactElement => (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#13192B] to-[#0B1020] p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Independent designer</p>
        <h3 className="mt-4 max-w-2xl text-5xl font-semibold leading-tight text-white">Designing AI products with precision and atmosphere.</h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
          A portfolio for product strategy, interface systems, and interactive prototypes.
        </p>
      </section>
      <section className="grid gap-3 md:grid-cols-3">
        {["Atlas AI", "Finch Mobile", "Orbit CRM"].map((item, index) => (
          <article key={item} className="rounded-xl border border-white/10 bg-[#13192B] p-4">
            <div className={`h-36 rounded-lg ${["bg-violet-500/25", "bg-cyan-400/20", "bg-fuchsia-500/20"][index]}`} />
            <p className="mt-4 text-sm font-semibold text-white">{item}</p>
            <p className="mt-2 text-xs text-slate-500">Interface design / Prototype</p>
          </article>
        ))}
      </section>
      <section className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border border-white/10 bg-[#13192B] p-5">
          <h4 className="text-lg font-semibold text-white">About</h4>
          <p className="mt-3 text-sm leading-6 text-slate-400">I create calm, fast, and high-trust digital products for ambitious teams.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#13192B] p-5">
          <h4 className="text-lg font-semibold text-white">Skills</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {["UX Systems", "AI Flows", "React", "Brand"].map((item) => (
              <span key={item} className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-slate-300">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderLoginPreview = (): React.ReactElement => (
    <div className="grid min-h-[620px] place-items-center rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,.28),_transparent_30rem),#070B1A] p-8">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0B1020]/95 p-6 shadow-2xl shadow-black/40">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 font-black text-white">
          M
        </div>
        <h3 className="mt-6 text-center text-2xl font-semibold text-white">Welcome back</h3>
        <p className="mt-2 text-center text-sm text-slate-500">Sign in to continue building with Morph.</p>
        <div className="mt-6 space-y-3">
          <label className="block text-xs font-medium text-slate-400">
            Email
            <input className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#13192B] px-3 text-sm text-white outline-none" placeholder="you@studio.com" />
          </label>
          <label className="block text-xs font-medium text-slate-400">
            Password
            <input className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#13192B] px-3 text-sm text-white outline-none" placeholder="********" type="password" />
          </label>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-slate-400">
            <input className="accent-violet-500" type="checkbox" />
            Remember me
          </label>
          <button className="text-violet-300" onClick={() => handlePreviewAction("Password recovery opened")} type="button">
            Forgot Password
          </button>
        </div>
        <button className="mt-6 h-11 w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-sm font-bold text-white" onClick={() => handlePreviewAction("Login submitted")} type="button">
          Sign In
        </button>
      </div>
    </div>
  );

  const renderPricingPreview = (): React.ReactElement => (
    <div className="space-y-8">
      <section className="text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Simple pricing</p>
        <h3 className="mt-3 text-4xl font-semibold text-white">Choose the studio plan that fits.</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">Scale from solo prototyping to team-level AI design operations.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {["Starter", "Pro", "Scale"].map((plan, index) => (
          <article
            key={plan}
            className={`rounded-2xl border p-5 ${
              index === 1 ? "border-violet-400/50 bg-violet-500/10 shadow-2xl shadow-violet-950/30" : "border-white/10 bg-[#13192B]"
            }`}
          >
            <p className="text-sm font-semibold text-white">{plan}</p>
            <p className="mt-4 text-4xl font-semibold text-white">${[19, 49, 129][index]}</p>
            <p className="mt-2 text-xs text-slate-500">per seat / month</p>
            <button
              className={`mt-5 h-10 w-full rounded-xl text-sm font-bold ${
                index === 1 ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white" : "border border-white/10 text-slate-300"
              }`}
              onClick={() => handlePreviewAction(`${plan} pricing plan selected`)}
              type="button"
            >
              Get started
            </button>
            <div className="mt-5 space-y-3">
              {["Unlimited prompts", "Live preview", "Team library"].map((feature) => (
                <p key={feature} className="text-xs text-slate-400">
                  Included: {feature}
                </p>
              ))}
            </div>
          </article>
        ))}
      </section>
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-violet-600/20 to-fuchsia-500/20 p-6 text-center">
        <p className="text-lg font-semibold text-white">Need enterprise controls?</p>
        <p className="mt-2 text-sm text-slate-400">Add SSO, audit trails, advanced permissions, and custom deployment support.</p>
      </div>
    </div>
  );

  const renderEcommercePreview = (): React.ReactElement => (
    <div className="space-y-6">
      <nav className="flex items-center justify-between">
        <div className="text-lg font-black text-white">Astra Supply</div>
        <div className="flex gap-3 text-xs text-slate-400">
          <span>New</span>
          <span>Gear</span>
          <span>Journal</span>
        </div>
      </nav>
      <section className="grid gap-4 rounded-2xl border border-white/10 bg-[#13192B] p-5 md:grid-cols-[1fr_.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-300">Studio collection</p>
          <h3 className="mt-4 text-4xl font-semibold text-white">Objects for focused creative work.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">Premium tools, desk objects, and limited releases for modern operators.</p>
          <button className="mt-5 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#070B1A]" onClick={() => handlePreviewAction("Store collection opened")} type="button">
            Shop now
          </button>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20" />
      </section>
      <section className="flex flex-wrap gap-2">
        {["All", "Desks", "Audio", "Lighting", "Bags"].map((item, index) => (
          <button key={item} className={`rounded-full px-3 py-1.5 text-xs ${index === 0 ? "bg-violet-500 text-white" : "bg-white/10 text-slate-400"}`} onClick={() => handlePreviewAction(`${item} category selected`)} type="button">
            {item}
          </button>
        ))}
      </section>
      <section className="grid gap-3 md:grid-cols-3">
        {["Arc Lamp", "Signal Dock", "Field Pack"].map((item, index) => (
          <article key={item} className="rounded-xl border border-white/10 bg-[#13192B] p-4">
            <div className={`h-36 rounded-lg ${["bg-fuchsia-400/20", "bg-violet-400/20", "bg-cyan-400/20"][index]}`} />
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{item}</p>
              <p className="text-sm text-slate-300">${[148, 89, 220][index]}</p>
            </div>
            <button className="mt-3 h-9 w-full rounded-lg border border-white/10 text-xs font-bold text-slate-300" onClick={() => handlePreviewAction(`${item} added to cart`)} type="button">
              Add to cart
            </button>
          </article>
        ))}
      </section>
    </div>
  );

  const renderDefaultPreview = (): React.ReactElement => (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-[#13192B] p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Generated interface</p>
        <h3 className="mt-4 max-w-2xl text-5xl font-semibold leading-tight text-white">A polished product surface for your next idea.</h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
          Use the prompt bar to turn this into a landing page, dashboard, portfolio, pricing section, login UI, or storefront.
        </p>
      </section>
      <section className="grid gap-3 md:grid-cols-3">
        {["Adaptive layout", "Premium visuals", "Reusable sections"].map((item) => (
          <div key={item} className="rounded-xl border border-white/10 bg-[#13192B] p-5">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-violet-600/40 to-fuchsia-500/30" />
            <p className="mt-4 text-sm font-semibold text-white">{item}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">Ready for rapid iteration and refinement.</p>
          </div>
        ))}
      </section>
    </div>
  );

  const renderGeneratedPreview = (): React.ReactElement => {
    switch (previewType) {
      case "landing":
        return renderLandingPreview();
      case "dashboard":
        return renderDashboardPreview();
      case "portfolio":
        return renderPortfolioPreview();
      case "login":
        return renderLoginPreview();
      case "pricing":
        return renderPricingPreview();
      case "ecommerce":
        return renderEcommercePreview();
      default:
        return renderDefaultPreview();
    }
  };

  const renderLivePreview = (): React.ReactElement => (
    <section className="flex min-w-0 basis-[60%] flex-col bg-[#070B1A]">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.24em] text-violet-300">LIVE PREVIEW</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{previewTitle}</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">{previewDescription}</p>
        </div>
        <div className="flex rounded-xl border border-white/10 bg-[#0B1020] p-1">
          {[
            { value: "desktop" as Device, icon: Laptop, label: "Desktop" },
            { value: "tablet" as Device, icon: Tablet, label: "Tablet" },
            { value: "mobile" as Device, icon: Smartphone, label: "Mobile" },
          ].map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              className={`flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium transition ${
                device === value ? "bg-white text-[#070B1A]" : "text-slate-400 hover:text-white"
              }`}
              onClick={() => setDevice(value)}
              type="button"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden 2xl:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div
          ref={previewFrameRef}
          className="mx-auto origin-top transition-all duration-500 ease-out"
          style={{ width: deviceWidth, maxWidth: "100%", transform: `scale(${zoomLevel / 100})` }}
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1020] shadow-2xl shadow-black/50">
            <div className="flex h-12 items-center gap-3 border-b border-white/10 bg-[#13192B] px-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex h-7 flex-1 items-center rounded-lg border border-white/10 bg-[#0B1020] px-3 text-xs text-slate-500">
                morph.studio/preview/{previewType}
              </div>
            </div>
            <div className="min-h-[680px] bg-[#070B1A] p-6">{renderGeneratedPreview()}</div>
          </div>
        </div>
      </div>

      <div className="flex h-14 shrink-0 items-center justify-between border-t border-white/10 bg-[#0B1020] px-6">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <PanelLeft className="h-4 w-4" />
          <span>{statusMessage}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
            onClick={changeZoom}
            type="button"
          >
            Zoom {visibleZoom}
          </button>
          <button
            className={`grid h-9 w-9 place-items-center rounded-lg border border-white/10 transition hover:bg-white/[0.06] hover:text-white ${
              isFullscreen ? "bg-violet-500/15 text-white" : "text-slate-400"
            }`}
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            type="button"
          >
            <Expand className="h-4 w-4" />
          </button>
          <button
            className="rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3 py-2 text-xs font-bold text-white transition hover:scale-[1.03]"
            onClick={openPreview}
            type="button"
          >
            Open Preview
          </button>
        </div>
      </div>
    </section>
  );

  const renderCommandPalette = (): React.ReactElement | null => {
    if (!commandOpen) {
      return null;
    }

    const commands = ["Generate", "Open Preview", "Export", "Toggle Sidebar", "Mobile Preview"];
    const filteredCommands = commands.filter((command) => command.toLowerCase().includes(commandQuery.toLowerCase()));

    return (
      <div className="fixed inset-0 z-50 grid place-items-start justify-center bg-black/50 pt-28 backdrop-blur-sm">
        <div className="w-[min(620px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-white/10 bg-[#0B1020] shadow-2xl shadow-black/50">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <Command className="h-5 w-5 text-violet-300" />
            <input
              autoFocus
              className="h-10 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              onChange={(event) => setCommandQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && filteredCommands[0]) {
                  runCommand(filteredCommands[0]);
                }
              }}
              placeholder="Search commands..."
              value={commandQuery}
            />
            <button
              className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-500 transition hover:text-white"
              onClick={() => setCommandOpen(false)}
              type="button"
            >
              Esc
            </button>
          </div>
          <div className="p-2">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command) => (
                <button
                  key={command}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-violet-500/15 hover:text-white"
                  onClick={() => runCommand(command)}
                  type="button"
                >
                  {command}
                  <ArrowUp className="h-4 w-4 rotate-45 text-slate-600" />
                </button>
              ))
            ) : (
              <p className="px-4 py-8 text-center text-sm text-slate-500">No commands found.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-hidden bg-[#070B1A] text-white">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="flex h-full">
        {renderSidebar()}
        <main className="flex min-w-0 flex-1 flex-col">
          {renderTopToolbar()}
          <div className="flex min-h-0 flex-1">
            {renderAssistant()}
            {renderLivePreview()}
          </div>
          {renderPromptBar()}
        </main>
      </div>
      {renderCommandPalette()}
    </div>
  );
}
