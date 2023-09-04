import { useMemo, useState } from "react";
import { useWindowSize } from "../../../../../app/hooks/use-window-size";

export function useController() {
  const [windowWidth] = useWindowSize();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const handleSlidePerView = useMemo(() => {
    const isLess = (width: number) => windowWidth <= width;
    return isLess(500) ? 1.1 : isLess(768) ? 2.1 : isLess(900) ? 1.1 : 2.1;
  }, [windowWidth]);

  return { sliderState, setSliderState, handleSlidePerView };
}
