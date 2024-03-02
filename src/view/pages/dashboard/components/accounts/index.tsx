import { Swiper, SwiperSlide } from "swiper/react";
import { Spinner } from "../../../../../assets/animations/spinner.animation";
import { IconEye } from "../../../../../assets/icons/eye-icon";
import { IconPlus } from "../../../../../assets/icons/plus.icon";
import { ButtonChevron } from "../button-chevron.component";
import { Value } from "../value.component";
import { AccountCard } from "./account-card.component";
import { useController } from "./use-controller.hook";

export function Accounts() {
  const {
    t,
    sliderState,
    setSliderState,
    slidesPerView,
    areValuesVisible,
    toggleValuesVisibility,
    openNewAccountModal,
    isLoading,
    accounts,
    currentBalance,
  } = useController();

  if (isLoading) {
    return (
      <div className="h-full grid place-items-center">
        <Spinner className="text-teal-950/50 fill-white w-10 h-10" />
      </div>
    );
  }

  return (
    <>
      <header>
        <h2 className="text-white tracking-tighter block">
          {t("Total balance")}
        </h2>

        <div className="flex items-center gap-2">
          <Value
            value={currentBalance}
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
        {!accounts.length && (
          <>
            <h3 className="text-white text-lg tracking-tighter font-bold">
              {t("My bills")}
            </h3>

            <button
              onClick={openNewAccountModal}
              className="flex flex-col items-center justify-center gap-4 mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 text-white"
            >
              <div className="grid place-items-center w-11 h-11 rounded-full border-2 border-dashed border-teal-white">
                <IconPlus className="w-6 h-6" />
              </div>
              <span className="font-medium tracking-tighter block w-32 text-center">
                {t("Register a new account")}
              </span>
            </button>
          </>
        )}

        {!!accounts.length && (
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

              {accounts.map((account) => (
                <SwiperSlide key={account.id}>
                  <AccountCard data={account} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </section>
    </>
  );
}
