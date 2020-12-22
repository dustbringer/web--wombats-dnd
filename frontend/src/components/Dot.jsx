import React from "react";
import styled from "styled-components";

const NoColorDot = styled.div`
  display: inline-block;
  border-radius: 50%;
  width: 5px;
  height: 5px;
  margin: 3px;
  color: transparent;
`;

const Dot = ({ color = "#000000" }) => {
  let c = "";
  switch (color) {
    case "red":
      c = "#FA5305";
      break;
    case "blue":
      c = "#195EF7";
      break;
    case "yellow":
      c = "#FDE20A";
      break;
    case "purple":
      c = "#6C43DB";
      break;
    case "green":
      c = "#67E98F";
      break;
    default:
      c = color;
  }

  return <NoColorDot style={{ backgroundColor: c }}></NoColorDot>;
};

export default Dot;
