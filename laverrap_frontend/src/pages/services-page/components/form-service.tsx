import { DialogFooterForm, InputForm } from "@/components/shared";
import {
  Label,
  NativeSelect,
  NativeSelectOption,
  Textarea,
} from "@/components/ui";
import { useServices } from "@/hooks";
import { serviceSchema, type Service } from "@/schemas";
import { serviceService } from "@/services";
import { SERVICES_CATEGORY, SERVICES_STATUS } from "@/utils/const";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  service: Service | null;
  closeDialog: () => void;
}
export const FormService = ({ service, closeDialog }: Props) => {
  const { mutate } = useServices();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(serviceSchema),
    mode: "onSubmit",
    defaultValues: {
      name: service?.name ?? "",
      price: service?.price ?? undefined,
      duration: service?.duration ?? undefined,
      category: service?.category ?? "BASIC",
      description: service?.description ?? "",
      status: service?.status ?? "ACTIVE",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (service) {
        await serviceService.update({ id: service.id, service: data });
        toast.success("Servicio actualizado con éxito");
      } else {
        await serviceService.create({ service: data });
        toast.success("Servicio creado con éxito");
      }
      mutate();
      closeDialog();
    } catch (error) {
      console.error("Error creating or updating service:", error);
      toast.error("Hubo un error al crear o actualizar el servicio");
    }
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4 w-full">
      <InputForm
        label="Nombre del servicio"
        placeholder="Ej: Lavado completo"
        type="text"
        {...register("name")}
        error={errors.name?.message}
      />
      <div className="grid grid-cols-2 gap-4 items-start">
        <InputForm
          label="Precio"
          placeholder="Ej: 25.00"
          type="number"
          {...register("price")}
          error={errors.price?.message}
        />
        <div className="flex flex-col gap-y-1 w-full">
          <Label htmlFor="duration">Categoría</Label>
          <NativeSelect {...register("category")} className="w-full">
            {SERVICES_CATEGORY.map((type) => (
              <NativeSelectOption key={type.id} value={type.value}>
                {type.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-start">
        <InputForm
          label="Duración (minutos)"
          placeholder="Ej: 30"
          type="number"
          {...register("duration")}
          error={errors.duration?.message}
        />
        <div className="flex flex-col gap-y-1 w-full">
          <Label htmlFor="duration">Estado</Label>
          <NativeSelect {...register("status")} className="w-full">
            {SERVICES_STATUS.map((status) => (
              <NativeSelectOption key={status.id} value={status.value}>
                {status.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          placeholder="Agrega una descripción del servicio"
          {...register("description")}
          rows={4}
        />
      </div>
      <DialogFooterForm title="Crear servicio" isLoading={isSubmitting} />
    </form>
  );
};
