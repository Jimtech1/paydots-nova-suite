import { createFileRoute } from "@tanstack/react-router";
import { useRole } from "@/components/dashboard/role-context";
import { CustomerOverview } from "@/components/dashboard/views/CustomerOverview";
import { MerchantOverview } from "@/components/dashboard/views/MerchantOverview";
import { AgentOverview } from "@/components/dashboard/views/AgentOverview";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const { role } = useRole();
  if (role === "merchant") return <MerchantOverview />;
  if (role === "agent") return <AgentOverview />;
  return <CustomerOverview />;
}
