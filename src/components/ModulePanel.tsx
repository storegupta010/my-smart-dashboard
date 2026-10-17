import { X } from "lucide-react";
import type { ComponentType } from "react";

const transitions = ["anim-holo", "anim-warp", "anim-slide", "anim-iris"];

/** Expanding holographic panel for a module; each module gets its own entrance. */
export function ModulePanel({ index, title, Icon, onClose }: { index: number; title: string; Icon: ComponentType<{ className?: string }>; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/70 p-4 backdrop-blur-sm anim-fade-up" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div key={title} className={`panel holo-scan w-full max-w-2xl p-6 ${transitions[index % transitions.length]}`} onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center gap-3">
          <Icon className="h-7 w-7 text-primary glow-icon" />
          <h2 className="font-display text-xl tracking-widest text-primary glow-text">{title.toUpperCase()}</h2>
          <button onClick={onClose} aria-label="Close" className="ml-auto rounded-full border border-border p-2 hover:bg-muted"><X className="h-4 w-4" /></button>
        </div>
        <p className="text-muted-foreground">The {title} module is ready. Connect its data source to see live records here.</p>
        <div className="mt-6 h-1 overflow-hidden rounded bg-muted"><div className="h-full w-1/3 animate-pulse bg-primary" /></div>
      </div>
    </div>
  );
}
