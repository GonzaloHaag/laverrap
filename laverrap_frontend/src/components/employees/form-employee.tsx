import { DialogFooterForm, InputForm } from "@/components/shared";
import { useEmployees } from "@/hooks";
import { employeeSchema, type Employee } from "@/schemas";
import { employeeService } from "@/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface Props {
  employee: Employee | null;
  closeDialog: () => void;
}
export const FormEmployee = ({ employee, closeDialog }: Props) => {
  const { mutate } = useEmployees();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      name: employee?.name ?? "",
      phone: employee?.phone ?? "",
      entry_time: employee?.entry_time ?? "",
      departure_time: employee?.departure_time ?? "",
      status: employee?.status ?? "ACTIVE",
    },
    mode: "onSubmit",
  });

  const onSubmit = handleSubmit(async (data) => {
      if (employee) {
        // Update employee logic here
        await employeeService.update({ id: employee.id, employee: data });
        toast.success("Empleado actualizado con éxito");
      } else {
        // Create employee logic here
        await employeeService.create({ employee: data });
        toast.success("Empleado creado con éxito");
      }
      mutate();
      closeDialog();
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
      <InputForm
        label="Nombre"
        type="text"
        placeholder="Nombre del empleado"
        {...register("name")}
        error={errors.name?.message}
      />
      <InputForm
        label="Teléfono"
        type="text"
        placeholder="Número de teléfono"
        {...register("phone")}
        error={errors.phone?.message}
      />
      <div className="grid grid-cols-2 gap-4">
        <InputForm
          label="Hora de entrada"
          type="time"
          placeholder="HH:MM"
          {...register("entry_time")}
          error={errors.entry_time?.message}
        />
        <InputForm
          label="Hora de salida"
          type="time"
          placeholder="HH:MM"
          {...register("departure_time")}
          error={errors.departure_time?.message}
        />
      </div>
      <DialogFooterForm
        title={employee ? "Actualizar empleado" : "Crear empleado"}
        isLoading={isSubmitting}
      />
    </form>
  );
};
