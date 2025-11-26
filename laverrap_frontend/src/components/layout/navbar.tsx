import { buttonVariants } from "@/utils/const";
import { Link, useLocation } from "react-router";

const NAV_LINKS = [
  {
    id: 1,
    title: "Dashboard",
    path: "/",
  },
  {
    id: 2,
    title: "Lavados",
    path: "/washed",
  },
  {
    id: 3,
    title: "Clientes",
    path: "/clients",
  },
  {
    id: 4,
    title: "Empleados",
    path: "/employees",
  },
  {
    id: 5,
    title: "Servicios",
    path: "/services",
  },
];
export const NavBar = () => {
    const { pathname } = useLocation();
  return (
    <nav>
      <ul className="flex items-center gap-x-2">
        {NAV_LINKS.map((link) => (
          <li key={link.id}>
            <Link
              title={link.title}
              to={link.path}
              className={`${ pathname === link.path ? "bg-blue-500 text-slate-100 hover:bg-blue-500 hover:text-slate-100" : ""} ${buttonVariants({ variant: "outline" })}`}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
