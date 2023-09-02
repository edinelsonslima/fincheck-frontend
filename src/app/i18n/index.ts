import { enLocalStorage } from "../../types/enums/local-storage.enum";

export const langs = {
  "pt-br": (await import("./langs/pt-br.json")).default,
  "en-us": (await import("./langs/en-us.json")).default,
};

export type ILanguages = keyof typeof langs;
export const LANGUAGES = Object.keys(langs) as (keyof typeof langs)[];
export const DEFAULT_LANGUAGE: keyof typeof langs = "en-us";

function getTranslatedTerm<T extends keyof typeof langs>(
  lang: T,
  term: keyof (typeof langs)[T]
) {
  return langs[lang][term] || term;
}

function getLanguage(): keyof typeof langs {
  const language = localStorage.getItem(enLocalStorage.LANGUAGE);
  return language ? JSON.parse(language) : DEFAULT_LANGUAGE;
}

export function t(term: keyof (typeof langs)[typeof DEFAULT_LANGUAGE]) {
  return getTranslatedTerm(getLanguage(), term);
}
