import styled from "styled-components";
import CurrentDate from "../../components/date";
import Weather from "../../components/weather";

function Header() {
  return (
    <Container>
      <Title>TODO-LIST</Title>
      <CurrentDate />
      <Weather />
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const Title = styled.h1`
  text-align: center;
  width: 300px;
  font-size: 50px;
`;

export default Header;
