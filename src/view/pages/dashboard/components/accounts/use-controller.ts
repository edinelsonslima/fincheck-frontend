import { useMemo, useState } from "react";
import { useWindowSize } from "../../../../../app/hooks/use-window-size";

export function useController() {
  const [windowWidth] = useWindowSize();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const slidesPerView = useMemo(() => {
    const isLess = (width: number) => windowWidth.width <= width;
    return isLess(500) ? 1.1 : windowWidth.md ? 2.1 : isLess(900) ? 1.1 : 2.1;
  }, [windowWidth.md, windowWidth.width]);

  return { sliderState, setSliderState, slidesPerView };
}
