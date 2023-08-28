import {
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { deleteTodo, swapTodos, updateTodo } from "../../api/todo";
import { useSetTodoListContext, useTodoContext } from "../../context";
import { styled } from "styled-components";
import MeatballButton from "../MeatballButton";

function TodoItem() {
  const [selectAll, setSelectAll] = useState(false);
  const setTodoList = useSetTodoListContext();
  const todos = useTodoContext();

  useEffect(() => {
    setTodoList();
  }, [setTodoList]);

  const handleSelectAll = () => {
    const updatedCheckTodos = todos.value.map((todo) => ({
      ...todo,
      checked: !selectAll,
    }));

    updatedCheckTodos.forEach((todo, index) => {
      const { isUpdate, ...trimmedTodo } = todo;
      updateTodo(trimmedTodo, index);
    });
    todos.setValue(updatedCheckTodos);
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedCheckTodos = todos.value.map((todo, idx) =>
      index === idx ? { ...todo, checked: !todo.checked } : todo
    );
    const { isUpdate, isOpen, ...trimmedTodo } = updatedCheckTodos[index];

    updateTodo(trimmedTodo, index);
    todos.setValue(updatedCheckTodos);
  };

  const handleKeyDownEditTodo = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      handleUpdateTodo(index)();
    }
  };

  const handleInputEditTodo = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    todos.setValue((prev) =>
      prev.map((todo, idx) =>
        idx !== index
          ? todo
          : {
              ...todo,
              title: event.target.value,
              isUpdate: true,
              checked: false,
            }
      )
    );
  };

  const handleEditTodo = (index: number) => () => {
    todos.setValue((prev) =>
      prev.map((todo, idx) =>
        idx !== index
          ? todo
          : {
              ...todo,
              isUpdate: !todo.isUpdate,
              checked: false,
            }
      )
    );
  };

  const handleCancleTodo = (index: number) => () => {
    todos.setValue((prev) =>
      prev.map((todo, idx) =>
        idx !== index
          ? todo
          : {
              ...todo,
              isUpdate: !todo.isUpdate,
              isOpen: !todo.isOpen,
            }
      )
    );
  };

  const handleUpdateTodo = (index: number) => () => {
    const { isUpdate, isOpen, ...trimmedTodo } = todos.value[index];

    updateTodo(trimmedTodo, index);

    todos.setValue((prev) =>
      prev.map((todo, idx) =>
        idx !== index
          ? todo
          : {
              title: todos.value[index].title,
              isUpdate: false,
              checked: false,
              isOpen: false,
            }
      )
    );
  };

  const handleRemoveTodo = (index: number) => () => {
    const userConfirmed = window.confirm("정말로 삭제하시겠습니까?");

    if (userConfirmed) {
      deleteTodo(index);
      todos.setValue((prev) => prev.filter((_, idx) => idx !== index));
    } else {
      todos.setValue((prev) =>
        prev.map((todo) => ({ ...todo, isOpen: false }))
      );
    }
  };

  const handleDragStart = (event: DragEvent<HTMLLIElement>, index: number) => {
    event.dataTransfer.setData("index", String(index));
  };

  const handleDragOver = (event: DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLLIElement>, index: number) => {
    const sourceIndex = Number(event.dataTransfer.getData("index"));
    const updatedItems = [...todos.value];
    const [movedItem] = updatedItems.splice(sourceIndex, 1);
    updatedItems.splice(index, 0, movedItem);

    swapTodos(sourceIndex, index);
    todos.setValue(updatedItems);
  };

  return (
    <Container>
      <TitleGroup>
        <input type="checkbox" onChange={handleSelectAll} />
        <h2>TODO</h2>
      </TitleGroup>
      {todos.value.map((todo, index) => (
        <Wrapper key={index}>
          <Checkbox
            id={index.toString()}
            type="checkbox"
            checked={todo.checked}
            onChange={() => handleCheckboxChange(index)}
          />
          <Todo
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
          >
            {todo.isUpdate ? (
              <EditInput
                value={todo.title}
                autoFocus={todo.isUpdate}
                onChange={(event) => handleInputEditTodo(event, index)}
                onKeyDown={(event) => handleKeyDownEditTodo(event, index)}
              />
            ) : (
              <Title $isChecked={todo.checked} htmlFor={index.toString()}>
                {todo.title}
              </Title>
            )}
          </Todo>
          <MeatballButton index={index}>
            <ButtonGroup>
              {todo.isUpdate ? (
                <ButtonGroup>
                  <Button onClick={handleUpdateTodo(index)}>완료</Button>
                  <Button onClick={handleCancleTodo(index)}>취소</Button>
                </ButtonGroup>
              ) : (
                <Button onClick={handleEditTodo(index)}>수정</Button>
              )}
              <Button onClick={handleRemoveTodo(index)}>삭제</Button>
            </ButtonGroup>
          </MeatballButton>
        </Wrapper>
      ))}
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Todo = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  height: 50px;
  overflow: hidden;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 10px 0;
  width: 300px;
  border-bottom: 1px solid black;
`;

const Title = styled.label<{ $isChecked: boolean }>`
  font-size: 16px;
  text-decoration: ${({ $isChecked }) => $isChecked && "line-through"};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 50px;
  padding: 1px 5px;
  border: 1px solid #ffadcb;
  background-color: #ffffff;
  color: #ffadcb;

  &:hover {
    background-color: #ffadcb;
    color: #ffffff;
  }
`;

const EditInput = styled.input`
  width: 200px;
  padding-left: 5px;
  background-color: #ffffff;
`;

export default TodoItem;
