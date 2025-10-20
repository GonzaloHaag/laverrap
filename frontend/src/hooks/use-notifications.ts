import { useState } from "react";
import { toast } from "sonner";
import { sendNotification } from "@/services/twilo-service";
import { useQueryClient } from "@tanstack/react-query";

export const useNotifications = () => {
    const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const notifyClient = async (clientPhone: string, washingId: number) => {
    if (!clientPhone) {
      toast.error("El cliente no tiene teléfono registrado");
      return { success: false };
    }

    setIsLoading(true);
    try {
      const response = await sendNotification(clientPhone, washingId);
      
      if (!response.ok) {
        toast.error(response.message);
        return { success: false };
      }
      queryClient.invalidateQueries({ queryKey: ["washes"] });
      toast.success(response.message);
      return { success: true };
    } catch {
      toast.error("Error inesperado al enviar la notificación");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    notifyClient,
    isLoading,
  };
};
