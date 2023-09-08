import "swiper/css";
import { IconLogo } from "../../../assets/icons/logo.icon";
import { UserMenu } from "../../components/user-menu.component";
import { Accounts } from "./components/accounts";
import { Fab } from "./components/fab-component";
import { Transactions } from "./components/transactions";
import { DashboardProvider } from "./contexts/dashboard.context";

export function Dashboard() {
  return (
    <DashboardProvider>
      <div className="w-full h-full p-4 md:p-8 md:pt-6 flex flex-col">
        <header className="h-12 flex items-center justify-between">
          <IconLogo className="h-6 text-teal-900" />
          <UserMenu />
        </header>

        <main className="mt-4 flex flex-col md:flex-row gap-4 flex-1 max-h-full">
          <section className="bg-teal-900 h-full flex flex-col rounded-2xl px-4 py-8 md:p-10 md:w-1/2">
            <Accounts />
          </section>

          <section className="bg-gray-100 h-full flex flex-col rounded-2xl p-10 md:w-1/2">
            <Transactions />
          </section>
        </main>

        <Fab />
      </div>
    </DashboardProvider>
  );
}
