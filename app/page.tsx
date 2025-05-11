import DashHeaders from "@/components/dash_headers";
import OrderOverview from "@/components/charts/order_overview";
import ResourceOverview from "@/components/charts/res_overview";
import YearlyOverview from "@/components/charts/yearly_overview";

export default function Dash() {
  return (
    <div className="page">
      <h2 className="page_title" data-testid="page_title">
        Dashboard
      </h2>
      <div className="border-1 p-4 rounded-3xl">
        <DashHeaders />
        <div className="pb-4">
          <div className="border-1 p-6 rounded-xl">
            <YearlyOverview />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="border-1 mr-2 rounded-xl">
            <OrderOverview />
          </div>
          <div className="border-1 ml-2 rounded-xl">
            <ResourceOverview />
          </div>
        </div>
      </div>
    </div>
  );
}