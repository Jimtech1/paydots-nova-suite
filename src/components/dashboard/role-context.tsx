import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "customer" | "merchant" | "agent";

type Ctx = {
  role: Role;
  setRole: (r: Role) => void;
};

const RoleContext = createContext<Ctx | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("customer");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("paydots-role")) as Role | null;
    if (stored === "customer" || stored === "merchant" || stored === "agent") {
      setRoleState(stored);
    }
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    if (typeof window !== "undefined") localStorage.setItem("paydots-role", r);
  };

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
