import { createOrUpdateClient } from "@/services/clients-service";
import type { NewClient } from "@/types/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useClientMutation = ({
  toggleModal,
}: {
  toggleModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      clientData,
      clientId,
    }: {
      clientData: NewClient;
      clientId: number | null;
    }) => createOrUpdateClient({ client: clientData, clientId }),
    onSuccess: (data) => {
      console.log("Cliente creado");
      queryClient.invalidateQueries({
        queryKey: ["clients", data.data?.user_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["clients-select", data.data?.user_id],
      });
      toggleModal();
      toast.success(data.message);
    },
    onError: (error) => {
      console.error("Error al crear el cliente:", error);
    },
  });
  return mutation;
};
