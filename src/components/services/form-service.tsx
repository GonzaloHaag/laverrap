import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { SERVICES_CATEGORIES } from "@/lib/consts";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { DialogFormFooter, ErrorMessage } from "@/components";
import { ServiceSchema } from "@/schemas/service-schema";
export const FormService = () => {

  const { register, formState:{ errors }, control, handleSubmit} = useForm({
    resolver: valibotResolver(ServiceSchema),
    mode:"onSubmit",
    defaultValues: {
      name:"",
      description: "",
      category: "basic",
      status: "active",
      price: "",
      duration: "",
    }
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  })

  console.log(errors);
  return (
   <form onSubmit={onSubmit} className="grid gap-4">
            <div className="space-y-0">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nombre del servicio *</Label>
                    <Input
                        id="name"
                        {...register('name')}
                        placeholder="Ej: Servicio completo" />
                </div>
                {errors.name && <ErrorMessage message={errors.name.message!} />}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Descripción del servicio</Label>
                <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Ej: Incluye aspirado"
                    className="max-h-40" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="category">Categoría *</Label>
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                       {
                                        SERVICES_CATEGORIES.map((category) => (
                                          <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                                        ))
                                       }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="status">Estado *</Label>
                    <Controller
                        name="status"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select defaultValue="active" value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="active">Activo</SelectItem>
                                        <SelectItem value="inactive">Inactivo</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 items-start">
                <div className="space-y-0">
                    <div className="grid gap-2">
                        <Label htmlFor="price">Precio (ARS) *</Label>
                        <Input
                            id="price"
                            type="number"
                            inputMode="numeric"
                            {...register('price')}
                            placeholder="Ej: 25000" />
                    </div>
                    {errors.price && <ErrorMessage message={errors.price.message!} />}
                </div>
                <div className="space-y-0">
                    <div className="grid gap-2">
                        <Label htmlFor="duration">Duración (en minutos) *</Label>
                        <Input
                            id="duration"
                            {...register('duration')}
                            type="number"
                            inputMode="numeric"
                            placeholder="Ej: 30" />
                    </div>
                    {errors.duration && <ErrorMessage message={errors.duration.message!} />}
                </div>
            </div>
            <DialogFormFooter isPending={false} />
        </form>
  );
};
