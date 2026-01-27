import { CardChartIncome, CardChartWashed, CardRecentWashed, CardTopEmployees, SectionCards } from "./components";

export const HomePage = () => {
  return (
    <section className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-0">
        <h1 className="text-2xl font-semibold">DASHBOARD</h1>
        <span className="text-sm text-gray-500">
          Resumen general del negocio
        </span>
      </div>
      <SectionCards />
      <div className="grid md:grid-cols-2 gap-4">
        <CardChartIncome />
        <CardChartWashed />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
          <CardRecentWashed />
          <CardTopEmployees />
      </div>
    </section>
  );
};
