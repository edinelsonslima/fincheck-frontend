import { AccountCard } from "./account-card.component";
import { ButtonChevron } from "./button-chevron.component";

import { IconEye } from "../../../../../assets/icons/eye-icon";
import { intlCurrency, t } from "../../../../../app/i18n";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useController } from "./use-controller";

export function Accounts() {
  const { sliderState, setSliderState, handleSlidePerView } = useController();
  return (
    <>
      <header>
        <h2 className="text-white tracking-tighter block">
          {t("Total balance")}
        </h2>

        <div className="flex items-center gap-2">
          <strong className="text-2xl text-white tracking-tightest">
            {intlCurrency(598.23)}
          </strong>

          <button className="w-8 h-8 grid place-items-center">
            <IconEye open />
          </button>
        </div>
      </header>

      <section className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={handleSlidePerView}
            onSlideChange={({ isBeginning, isEnd }) =>
              setSliderState({ isBeginning, isEnd })
            }
          >
            <div
              slot="container-start"
              className="flex items-center justify-between mb-4"
            >
              <h3 className="text-white text-lg tracking-tighter font-bold">
                {t("My bills")}
              </h3>

              <div>
                <ButtonChevron
                  direction="slidePrev"
                  disabled={sliderState.isBeginning}
                />
                <ButtonChevron
                  direction="slideNext"
                  disabled={sliderState.isEnd}
                />
              </div>
            </div>

            <SwiperSlide>
              <AccountCard
                name="NuBank"
                type="CHECKING"
                color="#7950F2"
                balance={6598.23}
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                name="Itaú"
                type="CHECKING"
                color="#E53935"
                balance={815.23}
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                name="Inter"
                type="CHECKING"
                color="#FF6D00"
                balance={165.23}
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                name="XP Investimentos"
                type="INVESTMENT"
                color="#00C853"
                balance={753.23}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}
