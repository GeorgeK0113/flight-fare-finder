import { Plane, BellRing, CalendarX2, PlaneTakeoff } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: Plane,
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: BellRing,
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: CalendarX2,
    title: "隨時取消",
    subtitle: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

export default function LandingPage() {
  useEffect(() => {
    document.title = "Flight Price Notifier — 機票降價通知";
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero-glow min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <PlaneTakeoff className="h-4.5 w-4.5" />
            </span>
            <span className="text-sm font-semibold tracking-tight sm:text-base">
              Flight Price Notifier
            </span>
          </Link>
          <Link
            to="/auth"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:brightness-110"
          >
            Sign in / 登入
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="animate-glow-pulse pointer-events-none absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-[110px] sm:h-96 sm:w-[36rem]"
          />
          <div className="mx-auto max-w-4xl px-4 pb-20 pt-24 text-center sm:px-6 sm:pt-32">
            <p className="animate-fade-up mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-accent-foreground">
              <PlaneTakeoff className="h-3.5 w-3.5 text-primary" />
              台北出發 · 熱門航線票價監控
            </p>
            <h1
              className="animate-fade-up text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Flight Price Notifier
              <span className="text-gradient mt-3 block text-3xl sm:text-5xl">
                設定航線與目標價，機票降價就通知你
              </span>
            </h1>
            <p
              className="animate-fade-up mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              Set a route and a target price — we email you when the fare drops.
            </p>
            <div
              className="animate-fade-up mt-10 flex items-center justify-center gap-4"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                to="/auth"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] hover:brightness-110"
              >
                Sign in / 登入
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="reveal text-center text-2xl font-bold tracking-tight sm:text-3xl">
            專為預算導向的旅人打造
          </h2>
          <p className="reveal mt-3 text-center text-sm text-muted-foreground sm:text-base">
            不在乎哪天飛，只想買到預算內的機票 — 交給我們盯。
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <article
                key={f.title}
                className="reveal card-glow rounded-2xl border border-border/70 bg-card p-7 transition-transform duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <f.icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="text-lg font-semibold">
                  {f.title}
                  <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {f.subtitle}
                  </span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8">
        <p className="text-center text-xs text-muted-foreground">
          © 2026 Flight Price Notifier
        </p>
      </footer>
    </div>
  );
}
