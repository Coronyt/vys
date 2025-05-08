import OrderOverview from "@/components/charts/order_overview";

export default function Dash() {
  return (
    <div className="page">
      <h2 className="page_title">
        Dashboard
      </h2>
      <OrderOverview />
    </div>
  );
}