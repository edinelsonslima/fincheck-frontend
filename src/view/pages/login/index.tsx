import { Button } from "../../components/button.component";
import { Input } from "../../components/input.component";
import { FormLayout } from "../../layouts/form.layout";
import { useController } from "./use-controller.hook";

export function Login() {
  const { handleSubmit, register, errors, isLoading, intlTerm } =
    useController();

  return (
    <FormLayout
      title={intlTerm("Access your account")}
      subtitle={intlTerm("New here?")}
      link={{ to: "/register", text: intlTerm("Create an account") }}
    >
      <form onSubmit={handleSubmit} className="mt-16 flex flex-col gap-4">
        <Input
          type="email"
          placeholder={intlTerm("E-mail")}
          error={errors?.email?.message}
          {...register("email")}
        />

        <Input
          type="password"
          placeholder={intlTerm("Password")}
          error={errors?.password?.message}
          {...register("password")}
        />

        <Button type="submit" className="mt-6" loading={isLoading}>
          {intlTerm("Sign in")}
        </Button>
      </form>
    </FormLayout>
  );
}
