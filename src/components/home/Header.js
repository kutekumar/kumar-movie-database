import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

const Header = () => {
  return (
    <Logo>
      <Link to="/" style={{ textDecoration: "none" }}>
        <i
          className="far fa-play-circle"
          style={{ fontSize: 25, color: "#50b3d2", margin: "1rem" }}></i>
      </Link>
      Kumar's Movie Database
    </Logo>
  );
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
