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
import type { Client } from "@/types/client";
import { useClientMutation } from "@/hooks/mutations";
import { CircleQuestionMarkIcon, PhoneIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
interface FormClientProps extends FormProps {
  client: Client | null;
}
export const FormClient = ({
  userId,
  toggleModal,
  client,
}: FormClientProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: valibotResolver(ClientSchema),
    mode: "onSubmit",
    defaultValues: {
      user_id: userId,
      name: client?.name || "",
      phone: client?.phone || "",
      description: client?.description || "",
      vehicle_type: client?.vehicle_type || "car",
      model_brand: client?.model_brand || "",
      patent: client?.patent || "",
      status: client?.status || "active",
    },
  });
  const clientMutation = useClientMutation({
    toggleModal,
  });
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    clientMutation.mutate({
      clientData: data,
      clientId: client ? client.id : null,
    });
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
      <div className="grid gap-2">
        <Label htmlFor="whatsapp" className="flex items-center gap-x-2">
          WhatsApp
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleQuestionMarkIcon
                size={18}
                className="text-muted-foreground"
              />
            </TooltipTrigger>
            <TooltipContent className="max-w-72">
              <p>
                Si no colocas un teléfono, no se podrá notificar al cliente
                cuando finalice su lavado.
              </p>
            </TooltipContent>
          </Tooltip>
        </Label>
        <div className="relative">
          <PhoneIcon size={16} className="absolute top-0 bottom-0 my-auto mx-0 text-muted-foreground left-2" />
           <Input
          type="tel"
          placeholder="WhatsApp del cliente"
          {...register("phone")}
          className="pl-8"
        />
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
