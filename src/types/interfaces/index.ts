import { langs } from "app/i18n";

export interface IApiError {
  error: string;
  statusCode: number;
  message: keyof (typeof langs)["en-us"]["term"];
}

export type IOmitQKeyQFn<T> = Omit<T, "queryKey" | "queryFn">;
export type IOmitMKeyMFn<T> = Omit<T, "mutationKey" | "mutationFn">;

export type * from "./auth.interface";
export type * from "./component-props.interface";
export type * from "./user.interface";
