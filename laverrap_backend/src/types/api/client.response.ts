export interface ClientResponse {
  clients: {
    name: string;
    email: string;
    car_type: "CAR" | "PICKUP" | "MOTORCYCLE" | "OTHER";
    car_model: string;
    car_plate: string;
    status: "ACTIVE" | "INACTIVE";
    id: number;
    _count: {
      washed: number;
    };
  }[];
  total: number;
  totalActive: number;
  totalInactive: number;
  totalNewsMonth: number;
}
