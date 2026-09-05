import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { supabase } from "@/integrations/supabase/client";

export type AuthedOutletContext = { user: User };

// Client-side equivalent of the old _authenticated route's beforeLoad guard:
// checks the Supabase session before rendering any nested route, and redirects
// to /auth when there is none.
export default function ProtectedRoute() {
  const [state, setState] = useState<
    { status: "loading" } | { status: "authed"; user: User } | { status: "unauthed" }
  >({ status: "loading" });

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error || !data.user) {
        setState({ status: "unauthed" });
        return;
      }
      setState({ status: "authed", user: data.user });
    });
    return () => {
      active = false;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">請稍候…</p>
      </div>
    );
  }

  if (state.status === "unauthed") {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet context={{ user: state.user } satisfies AuthedOutletContext} />;
}
