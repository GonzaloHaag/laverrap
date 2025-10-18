import { BellIcon } from "lucide-react";
import { Button } from "../ui/button";
import type { Washing } from "@/types/washing";
import { toast } from "sonner";

interface ButtonNotifyClientProps {
  washing: Washing | null;
}
export const ButtonNotifyClient = ({ washing }: ButtonNotifyClientProps) => {
  const handleNotifyClient = () => {
    if (!washing || !washing.clients.phone) {
      toast.error("El cliente no tiene teléfono registrado");
      return;
    }
    if (washing.notified_client) {
      toast.warning("El cliente ya ha sido notificado");
      return;
    }
    const message = `Hola ${washing.clients.name}, su lavado ha sido finalizado. Recuerde que estamos hasta las 18hs. ¡Gracias por elegirnos!`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${washing.clients.phone}?text=${encodedMessage}`;
    window.open(url, "_blank"); // abre en nueva pestaña
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
