import { Swiper, SwiperSlide } from "swiper/react";
import { t } from "../../../../../app/i18n";
import { IconEye } from "../../../../../assets/icons/eye-icon";
import { ButtonChevron } from "../button-chevron.component";
import { Value } from "../value.component";
import { AccountCard } from "./account-card.component";
import { useController } from "./use-controller.hook";

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    slidesPerView,
    areValuesVisible,
    toggleValuesVisibility,
  } = useController();
  return (
    <>
      <header>
        <h2 className="text-white tracking-tighter block">
          {t("Total balance")}
        </h2>

        <div className="flex items-center gap-2">
          <Value
            value={598.23}
            visible={areValuesVisible}
            className="text-2xl text-white tracking-tightest font-medium"
          />

          <button
            className="w-8 h-8 grid place-items-center"
            onClick={() => toggleValuesVisibility()}
          >
            <IconEye open={areValuesVisible} />
          </button>
        </div>
      </header>

      <section className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={slidesPerView}
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
                  className="py-3 pl-2.5 pr-3.5 rounded-full text-white enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
                />
                <ButtonChevron
                  direction="slideNext"
                  disabled={sliderState.isEnd}
                  className="py-3 pl-2.5 pr-3.5 rounded-full text-white enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
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
