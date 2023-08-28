import { useCallback, useState } from "react";
import { Todo } from "../types/todos";
import { getTodoList } from "../api/todo";
import { SetTodoListContext, TodoContext } from ".";

interface IAppProviderProps {
  children: JSX.Element;
}

export const GlobalProvider = ({ children }: IAppProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const data = {
    value: todos,
    setValue: setTodos,
  };

  const setTodoList = useCallback(() => setTodos(getTodoList()), [setTodos]);

  return (
    <>
      <TodoContext.Provider value={data}>
        <SetTodoListContext.Provider value={setTodoList}>
          {children}
        </SetTodoListContext.Provider>
      </TodoContext.Provider>
    </>
  );
};
