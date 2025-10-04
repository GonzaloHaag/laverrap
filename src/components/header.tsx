import { buttonVariants } from "@/lib/consts";
import { Link } from "react-router";
import { CarIcon } from "lucide-react";
import { HeaderNavLinks } from "./header-nav-links";

export const Header = () => {
  return (
    <header className="w-full h-20 border border-b-border flex items-center">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-x-2">
          <Link
            to={"/"}
            title="Inicio"
            className={`${buttonVariants({
              variant: "default",
              size: "icon",
            })} size-12`}
          >
            <CarIcon className="size-8" />
          </Link>
          <div className="flex flex-col gap-y-0">
            <span className="text-lg font-medium">Laverrap</span>
            <span className="text-sm text-muted-foreground">
              Sistema de gestión
            </span>
          </div>
        </div>
        <HeaderNavLinks />
      </div>
    </header>
  );
};
