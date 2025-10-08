import { createClient } from "@/services/clients-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useClientMutation = ({
  toggleModal,
}: {
  toggleModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createClient,
    onSuccess: (data) => {
      console.log("Cliente creado");
      queryClient.invalidateQueries({
        queryKey: ["clients", data.data?.user_id],
      });
      toggleModal();
      toast.success("Cliente creado");
    },
    onError: (error) => {
      console.error("Error al crear el cliente:", error);
    },
  });
  return mutation;
};
