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
type PreviewType = "landing" | "dashboard" | "portfolio" | "login" | "pricing" | "ecommerce" | "cartoon" | "default";
type Device = "desktop" | "tablet" | "mobile";
type VisualKind = "music" | "candy" | "food" | "travel" | "fitness" | "finance" | "education" | "commerce" | "product";

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

interface GeneratedDesign {
  title: string;
  description: string;
  type: PreviewType;
  theme: "Dark" | "Light";
  accentColors: string[];
  page: {
    navItems: string[];
    eyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    primaryCta: string;
    secondaryCta: string;
    cards: Array<{ title: string; description: string; meta?: string }>;
    skills: string[];
    contactCta: string;
    visualKind?: VisualKind;
    spotlight?: string;
    metricLabels?: string[];
  };
  assistantMessage: string;
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

const quickPrompts = ["Landing Page", "Cartoon Page", "Dashboard", "Portfolio", "Login UI", "Pricing Section", "E-commerce"];

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

const describeCustomPrompt = (value: string): string => {
  const cleaned = value
    .replace(/[^\w\s-]/g, " ")
    .replace(/\b(generate|create|build|make|design|a|an|the|ui|interface|page|website|web|app|for|me|please|with|dashboard|analytics|admin|portfolio|developer|personal|site|case|study|login|signin|sign|auth|pricing|plans|subscription|ecommerce|e-commerce|shop|store|landing|homepage|hero|startup|cartoon|comic|animation|animated|kids|children|section)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || "custom product";
};

const titleize = (value: string): string =>
  value
    .split(" ")
    .filter(Boolean)
    .map((word, index) => {
      const lower = word.toLowerCase();
      return index > 0 && ["and", "or", "for", "with", "of", "the", "a", "an"].includes(lower)
        ? lower
        : `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`;
    })
    .join(" ");

const inferVisualKind = (value: string): VisualKind => {
  const normalized = value.toLowerCase();

  if (/\b(music|song|audio|playlist|artist|album|podcast|radio|beats?)\b/.test(normalized)) return "music";
  if (/\b(candy|sweet|chocolate|dessert|bakery|cake|ice cream|donut|sugar)\b/.test(normalized)) return "candy";
  if (/\b(food|restaurant|delivery|menu|recipe|chef|meal|pizza|coffee|cafe)\b/.test(normalized)) return "food";
  if (/\b(travel|hotel|trip|booking|flight|vacation|tour|destination)\b/.test(normalized)) return "travel";
  if (/\b(fitness|gym|workout|health|yoga|training|wellness)\b/.test(normalized)) return "fitness";
  if (/\b(finance|bank|crypto|wallet|trading|invoice|payment|budget)\b/.test(normalized)) return "finance";
  if (/\b(education|learning|course|school|student|lesson|academy)\b/.test(normalized)) return "education";
  if (/\b(ecommerce|e-commerce|shop|store|marketplace|product)\b/.test(normalized)) return "commerce";
  return "product";
};

const visualRecipes: Record<VisualKind, {
  navItems: string[];
  eyebrow: string;
  primaryCta: string;
  secondaryCta: string;
  skills: string[];
  cards: Array<{ title: string; description: string; meta: string }>;
  accentColors: string[];
  metricLabels: string[];
  spotlight: string;
  theme: "Dark" | "Light";
}> = {
  music: {
    navItems: ["Discover", "Library", "Artists", "Premium"],
    eyebrow: "Immersive audio experience",
    primaryCta: "Play preview",
    secondaryCta: "Open library",
    skills: ["Now playing", "Waveform queue", "Artist cards", "Mood filters", "Mini player"],
    cards: [
      { title: "Daily Mix Console", description: "A hero player with artwork, progress, queue, and mood controls.", meta: "Player" },
      { title: "Artist Discovery", description: "Editorial cards for albums, creators, playlists, and listening moments.", meta: "Browse" },
      { title: "Smart Queue", description: "A dense playback panel for next tracks, favorites, and recommendations.", meta: "Flow" },
    ],
    accentColors: ["#8B5CF6", "#EC4899", "#22D3EE"],
    metricLabels: ["82k listeners", "24 playlists", "4.9 rating"],
    spotlight: "Now playing",
    theme: "Dark",
  },
  candy: {
    navItems: ["Flavors", "Boxes", "Gifts", "Visit"],
    eyebrow: "Colorful candy storefront",
    primaryCta: "Build a box",
    secondaryCta: "See flavors",
    skills: ["Flavor tiles", "Gift bundles", "Bright hero", "Cart preview", "Seasonal drops"],
    cards: [
      { title: "Pick Your Mix", description: "A playful picker for gummies, chocolates, sour candy, and limited sweets.", meta: "Shop" },
      { title: "Gift Box Builder", description: "A polished bundle builder with quantities, ribbons, notes, and checkout.", meta: "Flow" },
      { title: "Flavor Stories", description: "Editorial sections for new drops, ingredients, and tasting notes.", meta: "Content" },
    ],
    accentColors: ["#FB7185", "#FBBF24", "#38BDF8"],
    metricLabels: ["36 flavors", "12 gift boxes", "4.8 sweet score"],
    spotlight: "Sweet drop",
    theme: "Light",
  },
  food: {
    navItems: ["Menu", "Popular", "Track Order", "Rewards"],
    eyebrow: "Fast ordering experience",
    primaryCta: "Order now",
    secondaryCta: "View menu",
    skills: ["Menu grid", "Cart drawer", "Delivery tracker", "Rewards", "Chef picks"],
    cards: [
      { title: "Menu Explorer", description: "Category tabs, dish cards, modifiers, and appetite-first imagery blocks.", meta: "Menu" },
      { title: "Quick Cart", description: "A sticky ordering panel with totals, delivery ETA, and payment states.", meta: "Checkout" },
      { title: "Live Delivery", description: "A tracking module for kitchen status, driver movement, and arrival time.", meta: "Status" },
    ],
    accentColors: ["#F97316", "#22C55E", "#FACC15"],
    metricLabels: ["18 min ETA", "4.9 kitchen", "2.4k orders"],
    spotlight: "Chef pick",
    theme: "Light",
  },
  travel: {
    navItems: ["Destinations", "Stays", "Trips", "Support"],
    eyebrow: "Premium travel planner",
    primaryCta: "Plan trip",
    secondaryCta: "Explore stays",
    skills: ["Destination cards", "Booking flow", "Trip timeline", "Saved places", "Concierge CTA"],
    cards: [
      { title: "Destination Search", description: "A cinematic search surface for places, dates, guests, and budget.", meta: "Search" },
      { title: "Trip Timeline", description: "A day-by-day itinerary with hotels, activities, and transport.", meta: "Planner" },
      { title: "Saved Escapes", description: "Collections for beaches, cities, retreats, and weekend ideas.", meta: "Library" },
    ],
    accentColors: ["#0EA5E9", "#14B8A6", "#F59E0B"],
    metricLabels: ["128 stays", "42 cities", "24/7 help"],
    spotlight: "Next escape",
    theme: "Light",
  },
  fitness: {
    navItems: ["Programs", "Progress", "Meals", "Coach"],
    eyebrow: "Training and wellness OS",
    primaryCta: "Start workout",
    secondaryCta: "View plan",
    skills: ["Workout cards", "Progress rings", "Coach notes", "Meal blocks", "Streaks"],
    cards: [
      { title: "Workout Plan", description: "Daily training cards with duration, intensity, and guided movement.", meta: "Plan" },
      { title: "Progress Rings", description: "A visual dashboard for streaks, strength, recovery, and goals.", meta: "Metrics" },
      { title: "Coach Feedback", description: "A personal coaching panel for reminders, form notes, and next steps.", meta: "Coach" },
    ],
    accentColors: ["#22C55E", "#06B6D4", "#A3E635"],
    metricLabels: ["12 streak", "640 kcal", "86% recovery"],
    spotlight: "Today plan",
    theme: "Dark",
  },
  finance: {
    navItems: ["Overview", "Cards", "Invest", "Reports"],
    eyebrow: "Secure finance dashboard",
    primaryCta: "View report",
    secondaryCta: "Add account",
    skills: ["Balance cards", "Spend chart", "Invoice states", "Risk alerts", "Export flow"],
    cards: [
      { title: "Balance Command", description: "A calm overview for accounts, cards, cash flow, and upcoming payments.", meta: "Money" },
      { title: "Spend Intelligence", description: "Charts, categories, anomalies, and month-over-month summaries.", meta: "Insights" },
      { title: "Action Center", description: "Approvals, invoices, transfers, alerts, and secure task states.", meta: "Ops" },
    ],
    accentColors: ["#10B981", "#60A5FA", "#A78BFA"],
    metricLabels: ["$24.8k cash", "18% saved", "3 alerts"],
    spotlight: "Cash flow",
    theme: "Dark",
  },
  education: {
    navItems: ["Courses", "Lessons", "Progress", "Mentors"],
    eyebrow: "Modern learning platform",
    primaryCta: "Start lesson",
    secondaryCta: "Browse courses",
    skills: ["Course cards", "Lesson player", "Progress map", "Quizzes", "Mentor notes"],
    cards: [
      { title: "Lesson Studio", description: "A focused player with modules, transcripts, notes, and completion states.", meta: "Learn" },
      { title: "Course Path", description: "A structured roadmap for skills, milestones, projects, and certificates.", meta: "Path" },
      { title: "Practice Hub", description: "Quizzes, exercises, streaks, and mentor feedback in one place.", meta: "Practice" },
    ],
    accentColors: ["#6366F1", "#F59E0B", "#14B8A6"],
    metricLabels: ["8 modules", "74% done", "5 projects"],
    spotlight: "Next lesson",
    theme: "Light",
  },
  commerce: {
    navItems: ["New", "Collections", "Reviews", "Cart"],
    eyebrow: "Premium shopping experience",
    primaryCta: "Shop collection",
    secondaryCta: "View details",
    skills: ["Product hero", "Variant picker", "Review cards", "Cart module", "Collection grid"],
    cards: [
      { title: "Product Theatre", description: "A high-impact product hero with variants, price, reviews, and inventory.", meta: "Hero" },
      { title: "Collection Grid", description: "Shoppable cards with filters, badges, favorites, and quick actions.", meta: "Browse" },
      { title: "Cart Confidence", description: "Checkout modules for shipping, bundles, guarantees, and payment.", meta: "Checkout" },
    ],
    accentColors: ["#F43F5E", "#8B5CF6", "#06B6D4"],
    metricLabels: ["4.9 reviews", "32 items", "2-day ship"],
    spotlight: "Featured drop",
    theme: "Light",
  },
  product: {
    navItems: ["Product", "Workflow", "Teams", "Launch"],
    eyebrow: "Generated product experience",
    primaryCta: "Launch preview",
    secondaryCta: "Refine system",
    skills: ["Hero system", "Workflow map", "Feature grid", "Status panels", "Conversion CTA"],
    cards: [
      { title: "Product Story", description: "A polished hero and value section shaped around the user's request.", meta: "Hero" },
      { title: "Workflow Surface", description: "A usable area for the main actions, states, and product flow.", meta: "Flow" },
      { title: "Feature Library", description: "Reusable modules for benefits, proof, details, and next actions.", meta: "System" },
    ],
    accentColors: ["#7C3AED", "#D946EF", "#22D3EE"],
    metricLabels: ["Live preview", "6 modules", "Ready to refine"],
    spotlight: "Concept build",
    theme: "Dark",
  },
};

const getPreviewCopy = (value: string): PreviewCopy => {
  const normalized = value.toLowerCase();

  if (["cartoon", "comic", "animation", "animated", "kids", "children"].some((word) => normalized.includes(word))) {
    return {
      title: "Cartoon Adventure Page",
      description: "A playful cartoon page with bright scenes, character cards, and story-driven calls to action.",
      type: "cartoon",
    };
  }

  if (["dashboard", "analytics", "admin"].some((word) => normalized.includes(word))) {
    return {
      title: "AI Analytics Dashboard",
      description: "A dense operating dashboard with metrics, charts, tables, and daily workflow controls.",
      type: "dashboard",
    };
  }

  if (["portfolio", "developer", "personal site", "case study"].some((word) => normalized.includes(word))) {
    return {
      title: "Bright Web Developer Portfolio",
      description: "A complete developer portfolio with a bold hero, project grid, skills, services, testimonials, and contact CTA.",
      type: "portfolio",
    };
  }

  if (["login", "signin", "sign in", "auth"].some((word) => normalized.includes(word))) {
    return {
      title: "Secure Login Experience",
      description: "A focused authentication flow with polished inputs, account recovery, and sign in controls.",
      type: "login",
    };
  }

  if (["pricing", "plans", "subscription"].some((word) => normalized.includes(word))) {
    return {
      title: "SaaS Pricing Section",
      description: "Conversion-focused pricing cards with feature comparison and a high-contrast CTA.",
      type: "pricing",
    };
  }

  if (["ecommerce", "e-commerce", "shop", "store"].some((word) => normalized.includes(word))) {
    return {
      title: "Premium Commerce Store",
      description: "A modern storefront with merchandising, product cards, categories, and purchase CTAs.",
      type: "ecommerce",
    };
  }

  if (["landing", "homepage", "hero", "startup"].some((word) => normalized.includes(word))) {
    return {
      title: "Launch Landing Page",
      description: "A crisp landing page with a hero, navigation, action buttons, and feature cards.",
      type: "landing",
    };
  }

  const subject = describeCustomPrompt(value);
  const title = titleize(subject);

  return {
    title: `${title} UI`,
    description: `A tailored interface concept for ${subject}, with relevant sections, actions, and content generated from the prompt.`,
    type: "default",
  };
};

const createLocalGeneration = (value: string): GeneratedDesign => {
  const copy = getPreviewCopy(value);
  const subject = describeCustomPrompt(value);
  const title = titleize(subject);
  const visualKind = inferVisualKind(value);
  const recipe = visualRecipes[visualKind];
  const isCartoon = copy.type === "cartoon";
  const isLight = isCartoon || recipe.theme === "Light" || /\b(light|bright|colorful|candy|sweet|kids|playful)\b/i.test(value);
  const accentColors = isCartoon
    ? ["#FFB703", "#FB7185", "#38BDF8"]
    : recipe.accentColors;

  if (isCartoon) {
    return {
      title: title === "Custom Product" ? "Cartoon Adventure Page" : `${title} Cartoon Page`,
      description: `A playful cartoon page for ${subject === "custom product" ? "a bright story world" : subject}, with character cards and colorful story sections.`,
      type: "cartoon",
      theme: "Light",
      accentColors,
      page: {
        navItems: ["Story", "Characters", "Scenes", "Watch"],
        eyebrow: "Saturday morning studio",
        heroTitle: "Build a bright cartoon world in one click.",
        heroSubtitle: `A cheerful illustrated page shaped around ${subject === "custom product" ? "cartoon storytelling" : subject}, with bubbly panels, character moments, and playful calls to action.`,
        primaryCta: "Start the story",
        secondaryCta: "Meet characters",
        cards: [
          { title: "Opening Scene", description: "A bold first panel with bright shapes, simple visual hierarchy, and instant story context.", meta: "Hero" },
          { title: "Character Lineup", description: "Rounded character cards with names, traits, colors, and personality hooks.", meta: "Cast" },
          { title: "Episode Tiles", description: "Preview blocks for adventures, lessons, scenes, or collectible moments.", meta: "Episodes" },
        ],
        skills: ["Bubbly hero", "Comic cards", "Character cast", "Bright palette", "Kid-friendly CTA"],
        contactCta: "Ready for the next episode? Generate another cartoon scene.",
        visualKind: "candy",
        spotlight: "Story scene",
        metricLabels: ["3 scenes", "5 characters", "Bright mode"],
      },
      assistantMessage: "Generated a bright cartoon page with stable local preview data.",
    };
  }

  return {
    title: copy.title,
    description: copy.description,
    type: copy.type,
    theme: isLight ? "Light" : "Dark",
    accentColors,
    page: {
      navItems: recipe.navItems,
      eyebrow: recipe.eyebrow,
      heroTitle: copy.type === "default" ? `${title} that feels ready to ship.` : copy.title,
      heroSubtitle: `A generated ${subject} experience with domain-specific layout, polished visual modules, and realistic product moments instead of generic placeholder cards.`,
      primaryCta: copy.type === "ecommerce" ? "Shop now" : copy.type === "login" ? "Sign in" : recipe.primaryCta,
      secondaryCta: recipe.secondaryCta,
      cards: recipe.cards.map((card) => ({
        ...card,
        title: card.title.replace("Product", title).replace("Daily Mix", title),
      })),
      skills: recipe.skills,
      contactCta: `Keep refining this ${subject} UI with richer sections, states, and visual direction.`,
      visualKind,
      spotlight: recipe.spotlight,
      metricLabels: recipe.metricLabels,
    },
    assistantMessage: `Generated a custom ${subject} UI concept from your prompt.`,
  };
};

const shouldUseBackendDesign = (data: Partial<GeneratedDesign>, local: GeneratedDesign): boolean => {
  if (!data || !data.page || !data.title || !data.description || !data.type) return false;
  if (local.type === "cartoon" && data.type !== "cartoon") return false;
  if (local.type === "default" && data.title === "Modern Product Website") return false;
  if (local.type === "default" && data.page.heroTitle === "Modern Product Website") return false;
  return true;
};


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
  const primaryAccent = accentColors[0] ?? "#A78BFA";
  const themeLabel = theme ? `${theme} theme` : "Theme ready";

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

  const submitPrompt = async (value: string): Promise<void> => {

    const trimmed = value.trim();

    if (!trimmed || isGenerating) return;

    const userMessage: Message = {
        id: messageIdRef.current++,
        role: "user",
        content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    const localDesign = createLocalGeneration(trimmed);
    setPreviewTitle(localDesign.title);
    setPreviewDescription(localDesign.description);
    setPreviewType(localDesign.type);
    setPageData(localDesign.page);
    setTheme(localDesign.theme);
    setAccentColors(localDesign.accentColors);
    setStatusMessage(`Generated ${localDesign.title}`);

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

        if (!response.ok) {
            throw new Error("Morph backend returned an error.");
        }

        const data = await response.json();

        if (!shouldUseBackendDesign(data, localDesign)) {
            const assistantMessage: Message = {

                id: messageIdRef.current++,

                role: "assistant",

                content: localDesign.assistantMessage,

            };

            setMessages((prev) => [...prev, assistantMessage]);
            return;
        }

        setPreviewTitle(data.title);

        setPreviewDescription(data.description);

        setPreviewType(data.type);

        setPageData(data.page);

        console.log("BACKEND RESPONSE:", data);

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

        content: localDesign.assistantMessage

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
        {pageData.heroTitle ?? "Morph Studio"}
      </div>

      <div className="hidden gap-5 text-xs text-slate-400 sm:flex">
        {(pageData.navItems ?? pageData.navbarItems ?? []).map((item: string) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => handlePreviewAction(pageData.primaryCta)}
        className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#070B1A]"
      >
        {pageData.primaryCta}
      </button>

    </nav>

    <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr]">

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
          {pageData.eyebrow}
        </p>

        <h3 className="mt-4 text-5xl font-semibold leading-[1.03] tracking-tight text-white">
          {pageData.heroTitle}
        </h3>

        <p className="mt-4 text-sm leading-6 text-slate-400">
          {pageData.heroSubtitle}
        </p>

        <div className="mt-6 flex gap-3">

          <button
            type="button"
            onClick={() => handlePreviewAction(pageData.primaryCta)}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3 text-sm font-bold text-white"
          >
            {pageData.primaryCta}
          </button>

          <button
            type="button"
            onClick={() => handlePreviewAction(pageData.secondaryCta)}
            className="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-200"
          >
            {pageData.secondaryCta}
          </button>

        </div>

      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">

        <div className="space-y-3">

          {pageData.skills?.map((skill: string) => (

            <div
              key={skill}
              className="rounded-xl bg-violet-500/10 px-4 py-3 text-sm"
            >
              {skill}
            </div>

          ))}

        </div>

      </div>

    </div>

    <div className="grid gap-3 md:grid-cols-3">

      {pageData.cards?.map(
        (
          card: {
            title: string;
            description: string;
          },
          index: number
        ) => (

          <div
            key={index}
            className="rounded-xl border border-white/10 bg-[#13192B] p-4"
          >

            <div className="h-8 w-8 rounded-lg bg-violet-500/20" />

            <p className="mt-4 text-sm font-semibold text-white">
              {card.title}
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              {card.description}
            </p>

          </div>

        )
      )}

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

  const renderCartoonPreview = (): React.ReactElement => {
    const cartoonPage = pageData ?? {
      navItems: ["Story", "Characters", "Scenes", "Watch"],
      eyebrow: "Saturday morning studio",
      heroTitle: "Build a bright cartoon world in one click.",
      heroSubtitle: "A cheerful illustrated landing page with bubbly shapes, character moments, episode cards, and playful calls to action.",
      primaryCta: "Start the story",
      secondaryCta: "Meet characters",
      cards: [
        { title: "Sunny Hero Scene", description: "A bold opening panel with cloud shapes, comic bursts, and a friendly mascot moment.", meta: "Hero" },
        { title: "Character Lineup", description: "Rounded profile cards for the cast with simple traits, colors, and story hooks.", meta: "Cast" },
        { title: "Episode Tiles", description: "Preview blocks for adventures, lessons, and playful scenes visitors can explore.", meta: "Episodes" },
      ],
      skills: ["Bubbly hero", "Comic cards", "Character cast", "Bright palette"],
    };

    return (
      <div className="min-h-[620px] overflow-hidden rounded-3xl border-4 border-[#1F2937] bg-[#FFF7D6] text-[#1F2937] shadow-[8px_8px_0_#111827]">
        <nav className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-[#1F2937] bg-[#38BDF8] px-5 py-4">
          <div className="flex items-center gap-3 text-base font-black">
            <span className="grid h-10 w-10 place-items-center rounded-full border-4 border-[#1F2937] bg-[#FFB703] shadow-[3px_3px_0_#111827]">
              <Sparkles className="h-5 w-5" />
            </span>
            Toon Studio
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-black uppercase">
            {(cartoonPage.navItems ?? []).map((item: string) => (
              <button
                key={item}
                className="rounded-full border-2 border-[#1F2937] bg-white px-3 py-1 shadow-[2px_2px_0_#111827]"
                onClick={() => handlePreviewAction(`${item} opened`)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        <section className="relative grid gap-6 px-6 py-8 md:grid-cols-[1.05fr_.95fr]">
          <div className="absolute right-10 top-8 h-20 w-20 rounded-full border-4 border-[#1F2937] bg-[#FFB703]" />
          <div className="absolute bottom-12 left-1/2 h-10 w-24 rounded-full border-4 border-[#1F2937] bg-white" />

          <div className="relative z-10">
            <p className="inline-flex rounded-full border-2 border-[#1F2937] bg-[#FB7185] px-3 py-1 text-xs font-black uppercase text-white shadow-[3px_3px_0_#111827]">
              {cartoonPage.eyebrow}
            </p>
            <h3 className="mt-5 max-w-xl text-5xl font-black leading-[1.02] text-[#111827]">
              {cartoonPage.heroTitle}
            </h3>
            <p className="mt-4 max-w-lg text-sm font-semibold leading-6 text-[#374151]">
              {cartoonPage.heroSubtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="rounded-2xl border-4 border-[#1F2937] bg-[#FFB703] px-5 py-3 text-sm font-black shadow-[4px_4px_0_#111827]"
                onClick={() => handlePreviewAction(cartoonPage.primaryCta)}
                type="button"
              >
                {cartoonPage.primaryCta}
              </button>
              <button
                className="rounded-2xl border-4 border-[#1F2937] bg-white px-5 py-3 text-sm font-black shadow-[4px_4px_0_#111827]"
                onClick={() => handlePreviewAction(cartoonPage.secondaryCta)}
                type="button"
              >
                {cartoonPage.secondaryCta}
              </button>
            </div>
          </div>

          <div className="relative z-10 min-h-[320px] rounded-[2rem] border-4 border-[#1F2937] bg-[#A7F3D0] p-5 shadow-[8px_8px_0_#111827]">
            <div className="absolute left-8 top-8 h-20 w-28 rounded-full border-4 border-[#1F2937] bg-white" />
            <div className="absolute right-8 top-14 h-16 w-24 rounded-full border-4 border-[#1F2937] bg-white" />
            <div className="absolute bottom-8 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full border-4 border-[#1F2937] bg-[#FB7185] shadow-[5px_5px_0_#111827]" />
            <div className="absolute bottom-24 left-1/2 h-20 w-24 -translate-x-1/2 rounded-full border-4 border-[#1F2937] bg-[#FFE4E6]" />
            <div className="absolute bottom-32 left-[44%] h-3 w-3 rounded-full bg-[#111827]" />
            <div className="absolute bottom-32 right-[44%] h-3 w-3 rounded-full bg-[#111827]" />
            <div className="absolute bottom-24 left-1/2 h-4 w-10 -translate-x-1/2 rounded-b-full border-b-4 border-[#111827]" />
          </div>
        </section>

        <section className="grid gap-4 border-t-4 border-[#1F2937] bg-white px-6 py-6 md:grid-cols-3">
          {(cartoonPage.cards ?? []).map((card: { title: string; description: string; meta?: string }, index: number) => (
            <article
              key={card.title}
              className="rounded-2xl border-4 border-[#1F2937] bg-[#FDE68A] p-4 shadow-[5px_5px_0_#111827]"
            >
              <div className={`mb-4 h-20 rounded-2xl border-4 border-[#1F2937] ${["bg-[#FB7185]", "bg-[#38BDF8]", "bg-[#A7F3D0]"][index % 3]}`} />
              <p className="text-xs font-black uppercase text-[#BE123C]">{card.meta ?? "Scene"}</p>
              <h4 className="mt-2 text-lg font-black">{card.title}</h4>
              <p className="mt-2 text-xs font-semibold leading-5 text-[#4B5563]">{card.description}</p>
            </article>
          ))}
        </section>

        <section className="flex flex-wrap gap-2 border-t-4 border-[#1F2937] bg-[#FB7185] px-6 py-4">
          {(cartoonPage.skills ?? []).map((skill: string) => (
            <span key={skill} className="rounded-full border-2 border-[#1F2937] bg-white px-3 py-1 text-xs font-black shadow-[2px_2px_0_#111827]">
              {skill}
            </span>
          ))}
        </section>
      </div>
    );
  };

  const renderDefaultPreview = (): React.ReactElement => {
    const generatedPage = pageData ?? {
      navItems: ["Overview", "Features", "Workflow", "Launch"],
      eyebrow: "Generated interface",
      heroTitle: previewTitle,
      heroSubtitle: previewDescription,
      primaryCta: "Explore concept",
      secondaryCta: "Refine design",
      cards: [
        { title: "Adaptive layout", description: "A responsive structure shaped around the current prompt.", meta: "Layout" },
        { title: "Prompt-specific content", description: "Sections, copy, and actions update to match the requested UI.", meta: "Content" },
        { title: "Reusable modules", description: "Cards and feature blocks are ready for further iteration.", meta: "System" },
      ],
      skills: ["Responsive layout", "Prompt-specific content", "Reusable sections", "Clear CTAs"],
      contactCta: "Keep refining this UI with another prompt.",
    };

    return (
      <div className="space-y-6">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Sparkles className="h-5 w-5" style={{ color: primaryAccent }} />
            {previewTitle}
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            {(generatedPage.navItems ?? []).map((item: string) => (
              <button
                key={item}
                className="rounded-lg border border-white/10 px-3 py-1.5 transition hover:bg-white/[0.06] hover:text-white"
                onClick={() => handlePreviewAction(`${item} opened`)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        <section className="grid gap-5 rounded-2xl border border-white/10 bg-[#13192B] p-6 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: primaryAccent }}>
              {generatedPage.eyebrow}
            </p>
            <h3 className="mt-4 max-w-2xl text-5xl font-semibold leading-tight text-white">
              {generatedPage.heroTitle}
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
              {generatedPage.heroSubtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="rounded-xl px-4 py-3 text-sm font-bold text-white"
                onClick={() => handlePreviewAction(generatedPage.primaryCta)}
                style={{ backgroundColor: primaryAccent }}
                type="button"
              >
                {generatedPage.primaryCta}
              </button>
              <button
                className="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-200"
                onClick={() => handlePreviewAction(generatedPage.secondaryCta)}
                type="button"
              >
                {generatedPage.secondaryCta}
              </button>
            </div>
          </div>

          <div className="grid content-start gap-3 rounded-xl border border-white/10 bg-[#070B1A] p-4">
            {(generatedPage.skills ?? []).slice(0, 6).map((skill: string) => (
              <div key={skill} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          {(generatedPage.cards ?? []).map((card: { title: string; description: string; meta?: string }, index: number) => (
            <div key={card.title} className="rounded-xl border border-white/10 bg-[#13192B] p-5">
              <div
                className="grid h-10 w-10 place-items-center rounded-lg text-sm font-black text-white"
                style={{ backgroundColor: accentColors[index % accentColors.length] ?? primaryAccent }}
              >
                {index + 1}
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-500">{card.meta ?? "Module"}</p>
              <p className="mt-2 text-sm font-semibold text-white">{card.title}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{card.description}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm font-semibold text-white">{generatedPage.contactCta}</p>
        </section>
      </div>
    );
  };

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
      case "cartoon":
        return renderCartoonPreview();
      default:
        return renderDefaultPreview();
    }
  };

  const renderLivePreview = (): React.ReactElement => (
    <section className="flex min-w-0 basis-[60%] flex-col bg-[#070B1A]">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.24em]" style={{ color: primaryAccent }}>LIVE PREVIEW</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{previewTitle}</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">{previewDescription} {themeLabel}</p>
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
