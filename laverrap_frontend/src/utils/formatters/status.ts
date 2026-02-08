const STATUS_LABELS: Record<"ACTIVE" | "INACTIVE", string> = {
  ACTIVE: "Activo",
  INACTIVE: "Inactivo",
};

export function formatStatus(status: "ACTIVE" | "INACTIVE") {
  return STATUS_LABELS[status] ?? "Desconocido";
}
