import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartData = [
  { category: "Básico", quantity: 186 },
  { category: "Completo", quantity: 305 },
  { category: "Premium", quantity: 237 },
  { category: "Todos", quantity: 73 }
];

const chartConfig = {
  quantity: {
    label: "Cantidad",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const WashTypesChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lavados mensuales</CardTitle>
        <CardDescription>Distribución por tipos de lavado</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey="quantity"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="quantity" fill="var(--color-quantity)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
