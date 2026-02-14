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

export const description = "Total de lavados mensuales";

const chartData = [
  { month: "Enero", lavados: 186 },
  { month: "Febrero", lavados: 305 },
  { month: "Marzo", lavados: 237 },
  { month: "Abril", lavados: 73 },
  { month: "Mayo", lavados: 209 },
  { month: "Junio", lavados: 214 },
  { month: "July", lavados: 186 },
  { month: "August", lavados: 305 },
  { month: "September", lavados: 237 },
  { month: "October", lavados: 73 },
  { month: "November", lavados: 209 },
  { month: "December", lavados: 214 },
];

const chartConfig = {
  lavados: {
    label: "lavados",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const CardChartWashed = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total de lavados mensuales</CardTitle>
        <CardDescription>
          Mostrando el total de lavados por mes en el último semestre
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
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="lavados"
              type="linear"
              fill="var(--color-lavados)"
              fillOpacity={0.4}
              stroke="var(--color-lavados)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Tendencia al alza en un 5.2% este mes <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
