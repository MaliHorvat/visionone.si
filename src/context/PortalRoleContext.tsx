"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type PortalRole = "admin" | "client";

type Ctx = {
  role: PortalRole;
  setRole: (r: PortalRole) => void;
};

const STORAGE_KEY = "vo-portal-role";

const PortalRoleContext = createContext<Ctx | null>(null);

export function PortalRoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<PortalRole>("admin");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "admin" || stored === "client") setRoleState(stored);
    } catch {
      /* brskalnik brez shrambe */
    }
  }, []);

  const setRole = useCallback((r: PortalRole) => {
    setRoleState(r);
    try {
      localStorage.setItem(STORAGE_KEY, r);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ role, setRole }), [role, setRole]);
  return <PortalRoleContext.Provider value={value}>{children}</PortalRoleContext.Provider>;
}

export function usePortalRole() {
  const v = useContext(PortalRoleContext);
  if (!v) throw new Error("usePortalRole outside PortalRoleProvider");
  return v;
}
