import json
import os
import re
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any


PORT = int(os.environ.get("MORPH_BACKEND_PORT", "8000"))
MODEL = os.environ.get("OPENAI_MODEL", "gpt-4.1-mini")


SYSTEM_PROMPT = """
You are Morph Studio, an AI UI builder.
Return only JSON for a generated frontend concept.
The JSON shape must be:
{
  "title": "short page title",
  "description": "one sentence",
  "type": "landing|dashboard|portfolio|login|pricing|ecommerce|cartoon|default",
  "theme": "dark|light",
  "accentColors": ["#hex", "#hex", "#hex"],
  "page": {
    "navItems": ["Work", "Skills", "About", "Contact"],
    "eyebrow": "short label",
    "heroTitle": "large hero headline",
    "heroSubtitle": "hero paragraph",
    "primaryCta": "button label",
    "secondaryCta": "button label",
    "cards": [
      {"title": "card title", "description": "card description", "meta": "short meta"}
    ],
    "skills": ["React", "TypeScript", "Tailwind"],
    "contactCta": "short closing call to action"
  },
  "assistantMessage": "brief helpful response"
}
Understand user intent. If the user asks for a light theme, set theme to light.
If they ask for bright colors, use vivid accent hex colors.
For any UI that is not one of the named types, set type to "default" but make every page field specific to the user's requested product, app, website, tool, or experience. Never return generic placeholder copy.
"""


def infer_type(prompt: str) -> str:
    value = prompt.lower()
    if any(word in value for word in ["cartoon", "comic", "animation", "animated", "kids", "children"]):
        return "cartoon"
    if any(word in value for word in ["dashboard", "analytics", "admin"]):
        return "dashboard"
    if any(word in value for word in ["portfolio", "developer", "personal site", "case study"]):
        return "portfolio"
    if any(word in value for word in ["login", "signin", "sign in", "auth"]):
        return "login"
    if any(word in value for word in ["pricing", "plans", "subscription"]):
        return "pricing"
    if any(word in value for word in ["ecommerce", "e-commerce", "shop", "store"]):
        return "ecommerce"
    if any(word in value for word in ["landing", "homepage", "hero", "startup"]):
        return "landing"
    return "default"


def prompt_subject(prompt: str) -> str:
    cleaned = re.sub(r"[^a-zA-Z0-9\s-]", " ", prompt).strip()
    cleaned = re.sub(
        r"\b(generate|create|build|make|design|a|an|the|ui|interface|page|website|web|app|for|me|please|with|dashboard|analytics|admin|portfolio|developer|personal|site|case|study|login|signin|sign|auth|pricing|plans|subscription|ecommerce|e-commerce|shop|store|landing|homepage|hero|startup|cartoon|comic|animation|animated|kids|children|section)\b",
        " ",
        cleaned,
        flags=re.IGNORECASE,
    )
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned or "custom product"


def titleize_subject(subject: str) -> str:
    small_words = {"and", "or", "for", "with", "of", "the", "a", "an"}
    words = subject.split()
    return " ".join(word.capitalize() if word.lower() not in small_words or index == 0 else word.lower() for index, word in enumerate(words))


def custom_page(prompt: str) -> dict[str, Any]:
    subject = prompt_subject(prompt)
    title_subject = titleize_subject(subject)
    return {
        "title": f"{title_subject} UI",
        "description": f"A tailored interface concept for {subject}, with relevant sections, actions, and content generated from the prompt.",
        "page": {
            "navItems": ["Overview", "Features", "Workflow", "Launch"],
            "eyebrow": f"Generated {title_subject} Experience",
            "heroTitle": f"Design a polished {title_subject} interface.",
            "heroSubtitle": f"Morph Studio shaped this preview around your request for {subject}, including a focused hero, useful content blocks, and clear product actions.",
            "primaryCta": "Explore concept",
            "secondaryCta": "Refine design",
            "cards": [
                {"title": f"{title_subject} Overview", "description": f"A strong opening section that explains the core value of the {subject} experience.", "meta": "Hero"},
                {"title": "User Workflow", "description": "A practical section for the main user journey, actions, states, and supporting details.", "meta": "Flow"},
                {"title": "Feature System", "description": "Reusable cards for the most important features, benefits, or content areas in this UI.", "meta": "Modules"},
            ],
            "skills": ["Responsive layout", "Prompt-specific content", "Reusable sections", "Clear CTAs", "Modern visual system"],
            "contactCta": f"Keep refining this {subject} UI with another prompt.",
        },
        "assistantMessage": f"I generated a custom {subject} UI concept from your prompt.",
    }


def fallback_design(prompt: str) -> dict[str, Any]:
    preview_type = infer_type(prompt)
    wants_light = "light" in prompt.lower() or "bright" in prompt.lower()
    custom = custom_page(prompt)
    subject = prompt_subject(prompt)
    if subject == "custom product":
        subject = {
            "portfolio": "developer work",
            "dashboard": "analytics",
            "login": "secure account",
            "pricing": "subscription",
            "ecommerce": "commerce",
            "cartoon": "adventure",
            "landing": "product launch",
            "default": "custom product",
        }[preview_type]
    title_subject = titleize_subject(subject)
    titles = {
        "portfolio": f"{title_subject} Portfolio",
        "dashboard": f"{title_subject} Dashboard",
        "login": f"{title_subject} Login Experience",
        "pricing": f"{title_subject} Pricing Section",
        "ecommerce": f"{title_subject} Storefront",
        "cartoon": f"{title_subject} Cartoon Page",
        "landing": f"{title_subject} Landing Page",
        "default": custom["title"],
    }
    descriptions = {
        "portfolio": f"A complete {subject} portfolio with a bold hero, project grid, skills, services, testimonials, and contact CTA.",
        "dashboard": f"A dense {subject} dashboard with metrics, charts, tables, and daily workflow controls.",
        "login": f"A focused {subject} authentication flow with polished inputs, account recovery, and sign in controls.",
        "pricing": f"Conversion-focused {subject} pricing cards with feature comparison and a high-contrast CTA.",
        "ecommerce": f"A modern {subject} storefront with merchandising, product cards, categories, and purchase CTAs.",
        "cartoon": f"A playful {subject} cartoon page with illustrated story zones, bright scenes, character cards, and friendly actions.",
        "landing": f"A crisp {subject} landing page with a hero, navigation, action buttons, and feature cards.",
        "default": custom["description"],
    }
    page = {
        "navItems": ["Work", "Skills", "About", "Contact"],
        "eyebrow": "Available for frontend projects",
        "heroTitle": "I build fast, colorful web experiences.",
        "heroSubtitle": "Frontend developer specializing in React, TypeScript, Tailwind CSS, AI interfaces, performance, and polished product experiences.",
        "primaryCta": "View projects",
        "secondaryCta": "Contact me",
        "cards": [
            {"title": "AI SaaS Dashboard", "description": "A responsive analytics product with charts, command menus, and workflow automation.", "meta": "React / TypeScript"},
            {"title": "Bright Commerce UI", "description": "A vivid storefront with product storytelling, filters, and conversion-focused cards.", "meta": "Tailwind / UX"},
            {"title": "Developer Blog System", "description": "A fast publishing experience with tags, MDX-ready layouts, and clean reading surfaces.", "meta": "Next.js / Content"},
        ],
        "skills": ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion", "API Integration", "AI UI", "Accessibility"],
        "contactCta": "Have a product idea? Let us turn it into a polished, production-ready web experience.",
    }
    if preview_type != "portfolio":
        page = {
            "navItems": ["Product", "Solutions", "Pricing", "Contact"],
            "eyebrow": "Generated by Morph Studio",
            "heroTitle": titles[preview_type],
            "heroSubtitle": descriptions[preview_type],
            "primaryCta": "Get started",
            "secondaryCta": "View demo",
            "cards": [
                {"title": f"{title_subject} Structure", "description": f"Responsive sections tuned to the requested {subject} experience.", "meta": "Layout"},
                {"title": "Modern styling", "description": "Premium spacing, color, and interaction states generated from intent.", "meta": "Design"},
                {"title": "Ready to refine", "description": "Use the prompt bar to iterate sections, copy, and visual direction.", "meta": "AI"},
            ],
            "skills": ["React", "TypeScript", "Tailwind CSS", "Responsive UI"],
            "contactCta": "Refine this concept with another prompt.",
        }
    if preview_type == "default":
        page = custom["page"]
    if preview_type == "cartoon":
        page = {
            "navItems": ["Story", "Characters", "Scenes", "Watch"],
            "eyebrow": "Saturday morning studio",
            "heroTitle": "Build a bright cartoon world in one click.",
            "heroSubtitle": "A cheerful illustrated landing page with bubbly shapes, character moments, episode cards, and playful calls to action.",
            "primaryCta": "Start the story",
            "secondaryCta": "Meet characters",
            "cards": [
                {"title": "Sunny Hero Scene", "description": "A bold opening panel with cloud shapes, comic bursts, and a friendly mascot moment.", "meta": "Hero"},
                {"title": "Character Lineup", "description": "Rounded profile cards for the cast with simple traits, colors, and story hooks.", "meta": "Cast"},
                {"title": "Episode Tiles", "description": "Preview blocks for adventures, lessons, and playful scenes visitors can explore.", "meta": "Episodes"},
            ],
            "skills": ["Bubbly hero", "Comic cards", "Character cast", "Bright palette", "Kid-friendly CTA"],
            "contactCta": "Ready for the next episode? Generate another cartoon scene.",
        }

    return {
        "title": titles[preview_type],
        "description": descriptions[preview_type],
        "type": preview_type,
        "theme": "light" if wants_light or preview_type == "cartoon" else "dark",
        "accentColors": ["#FFB703", "#FB7185", "#38BDF8"] if preview_type == "cartoon" else ["#7C3AED", "#EC4899", "#06B6D4"] if wants_light else ["#7C3AED", "#D946EF", "#22D3EE"],
        "page": page,
        "assistantMessage": (
            "I generated a full light-theme developer portfolio concept with bright accent colors, "
            "project sections, skills, and a contact-focused structure."
            if preview_type == "portfolio" and wants_light
            else "I generated a bright cartoon page with character cards, playful sections, and a story-driven hero."
            if preview_type == "cartoon"
            else custom["assistantMessage"]
            if preview_type == "default"
            else "I generated a structured Morph Studio preview from your prompt."
        ),
    }


def call_openai(prompt: str) -> dict[str, Any]:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return fallback_design(prompt)

    payload = {
        "model": MODEL,
        "input": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
        "text": {"format": {"type": "json_object"}},
    }
    request = urllib.request.Request(
        "https://api.openai.com/v1/responses",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            data = json.loads(response.read().decode("utf-8"))
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError):
        return fallback_design(prompt)

    output_text = ""
    for item in data.get("output", []):
        for content in item.get("content", []):
            if content.get("type") == "output_text":
                output_text += content.get("text", "")

    try:
        generated = json.loads(output_text)
    except json.JSONDecodeError:
        return fallback_design(prompt)

    fallback = fallback_design(prompt)
    return {
        "title": generated.get("title") or fallback["title"],
        "description": generated.get("description") or fallback["description"],
        "type": generated.get("type") if generated.get("type") in {"landing", "dashboard", "portfolio", "login", "pricing", "ecommerce", "cartoon", "default"} else fallback["type"],
        "theme": generated.get("theme") if generated.get("theme") in {"dark", "light"} else fallback["theme"],
        "accentColors": generated.get("accentColors") if isinstance(generated.get("accentColors"), list) else fallback["accentColors"],
        "page": generated.get("page") if isinstance(generated.get("page"), dict) else fallback["page"],
        "assistantMessage": generated.get("assistantMessage") or fallback["assistantMessage"],
    }


class MorphHandler(BaseHTTPRequestHandler):
    def send_json(self, status: int, payload: dict[str, Any]) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:
        self.send_json(204, {})

    def do_GET(self) -> None:
        if self.path == "/health":
            self.send_json(200, {"ok": True, "model": MODEL, "hasApiKey": bool(os.environ.get("OPENAI_API_KEY"))})
            return
        self.send_json(404, {"error": "Not found"})

    def do_POST(self) -> None:

        print("POST:", self.path)
        if self.path != "/api/generate":
            self.send_json(404, {"error": "Not found"})
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            body = json.loads(self.rfile.read(length).decode("utf-8"))
            prompt = str(body.get("prompt", "")).strip()
        except (ValueError, json.JSONDecodeError):
            self.send_json(400, {"error": "Invalid JSON"})
            return

        if not prompt:
            self.send_json(400, {"error": "Prompt is required"})
            return

        self.send_json(200, call_openai(prompt))


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", PORT), MorphHandler)
    print(f"Morph backend running on http://127.0.0.1:{PORT}")
    print("Set OPENAI_API_KEY for real AI generation. Without it, smart fallback generation is used.")
    server.serve_forever()
