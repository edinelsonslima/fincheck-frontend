import { ComponentProps, useEffect } from "react";
import { useLocalStorage } from "../../app/hooks/use-local-storage.hook";
import { DEFAULT_LANGUAGE, LANGUAGES, ILanguages } from "../../app/i18n";
import { enLocalStorage } from "../../types/enums/local-storage.enum";
import { cn } from "../../app/utils/cn.utils";

interface IOnChangeLanguage extends React.ChangeEvent<HTMLSelectElement> {
  target: HTMLSelectElement & { value: ILanguages };
}

interface ISelectLanguageProps
  extends Omit<ComponentProps<"select">, "children" | "value" | "onChange"> {}

export function SelectLanguage({ className, ...props }: ISelectLanguageProps) {
  const [language, setLanguage] = useLocalStorage(
    enLocalStorage.LANGUAGE,
    DEFAULT_LANGUAGE
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <select
      {...props}
      className={cn(
        "rounded-lg px-2 py-1 bg-teal-50 text-sm cursor-pointer outline-none border border-teal-100 text-teal-900",
        className
      )}
      onChange={(e: IOnChangeLanguage) => setLanguage(e.target.value)}
      value={language}
    >
      {LANGUAGES.map((lang) => (
        <option key={lang} label={lang} value={lang} />
      ))}
    </select>
  );
}
