import { Badge } from "../ui/badge";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/consts";
import type { Washing } from "@/types/washing";
import { formatMoney } from "@/lib/utils";
import { ButtonFinishWashing } from "./button-finish-washing";
import { ButtonNotifyClient } from "./button-notify-client";
import { ButtonDeleteWashing } from "./button-delete-washing";

interface TableBodyWashesProps {
  washes: Washing[];
  isLoading: boolean;
  isError: boolean;
}
export const TableBodyWashes = ({
  washes,
  isLoading,
  isError,
}: TableBodyWashesProps) => {
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
      {washes.length > 0 ? (
        washes.map((washing) => (
          <tr
            key={washing.id}
            className="odd:bg-white even:bg-gray-50 border-gray-200"
          >
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {washing.clients.name}
            </th>
            <td className="px-6 py-2">{washing.services.name}</td>
            <td className="px-6 py-2">{formatMoney(washing.services.price)}</td>
            <td className="px-6 py-2">
              {new Date(washing.created_at).toLocaleDateString()}
            </td>
            <td className="px-6 py-2">
              <Badge className={STATUS_COLORS[washing.status]}>
                {STATUS_LABELS[washing.status]}
              </Badge>
            </td>
            <td className="px-6 py-2">
              <div className="flex items-center gap-x-2">
                <ButtonDeleteWashing washingId={washing.id} />
                <ButtonFinishWashing
                  washing={washing}
                  is_completed={washing.status === "completed"}
                />
                <ButtonNotifyClient washing={washing} />
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
