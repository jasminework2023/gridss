import React from "react";
import { MessageCircle } from "lucide-react";
import { FinancialCalculator, CalculatorDetail } from "./pages/FinancialCalculator";
import { setLastResult } from "./lib/resultStore";
import { BRAND, TAGLINE, CTA_LABEL, CTA_LINK, DISCLAIMER } from "./config";

type Theme = "auto" | "light" | "dark";
function useTheme(): [Theme, (t: Theme) => void] {
  const read = (): Theme => { try { return (localStorage.getItem("gri-theme") as Theme) || "auto"; } catch { return "auto"; } };
  const [theme, setTheme] = React.useState<Theme>(read);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => document.documentElement.classList.toggle("dark", theme === "dark" || (theme === "auto" && mq.matches));
    apply(); mq.addEventListener("change", apply);
    try { localStorage.setItem("gri-theme", theme); } catch { /* ignore */ }
    return () => mq.removeEventListener("change", apply);
  }, [theme]);
  return [theme, setTheme];
}

function ThemeSwitch({ theme, onChange }: { theme: Theme; onChange: (t: Theme) => void }) {
  const opts: [Theme, string][] = [["auto", "Otomatis"], ["light", "Terang"], ["dark", "Gelap"]];
  return (
    <div role="group" aria-label="Tema" style={{ display: "inline-flex", padding: 3, gap: 2, borderRadius: 999, border: "1px solid rgb(var(--c-border))", background: "rgb(var(--c-surface))" }}>
      {opts.map(([k, label]) => (
        <button key={k} type="button" onClick={() => onChange(k)} aria-pressed={theme === k}
          style={{ border: 0, cursor: "pointer", borderRadius: 999, padding: "6px 11px", fontSize: 12, fontWeight: 700, background: theme === k ? "rgb(var(--c-accent-text))" : "transparent", color: theme === k ? "rgb(var(--c-surface))" : "rgb(var(--c-muted))" }}>{label}</button>
      ))}
    </div>
  );
}

export function App() {
  const [theme, setTheme] = useTheme();
  const [id, setId] = React.useState<string | null>(null);
  const open = (next: string | null) => { setId(next); window.scrollTo({ top: 0 }); };
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header className="no-print" style={{ background: "rgb(var(--c-surface))", borderBottom: "1px solid rgb(var(--c-border))" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <button type="button" onClick={() => open(null)} style={{ border: 0, background: "transparent", cursor: "pointer", textAlign: "left", padding: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "rgb(var(--c-accent-text))", letterSpacing: "-.02em" }}>{BRAND}</div>
            <div style={{ fontSize: 11, color: "rgb(var(--c-muted))" }}>{TAGLINE}</div>
          </button>
          <ThemeSwitch theme={theme} onChange={setTheme} />
          <a href={CTA_LINK} target="_blank" rel="noopener noreferrer"
             style={{ display: "inline-flex", alignItems: "center", gap: 7, borderRadius: 10, padding: "9px 14px", fontSize: 13, fontWeight: 700, textDecoration: "none", background: "rgb(var(--c-accent))", color: "rgb(var(--c-accent-ink))" }}>
            <MessageCircle size={15} /> {CTA_LABEL}
          </a>
        </div>
      </header>

      <main style={{ flex: 1, width: "100%", maxWidth: 1200, margin: "0 auto", padding: "24px 20px 40px", boxSizing: "border-box" }}>
        {id === null
          ? <FinancialCalculator onOpen={(x) => open(x)} />
          : <CalculatorDetail key={id} id={id} onBack={() => open(null)} onSaveResult={setLastResult} onNavigate={() => {}} />}
      </main>

      <footer className="no-print" style={{ borderTop: "1px solid rgb(var(--c-border))", padding: "16px 20px", fontSize: 11.5, lineHeight: 1.5, color: "rgb(var(--c-muted))", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>{DISCLAIMER}</div>
        <div style={{ marginTop: 6 }}>© {new Date().getFullYear()} {BRAND}</div>
      </footer>
    </div>
  );
}
