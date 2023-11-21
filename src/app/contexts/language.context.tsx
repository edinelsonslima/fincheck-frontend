import { PropsWithChildren, createContext, useEffect } from "react";
import { enLocalStorage } from "../../types/enums/local-storage.enum";
import { useLocalStorage } from "../hooks/use-local-storage.hook";
import { ILanguages, intlService } from "../services/intl.service";

type IContextProps = [
  ILanguages,
  (value: ILanguages | ((val: ILanguages) => ILanguages)) => void
];

const { defaultLanguage } = intlService;

export const LanguageContext = createContext<IContextProps>([
  defaultLanguage(),
  () => {},
]);

export function LanguageProvider({ children }: PropsWithChildren) {
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
