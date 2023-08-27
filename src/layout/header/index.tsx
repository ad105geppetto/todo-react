import styled from "styled-components";

function Header() {
  return <Container></Container>;
}

const Container = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 70px;
  border: 1px solid yellow;
`;

export default Header;
