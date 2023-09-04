import { useState } from "react";

export function useController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return { sliderState, setSliderState };
}
