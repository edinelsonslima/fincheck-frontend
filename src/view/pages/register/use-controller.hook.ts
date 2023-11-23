import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useAuth, useAuthSignup } from "../../../app/hooks/use-auth.hook";
import { intlService } from "../../../app/services/intl.service";
import { IAuth } from "../../../types/interfaces";

const { intlTerm } = intlService;

export const schema = z.object({
  name: z.string().nonempty(intlTerm("Name is required")),
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
  const { signin } = useAuth();
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
      const err = error as IAuth.Signup.Error;
      toast.error(
        intlTerm(err.response?.data.message || "Something went wrong")
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
