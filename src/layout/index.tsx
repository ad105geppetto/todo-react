import { styled } from "styled-components";
import Footer from "./footer";
import Header from "./header";
import Navigation from "./navigation";

interface ILayoutProps {
  children: JSX.Element;
}

function Layout(props: ILayoutProps) {
  return (
    <>
      <Header />
      <Navigation />
      <Body>{props.children}</Body>
      <Footer />
    </>
  );
}

const Body = styled.body`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 70px;
  border: 1px solid red;
`;

export default Layout;
