import { enLocalStorage } from "../../types/enums/local-storage.enum";
import { langs } from "../i18n";

export type ILanguages = keyof typeof langs;
type ITerms = keyof (typeof langs)[ILanguages]["term"];

class IntlService {
  constructor() {
    this.t = this.t.bind(this);
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

  public t(term: ITerms) {
    return this.getTranslatedTerm(this.getLocalStorageLanguage(), term);
  }

  public intlCurrency(value: number) {
    const language = this.getLocalStorageLanguage();

    const intl = new Intl.NumberFormat(language, {
      style: 'currency',
      currency: langs[language].currencyCode,
      currencyDisplay: 'narrowSymbol',
    });

    const initialReduce = {
      price: '',
      priceValue: '',
      currencySymbol: '',
      isLeftSymbol: false,
    };

    const callbackReduce = (
      acc: typeof initialReduce,
      part: Intl.NumberFormatPart,
      index: number
    ) => {
      acc.price += part.value;

      if (part.type === 'currency') {
        acc.currencySymbol = part.value;
        acc.isLeftSymbol = index === 0;
        return acc
      }

      acc.priceValue += part.value;

      return acc;
    };

    const { priceValue, currencySymbol, price, isLeftSymbol } = intl
      .formatToParts(value)
      .reduce(callbackReduce, initialReduce);

    return {
      isLeftSymbol,
      price: price.trim(),
      priceValue: priceValue.trim(),
      currencySymbol: currencySymbol.trim(),
    };
  }

  public intlMonths(
    format: "numeric" | "2-digit" | "long" | "short" | "narrow"
  ) {
    const intl = new Intl.DateTimeFormat(this.getLocalStorageLanguage(), {
      month: format,
    });
    return [...Array(12).keys()].map((m) => intl.format(new Date(0, m)));
  }

  public intlDate(date: Date = new Date()) {
    return new Intl.DateTimeFormat(this.getLocalStorageLanguage(), {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  }

  public getLocalStorageLanguage(): ILanguages {
    const language = window.localStorage.getItem(enLocalStorage.LANGUAGE);
    return language ? JSON.parse(language) : this.defaultLanguage();
  }

  private getTranslatedTerm<T extends ILanguages>(lang: T, term: ITerms) {
    return langs[lang]["term"][term] || term;
  }
}

export const intlService = new IntlService();
