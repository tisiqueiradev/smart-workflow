import styled from "styled-components";

const DotsBackground = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-color: ${({ bgColor }) => bgColor || '#ffffff'};
  background-image: radial-gradient(
    ${({ dotColor }) => dotColor || '#ddd'} 1px,
    transparent 1px
  );
  background-size: ${({ gap }) => gap || 24}px ${({ gap }) => gap || 24}px;
  background-position: ${({ offsetX, offsetY }) =>
    `${offsetX || 0}px ${offsetY || 0}px`};
  z-index: 0;
`;

export default function Background({
  gap = 24,
  dotColor = "#ccc",
  bgColor = "#fff",
}) {
  return <DotsBackground gap={gap} dotColor={dotColor} bgColor={bgColor} />;
}
