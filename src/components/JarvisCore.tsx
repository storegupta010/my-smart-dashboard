import { useEffect } from "react";
import { applyTheme, type DressCode } from "@/lib/agent-dress-code";
import ayraDefault from "@/assets/ayra-cyan.jpg";
import ayraCyanSide from "@/assets/ayra-cyan-side.jpg";
import ayraCyanJacket from "@/assets/ayra-cyan-jacket.jpg";
import ayraBraids from "@/assets/ayra-braids.jpg";
import ayraAmberSide from "@/assets/ayra-amber-side.jpg";
import ayraAmberFront from "@/assets/ayra-amber-front.jpg";
import ayraAmberProfile from "@/assets/ayra-amber-profile.jpg";
import ayraViolet from "@/assets/ayra-violet.jpg";
import ayraHeadset from "@/assets/ayra-headset.jpg";
import ayraGold from "@/assets/ayra-gold.jpg";
import ayraBob from "@/assets/ayra-bob.jpg";
import ayraCrystal from "@/assets/ayra-crystal.jpg";
import ayraVeil from "@/assets/ayra-veil.jpg";

export type CoreState = "idle" | "listening" | "thinking" | "executing" | "verifying" | "speaking" | "completed" | "error";
export const stateLabel: Record<CoreState, string> = {
  idle: "Standing by", listening: "Listening…", thinking: "Thinking…", executing: "Executing…", verifying: "Verifying…", speaking: "AYRA is responding…", completed: "Task completed", error: "Command not recognised",
};

/** AYRA's looks — the same avatar photographed from different angles and outfits. */
export const AYRA_LOOKS = {
  default: ayraDefault,
  cyanSide: ayraCyanSide,
  cyanJacket: ayraCyanJacket,
  braids: ayraBraids,
  amberSide: ayraAmberSide,
  amberFront: ayraAmberFront,
  amberProfile: ayraAmberProfile,
  violet: ayraViolet,
  headset: ayraHeadset,
  gold: ayraGold,
  bob: ayraBob,
  crystal: ayraCrystal,
  veil: ayraVeil,
} as const;
export type AyraLook = keyof typeof AYRA_LOOKS;

/** Which look AYRA wears per core state (when no occasion overrides it). */
const stateLook: Record<CoreState, AyraLook> = {
  idle: "default",
  listening: "headset",
  thinking: "cyanSide",
  executing: "amberProfile",
  verifying: "braids",
  speaking: "cyanJacket",
  completed: "amberFront",
  error: "bob",
};

/**
 * Special-day appearance calendar. Dates are month-day; AYRA wears the mapped
 * look for the whole day (local timezone), then returns to her default look.
 * NOTE: no true festival photos were provided yet — occasions reuse existing
 * looks (gold = festive). Add festival photos to AYRA_LOOKS and point here.
 */
export const AYRA_SCHEDULE: { name: string; monthDay: string; look: AyraLook }[] = [
  { name: "New Year", monthDay: "01-01", look: "veil" },
  { name: "Republic Day", monthDay: "01-26", look: "cyanJacket" },
  { name: "Holi", monthDay: "03-04", look: "crystal" },
  { name: "Independence Day", monthDay: "08-15", look: "amberFront" },
  { name: "Diwali", monthDay: "11-08", look: "gold" },
  { name: "Christmas", monthDay: "12-25", look: "veil" },
];

/** Occasion active today, if any. First match wins (no conflicts). */
export function activeOccasion(now = new Date()) {
  const md = `${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return AYRA_SCHEDULE.find((o) => o.monthDay === md) ?? null;
}

/** Dashboard colour theme per look — matches each outfit's glow colour (hue, chroma). */
export const LOOK_THEME: Record<AyraLook, { primary: number; accent: number; c?: number }> = {
  default: { primary: 235, accent: 210 },
  cyanSide: { primary: 230, accent: 205 },
  cyanJacket: { primary: 225, accent: 200 },
  braids: { primary: 220, accent: 195 },
  headset: { primary: 240, accent: 215 },
  veil: { primary: 215, accent: 195 },
  amberSide: { primary: 60, accent: 75 },
  amberFront: { primary: 65, accent: 80 },
  amberProfile: { primary: 55, accent: 72 },
  bob: { primary: 45, accent: 65 },
  gold: { primary: 85, accent: 95, c: 0.14 },
  violet: { primary: 300, accent: 285 },
  crystal: { primary: 310, accent: 290 },
};

/** Friendly display names for the lookbook panel. */
export const LOOK_NAMES: Record<AyraLook, string> = {
  default: "Cyan Classic",
  cyanSide: "Cyan Profile",
  cyanJacket: "Cyan Jacket",
  braids: "Cyan Braids",
  amberSide: "Amber Side",
  amberFront: "Amber Armor",
  amberProfile: "Amber Glow",
  violet: "Violet Chrome",
  headset: "Headset",
  gold: "Gold Headpiece",
  bob: "Orange Bob",
  crystal: "Purple Crystal",
  veil: "Bridal Veil",
};

/** Background colour measured from the edges of each AYRA photo. */
export const LOOK_BG: Record<AyraLook, string> = {
  default: "#e4e5e9", cyanSide: "#c5c2c4", cyanJacket: "#d8d8e0", braids: "#59819b",
  amberSide: "#e4e4e9", amberFront: "#dedfe3", amberProfile: "#aaabad", violet: "#e4e8f0",
  headset: "#b2b4be", gold: "#cec8c1", bob: "#bbd3e8", crystal: "#644f8e", veil: "#565c67",
};

/** Paint the whole dashboard background with the photo's background; flip text for contrast. */
function applyBackground(hex: string) {
  const ch = (i: number) => parseInt(hex.slice(i, i + 2), 16) / 255;
  const r = ch(1), g = ch(3), b = ch(5);
  const light = 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.55;
  const s = document.documentElement.style;
  s.setProperty("--background", hex);
  s.setProperty("--foreground", light ? "oklch(0.2 0.03 260)" : "oklch(0.96 0.01 240)");
  s.setProperty("--card-foreground", light ? "oklch(0.2 0.03 260)" : "oklch(0.96 0.01 240)");
  s.setProperty("--card", light ? "oklch(1 0 0 / 0.55)" : "oklch(0.15 0.03 260 / 0.55)");
  s.setProperty("--muted", light ? "oklch(0.88 0.01 260 / 0.8)" : "oklch(0.3 0.03 260 / 0.8)");
  s.setProperty("--muted-foreground", light ? "oklch(0.42 0.03 260)" : "oklch(0.78 0.03 240)");
}

/** Animated AI core: AYRA avatar, rings, aura and neural streams react to `state`.
 *  `theme` (agent dress code) wins over AYRA's outfit colour when set. */
export function JarvisCore({ state, tilt = [0, 0], override = null, theme = null }: { state: CoreState; tilt?: [number, number]; override?: AyraLook | null; theme?: DressCode | null }) {
  const occasion = activeOccasion();
  const look = override ?? (occasion ? occasion.look : stateLook[state]);
  useEffect(() => { applyTheme(theme ?? LOOK_THEME[look]); applyBackground(LOOK_BG[look]); }, [look, theme]);
  const nodes = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    return [50 + Math.cos(a) * 46, 50 + Math.sin(a) * 46] as const;
  });
  return (
    <div className="core pointer-events-none absolute inset-0 grid place-items-center" data-state={state}>
      <div className="parallax relative aspect-[3/4] h-[92%]" style={{ transform: `perspective(900px) rotateY(${tilt[0] * 8}deg) rotateX(${-tilt[1] * 8}deg)` }}>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="particle absolute bottom-[20%] h-1 w-1 rounded-full bg-accent" style={{ left: `${15 + i * 7}%`, animationDelay: `${i * 0.6}s` }} />
        ))}
        {state === "verifying" && <div className="scan-line" />}
        {state === "completed" && <div className="anim-pop absolute inset-[30%] rounded-full border-2 border-success" />}
        {state === "error" && <div className="anim-shake absolute inset-[30%] rounded-full border-2 border-danger" />}
        {state === "listening" && (
          <div className="absolute bottom-[8%] left-1/2 flex h-8 -translate-x-1/2 items-center gap-1">
            {Array.from({ length: 9 }, (_, i) => <span key={i} className="wave-bar h-full w-1 rounded bg-success" style={{ animationDelay: `${i * 0.08}s` }} />)}
          </div>
        )}
        <div className="core-aura absolute inset-[14%] rounded-full" />
        {/* AYRA bust: full face, head, neck and shoulders — portrait frame, no circular crop */}
        <div className="ayra-sway absolute inset-x-[6%] inset-y-[2%]">
          <div className="ayra-breathe absolute inset-0">
            {(Object.keys(AYRA_LOOKS) as AyraLook[]).map((k) => (
              <img key={k} src={AYRA_LOOKS[k]} alt={k === look ? "AYRA holographic AI avatar" : ""} aria-hidden={k !== look}
                width={768} height={1024} loading={k === "default" ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full rounded-[1.6rem] object-cover object-top transition-opacity duration-700 [mask-image:linear-gradient(180deg,black_80%,transparent_99%)]"
                style={{ opacity: k === look ? 1 : 0 }} />
            ))}
            {/* holographic sheen matched to dashboard palette */}
            <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] bg-gradient-to-b from-accent/10 via-transparent to-primary/20 mix-blend-screen" />
            <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] shadow-[inset_0_0_40px_oklch(0.72_0.17_235/0.25)]" />
          </div>
        </div>
        {(state === "listening" || state === "speaking") && [0, 0.8, 1.6].map((d) => (
          <span key={d} className="ayra-ripple absolute inset-x-[10%] inset-y-[6%] rounded-[2rem] border border-accent" style={{ animationDelay: `${d}s` }} />
        ))}
        <div className="ayra-orbit absolute inset-[2%]"><span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" /></div>
        <svg viewBox="0 0 100 133" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <g className="ring-spin origin-center" style={{ transformBox: "fill-box" }}>
            <circle cx="50" cy="50" r="44" fill="none" stroke="var(--primary)" strokeWidth=".4" strokeDasharray="8 4" opacity=".7" />
          </g>
          <g className="ring-spin-rev origin-center" style={{ transformBox: "fill-box" }}>
            <circle cx="50" cy="50" r="38" fill="none" stroke="var(--accent)" strokeWidth=".3" strokeDasharray="2 6" opacity=".8" />
          </g>
          {nodes.map(([x, y], i) => (
            <g key={i}>
              <line x1="50" y1="50" x2={x} y2={y} stroke="var(--accent)" strokeWidth=".15" className="data-stream" opacity={state === "idle" ? 0.2 : state === "executing" ? 1 : 0.6} />
              <circle cx={x} cy={y} r=".8" fill="var(--accent)" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
