import { STATUS_LABELS } from "@/lib/consts";
import { formatMoney } from "@/lib/utils";
import type { Service } from "@/types/service";
import { Button } from "../ui/button";
import { ButtonEditService } from "./button-edit-service";

interface TableBodyServicesProps {
  services: Service[];
  isLoading: boolean;
  isError: boolean;
  userId:string;
}
export const TableBodyServices = ({
  services,
  isLoading,
  isError,
  userId
}: TableBodyServicesProps) => {
  if (isLoading) {
    return (
      <tbody>
        <tr className="odd:bg-white even:bg-gray-50 border-gray-200">
          <td
            colSpan={6}
            className="px-6 py-4 text-center text-muted-foreground"
          >
            Cargando...
          </td>
        </tr>
      </tbody>
    );
  }
  if (isError) {
    return (
      <tbody>
        <tr className="odd:bg-white even:bg-gray-50 border-gray-200">
          <td colSpan={6} className="px-6 py-4 text-center text-red-600">
            Ocurrió un error
          </td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {services.length > 0 ? (
        services.map((service) => (
          <tr
            key={service.id}
            className="odd:bg-white even:bg-gray-50 border-gray-200"
          >
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {service.name}
            </th>
            <td className="px-6 py-2">{service.description}</td>
            <td className="px-6 py-4">{STATUS_LABELS[service.category]}</td>
            <td className="px-6 py-4">{formatMoney(service.price)}</td>
            <td className="px-6 py-4">{service.duration} min</td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-x-2">
                <ButtonEditService userId={userId} service={service} />
                <Button
                  type="button"
                  variant={"link"}
                  title="Desactivar"
                  className="p-0"
                >
                  Desactivar
                </Button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr className="odd:bg-white even:bg-gray-50 border-gray-200">
          <td
            colSpan={6}
            className="px-6 py-4 text-center text-muted-foreground"
          >
            No se encontraron resultados
          </td>
        </tr>
      )}
    </tbody>
  );
};
