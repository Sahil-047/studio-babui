"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type Panel = "menu" | "search" | "bag" | null;

type PanelContextValue = {
  panel: Panel;
  open: (panel: Exclude<Panel, null>) => void;
  close: () => void;
};

const PanelContext = createContext<PanelContextValue | null>(null);

export function Providers({ children }: { children: ReactNode }) {
  const [panel, setPanel] = useState<Panel>(null);
  const open = useCallback((next: Exclude<Panel, null>) => setPanel(next), []);
  const close = useCallback(() => setPanel(null), []);
  const value = useMemo(() => ({ panel, open, close }), [panel, open, close]);
  return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>;
}

export function usePanel(): PanelContextValue {
  const ctx = useContext(PanelContext);
  if (!ctx) throw new Error("usePanel must be used inside <Providers>");
  return ctx;
}
