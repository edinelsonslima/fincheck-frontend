import { enLocalStorage } from "../../types/enums/local-storage.enum";
import { langs } from "../i18n";

export type ILanguages = keyof typeof langs;
type ITerms = keyof (typeof langs)[ILanguages]["term"];

class IntlService {
  constructor() {
    this.intlTerm = this.intlTerm.bind(this);
    this.intlDate = this.intlDate.bind(this);
    this.intlMonths = this.intlMonths.bind(this);
    this.intlCurrency = this.intlCurrency.bind(this);
  }

  public defaultLanguage(): ILanguages {
    return "en-us";
  }

  public languages() {
    return Object.keys(langs) as ILanguages[];
  }

  public intlTerm(term: ITerms) {
    return this.getTranslatedTerm(this.getLocalStorageLanguage(), term);
  }

  public intlCurrency(value: number) {
    const language = this.getLocalStorageLanguage();

    return new Intl.NumberFormat(language, {
      style: "currency",
      currencyDisplay: "symbol",
      currency: langs[language].currencyCode,
    }).format(value);
  }

  public intlMonths(
    format: "numeric" | "2-digit" | "long" | "short" | "narrow"
  ) {
    const intl = new Intl.DateTimeFormat(this.getLocalStorageLanguage(), {
      month: format,
    });
    return [...Array(12).keys()].map((m) => intl.format(new Date(0, m)));
  }

  public intlDate(date: string | number | Date) {
    return new Intl.DateTimeFormat(this.getLocalStorageLanguage(), {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  }

  private getTranslatedTerm<T extends ILanguages>(lang: T, term: ITerms) {
    return langs[lang]["term"][term] || term;
  }

  private getLocalStorageLanguage(): ILanguages {
    const language = window.localStorage.getItem(enLocalStorage.LANGUAGE);
    return language ? JSON.parse(language) : this.defaultLanguage();
  }
}

export const intlService = new IntlService();
