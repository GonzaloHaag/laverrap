
import { deleteServiceById } from "@/services/services-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteServiceMutation = ({
  toggleModal,
}: {
  toggleModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (serviceId: number) => deleteServiceById({ serviceId }),
    onSuccess: (data) => {
      if (!data.ok) {
        toast.error(data.message);
        return;
      }
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
      console.error("Error al eliminar el servicio:", error);
    },
  });
  return mutation;
};
