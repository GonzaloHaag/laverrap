import { Button } from "../ui/button";
import { CheckIcon, XIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  STATUS_COLORS,
  STATUS_LABELS
} from "@/lib/consts";
import type { Washing } from "@/types/washing";
import { formatMoney } from "@/lib/utils";

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
        washes.map((wash) => (
          <tr
            key={wash.id}
            className="odd:bg-white even:bg-gray-50 border-gray-200"
          >
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {wash.clients.name}
            </th>
            <td className="px-6 py-2">{wash.services.name}</td>
            <td className="px-6 py-2">{formatMoney(wash.services.price)}</td>
            <td className="px-6 py-2">
              {new Date(wash.created_at).toLocaleDateString()}
            </td>
            <td className="px-6 py-2">
              <Badge className={STATUS_COLORS[wash.status]}>
                {STATUS_LABELS[wash.status]}
              </Badge>
            </td>
            <td className="px-6 py-2">
              <div className="flex items-center gap-x-2">
                <Button
                  type="button"
                  variant={"outline"}
                  size={"icon-sm"}
                  title="Completar"
                >
                  <CheckIcon className="text-green-700" />
                </Button>
                <Button
                  type="button"
                  variant={"outline"}
                  size={"icon-sm"}
                  title="Cancelar"
                >
                  <XIcon className="text-red-600" />
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
