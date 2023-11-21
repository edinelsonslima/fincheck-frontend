import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import {
  IAuthSignin,
  useAuth,
  useAuthSignin,
} from "../../../app/hooks/use-auth.hook";
import { intlService } from "../../../app/services/intl.service";

const { intlTerm } = intlService;

export const schema = z.object({
  email: z
    .string()
    .nonempty(intlTerm("E-mail is required"))
    .email(intlTerm("Use a valid e-mail address")),
  password: z
    .string()
    .nonempty(intlTerm("Password is required"))
    .min(8, intlTerm("Password must be at least 8 characters long")),
});

export type IFormData = z.infer<typeof schema>;

export function useController() {
  const { mutateAsync, isLoading } = useAuthSignin();
  const { signin } = useAuth();

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
      toast.error(
        intlTerm(err?.response?.data?.message || "Something went wrong")
      );
    }
  });

  return {
    errors,
    register,
    isLoading,
    handleSubmit,
    intlTerm,
  };
}
