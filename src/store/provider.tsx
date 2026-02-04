import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { dbIDBStorage } from "./db";
import { useAppUtilities } from "../hooks";
import type { ITodoFormState, ITodoItem, PropsProvider } from "./interface";

const {fnPromise,  generateGoogleCalendarUrl} = useAppUtilities();


export const useProvider = create<PropsProvider>()(
  persist(
    immer((set) => ({
      todoList: [],
      addTodo: (todo: ITodoFormState) =>{
        const { calendar, ...todoToSave } = todo;
       return fnPromise(

          set((state) => {       
            state.todoList.push( todoToSave  as ITodoItem);
          })
        ).then(() =>  calendar && window.open(generateGoogleCalendarUrl(todo), "_blank"))
      },
      setTodo: (todo: ITodoItem) =>
        set(({ todoList }) => {
          const item = todoList.find((i) => i.id === todo.id);
          if (item) {
            item.completed = !item.completed;
          }
        }),
      updateDataTodo: (todo: ITodoItem) =>
        set((state) => ({
          todoList: state.todoList.map((t: ITodoItem) =>
            t.id === todo.id ? todo : t,
          ),
        })),
      deleteTodo: (id: string) =>
        set(({ todoList }) => ({
          todoList: todoList.filter((t: ITodoItem) => t.id !== id),
        })),
    })),
    {
      name: "to-do-storage",
      //* Storage in localStorage for default, also without include the parameter.
      storage: createJSONStorage(() => dbIDBStorage),
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
