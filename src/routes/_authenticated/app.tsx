import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PlaneTakeoff, LogOut, Radar } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      { name: "description", content: "Your flight route tracking dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AppDashboard,
});

function AppDashboard() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="hero-glow min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <PlaneTakeoff className="h-4.5 w-4.5" />
            </span>
            <span className="text-sm font-semibold tracking-tight">Flight Price Notifier</span>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <LogOut className="h-4 w-4" />
            Sign Out / 登出
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="animate-fade-up">
          <p className="text-sm font-medium text-primary">Hi {user.email}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            航線追蹤儀表板
          </h1>
        </div>

        <div
          className="animate-fade-up card-glow mt-10 flex flex-col items-center rounded-2xl border border-border/70 bg-card px-8 py-16 text-center"
          style={{ animationDelay: "120ms" }}
        >
          <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Radar className="h-8 w-8" />
          </span>
          <h2 className="text-xl font-semibold">你的航線追蹤儀表板即將上線</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            下一個里程碑會加上訂閱航線的功能。
            <br />
            Your dashboard is coming soon — route subscriptions arrive in the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
