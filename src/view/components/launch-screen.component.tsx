import { Transition } from "@headlessui/react";
import { Spinner } from "../../assets/animations/spinner.animation";
import { IconLogo } from "../../assets/icons/logo.icon";

interface LaunchScreenProps {
  loading: boolean;
}

export function LaunchScreen({ loading }: LaunchScreenProps) {
  return (
    <Transition
      show={loading}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="z-50 fixed h-screen w-screen grid place-items-center bg-teal-900"
    >
      <div className="flex flex-col items-center gap-4">
        <IconLogo className="h-10 text-white" />
        <Spinner className="text-teal-900 fill-white" />
      </div>
    </Transition>
  );
}
