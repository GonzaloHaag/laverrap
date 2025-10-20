import { BellIcon, CheckCheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import type { Washing } from "@/types/washing";
import { useNotifications } from "@/hooks";

interface ButtonNotifyClientProps {
  washing: Washing | null;
}
export const ButtonNotifyClient = ({ washing }: ButtonNotifyClientProps) => {
  const { notifyClient, isLoading } = useNotifications();

  const handleNotifyClient = async () => {
    if (!washing?.clients?.phone) return;
    await notifyClient(washing.clients.phone, washing.id);
  };
  return (
    <>
      {washing?.notified_client ? (
        <Button
          type="button"
          variant={"outline"}
          size={"icon-sm"}
          title="Notificado"
          disabled
        >
          <CheckCheckIcon className="text-green-800" />
        </Button>
      ) : (
        <Button
          type="button"
          variant={"outline"}
          size={"icon-sm"}
          title="Notificar"
          onClick={handleNotifyClient}
          disabled={isLoading}
        >
          <BellIcon className="text-green-800" />
        </Button>
      )}
    </>
  );
};
