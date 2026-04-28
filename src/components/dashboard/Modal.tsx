import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative glass-strong rounded-3xl p-6 w-full ${maxWidth} my-8 neon-border`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 glass h-8 w-8 grid place-items-center rounded-lg hover:bg-accent/10"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mb-5 pr-10">
          <h3 className="font-display font-bold text-xl">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

export function FormField({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</label>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

export const fieldClass =
  "w-full glass rounded-xl px-3.5 py-2.5 text-sm bg-transparent outline-none focus:ring-2 focus:ring-accent transition";

export const primaryBtn =
  "bg-gradient-vivid text-primary-foreground font-semibold rounded-xl px-4 py-2.5 text-sm shadow-neon hover:opacity-90 transition disabled:opacity-50";

export const ghostBtn =
  "glass rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-accent/10 transition";
