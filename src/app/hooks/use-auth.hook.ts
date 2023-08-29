import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../contexts/auth.context";
import { authService } from "../services/auth.service";
import { IAuthSignin, IAuthSignup } from "../../types";

export function useAuthContext() {
  return useContext(AuthContext);
}

export function useAuthSignup(mutationOptions?: IAuthSignup.MutationOptions) {
  return useMutation({
    ...mutationOptions,
    mutationKey: ["signup"],
    mutationFn: (data) => authService.signup(data),
  });
}

export function useAuthSignin(mutationOptions?: IAuthSignin.MutationOptions) {
  return useMutation({
    ...mutationOptions,
    mutationKey: ["signin"],
    mutationFn: (data) => authService.signin(data),
  });
}

export type { IAuthSignin, IAuthSignup };
