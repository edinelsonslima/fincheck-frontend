import { z } from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { t } from "../../../app/i18n";

import {
  IAuthSignin,
  useAuthContext,
  useAuthSignin,
} from "../../../app/hooks/use-auth.hook";

export const schema = z.object({
  email: z
    .string()
    .nonempty(t("E-mail is required"))
    .email(t("Use a valid e-mail address")),
  password: z
    .string()
    .nonempty(t("Password is required"))
    .min(8, t("Password must be at least 8 characters long")),
});

export type IFormData = z.infer<typeof schema>;

export function useController() {
  const { mutateAsync, isLoading } = useAuthSignin();
  const { signin } = useAuthContext();

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<IFormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      return signin(accessToken);
    } catch (error) {
      const err = error as IAuthSignin.Error;
      toast.error(t(err?.response?.data?.message || "Something went wrong"));
    }
  });

  return {
    errors,
    register,
    isLoading,
    handleSubmit,
  };
}
