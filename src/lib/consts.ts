import { cva } from "class-variance-authority";
import {
  CogIcon,
  DropletsIcon,
  LayoutDashboardIcon,
  Users2Icon,
} from "lucide-react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
export const statusColors: Record<string, string> = {
  basic: "bg-gray-100 text-slate-700",
  complete: "bg-green-600 text-slate-100",
  active: "bg-green-600 text-slate-100",
  inactive: "bg-red-600 text-slate-100",
  premium: "bg-orange-700 text-slate-100",
};

export const statusLabels: Record<string, string> = {
  complete: "Completo",
  basic: "Básico",
  premium: "Premium",
  active: "Activo",
  inactive: "Inactivo",
};

export const VEHICLES_TYPES = [
  {
    id: 1,
    type: "car",
    label: "Auto",
  },
  {
    id: 2,
    type: "pickup",
    label: "Camioneta",
  },
  {
    id: 3,
    type: "motorcycle",
    label: "Moto",
  },
  {
    id: 4,
    type: "other",
    label: "Otro",
  },
];

export const NAV_LINKS = [
  {
    id: 1,
    path: "/",
    title: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    id: 2,
    path: "/lavados",
    title: "Lavados",
    icon: DropletsIcon,
  },
  {
    id: 3,
    path: "/clientes",
    title: "Clientes",
    icon: Users2Icon,
  },
  {
    id: 4,
    path: "/servicios",
    title: "Servicios",
    icon: CogIcon,
  },
];

export const STATES = [
  {
    id: 1,
    value: "all",
    label: "Todos",
  },
  {
    id: 2,
    value: "active",
    label: "Activos",
  },
  { id: 3, value: "inactive", label: "Inactivos" },
];

export const SERVICES_CATEGORIES = [
  {
    id: 1,
    value: "all",
    label: "Todas",
  },
  {
    id: 2,
    value: "basic",
    label: "Básico",
  },
  {
    id: 3,
    value: "complete",
    label: "Completo",
  },
  { id: 4, value: "premium", label: "Premium" },
];
