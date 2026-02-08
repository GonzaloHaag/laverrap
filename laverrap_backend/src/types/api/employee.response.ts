export interface EmployeeResponse {
  employees: {
    name: string;
    phone: string | null;
    entry_time: string;
    departure_time: string;
    status: "ACTIVE" | "INACTIVE";
    id: number;
    _count: {
      washed: number;
    };
  }[];
  total: number;
  totalActive: number;
  totalInactive: number;
}
