import { Navigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { User } from "@/schemas";

export const UserProfile = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  const userData: User = JSON.parse(user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-x-2">
        {/* User Profile */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-foreground">
              {userData.role}
            </span>
            <span className="text-xs text-muted-foreground">
              {userData.email}
            </span>
          </div>
          <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">A</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Perfil</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
