import { create } from "zustand";
import { IShared } from "../types";

export const useSharedStore = create<IShared>((set) => ({
  showMenu: false,
  setShowMenu: (value: boolean) => set({ showMenu: value }),
  toggleShowMenu: () => set((state) => ({ showMenu: !state.showMenu })),
}));
