import { createOrUpdateService } from "@/services/services-service";
import type { NewService } from "@/types/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useServiceMutation = ({
  toggleModal,
}: {
  toggleModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      serviceData,
      serviceId,
    }: {
      serviceData: NewService;
      serviceId: number | null;
    }) => createOrUpdateService({ service: serviceData, serviceId }),
    onSuccess: (data) => {
      console.log("Servicio creado");
      queryClient.invalidateQueries({
        queryKey: ["services", data.data?.user_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["services-select", data.data?.user_id],
      });
      toggleModal();
      toast.success(data.message);
    },
    onError: (error) => {
      console.error("Error al crear el servicio:", error);
    },
  });
  return mutation;
};
