import { useMemo } from "react";
import {
  DialogFooterForm,
  ErrorMessage,
  InputForm
} from "@/components/shared";
import {
  Label,
  NativeSelect,
  NativeSelectOption,
  Textarea,
} from "@/components/ui";
import { useClients, useEmployees, useServices, useWashed } from "@/hooks";
import { washingSchema, type Washing } from "@/schemas";
import { washingService } from "@/services";
import { WASHING_STATUS } from "@/utils/consts";
import { formatMoney } from "@/utils/formatters";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface Props {
  washing: Washing | null;
  closeDialog: () => void;
}
export const FormWashing = ({ closeDialog }: Props) => {
  const { mutate } = useWashed();
  const { clients } = useClients();
  const { employees } = useEmployees();
  const { services } = useServices();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: yupResolver(washingSchema),
    mode: "onSubmit",
    defaultValues: {
      clientId: undefined,
      serviceId: undefined,
      employeeId: undefined,
      status: "PENDING",
      details: "",
      notify: true,
    },
  });

  const clientIdValue = watch("clientId");

  const client = clients && clients.find((c) => c.id === clientIdValue);

  const onSubmit = handleSubmit(async (data) => {
    if (data.notify && !client?.email) {
      toast.error(
        "El cliente seleccionado no tiene correo electrónico para notificar.",
      );
      return;
    }
    try {
      await washingService.create({ washing: data });
      toast.success("Lavado creado con éxito");
      mutate();
      closeDialog();
    } catch (error) {
      console.error("Error creating or updating washing:", error);
      toast.error("Hubo un error al crear o actualizar el lavado");
    }
  });

  const filterActiveEmployees = useMemo(() => {
    return employees?.filter((employee) => employee.status === "ACTIVE");
  }, [employees]);
  return (
    <form onSubmit={onSubmit} className="w-full grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-y-1 w-full">
        <Label htmlFor="clientId">Cliente *</Label>
        <NativeSelect {...register("clientId", { valueAsNumber: true })} aria-invalid={!!errors.clientId}>
          <NativeSelectOption value="">Seleccionar cliente</NativeSelectOption>
          {clients && clients.length > 0 ? (
            clients.map((client) => (
              <NativeSelectOption key={client.id} value={client.id}>
                {client.name}, {client.car_plate}
              </NativeSelectOption>
            ))
          ) : (
            <NativeSelectOption disabled>No hay clientes</NativeSelectOption>
          )}
        </NativeSelect>
        {errors.clientId && <ErrorMessage message={errors.clientId.message!} />}
      </div>
      <InputForm
        label="Vehículo"
        readOnly
        type="text"
        placeholder={client ? client.car_model : "Seleccione un cliente"}
      />
      <div className="flex flex-col gap-y-1 w-full">
        <Label htmlFor="employeeId">Empleado a cargo *</Label>
        <NativeSelect {...register("employeeId", { valueAsNumber: true })} aria-invalid={!!errors.employeeId}>
          <NativeSelectOption value="">Seleccionar empleado</NativeSelectOption>
          {filterActiveEmployees && filterActiveEmployees.length > 0 ? (
            filterActiveEmployees.map((employee) => (
              <NativeSelectOption key={employee.id} value={employee.id}>
                {employee.name} - {employee.entry_time} a{" "}
                {employee.departure_time}
              </NativeSelectOption>
            ))
          ) : (
            <NativeSelectOption disabled>No hay empleados</NativeSelectOption>
          )}
        </NativeSelect>
        {errors.employeeId && (
          <ErrorMessage message={errors.employeeId.message!} />
        )}
      </div>
      <div className="flex flex-col gap-y-1 w-full">
        <Label htmlFor="serviceId">Servicio *</Label>
        <NativeSelect {...register("serviceId", { valueAsNumber: true })} aria-invalid={!!errors.serviceId}>
          <NativeSelectOption value="">Seleccionar servicio</NativeSelectOption>
          {services && services.length > 0 ? (
            services.map((service) => (
              <NativeSelectOption key={service.id} value={service.id}>
                {service.name} - {formatMoney(service.price)}
              </NativeSelectOption>
            ))
          ) : (
            <NativeSelectOption disabled>No hay servicios</NativeSelectOption>
          )}
        </NativeSelect>
        {errors.serviceId && (
          <ErrorMessage message={errors.serviceId.message!} />
        )}
      </div>
      <div className="flex flex-col gap-y-1 w-full">
        <Label htmlFor="status">Estado *</Label>
        <NativeSelect {...register("status")} aria-invalid={!!errors.status}>
          {WASHING_STATUS.map((status) => (
            <NativeSelectOption key={status.id} value={status.value}>
              {status.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      <div className="flex flex-col gap-y-1 w-full">
        <Label htmlFor="notifyClient">Notificar por correo *</Label>
        <NativeSelect {...register("notify")} defaultValue="true">
          <NativeSelectOption value="true">Sí</NativeSelectOption>
          <NativeSelectOption value="false">No</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="flex flex-col gap-y-1 w-full col-span-2">
        <Label htmlFor="details">Detalles adicionales</Label>
        <Textarea {...register("details")} rows={4} />
        {errors.details && <ErrorMessage message={errors.details.message!} />}
      </div>
      <div className="w-full col-span-2">
        <DialogFooterForm title="Crear lavado" isLoading={isSubmitting} />
      </div>
    </form>
  );
};
