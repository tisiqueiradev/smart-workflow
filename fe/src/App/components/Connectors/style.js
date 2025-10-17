import styled from 'styled-components';

export const PointConnectors = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${(props) => (props.type === "input" ? "#4e9af1" : "#0d0d0dff")};
  border: 2px solid #333;
  cursor: pointer;

  /* Positioning based on direction */
  ${(props) => props.direction === "left" && `
    left: -4.5px;
    top: 50%;
    transform: translateY(-50%);
  `}
  ${(props) => props.direction === "right" && `
    right: -4.5px;
    top: 50%;
    transform: translateY(-50%);
  `}
  ${(props) => props.direction === "top" && `
    top: -4.5px;
    left: 50%;
    transform: translateX(-50%);
  `}
  ${(props) => props.direction === "bottom" && `
    bottom: -4.5px;
    left: 50%;
    transform: translateX(-50%);
  `}

  &:hover {
    background: ${(props) => (props.contextType === "input" ? "#337fdd" : "#46c06b")};
  }
`;

