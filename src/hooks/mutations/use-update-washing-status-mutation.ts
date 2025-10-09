import { updateStatusWashing } from "@/services/washes-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useUpdateWashingStatusMutation = ({
  toggleModal,
}: {
  toggleModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      washingId,
      status,
    }: {
      washingId: number;
      status: "in_progress" | "completed" | "cancelled";
    }) => updateStatusWashing({ washingId, status }),
    onSuccess: (data) => {
      if (!data.ok) {
        toast.error(data.message);
        return;
      }
      queryClient.invalidateQueries({
        queryKey: ["washes", data.data?.user_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["clients", data.data?.user_id],
      });
      toggleModal();
      toast.success("Lavado finalizado correctamente");
    },
    onError: (error) => {
      console.error("Error al actualizar el lavado:", error);
    },
  });
  return mutation;
};
