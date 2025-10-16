import styled from 'styled-components';

export const ZoomBackground = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: #fff;
  
  background-color: ${({ bgColor }) => bgColor || '#ffffff'};
  background-image: radial-gradient(
    ${({ dotColor }) => dotColor || '#ddd'} 1px,
    transparent 1px
  );
  background-size: ${({ gap }) => gap || 24}px ${({ gap }) => gap || 24}px;
  background-position: ${({ offsetX, offsetY }) =>
    `${offsetX || 0}px ${offsetY || 0}px`};
`;

export const ZoomContent = styled.div`
  transform-origin: center center;
  transition: transform 0.1s ease-out;
  will-change: auto;
`;

