// "use client";

// import { createContext } from "react";
// import { ImageKeeperStore } from "./store";
// import { ReactNode, useContext } from "react";
// import { enableStaticRendering } from "mobx-react";

// let store: ImageKeeperStore;

// enableStaticRendering(typeof window === "undefined");

// function initializeStore(): ImageKeeperStore {
//   const _store = store ?? new ImageKeeperStore();

//   if (typeof window === "undefined") return _store;

//   if (!store) store = _store;

//   return _store;
// }

// const StoreContext = createContext<ImageKeeperStore>({} as ImageKeeperStore);

// export function useImageKeeperStore() {
//   return useContext(StoreContext);
// }

// export function ImageKeeperStoreProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const root = initializeStore();

//   return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
// }
