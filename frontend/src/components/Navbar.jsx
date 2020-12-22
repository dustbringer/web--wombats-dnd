import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import * as NavbarStyled from "./styled/NavbarStyled";
import { DivRowSpaceBetween } from "./styled/Divs";
import wombatIcon from "../img/flaticon-polar-bear.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  toolbar: {
    maxHeight: "100px",
    minHeight: "50px",
  },
  icon: {
    margin: "0 10px 0",
    maxHeight: "35px",
    maxWidth: "35px",
  }
}));

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-family: Lora;
  margin: 0 8px;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-family: Lora;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:hover,
  &:active {
    text-decoration: none;
  }
`;

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <AppBar position="static" elevation={1}>
        <Toolbar className={classes.toolbar}>
          <Container maxWidth="md" className={classes.container}>
            <TitleLink to="/"><DivRowSpaceBetween>
              <img src={wombatIcon} alt="Wombat icon" className={classes.icon}/>
              <Typography variant="h6" className={classes.title}>
                Wombat
              </Typography>
            </DivRowSpaceBetween></TitleLink>
            <NavbarStyled.Links>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/calender">Calender</NavLink>
              </li>
              <li>
                <NavLink to="/fish">Fish</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
            </NavbarStyled.Links>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
