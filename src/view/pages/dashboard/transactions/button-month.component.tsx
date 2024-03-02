import { useSwiper } from "swiper/react";

interface IButtonMonthProps {
  isActive: boolean;
  month: { month: string; index: number };
}

export function ButtonMonth({
  isActive,
  month: { index, month },
}: IButtonMonthProps) {
  const swiper = useSwiper();

  return (
    <button
      data-active={isActive}
      onClick={() => swiper.slideTo(index)}
      className="w-full h-12 rounded-full text-sm tracking-tighter font-medium text-gray-800 select-none data-[active='true']:bg-white"
    >
      {month}
    </button>
  );
}
