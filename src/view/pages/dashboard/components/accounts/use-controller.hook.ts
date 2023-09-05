import { useMemo, useState } from "react";
import { useWindowSize } from "../../../../../app/hooks/use-window-size";
import { languageService } from "../../../../../app/services/language.service";
import { useDashboard } from "../../hook/use-dashboard.hook";

export function useController() {
  const { t } = useMemo(() => languageService, []);
  const [windowWidth] = useWindowSize();
  const { areValuesVisible, toggleValuesVisibility } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const slidesPerView = useMemo(() => {
    const isLess = (width: number) => windowWidth.width <= width;
    return isLess(500) ? 1.1 : windowWidth.md ? 2.1 : isLess(900) ? 1.1 : 2.1;
  }, [windowWidth.md, windowWidth.width]);

  return {
    t,
    sliderState,
    setSliderState,
    slidesPerView,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: true,
  };
}
