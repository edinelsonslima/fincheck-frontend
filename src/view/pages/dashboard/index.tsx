import { IconLogo } from "../../../assets/icons/logo.icon";
import { UserMenu } from "../../components/user-menu.component";
import { Accounts } from "./components/accounts.component";
import { Transactions } from "./components/transactions.component";

export function Dashboard() {
  return (
    <div className=" w-full h-full p-4 md:p-8 md:pt-6 flex flex-col">
      <header className="h-12 flex items-center justify-between">
        <IconLogo className="h-6 text-teal-900" />
        <UserMenu />
      </header>

      <main className="flex flex-col md:flex-row gap-4 flex-1">
        <section className="bg-teal-900 flex-1 rounded-2xl px-4 py-8 md:p-10">
          <Accounts />
        </section>

        <section className="bg-gray-100 flex-1 rounded-2xl p-10">
          <Transactions />
        </section>
      </main>
    </div>
  );
}
