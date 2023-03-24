import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "../assets/rolexLogo.png";

//component for page footer 
const Footer = () => {
  return (
    <Wrapper>
      <LeftColumn>
      <LinkItem to="/"> <Logo src={logo} alt="watch-logo" /></LinkItem>
      </LeftColumn>
      {/* to bring user to top of page */}
      <li onClick={() => window.scrollTo(0, 0)}>Scroll to top</li>
      <LinkItem to="About"> <li>About</li> </LinkItem>
    </Wrapper>
  );
};

const Wrapper = styled.div`
margin:0;
  background-color: #023f05;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  height: 50px;
  li{
    color: white;
    margin-left: 40px;
    margin-right: 40px;
    cursor: pointer;
  }
`;
const LeftColumn = styled.div`
`;

const Logo = styled.img`
margin-right: 40px;
  width: 40px;
`;

const LinkItem = styled(NavLink)`
  text-decoration: none;
  color: white;
margin-left: 40px;


  &.active {
    li {
      color: darkgray;
    }
  }


  :hover {
    color: darkgray;
    transition: 0.3s ease-in-out;
  }
`;

export default Footer;
