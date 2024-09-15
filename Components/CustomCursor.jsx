import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth <= 768); // Disable cursor for screens smaller than 768px (tablet/mobile)
    };

    window.addEventListener("resize", updateSize);
    updateSize(); // Initial check for the screen size

    const mouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const mouseEnter = () => setIsHovering(true);
    const mouseLeave = () => setIsHovering(false);

    if (!isMobile) {
      // Only add event listeners for non-mobile devices
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseenter", mouseEnter);
      document.addEventListener("mouseleave", mouseLeave);
    }

    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseenter", mouseEnter);
      document.removeEventListener("mouseleave", mouseLeave);
      window.removeEventListener("resize", updateSize);
    };
  }, [isMobile]);

  if (isMobile) return null; // Do not render the custom cursor on mobile devices

  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: `translate(-50%, -50%)`,
    transition: "transform 0.1s ease-in-out",
  };

  return (
    <div>
      <div
        className={`fixed 
          ${isMobile ? 'hidden' : 'w-8 h-8 md:w-12 md:h-12'} 
          border-2 border-orange-500 rounded-full pointer-events-none z-50 
          transition-all duration-300 
          ${isHovering ? "bg-orange-500 opacity-75" : "bg-transparent opacity-50"}`}
        style={cursorStyle}
      />
    </div>
  );
};

export default CustomCursor;
