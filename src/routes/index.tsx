import { createFileRoute } from "@tanstack/react-router";
import {
  Menu, Search, Globe, Sun, Bell, ChevronDown, Home, Bot, FolderKanban, Box, ShoppingCart, ClipboardList,
  Users, UserCog, Code2, Server, Network, BarChart3, LineChart, UsersRound, Settings, Package, Cpu,
  ShieldCheck, Store, Cloud, MessageCircle, Star, School, Calculator, Cog, Database, Github, Lock,
  HardDrive, Activity, Brain, Zap, FileText, Target, Lightbulb, TrendingUp, Mic, Wrench, Send,
  Circle, CheckCircle2, AlertTriangle, Plug, CircleDot, Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { JarvisCore, stateLabel, type CoreState, type AyraLook } from "@/components/JarvisCore";
import { ModulePanel } from "@/components/ModulePanel";
import { LookbookPanel } from "@/components/LookbookPanel";
import { AGENT_DRESS_CODE, dressColor } from "@/lib/agent-dress-code";
import globe from "@/assets/globe.jpg";
import worldmap from "@/assets/worldmap.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jarvis Dashboard — Software Vala" },
      { name: "description", content: "Jarvis AI command center for Software Vala: live stats, brands, agents and insights." },
      { property: "og:title", content: "Jarvis Dashboard — Software Vala" },
      { property: "og:description", content: "Jarvis AI command center for Software Vala." },
    ],
  }),
  component: Dashboard,
});

const nav = [
  [Home, "Dashboard"], [Bot, "AI Assistant"], [FolderKanban, "Projects"], [Box, "Software"],
  [ShoppingCart, "Marketplace"], [ClipboardList, "Sales & Orders"], [Users, "Customers"], [UserCog, "Agents"],
  [Code2, "Development"], [Server, "Servers"], [Network, "APIs"], [BarChart3, "Analytics"],
  [LineChart, "Finance"], [UsersRound, "Team"], [Settings, "Settings"],
] as const;

const stats = [
  [Package, "Total Software", "6,248", "+12%"], [Users, "Total Customers", "12,486", "+18%"],
  [ShoppingCart, "Today Sales", "$4,850", "+22%"], [Code2, "Active Projects", "132", "+8%"],
  [Cpu, "AI Tasks", "48", "+35%"],
] as const;

const products = [
  [Store, "Marketplace", "12,000+ Products"], [Box, "ERPvala", "Offline Software"], [Cloud, "Saasvala", "SaaS Marketplace"],
  [MessageCircle, "BetaWhatsap", "WhatsApp Automation"], [Star, "Rating Guard", "Review Management"],
  [School, "SchoolSolution", "Education Software"], [Calculator, "POSvala", "POS & Billing"], [Cog, "Custom Build", "New Project"],
] as const;

const brands = [
  ["SV", "Software Vala", "Main Platform", "bg-primary"], ["EV", "ERPvala", "Offline Software", "bg-warn"],
  ["SV", "Saasvala", "SaaS Marketplace", "bg-primary"], ["BW", "BetaWhatsapp", "WhatsApp CRM", "bg-success"],
  ["RG", "Rating Guard", "Review Management", "bg-danger"], ["SS", "SchoolSolution", "Education Software", "bg-warn"],
  ["PV", "POSvala", "POS & Billing", "bg-accent"], ["•••", "More Brands", "View All", "bg-muted"],
] as const;

const inputs = [[FolderKanban, "Projects"], [Users, "Customers"], [BarChart3, "Sales Data"], [Github, "GitHub"], [Server, "Servers"], [Plug, "APIs"], [TrendingUp, "Market Trends"]] as const;
const outputs = [[LineChart, "Analysis"], [Lightbulb, "Smart Insights"], [Zap, "Auto Actions"], [FileText, "Reports"], [Target, "Predictions"], [Brain, "Recommendations"], [TrendingUp, "Growth Plan"]] as const;

const status = [
  [Cpu, "AI Engine", "Online"], [Database, "Database", "Online"], [Server, "Servers", "Online"], [Plug, "APIs", "Online"],
  [Github, "GitHub", "Online"], [Lock, "Security", "Secured"], [HardDrive, "Backup", "Active"],
] as const;

const agents = [
  ["Hermes Agent", "Analyzing marketplace trends...", 34], ["Code Agent", "Building new module...", 67],
  ["SEO Agent", "Optimizing global SEO...", 46], ["Data Agent", "Processing sales data...", 89],
  ["Content Agent", "Generating marketing content...", 28], ["Support Agent", "Handling customer queries...", 72],
] as const;

const insights = [
  ["Sales increased by 22% this week.", "text-warn"], ["High demand for POS software in Africa.", "text-success"],
  ["New market opportunity in Middle East.", "text-success"], ["3 new features suggested for SaaSvala.", "text-warn"],
  ["Server performance is stable.", "text-success"], ["Negative reviews detected – action required.", "text-danger"],
] as const;

const actions = [
  ["New order #SV2486", "2 min ago"], ["AI agent completed code test", "5 min ago"], ["New customer from Nigeria", "8 min ago"],
  ["Server backup completed", "12 min ago"], ["Marketplace product published", "18 min ago"], ["Security scan completed", "25 min ago"],
] as const;

function Dashboard() {
  const [core, setCore] = useState<CoreState>("idle");
  const [cmd, setCmd] = useState("");
  const [reply, setReply] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [lookOverride, setLookOverride] = useState<AyraLook | null>(null);
  const [lookbook, setLookbook] = useState(false);
  const [agentTheme, setAgentTheme] = useState<string | null>(null);
  const timers = useRef<number[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [tilt, setTilt] = useState<[number, number]>([0, 0]);
  const [hidden, setHidden] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const v = () => setHidden(document.hidden);
    const k = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); inputRef.current?.focus(); }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") { e.preventDefault(); setCollapsed((c) => !c); }
    };
    document.addEventListener("visibilitychange", v); window.addEventListener("keydown", k);
    return () => { document.removeEventListener("visibilitychange", v); window.removeEventListener("keydown", k); };
  }, []);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clear, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, []);
  const run = async () => {
    const command = cmd.trim();
    if (!command) return;
    clear(); setReply(""); setCore("thinking"); setCmd("");
    const q = command.toLowerCase();
    const idx = nav.findIndex(([, l]) => q.includes(l.toLowerCase().split(" ")[0] ?? ""));
    try {
      const res = await fetch("/api/ayra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setReply(data?.error ?? "AYRA could not process that command.");
        setCore("error");
        timers.current.push(window.setTimeout(() => setCore("idle"), 4000));
        return;
      }
      setCore("executing");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      let first = true;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (first) { setCore("speaking"); first = false; }
        text += decoder.decode(value, { stream: true });
        setReply(text);
      }
      setCore("completed");
      if (idx >= 0) timers.current.push(window.setTimeout(() => { setActive(idx); setOpen(idx); }, 1600));
      timers.current.push(window.setTimeout(() => setCore("idle"), 6000));
    } catch {
      setReply("Connection to AYRA was lost. Please try again.");
      setCore("error");
      timers.current.push(window.setTimeout(() => setCore("idle"), 4000));
    }
  };
  const openModule = (i: number) => { setActive(i); setOpen(i); };
  return (
    <div className={`min-h-screen text-foreground ${hidden || open !== null ? "paused" : ""}`}>
      {/* Top bar */}
      <header className="flex items-center gap-4 px-4 py-2">
        <button onClick={() => setCollapsed((c) => !c)} aria-label="Toggle menu (Ctrl+B)" title="Toggle menu (Ctrl+B)" className="rounded p-1 hover:bg-muted"><Menu className="h-6 w-6 text-primary" /></button>
        <div className="flex items-center gap-2">
          <div className="grid h-11 w-11 place-items-center rounded-full border-2 border-primary glow-icon font-display text-xl font-black text-primary">S</div>
          <div>
            <div className="font-display text-xl font-bold leading-none">Software Vala<sup className="text-xs">™</sup></div>
            <div className="text-xs text-muted-foreground">Your Global Software Partner</div>
          </div>
        </div>
        <div className="panel mx-6 hidden flex-1 items-center gap-3 px-4 py-2 md:flex">
          <Search className="h-4 w-4 text-primary" />
          <input className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Search anything... (Software, Project, Customer, Code, Server)" />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button className="panel flex items-center gap-2 px-3 py-2 text-sm"><Globe className="h-4 w-4 text-primary" />Global<ChevronDown className="h-4 w-4" /></button>
          <button className="panel p-2"><Sun className="h-5 w-5 text-warn" /></button>
          <button className="panel relative p-2"><Bell className="h-5 w-5 text-primary" /><span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-danger text-[10px]">3</span></button>
          <div className="panel flex items-center gap-2 px-3 py-1.5">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-primary font-bold text-primary-foreground">F</div>
            <div className="text-sm leading-tight"><div className="font-semibold">Founder</div><div className="flex items-center gap-1 text-xs text-success"><Circle className="h-2 w-2 fill-current" />Online</div></div>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </header>

      <div className="flex gap-3 px-2 pb-4">
        {/* Sidebar */}
        <aside className={`hidden shrink-0 flex-col gap-1 transition-all duration-300 lg:flex ${collapsed ? "w-14" : "w-40"}`}>
          {nav.map(([I, label], i) => (
            <button key={label} onClick={() => openModule(i)} title={label} className={`depth-card flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${i === active ? "border-l-2 border-primary bg-primary/20 font-semibold" : "hover:bg-muted"}`}>
              <span className="grid h-8 w-8 place-items-center rounded-full border border-border bg-muted/50"><I className="h-4 w-4 text-primary glow-icon" /></span>
              {!collapsed && label}
            </button>
          ))}
        </aside>

        <main className="grid min-w-0 flex-1 gap-3">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {stats.map(([I, l, v, c]) => (
              <div key={l} className="panel depth-card flex items-center gap-3 p-3">
                <div className="grid h-12 w-12 place-items-center rounded-lg border border-border"><I className="h-7 w-7 text-primary glow-icon" /></div>
                <div><div className="text-sm">{l}</div><div className="text-2xl font-bold">{v}</div><div className="text-xs text-success">↑ {c}</div></div>
              </div>
            ))}
            <div className="panel flex items-center gap-3 p-3">
              <ShieldCheck className="h-10 w-10 text-primary glow-icon" />
              <div><div className="text-sm">System Health</div><div className="text-2xl font-bold">100%</div><div className="text-xs text-success">All Systems Online</div></div>
            </div>
          </div>

          <div className="grid gap-3 xl:grid-cols-[1fr_400px]">
            <div className="grid gap-3">
              {/* Products */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8">
                {products.map(([I, t, s]) => (
                  <div key={t} className="panel depth-card holo-scan flex flex-col items-center p-3 text-center transition hover:-translate-y-0.5">
                    <I className="mb-1 h-8 w-8 text-accent glow-icon" />
                    <div className="text-sm font-semibold">{t}</div><div className="text-[11px] text-muted-foreground">{s}</div>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 lg:grid-cols-[230px_1fr]">
                {/* Brands */}
                <div className="panel p-3">
                  <h3 className="mb-2 font-display text-sm tracking-wider">BRAND ECOSYSTEM</h3>
                  {brands.map(([ab, n, s, bg]) => (
                    <div key={n} className="flex items-center gap-3 border-t border-border/50 py-2">
                      <div className={`grid h-9 w-9 place-items-center rounded-full ${bg} text-xs font-bold`}>{ab}</div>
                      <div className="flex-1 leading-tight"><div className="text-sm font-semibold">{n}</div><div className="text-xs text-muted-foreground">{s}</div></div>
                      <Circle className="h-2.5 w-2.5 fill-success text-success" />
                    </div>
                  ))}
                </div>

                {/* Jarvis core */}
                <div className="relative overflow-hidden rounded-lg" onMouseMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); setTilt([(e.clientX - b.left) / b.width - 0.5, (e.clientY - b.top) / b.height - 0.5]); }} onMouseLeave={() => setTilt([0, 0])}>
                  <JarvisCore state={core} tilt={tilt} override={lookOverride} theme={agentTheme ? AGENT_DRESS_CODE[agentTheme] ?? null : null} />
                  <div className="relative text-center">
                    <div className="pt-3 font-display text-3xl font-black tracking-[0.3em] text-primary glow-text">AYRA</div>
                    <div className="font-display text-[10px] tracking-[0.3em] text-accent">AI COMMAND CENTER</div>
                    <button onClick={() => setLookbook(true)} className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-display text-[10px] tracking-widest text-primary transition hover:bg-primary/20">
                      <Sparkles className="h-3 w-3" />LOOKBOOK
                    </button>
                    <div aria-live="polite" className="mt-1 text-xs text-muted-foreground">{stateLabel[core]}</div>
                    {reply && (
                      <div className="panel anim-fade-up mx-auto mt-2 max-w-md px-4 py-2 text-left text-sm leading-relaxed text-foreground">
                        <span className="mr-1 font-display text-[10px] tracking-widest text-accent">AYRA:</span>{reply}
                      </div>
                    )}
                  </div>
                  <div className="relative flex justify-between p-3">
                    {[["DATA INPUTS", inputs], ["AI OUTPUTS", outputs]].map(([title, list], k) => (
                      <div key={title as string} className={`flex flex-col gap-2 ${k ? "items-end" : ""}`}>
                        <div className="mb-1 flex items-center gap-1 font-display text-xs text-accent"><CircleDot className="h-4 w-4" />{title as string}</div>
                        {(list as typeof inputs).map(([I, l]) => (
                          <div key={l} className="panel flex w-32 items-center gap-2 px-2 py-1.5 text-xs"><I className="h-4 w-4 text-primary" />{l}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="grid gap-3 lg:grid-cols-3">
                <div className="panel p-3">
                  <div className="mb-2 flex items-center justify-between"><h3 className="font-display text-sm">GLOBAL ANALYTICS</h3><span className="rounded border border-border px-2 py-0.5 text-xs">Last 30 Days</span></div>
                  <div className="flex gap-3">
                    <img src={worldmap} alt="World map" loading="lazy" width={1088} height={608} className="w-3/5 rounded object-cover" />
                    <div className="flex-1 space-y-2 text-xs">
                      {[["Global Users", "125,486", "18%"], ["Total Sales", "$48,750", "22%"], ["Orders", "3,486", "16%"], ["Countries", "128", "8%"]].map(([l, v, c]) => (
                        <div key={l}><div className="text-muted-foreground">{l}</div><div className="flex justify-between text-lg font-bold">{v}<span className="text-xs text-success">↑ +{c}</span></div></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="panel p-3">
                  <div className="mb-2 flex items-center justify-between"><h3 className="font-display text-sm">AI INSIGHTS</h3><Live /></div>
                  {insights.map(([t, c]) => (<div key={t} className="flex items-center gap-2 py-1 text-xs">{c === "text-danger" ? <AlertTriangle className={`h-3.5 w-3.5 ${c}`} /> : <CheckCircle2 className={`h-3.5 w-3.5 ${c}`} />}{t}</div>))}
                </div>
                <div className="panel p-3">
                  <div className="mb-2 flex items-center justify-between"><h3 className="font-display text-sm">RECENT ACTIONS</h3><span className="rounded border border-border px-2 py-0.5 text-xs">View All</span></div>
                  {actions.map(([t, w]) => (<div key={t} className="flex items-center gap-2 py-1 text-xs"><Activity className="h-3.5 w-3.5 text-primary" /><span className="flex-1">{t}</span><span className="text-muted-foreground">{w}</span></div>))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="grid content-start gap-3">
              <div className="grid grid-cols-[1fr_130px] gap-3">
                <div className="panel p-3">
                  <div className="mb-2 flex items-center justify-between"><h3 className="font-display text-sm">AYRA SYSTEM STATUS</h3><Live /></div>
                  {status.map(([I, l, s]) => (<div key={l} className="flex items-center gap-2 py-1 text-sm"><I className="h-4 w-4 text-primary" /><span className="flex-1">{l}</span><span className="text-success">{s}</span></div>))}
                  <div className="flex items-center gap-2 py-1 text-sm"><Activity className="h-4 w-4 text-primary" /><span className="flex-1">System Load</span><div className="h-2 w-16 rounded bg-muted"><div className="h-2 w-1/4 rounded bg-primary" /></div>24%</div>
                </div>
                <img src={globe} alt="Globe" loading="lazy" width={816} height={816} className="w-full self-start rounded-full object-cover [mask-image:radial-gradient(circle,black_55%,transparent_72%)]" />
              </div>
              <div className="panel p-3">
                <div className="mb-2 flex items-center justify-between"><h3 className="font-display text-sm">LIVE AGENT ACTIVITY</h3>
                  {agentTheme ? <button onClick={() => setAgentTheme(null)} className="rounded border border-border px-2 py-0.5 text-xs hover:bg-primary/15">Reset to AYRA</button> : <span className="text-xs text-muted-foreground">Tap an agent</span>}
                </div>
                {agents.map(([n, t, p]) => {
                  const d = AGENT_DRESS_CODE[n];
                  const sel = agentTheme === n;
                  return (
                  <button key={n} onClick={() => setAgentTheme(sel ? null : n)} aria-pressed={sel}
                    className={`depth-card flex w-full items-center gap-3 rounded-md px-1 py-2 text-left ${sel ? "agent-selected" : ""}`}
                    style={{ ["--agent" as string]: d ? dressColor(d) : "var(--primary)" }}>
                    <div className="agent-orb grid h-9 w-9 place-items-center rounded-full"><Bot className="h-4 w-4" style={{ color: "var(--agent)" }} /></div>
                    <div className="flex-1 leading-tight"><div className="text-sm font-semibold">{n}</div><div className="text-xs text-muted-foreground">{d ? `${d.role} · ${d.dress}` : t}</div></div>
                    <div className="h-1.5 w-20 rounded bg-muted"><div className="agent-bar h-1.5 rounded" style={{ width: `${p}%` }} /></div>
                    <span className="w-8 text-right text-xs">{p}%</span>
                  </button>);
                })}
              </div>
            </div>
          </div>

          {/* Voice bar */}
          <div className="panel mx-auto flex w-full max-w-4xl items-center gap-4 rounded-full px-3 py-2">
            <button aria-label="Talk to Jarvis" onClick={() => { clear(); setCore(core === "listening" ? "idle" : "listening"); inputRef.current?.focus(); }} className={`grid h-14 w-14 place-items-center rounded-full border-2 border-primary glow-icon ${core === "listening" ? "core-pulse bg-primary/20" : ""}`}><Mic className="h-6 w-6 text-primary" /></button>
            <input ref={inputRef} title="Focus with Ctrl+K" value={cmd} onChange={(e) => { setCmd(e.target.value); if (core === "idle" && e.target.value) setCore("listening"); if (!e.target.value && core === "listening") setCore("idle"); }} onKeyDown={(e) => e.key === "Enter" && run()} aria-label="Command Jarvis" className="min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground" placeholder="Hey AYRA, how can I help you today?  (Ctrl+K)" />
            {[[UserCog, "Agents"], [Wrench, "Tools"], [FileText, "Files"], [Globe, "Web"]].map(([I, l]) => {
              const Icon = I as typeof Globe;
              const i = nav.findIndex(([, n]) => n === (l === "Agents" ? "Agents" : l === "Tools" ? "Development" : l === "Files" ? "Projects" : "APIs"));
              return <button key={l as string} onClick={() => openModule(i)} className="hidden flex-col items-center px-2 text-xs sm:flex"><Icon className="h-5 w-5 text-primary" />{l as string}</button>;
            })}
            <button aria-label="Send command" onClick={run} className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground"><Send className="h-5 w-5" /></button>
          </div>
        </main>
      </div>
      {open !== null && nav[open] && <ModulePanel index={open} title={nav[open]![1]} Icon={nav[open]![0]} onClose={() => setOpen(null)} />}
      {lookbook && <LookbookPanel current={lookOverride} onSelect={(l) => { setLookOverride(l); setLookbook(false); }} onClose={() => setLookbook(false)} />}
    </div>
  );
}

function Live() {
  return <span className="flex items-center gap-1 rounded border border-success/50 px-2 py-0.5 text-xs text-success"><Circle className="h-2 w-2 animate-pulse fill-current" />Live</span>;
}
