import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { AiOutlineShopping } from "react-icons/ai";
import logo from "../assets/rolexLogo.png";

// navbar displays pagelinks, searchbar and logo, it recieves state/props from the app
const Navbar = ({ noneFilteredItems, setFilteredItems }) => {
  const { userId } = useContext(CartContext);

  return (
    <Wrapper>
        <nav>
          <LeftColumn>
            <LinkItem to="/">
              {" "}
              <Logo src={logo} alt="Health watch" />{" "}
            </LinkItem>
            <LinkItem to="/">
              {" "}
              <li>Home</li>{" "}
            </LinkItem>
            <LinkItem to="About">
              {" "}
              <li>About</li>{" "}
            </LinkItem>
            <LinkItem to="Services">
              {" "}
              <li>Services</li>{" "}
            </LinkItem>
            <LinkItem to="Contact">
              {" "}
              <li>Contact</li>{" "}
            </LinkItem>
          </LeftColumn>

          <RightColumn>
            <SearchBar setFilteredItems={setFilteredItems} noneFilteredItems={noneFilteredItems} />
            <LinkItem to={`/cart/${userId}`}>
              {" "}
              <AiOutlineShopping size="35" margin-right="20px" />{" "}
            </LinkItem>
          </RightColumn>
        </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #023f05;
  height: 50px;
  width: 100%;
  z-index: 10;
  position: sticky;
  top: 0;

    nav {
      display: flex;
      justify-content: space-between;
      list-style: none;
    }
`;

const LinkItem = styled(NavLink)`
  text-decoration: none;
  color: white;
  padding-right: 20px;
  padding-left: 10px;

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

const Logo = styled.img`
  margin-left: 20px;
  width: 40px;
`;
// const CartLogo = styled.img`
//   width: 55px;
//   height: 50px;
//   cursor: pointer;
//   margin-right: 15px;
//   &:active {
//     transform: scale(0.8);
//   }
// `;

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  li {
    margin-right: 35px;
  }
`;
const LeftColumn = styled.div`
  display: flex;
  align-items: center;
`;

export default Navbar;
