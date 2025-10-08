import { createService } from "@/services/services-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useServiceMutation = ({
  toggleModal,
}: {
  toggleModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createService, // el createService devuelve la data del servicio creado
    onSuccess: (data) => {
      console.log("Servicio creado");
      queryClient.invalidateQueries({
        queryKey: ["services", data.data?.user_id],
      });
      toggleModal();
      toast.success("Servicio creado");
    },
    onError: (error) => {
      console.error("Error al crear el servicio:", error);
    },
  });
  return mutation;
};
