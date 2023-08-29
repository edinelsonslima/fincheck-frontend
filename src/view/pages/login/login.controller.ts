import { z } from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IAuthSignin, useAuthSignin } from "../../../app/hooks/use-auth.hook";

export const schema = z.object({
  email: z
    .string()
    .nonempty("E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres"),
});

export type IFormData = z.infer<typeof schema>;

export function useController() {
  const { mutateAsync, isLoading } = useAuthSignin();

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
      return console.log({ accessToken });
    } catch (error) {
      const err = error as IAuthSignin.Error;
      toast.error(err.response?.data.message || "Something went wrong");
    }
  });

  return {
    errors,
    register,
    isLoading,
    handleSubmit,
  };
}
