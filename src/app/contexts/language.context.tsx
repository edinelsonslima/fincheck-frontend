import { PropsWithChildren, createContext, useEffect, useMemo } from "react";
import { enLocalStorage } from "../../types/enums/local-storage.enum";
import { useLocalStorage } from "../hooks/use-local-storage.hook";
import { ILanguages, languageService } from "../services/language.service";

type IContextProps = [
  ILanguages,
  (value: ILanguages | ((val: ILanguages) => ILanguages)) => void
];

export const LanguageContext = createContext<IContextProps>([
  languageService.defaultLanguage(),
  () => {},
]);

export function LanguageProvider({ children }: PropsWithChildren) {
  const { defaultLanguage } = useMemo(() => languageService, []);
  const [language, setLanguage] = useLocalStorage(
    enLocalStorage.LANGUAGE,
    defaultLanguage()
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={[language, setLanguage]} key={language}>
      {children}
    </LanguageContext.Provider>
  );
}
