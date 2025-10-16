import { useEffect, useState, useRef } from "react";
import { ZoomBackground, ZoomContent } from "./style";

export default function Background({ children }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  //ZOOM
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 2.5));
    };

    const container = containerRef.current;
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // PAN
  useEffect(() => {
    const container = containerRef.current;

    const handleMouseDown = (e) => {
      setIsPanning(true);
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isPanning) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      setPosition((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => setIsPanning(false);

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isPanning]);

  return (
    <ZoomBackground ref={containerRef}>
      <ZoomContent
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          cursor: isPanning ? "grabbing" : "grab",
        }}
      >
        {children}
      </ZoomContent>
    </ZoomBackground>
  );
}

