import { createContext, useContext } from "react";
import { TodoState } from "../types/todos";

export const TodoContext = createContext<TodoState>({
  value: [],
  setValue: () => {},
});
export const useTodoContext = () => useContext(TodoContext);

export const SetTodoListContext = createContext(() => {});
export const useSetTodoListContext = () => useContext(SetTodoListContext);
