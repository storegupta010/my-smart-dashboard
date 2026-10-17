import jarvis from "@/assets/jarvis.jpg";

export type CoreState = "idle" | "listening" | "thinking" | "executing" | "verifying";
export const stateLabel: Record<CoreState, string> = {
  idle: "Standing by", listening: "Listening…", thinking: "Thinking…", executing: "Executing…", verifying: "Verifying…",
};

/** Animated AI core: rings, aura and neural streams react to `state`. */
export function JarvisCore({ state }: { state: CoreState }) {
  const nodes = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    return [50 + Math.cos(a) * 46, 50 + Math.sin(a) * 46] as const;
  });
  return (
    <div className="core pointer-events-none absolute inset-0 grid place-items-center" data-state={state}>
      <div className="relative aspect-square h-[92%]">
        <div className="core-aura absolute inset-[22%] rounded-full" />
        <img src={jarvis} alt="Jarvis AI core" width={1024} height={1024}
          className="core-pulse absolute inset-0 h-full w-full rounded-full object-cover [mask-image:radial-gradient(circle,black_42%,transparent_68%)]" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <g className="ring-spin origin-center" style={{ transformBox: "fill-box" }}>
            <circle cx="50" cy="50" r="44" fill="none" stroke="var(--primary)" strokeWidth=".4" strokeDasharray="8 4" opacity=".7" />
          </g>
          <g className="ring-spin-rev origin-center" style={{ transformBox: "fill-box" }}>
            <circle cx="50" cy="50" r="38" fill="none" stroke="var(--accent)" strokeWidth=".3" strokeDasharray="2 6" opacity=".8" />
          </g>
          {nodes.map(([x, y], i) => (
            <g key={i}>
              <line x1="50" y1="50" x2={x} y2={y} stroke="var(--accent)" strokeWidth=".15" className="data-stream" opacity={state === "idle" ? 0.2 : 0.6} />
              <circle cx={x} cy={y} r=".8" fill="var(--accent)" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
