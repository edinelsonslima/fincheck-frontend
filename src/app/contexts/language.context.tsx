import { PropsWithChildren, createContext, useEffect } from "react";
import { enLocalStorage } from "../../types/enums/local-storage.enum";
import { useLocalStorage } from "../hooks/use-local-storage.hook";
import { ILanguages, intlService } from "../services/intl.service";

type IContextProps = [
  ILanguages,
  (value: ILanguages | ((val: ILanguages) => ILanguages)) => void
];

export const LanguageContext = createContext<IContextProps>([
  intlService.defaultLanguage(),
  () => {},
]);

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useLocalStorage(
    enLocalStorage.LANGUAGE,
    intlService.defaultLanguage()
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
