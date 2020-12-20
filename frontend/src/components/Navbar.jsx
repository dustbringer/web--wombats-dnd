import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import * as NavbarStyled from "./styled/NavbarStyled";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  toolbar: {
    maxHeight: "100px",
    minHeight: "50px",
  },
}));

const LinkStyled = styled(Link)`
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

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <AppBar position="static" elevation={1}>
        <Toolbar className={classes.toolbar}>
          <Container maxWidth="md" className={classes.container}>
            <Typography variant="h6" className={classes.title}>
              Wombat
            </Typography>
            <NavbarStyled.Links>
              <li>
                <LinkStyled to="/">Home</LinkStyled>
              </li>
              <li>
                <LinkStyled to="/calender">Calender</LinkStyled>
              </li>
            </NavbarStyled.Links>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
