import styled from "styled-components";
import Input from "../../components/input";

function Navigation() {
  return (
    <Container>
      <Input />
    </Container>
  );
}

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 70px;
`;

export default Navigation;
