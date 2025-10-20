// store/store.ts
"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GlobalState {
  theme: "light" | "dark";
  sidebarOpen: boolean;
  setTheme: (theme: "light" | "dark") => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        sidebarOpen: false,

        setTheme: (theme) => set({ theme }),
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      }),
      {
        name: "app-storage", // ключ для localStorage
      }
    )
  )
);
