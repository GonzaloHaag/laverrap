import { createBrowserRouter } from "react-router";
import {
  ClientsPage,
  EmployeesPage,
  HomePage,
  LoginPage,
  ServicesPage,
  WashedPage,
} from "@/pages";
import { ProtectedLayout } from "@/layouts";

export const router = createBrowserRouter([
  {
    path: "/auth",
    children: [{ path: "login", Component: LoginPage }],
  },
  {
    path: "/",
    Component: ProtectedLayout,
    children: [
      { path: "/", Component: HomePage },
      { path: "services", Component: ServicesPage },
      { path: "clients", Component: ClientsPage },
      { path: "employees", Component: EmployeesPage },
      { path: "washed", Component: WashedPage },
    ],
  },
]);
