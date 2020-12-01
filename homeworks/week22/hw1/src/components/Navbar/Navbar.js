import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarWrapper = styled.div`
  width: 108px;
  position: fixed;
  left: 0;
  top: 72px;
  bottom: 0;
`;
const NavList = styled.div`
  padding: 36px 12px 0;
`;
const Nav = styled(Link)`
  font-size: 14px;
  color: #6c6c6c;
  cursor: pointer;
  text-decoration: none;
`;
const Navbar = () => {
  return (
    <NavbarWrapper>
      <NavList>
        <Nav to="#">我是還沒做好的分類功能</Nav>
      </NavList>
    </NavbarWrapper>
  );
};

export default Navbar;
