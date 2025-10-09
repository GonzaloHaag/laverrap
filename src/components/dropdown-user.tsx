import { useAuth } from "@/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { logoutUser } from "@/services/auth-service";
import { toast } from "sonner";

export const DropdownUser = () => {
  const { session } = useAuth();

  const onCLickLogoutUser = async () => {
    const response = await logoutUser();
    if (!response.ok) {
      console.error("Error al cerrar sesión:", response.message);
      toast.error("Error al cerrar sesión");
      return;
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src="https://github.com/shadcn.png"
          width={35}
          height={20}
          className="rounded object-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end" forceMount>
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{session?.user.email}</DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-x-2 text-red-600"
          onClick={onCLickLogoutUser}
        >
          <LogOutIcon className="text-red-600" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
