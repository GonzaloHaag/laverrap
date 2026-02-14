import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "Ingresos mensuales";

const chartData = [
  { month: "Enero", ingresos: 186 },
  { month: "Febrero", ingresos: 305 },
  { month: "Marzo", ingresos: 237 },
  { month: "Abril", ingresos: 73 },
  { month: "Mayo", ingresos: 209 },
  { month: "Junio", ingresos: 214 },
  { month: "July", ingresos: 186 },
  { month: "August", ingresos: 305 },
  { month: "September", ingresos: 237 },
  { month: "October", ingresos: 73 },
  { month: "November", ingresos: 209 },
  { month: "December", ingresos: 214 },
];

const chartConfig = {
  ingresos: {
    label: "ingresos",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const CardChartIncome = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingresos mensuales</CardTitle>
        <CardDescription>
          Mostrando ingresos totales por mes en el último semestre
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="ingresos"
              type="natural"
              fill="var(--color-ingresos)"
              fillOpacity={0.4}
              stroke="var(--color-ingresos)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Tendencia al alza en un 5.2% este mes{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
