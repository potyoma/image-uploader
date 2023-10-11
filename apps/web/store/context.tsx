"use client";

import { createContext } from "react";
import { ImageKeeperStore } from "./store";
import { ReactNode, useContext } from "react";

let store: ImageKeeperStore;
const StoreContext = createContext<ImageKeeperStore>({} as ImageKeeperStore);

export function useImageKeeperStore() {
  return useContext(StoreContext);
}

export function ImageKeeperStoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const root = store ?? new ImageKeeperStore();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
}
