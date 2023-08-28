import { styled } from "styled-components";
import { getDate } from "../../utility";

function CurrentDate() {
  return (
    <div>
      <DateTitle>{getDate()}</DateTitle>
    </div>
  );
}

const DateTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

export default CurrentDate;
