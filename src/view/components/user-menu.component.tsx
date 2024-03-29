import { useAuth } from "@hooks/use-auth.hook";
import { IconChevronLeft } from "@icons/chevron-left.icon";
import { IconExit } from "@icons/exit.icon";
import { intlService } from "@services/intl.service";
import { useMemo } from "react";
import { DropdownMenu } from "./dropdown-menu.component";
import { SelectLanguageRadioGroup } from "./select-language.component";

const { t } = intlService;

export function UserMenu() {
  const { signout, user } = useAuth();

  const initialsUserName = useMemo(() => {
    const [firstName, lastName] = user?.name.split(" ") ?? [];

    if (lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }

    return firstName?.slice(0, 2).toUpperCase();
  }, [user?.name]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="grid place-items-center w-12 h-12 rounded-full bg-teal-50 text-small text-teal-900 font-medium tracking-tighter">
        {initialsUserName}
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="mr-5 mt-2 w-32">
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger className="flex items-center justify-between">
            {t("language")}
            <IconChevronLeft className="w-4 h-4" />
          </DropdownMenu.SubTrigger>

          <DropdownMenu.SubContent>
            <SelectLanguageRadioGroup />
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Item
          onSelect={() => signout()}
          className="flex items-center justify-between"
        >
          Sair
          <IconExit className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
