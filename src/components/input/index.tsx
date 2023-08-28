import { ChangeEvent, KeyboardEvent, useState } from "react";
import { createTodo } from "../../api/todo";
import { styled } from "styled-components";
import { useTodoContext } from "../../context";

function Input() {
  const [title, setTitle] = useState("");
  const todos = useTodoContext();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmitTodo();
    }
  };

  const handleInputTodo = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmitTodo = () => {
    const todo = {
      title: title,
      isUpdate: false,
      checked: false,
      isOpen: false,
    };

    createTodo(title);
    todos.setValue((prev) => [...prev, todo]);
    setTitle("");
  };

  return (
    <div>
      <label htmlFor="title" hidden>
        todo list 입력창
      </label>
      <TitleInput
        value={title}
        onChange={handleInputTodo}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 작성해주세요."
      />
      <SubmitButton onClick={handleSubmitTodo}>추가하기</SubmitButton>
    </div>
  );
}

const TitleInput = styled.input`
  width: 220px;
  height: 40px;
  margin-right: 10px;
  padding-left: 20px;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 25px;
`;

const SubmitButton = styled.button`
  width: 80px;
  height: 40px;
  border: 1px solid #ffadcb;
  border-radius: 10px;
  background-color: #ffffff;
  color: #ffadcb;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ffadcb;
    color: #ffffff;
  }
`;

export default Input;
