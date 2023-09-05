import { useLanguage } from "../../app/hooks/use-language.hook";
import { ILanguages, intlService } from "../../app/services/intl.service";
import { cn } from "../../app/utils/cn.utils";
import { SelectProps } from "../../types/interfaces";

interface IOnChangeLanguage extends React.ChangeEvent<HTMLSelectElement> {
  target: HTMLSelectElement & { value: ILanguages };
}

interface ISelectLanguageProps extends SelectProps {}

export function SelectLanguage({ className, ...props }: ISelectLanguageProps) {
  const [language, setLanguage] = useLanguage();

  return (
    <select
      {...props}
      value={language}
      onChange={(e: IOnChangeLanguage) => setLanguage(e.target.value)}
      className={cn(
        "rounded-lg px-2 py-1 bg-teal-50 text-sm cursor-pointer outline-none border border-teal-100 text-teal-900",
        className
      )}
    >
      {intlService.languages().map((lang) => (
        <option key={lang} label={lang} value={lang} />
      ))}
    </select>
  );
}
