import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { WashingSchema } from "@/schemas";
import type { FormProps } from "@/types/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  useClientsSelect,
  useServicesSelect,
  useWashingMutation,
} from "@/hooks";
import { ErrorMessage } from "../error-message";
import { Input } from "../ui/input";
import { DialogFormFooter } from "../dialog-form-footer";
import { formatMoney } from "@/lib/utils";

export const FormWashing = ({ userId, toggleModal }: FormProps) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(WashingSchema),
    mode: "onSubmit",
    defaultValues: {
      user_id: userId,
      client_id: undefined,
      service_id: undefined,
      status: "in_progress",
    },
  });

  const { clientsQuerySelect } = useClientsSelect({ userId });
  const { servicesQuerySelect } = useServicesSelect({ userId });
  const washingMutation = useWashingMutation({ toggleModal });
  const onSubmit = handleSubmit(async (data) => {
    washingMutation.mutate({ washing: data });
  });

  const { data: clients } = clientsQuerySelect;
  const { data: services } = servicesQuerySelect;
  const clientIdValue = watch("client_id");
  const client =
    clientIdValue &&
    clients &&
    clients.find((c) => c.id === Number(clientIdValue));

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-y-1">
          <div className="grid gap-2">
            <Label htmlFor="client_id">Cliente *</Label>
            <Controller
              name="client_id"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(val) =>
                    field.onChange(val ? Number(val) : undefined)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients && clients.length > 0 ? (
                      clients.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id.toString()}
                        >
                          {client.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="__none__">
                        No hay clientes
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.client_id && (
            <ErrorMessage message={errors.client_id.message!} />
          )}
        </div>

        <div className="flex flex-col gap-y-1">
          <div className="grid gap-2">
            <Label htmlFor="vehicle">Vehículo</Label>
            <Input
              type="text"
              id="vehicle"
              value={
                client
                  ? client.model_brand
                    ? `${client.model_brand} - ${client.patent}`
                    : client.patent || ""
                  : ""
              }
              disabled
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-start">
        <div className="flex flex-col gap-y-1">
          <div className="grid gap-2">
            <Label htmlFor="service_id">Servicio *</Label>
            <Controller
              name="service_id"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(val) =>
                    field.onChange(val ? Number(val) : undefined)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {services && services.length > 0 ? (
                      services.map((service) => (
                        <SelectItem
                          key={service.id}
                          value={service.id.toString()}
                        >
                          {service.name} - {formatMoney(service.price)}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="__none__">
                        No hay servicios
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.service_id && (
            <ErrorMessage message={errors.service_id.message!} />
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Estado *</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in_progress">En progreso</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      <DialogFormFooter isPending={washingMutation.isPending} />
    </form>
  );
};
