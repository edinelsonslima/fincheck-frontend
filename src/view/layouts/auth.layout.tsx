import { Outlet } from "react-router-dom";
import { intlService } from "../../app/services/intl.service";
import { IconLogo } from "../../assets/icons/logo.icon";
import ImageIllustration from "../../assets/images/illustration.image.png";
import { SelectLanguage } from "../components/select-language.component";

export function AuthLayout() {
  return (
    <>
      <SelectLanguage className="fixed right-2 top-2 mr-4 mt-1" />

      <div className="container mx-auto flex h-full max-h-[60rem]">
        <section className="flex-1 flex flex-col justify-center items-center gap-16">
          <IconLogo className="text-gray-500 h-6" />

          <main className="w-full max-w-[31.5rem] px-8">
            <Outlet />
          </main>
        </section>

        <section className="flex-1 hidden lg:block rounded-[2rem] overflow-hidden my-8 mr-8 relative">
          <img
            src={ImageIllustration}
            alt="illustration app dashboard"
            className="select-none h-full w-full"
          />

          <footer className="bg-white p-10 absolute bottom-0 grid">
            <IconLogo className="text-teal-900 h-8" />
            <p className="text-gray-700 text-xl font-medium mt-6">
              {intlService.intlTerm(
                "Manage your personal finances in a simple way with fincheck, and best of all, it's completely free!"
              )}
            </p>
          </footer>
        </section>
      </div>
    </>
  );
}
