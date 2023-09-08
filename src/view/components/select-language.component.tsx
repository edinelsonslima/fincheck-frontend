import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";
import { useLanguage } from "../../app/hooks/use-language.hook";
import { ILanguages, intlService } from "../../app/services/intl.service";
import { IconCheck } from "../../assets/icons/check.icon";
import { DropdownMenu } from "./dropdown-menu.component";

export function SelectLanguage() {
  const [language] = useLanguage();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="absolute right-4 top-4 rounded-lg px-2 py-1 bg-teal-50 text-sm cursor-pointer outline-none border border-teal-100 text-teal-900">
        {language}
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="mr-4 mt-2 bg-white text-gray-800 text-sm w-28 p-2 rounded-2xl shadow-[0_11px_20px_0_rgba(0,0,0,0.10)]">
        <SelectLanguageRadioGroup />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export function SelectLanguageRadioGroup() {
  const [language, setLanguage] = useLanguage();
  return (
    <RdxDropdownMenu.RadioGroup
      value={language}
      onValueChange={(lang) => setLanguage(lang as ILanguages)}
    >
      {intlService.languages().map((language) => (
        <RdxDropdownMenu.RadioItem
          value={language}
          key={language}
          className="flex items-center p-2 justify-end gap-2 rounded-lg data-[highlighted]:bg-gray-50 outline-none cursor-pointer"
        >
          <RdxDropdownMenu.ItemIndicator>
            <IconCheck />
          </RdxDropdownMenu.ItemIndicator>
          {language}
        </RdxDropdownMenu.RadioItem>
      ))}
    </RdxDropdownMenu.RadioGroup>
  );
}
