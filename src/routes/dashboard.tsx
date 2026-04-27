import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/dashboard")({
  component: () => <DashboardLayout />,
  head: () => ({
    meta: [
      { title: "Paydots — Dashboard" },
      { name: "description", content: "Multi-role dashboard for Paydots customers, merchants and agents." },
    ],
  }),
});

// Outlet is provided inside DashboardLayout
export { Outlet };
