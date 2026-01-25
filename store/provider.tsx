import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { PropsProvider } from "./interface";

export const useProvider = create<PropsProvider>()(
  persist(
    immer((set, get) => ({
      todoList: [],
    })),
    {
      name: "to-do-storage",
      //* Storage in localStorage for default, also without include the parameter.
      // example:  storage: createJSONStorage(() => sessionStorage),
      //* For default 'persist' saves all objects and arrays
      partialize: (state) => ({
        todoList: state.todoList,
      }),
    },
  ),
);

// Selector for avoid rerender
export function useProviderSelector<T extends keyof PropsProvider>(
  ...keys: T[]
):
  | { [K in keyof PropsProvider]: PropsProvider[K] }
  | { [K in T]?: PropsProvider[K] } {
  if (keys.length === 0) {
    return useProvider(useShallow((state) => state));
  }

  const selectors: { [K in T]?: PropsProvider[K] } = {};

  keys.forEach((key) => {
    selectors[key] = useProvider(useShallow((state) => state[key]));
  });

  return selectors;
}
