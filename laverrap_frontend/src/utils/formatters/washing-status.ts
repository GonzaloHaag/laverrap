const WASHING_STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};

export function formatWashingStatus(status: string) {
  return WASHING_STATUS_LABELS[status] ?? "Desconocido";
}
