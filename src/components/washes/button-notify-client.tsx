import { BellIcon } from "lucide-react";
import { Button } from "../ui/button";
import type { Client } from "@/types/client";
import { toast } from "sonner";
interface ButtonNotifyClientProps {
  washingClient: Client | null;
}
export const ButtonNotifyClient = ({
  washingClient,
}: ButtonNotifyClientProps) => {
  const handleNotifyClient = () => {
    if (!washingClient || !washingClient.phone) {
      toast.error("El cliente no tiene teléfono registrado");
      return;
    }
    // Aquí iría la lógica para notificar al cliente, por ejemplo, llamar a una API.
    console.log(
      `Notificando al cliente ${washingClient.name} al teléfono ${washingClient.phone}`
    );
  };
  return (
    <Button
      type="button"
      variant={"outline"}
      size={"icon-sm"}
      title="Notificar"
      onClick={handleNotifyClient}
    >
      <BellIcon className="text-green-800" />
    </Button>
  );
};
