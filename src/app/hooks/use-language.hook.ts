import { LanguageContext } from "@contexts/language.context";
import { useContext } from "react";

export function useLanguage() {
  return useContext(LanguageContext);
}
