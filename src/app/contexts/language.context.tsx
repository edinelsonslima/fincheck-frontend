import { PropsWithChildren, createContext, useEffect } from "react";
import { enLocalStorage } from "../../types/enums/local-storage.enum";
import { useLocalStorage } from "../hooks/use-local-storage.hook";
import { DEFAULT_LANGUAGE, ILanguages } from "../i18n";

type IContextProps = [
  ILanguages,
  (value: ILanguages | ((val: ILanguages) => ILanguages)) => void
];

export const LanguageContext = createContext<IContextProps>([
  DEFAULT_LANGUAGE,
  () => {},
]);

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useLocalStorage(
    enLocalStorage.LANGUAGE,
    DEFAULT_LANGUAGE
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
