import OrderOverview from "@/components/charts/order_overview";
import ResourceOverview from "@/components/charts/res_overview";
import YearlyOverview from "@/components/charts/yearly_overview";

export default function Dash() {
  return (
    <div className="page">
      <h2 className="page_title">
        Dashboard
      </h2>
      <div className="flex">
        <OrderOverview />
        <ResourceOverview />
      </div>
      <div>
        <YearlyOverview />
      </div>
    </div>
  );
}