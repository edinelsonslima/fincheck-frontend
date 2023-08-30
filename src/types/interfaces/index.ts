export interface IApiError {
  error: string;
  message: string;
  statusCode: number;
}

export type OmitQKeyQFn<T> = Omit<T, "queryKey" | "queryFn">;
export type OmitMKeyMFn<T> = Omit<T, "mutationKey" | "mutationFn">;

export type * from "./component-props.interface";
export type * from "./auth.interface";
export type * from "./user.interface";
