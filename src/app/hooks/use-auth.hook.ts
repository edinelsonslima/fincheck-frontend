import { AuthContext } from "@contexts/auth.context";
import { enKeys } from "@enums/requests-keys.enum";
import { IAuth } from "@interfaces/auth.interface";
import { authService } from "@services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthSignup(mutationOptions?: IAuth.Signup.MutationOptions) {
  return useMutation(enKeys.auth.signup, authService.signup, mutationOptions);
}

export function useAuthSignin(mutationOptions?: IAuth.Signin.MutationOptions) {
  return useMutation(enKeys.auth.signin, authService.signin, mutationOptions);
}
