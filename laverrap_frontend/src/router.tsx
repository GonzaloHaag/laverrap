import { createBrowserRouter } from "react-router";
import { HomePage, LoginPage, ServicesPage } from "@/pages";
import { ProtectedLayout } from "@/layouts";

export const router = createBrowserRouter([
  {
    path: "/auth",
    // Component: () => <div>Auth Layout</div>,
    children: [{ path: "login", Component: LoginPage }],
  },
  {
    path: "/",
    Component: ProtectedLayout,
    children: [
      { path: "/", Component: HomePage },
      { path: "services", Component: ServicesPage },
    ],
  },
]);
