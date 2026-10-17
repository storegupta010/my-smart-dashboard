import jarvis from "@/assets/jarvis.jpg";

export type CoreState = "idle" | "listening" | "thinking" | "executing" | "verifying" | "completed" | "error";
export const stateLabel: Record<CoreState, string> = {
  idle: "Standing by", listening: "Listening…", thinking: "Thinking…", executing: "Executing…", verifying: "Verifying…", completed: "Task completed", error: "Command not recognised",
};

/** Animated AI core: rings, aura and neural streams react to `state`. */
export function JarvisCore({ state, tilt = [0, 0] }: { state: CoreState; tilt?: [number, number] }) {
  const nodes = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    return [50 + Math.cos(a) * 46, 50 + Math.sin(a) * 46] as const;
  });
  return (
    <div className="core pointer-events-none absolute inset-0 grid place-items-center" data-state={state}>
      <div className="parallax relative aspect-square h-[92%]" style={{ transform: `perspective(900px) rotateY(${tilt[0] * 8}deg) rotateX(${-tilt[1] * 8}deg)` }}>
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
              <line x1="50" y1="50" x2={x} y2={y} stroke="var(--accent)" strokeWidth=".15" className="data-stream" opacity={state === "idle" ? 0.2 : state === "executing" ? 1 : 0.6} />
              <circle cx={x} cy={y} r=".8" fill="var(--accent)" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
