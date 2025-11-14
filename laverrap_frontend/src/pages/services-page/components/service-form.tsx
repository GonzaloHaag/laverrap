import { DialogFooterForm, InputForm } from "@/components/shared";
import {
  Button,
  Label,
  NativeSelect,
  NativeSelectOption,
  Textarea,
} from "@/components/ui";
import { serviceSchema } from "@/schemas";
import { SERVICE_STATUS, SERVICE_TYPE } from "@/utils/const";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const ServiceForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(serviceSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      price: undefined,
      duration: undefined,
      category: "basic",
      status: "active",
      description: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4 w-full">
      <InputForm
        label="Nombre del servicio"
        placeholder="Ej: Lavado completo"
        type="text"
        {...register("name")}
      />
      <div className="grid grid-cols-2 gap-4 items-center">
        <InputForm
          label="Precio"
          placeholder="Ej: 25.00"
          type="number"
          {...register("price")}
        />
        <div className="flex flex-col gap-y-1 w-full">
          <Label
            htmlFor="duration"
          >
            Categoría
          </Label>
          <NativeSelect {...register("category")} className="w-full">
            {SERVICE_TYPE.map((type) => (
              <NativeSelectOption key={type.id} value={type.value}>
                {type.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center">
        <InputForm
          label="Duración (minutos)"
          placeholder="Ej: 30"
          type="number"
          {...register("duration")}
        />
        <div className="flex flex-col gap-y-1 w-full">
          <Label
            htmlFor="duration"
          >
            Estado
          </Label>
          <NativeSelect {...register("status")} className="w-full">
            {SERVICE_STATUS.map((status) => (
              <NativeSelectOption key={status.id} value={status.value}>
                {status.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <Label
          htmlFor="description"
        >
          Descripción
        </Label>
        <Textarea
          placeholder="Agrega una descripción del servicio"
          {...register("description")}
        />
      </div>
      <DialogFooterForm title="Crear servicio" isLoading={false} />
    </form>
  );
};
