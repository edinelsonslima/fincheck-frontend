import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApiError, OmitMKeyMFn } from ".";

export module IAuthSignup {
  export interface Params {
    name: string;
    email: string;
    password: string;
  }

  export interface Response {
    accessToken: string;
  }

  export interface Error extends AxiosError<IApiError, Params> {}

  export interface MutationOptions
    extends OmitMKeyMFn<UseMutationOptions<Response, Error, Params>> {}
}

export module IAuthSignin {
  export interface Params {
    email: string;
    password: string;
  }

  export interface Response {
    accessToken: string;
  }

  export interface Error extends AxiosError<IApiError, Params> {}

  export interface MutationOptions
    extends OmitMKeyMFn<UseMutationOptions<Response, Error, Params>> {}
}
