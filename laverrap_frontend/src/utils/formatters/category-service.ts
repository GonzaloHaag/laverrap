import type { ServiceCategory } from "@/types";

const CATEGORY_SERVICE_LABELS: Record<ServiceCategory, string> = {
  BASIC: "Básico",
  COMPLETE: "Completo",
  PREMIUM: "Premium",
  OTHER: "Otro",
};

export function formatCategoryService(category: ServiceCategory) {
  return CATEGORY_SERVICE_LABELS[category] ?? "Sin categoría";
}
