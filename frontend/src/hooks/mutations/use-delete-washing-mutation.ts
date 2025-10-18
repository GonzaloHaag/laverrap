import { deleteWashingById } from "@/services/washes-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteWashingMutation = ({
  toggleModal,
}: {
  toggleModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (washingId: number) => deleteWashingById({ washingId }),
    onSuccess: (data) => {
      if (!data.ok) {
        toast.error(data.message);
        return;
      }
      queryClient.invalidateQueries({
        queryKey: ["washes", data.data?.user_id],
      });
      toggleModal();
      toast.success(data.message);
    },
    onError: (error) => {
      console.error("Error al eliminar el lavado:", error);
    },
  });
  return mutation;
};
