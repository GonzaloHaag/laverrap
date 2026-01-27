import { Search } from "@/components/shared";
import { NativeSelect, NativeSelectOption } from "@/components/ui";
import { SERVICES_CATEGORY } from "@/utils/consts";


export const ServiceFilters = () => {
  return (
    <form className="w-full flex items-center gap-x-4">
      <Search placeholder="Buscar servicios" />
      <NativeSelect>
        <NativeSelectOption value="">Seleccionar categoría</NativeSelectOption>
        {SERVICES_CATEGORY.map((type) => (
          <NativeSelectOption key={type.id} value={type.value}>
            {type.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </form>
  );
};
