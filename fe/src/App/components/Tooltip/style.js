import styled from "styled-components";


export const Container = styled.div`
  position: absolute;
  border: 1px solid #333;
  width: 40px;
  height: 40px;
  border-radius: 4px;

  ${(props) => props.direction === "right" &&`
    right: -50px;
    top: 50%;
    transform: translateY(-50%);
  `}

  ${(props) => props.direction === "left" &&`
    left: -50px;
    top: 50%;
    transform: translateY(-50%);
  `}
  ${(props) => props.direction === "top" &&`
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
  `}

  ${(props) => props.direction === "bottom" && `
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
  `}
`;