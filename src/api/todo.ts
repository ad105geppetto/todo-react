import { Todo, trimmedTodo } from "../types/todos";

export const getTodoList = (): Todo[] => {
  const localTodos = localStorage.getItem("todos");
  let todos: Todo[];

  if (localTodos?.length) {
    todos = JSON.parse(localTodos).map((todo: Todo) => ({
      ...todo,
      isUpdate: false,
    }));
  } else {
    todos = [];
  }

  return todos;
};

export const createTodo = (data: string): void => {
  const localTodos = localStorage.getItem("todos");
  let todos: trimmedTodo[];

  if (localTodos?.length) {
    todos = JSON.parse(localTodos);
  } else {
    todos = [];
  }

  localStorage.setItem(
    "todos",
    JSON.stringify([...todos, { title: data, checked: false }])
  );
};

export const updateTodo = (todo: trimmedTodo, index: number): void => {
  const localTodos = localStorage.getItem("todos") as string;
  const todos = JSON.parse(localTodos);

  todos[index] = todo;

  localStorage.setItem("todos", JSON.stringify(todos));
};

export const deleteTodo = (index: number): void => {
  const localTodos = localStorage.getItem("todos") as string;
  const todos = JSON.parse(localTodos);

  todos.splice(index, 1);

  localStorage.setItem("todos", JSON.stringify(todos));
};

export const swapTodos = (fromIndex: number, toIndex: number): void => {
  const localTodos = localStorage.getItem("todos") as string;
  const todos = JSON.parse(localTodos);

  const temp = todos[toIndex];
  todos[toIndex] = todos[fromIndex];
  todos[fromIndex] = temp;

  localStorage.setItem("todos", JSON.stringify(todos));
};
