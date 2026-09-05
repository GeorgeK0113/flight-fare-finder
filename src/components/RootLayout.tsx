import { Outlet } from "react-router-dom";

// Equivalent of the old TanStack Start root shell/component — plain SPA layout,
// no <html>/<head>/<Scripts> here since index.html already owns the document shell.
export default function RootLayout() {
  return <Outlet />;
}
