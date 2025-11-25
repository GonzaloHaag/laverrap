import { Search } from "@/components/shared";
import { NativeSelect, NativeSelectOption } from "@/components/ui";
import { SERVICES_CATEGORY } from "@/utils/const";


export const ServiceFilters = () => {
  return (
    <form className="w-full flex items-center gap-x-4">
      <Search placeholder="Buscar servicios" />
      <NativeSelect>
        <NativeSelectOption value="">Seleccionar tipo</NativeSelectOption>
        {SERVICES_CATEGORY.map((type) => (
          <NativeSelectOption key={type.id} value={type.value}>
            {type.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </form>
  );
};
