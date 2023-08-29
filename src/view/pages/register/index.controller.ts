import { z } from "zod";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  IAuthSignup,
  useAuthContext,
  useAuthSignup,
} from "../../../app/hooks/use-auth.hook";

export const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
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
  const { signin } = useAuthContext();
  const { mutateAsync, isLoading } = useAuthSignup();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      return signin(accessToken);
    } catch (error) {
      const err = error as IAuthSignup.Error;
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
