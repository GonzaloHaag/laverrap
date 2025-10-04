import { createBrowserRouter } from "react-router";
import { ClientsPage, HomePage, ServicesPage, WashesPage } from "@/pages";
import { LoggedLayout } from "@/layouts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoggedLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "/lavados", Component: WashesPage },
      { path: "/clientes", Component: ClientsPage },
      { path: "/servicios", Component: ServicesPage },
    ],
  },

  { path: "*", element: <div>Página no encontrada</div> },
]);
