import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
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
        sm: "h-8 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-sm px-6 has-[>svg]:px-4",
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

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
export const SERVICES_CATEGORY = [
  { id: 1, value: "BASIC", label: "Básico" },
  { id: 2, value: "COMPLETE", label: "Completo" },
  { id: 3, value: "PREMIUM", label: "Premium" },
  { id: 4, value: "OTHER", label: "Otro" },
];
export const SERVICES_STATUS = [
  { id: 1, value: "ACTIVE", label: "Activo" },
  { id: 2, value: "INACTIVE", label: "Inactivo" }
];


export const WASHING_STATUS = [
  { id: 1, value: "PENDING", label: "Pendiente" },
  { id: 2, value: "IN_PROGRESS", label: "En progreso" },
  { id: 3, value: "COMPLETED", label: "Completado" },
  { id: 4, value: "CANCELLED", label: "Cancelado" },
];

export const TYPES_OF_VEHICLES = [
  { id: 1, value: "CAR", label: "Auto" },
  { id: 2, value: "PICKUP", label: "Camioneta" },
  { id: 3, value: "MOTORCYCLE", label: "Moto" },
  { id: 4, value: "OTHER", label: "Otro" },
];