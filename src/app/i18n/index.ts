import { enLocalStorage } from "../../types/enums/local-storage.enum";

export const langs = {
  "pt-br": {
    term: (await import("./langs/pt-br.json")).default,
    currencyCode: "BRL",
  },
  "en-us": {
    term: (await import("./langs/en-us.json")).default,
    currencyCode: "USD",
  },
};

export type ILanguages = keyof typeof langs;
type ITerms = keyof (typeof langs)[ILanguages]["term"];

function getTranslatedTerm<T extends ILanguages>(lang: T, term: ITerms) {
  return langs[lang]["term"][term] || term;
}

function getLanguage(): ILanguages {
  const language = localStorage.getItem(enLocalStorage.LANGUAGE);
  return language ? JSON.parse(language) : DEFAULT_LANGUAGE;
}

export function t(term: ITerms) {
  return getTranslatedTerm(getLanguage(), term);
}

export function intlCurrency(value: number) {
  const language = getLanguage();

  return new Intl.NumberFormat(language, {
    style: "currency",
    currencyDisplay: "symbol",
    currency: langs[language].currencyCode,
  }).format(value);
}

export function intlMonths(
  format: "numeric" | "2-digit" | "long" | "short" | "narrow"
) {
  const intl = new Intl.DateTimeFormat(getLanguage(), { month: format });
  return [...Array(12).keys()].map((m) => intl.format(new Date(0, m)));
}

export const LANGUAGES = Object.keys(langs) as ILanguages[];
export const DEFAULT_LANGUAGE: ILanguages = "en-us";
