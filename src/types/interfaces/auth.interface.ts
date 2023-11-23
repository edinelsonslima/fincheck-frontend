import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApiError, IOmitMKeyMFn } from ".";

export module IAuth {
  export module Signup {
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
      extends IOmitMKeyMFn<UseMutationOptions<Response, Error, Params>> {}
  }

  export module Signin {
    export interface Params {
      email: string;
      password: string;
    }

    export interface Response {
      accessToken: string;
    }

    export interface Error extends AxiosError<IApiError, Params> {}

    export interface MutationOptions
      extends IOmitMKeyMFn<UseMutationOptions<Response, Error, Params>> {}
  }
}
