import { toggleStatusClient } from "@/services/clients-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useToggleStatusClientMutation = ({
  toggleModal,
}: {
  toggleModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      clientId,
      status
    }: {
      clientId: number;
      status: "active" | "inactive";
    }) => toggleStatusClient({ clientId, status }),
    onSuccess: (data) => {
      if (!data.ok) {
        toast.error(data.message);
        return;
      }
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
