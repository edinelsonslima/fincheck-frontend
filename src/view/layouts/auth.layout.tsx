import { Outlet } from "react-router-dom";

import { IconLogo } from "../../assets/icons/logo.icon";

import ImageIllustration from "../../assets/images/illustration.image.png";

export function AuthLayout() {
  return (
    <div className="container mx-auto flex h-full max-h-[960px]">
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-16">
        <IconLogo className="text-gray-500 h-6" />

        <main className="w-full max-w-[504px] px-8">
          <Outlet />
        </main>
      </section>

      <section className="hidden lg:block rounded-[32px] overflow-hidden my-8 mr-8 relative">
        <img
          src={ImageIllustration}
          alt="illustration app dashboard"
          className="select-none h-full w-full"
        />

        <footer className="bg-white p-10 absolute bottom-0 grid">
          <IconLogo className="text-teal-900 h-8" />
          <p className="text-gray-700 text-xl font-medium mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </footer>
      </section>
    </div>
  );
}
