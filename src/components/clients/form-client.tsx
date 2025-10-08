import { ClientSchema } from "@/schemas";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ErrorMessage } from "../error-message";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { VEHICLES_TYPES } from "@/lib/consts";
import { Textarea } from "../ui/textarea";
import { DialogFormFooter } from "../dialog-form-footer";
import type { FormProps } from "@/types/form";
import { useClientMutation } from "@/hooks/use-client-mutation";

export const FormClient = ({ userId, toggleModal }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: valibotResolver(ClientSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      description: "",
      vehicle_type: "car",
      model_brand: "",
      patent: "",
      status: "active",
    },
  });
  const clientMutation = useClientMutation({ toggleModal });
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    clientMutation.mutate({ client: { ...data, user_id: userId } });
  });
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="flex flex-col gap-y-1">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre *</Label>
          <Input
            id="name"
            {...register("name")}
            type="text"
            placeholder="Ej: Juan perez"
          />
        </div>
        {errors.name && <ErrorMessage message={errors.name.message!} />}
      </div>
      <div className="grid grid-cols-2 gap-4 items-start">
        <div className="flex flex-col gap-y-1">
          <div className="grid gap-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              {...register("email")}
              placeholder="Ej: juanperez@gmail.com"
            />
          </div>
          {errors.email && <ErrorMessage message={errors.email.message!} />}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" type="tel" {...register("phone")} />
        </div>
      </div>

      <div className="grid grid-cols-2 items-center gap-4">
        <div className="grid gap-2">
          <Label htmlFor="phone">Tipo de vehículo *</Label>
          <Controller
            name="vehicle_type"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {VEHICLES_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="model_brand">Modelo</Label>
          <Input
            id="model_brand"
            type="text"
            {...register("model_brand")}
            placeholder="Ej: Toyota"
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-1">
        <div className="grid gap-2">
          <Label htmlFor="patent">Patente *</Label>
          <Input
            id="patent"
            {...register("patent")}
            type="text"
            placeholder="Ej: ABC123"
          />
        </div>
        {errors.patent && <ErrorMessage message={errors.patent.message!} />}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Detalles adicionales del cliente"
          className="min-h-20 max-h-40"
        />
      </div>
      <DialogFormFooter isPending={clientMutation.isPending} />
    </form>
  );
};
