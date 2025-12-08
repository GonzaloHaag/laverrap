import { DialogFooterForm, InputForm, SelectForm } from "@/components/shared";
import { useClients } from "@/hooks";
import { ClientSchema, type Client } from "@/schemas";
import { clientService } from "@/services";
import { TYPES_OF_VEHICLES } from "@/utils/consts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface Props {
  client: Client | null;
  closeDialog: () => void;
}
export const FormClient = ({ client, closeDialog }: Props) => {
  const { mutate } = useClients();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ClientSchema),
    defaultValues: {
      name: client ? client.name : "",
      email: client ? client.email : "",
      phone: client ? client.phone : "",
      car_type: client ? client.car_type : "CAR",
      car_model: client ? client.car_model : "",
      car_plate: client ? client.car_plate : "",
      status: client ? client.status : "ACTIVE",
    },
    mode: "onSubmit",
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (client) {
        await clientService.update({ id: client.id, client: data });
        toast.success("Cliente actualizado con éxito");
      } else {
        await clientService.create({ client: data });
        toast.success("Cliente creado con éxito");
      }
      mutate();
      closeDialog();
    } catch (error) {
      console.log("Error al guardar el cliente:", error);
      toast.error("Error al guardar el cliente");
    }
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
      <InputForm
        label="Nombre"
        type="text"
        placeholder="Nombre del cliente"
        {...register("name")}
        error={errors.name?.message}
      />
      <div className="grid grid-cols-2 gap-4 items-start">
        <InputForm
          label="Whatsapp"
          type="text"
          placeholder="Teléfono del cliente"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <InputForm
          label="Correo electrónico"
          type="email"
          placeholder="Correo del cliente"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 items-start">
        <SelectForm label="Tipo de vehículo" options={TYPES_OF_VEHICLES} error={errors.car_type?.message} {...register("car_type")} />
        <InputForm
          label="Patente del vehículo"
          type="text"
          placeholder="ABC 2902"
          {...register("car_plate")}
          error={errors.car_plate?.message}
        />
      </div>
      <InputForm
        label="Modelo del vehículo"
        type="text"
        placeholder="Ej: Toyota corolla 2016"
        {...register("car_model")}
        error={errors.car_model?.message}
      />
      <DialogFooterForm isLoading={isSubmitting} title={client ? "Actualizar cliente" : "Crear cliente"} />
    </form>
  );
};
