import { Dispatch } from "react";

export interface Todo {
  title: string;
  checked: boolean;
  isUpdate: boolean;
  isOpen: boolean;
}

export interface trimmedTodo {
  title: string;
  checked: boolean;
}

export interface TodoState {
  value: Todo[];
  setValue: Dispatch<React.SetStateAction<Todo[]>>;
}
