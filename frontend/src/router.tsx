import { createBrowserRouter } from "react-router";
import { ClientsPage, HomePage, LoginPage, ServicesPage, WashesPage } from "@/pages";
import { LoggedLayout } from "@/layouts";

export const router = createBrowserRouter([
  {
    path:'/auth',
    children: [
      { path:'login', Component: LoginPage }
    ]
  },
  {
    path: "/",
    Component: LoggedLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "lavados", Component: WashesPage },
      { path: "clientes", Component: ClientsPage },
      { path: "servicios", Component: ServicesPage },
    ],
  },

  { path: "*", element: <div>Página no encontrada</div> },
]);
