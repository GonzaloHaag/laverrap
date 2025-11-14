import { BubblesIcon, LogOutIcon } from "lucide-react";
import { NavBar } from "./navbar";
import { Button } from "../ui";

export const Header = () => {
  return (
    <header className="w-full flex items-center min-h-20 bg-muted">
      <div className="w-full container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-x-2">
          <BubblesIcon size={40} className="text-blue-500" />
          <div className="flex flex-col gap-y-0">
            <span className="font-bold text-lg">Laverrap</span>
            <span className="text-sm">Sistema de gestión</span>
          </div>
        </div>
        <NavBar />
        <Button size={"icon"} title="Cerrar sesion">
            <LogOutIcon />
        </Button>
      </div>
    </header>
  );
};
