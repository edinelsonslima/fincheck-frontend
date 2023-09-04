import { useEffect, useState } from "react";

export function useWindowSize() {
  const [{ height, width }, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return [
    {
      width,
      sm: width <= 640,
      md: width <= 768,
      lg: width <= 1024,
      xl: width <= 1280,
      xxl: width <= 1536,
    },
    height,
  ] as const;
}
