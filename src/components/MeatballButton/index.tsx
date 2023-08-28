import styled from "styled-components";
import { useTodoContext } from "../../context";

interface IMeatballButtonProps {
  children: JSX.Element;
  index: number;
}

function MeatballButton({ children, index }: IMeatballButtonProps) {
  const todos = useTodoContext();

  const handleToggleMenu = () => {
    const updatedCheckTodos = todos.value.map((todo, idx) =>
      idx === index ? { ...todo, isOpen: !todo.isOpen } : todo
    );
    todos.setValue(updatedCheckTodos);
  };

  return (
    <Container>
      <Wrapper onClick={handleToggleMenu}>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
      </Wrapper>
      {todos.value[index].isOpen ? (
        <WrapperChildren $isOpen={todos.value[index].isOpen}>
          {children}
        </WrapperChildren>
      ) : (
        ""
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  gap: 3px;
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: black;
`;

const WrapperChildren = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  /* display: ${({ $isOpen }) => ($isOpen ? "block" : "none")}; */
  display: block;
  top: 30px;
  right: 0px;
  z-index: 999;
`;
export default MeatballButton;
