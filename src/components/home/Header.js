import React from "react";
import styled from "styled-components";

const Header = () => {
  return <Logo>Kumar's Movie Database</Logo>;
};

export default Header;

const Logo = styled.nav`
  width: 100%;
  font-family: "Pacifico", sans-serif;
  margin: auto;
  font-size: 26px;
  text-align: center;
  padding: 1rem 0 1rem 0;
  color: #50b3d2;
`;
