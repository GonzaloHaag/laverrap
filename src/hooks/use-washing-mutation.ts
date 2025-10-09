import { createWashing } from "@/services/washes-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useWashingMutation = ({
  toggleModal,
}: {
  toggleModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createWashing,
    onSuccess: (data) => {
      console.log("Lavado creado");
      queryClient.invalidateQueries({
        queryKey: ["washes", data.data?.user_id],
      });
      toggleModal();
      toast.success("Lavado creado");
    },
    onError: (error) => {
      console.error("Error al crear el lavado:", error);
    },
  });
  return mutation;
};
