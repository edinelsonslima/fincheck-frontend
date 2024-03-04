import { Input } from "@components/input.component";
import { FormLayout } from "@layouts/form.layout";
import { useController } from "./use-controller.hook";
import { Button } from "@components/button.component";

export function Login() {
  const { handleSubmit, register, errors, isLoading, t } = useController();

  return (
    <FormLayout
      title={t("Access your account")}
      subtitle={t("New here?")}
      link={{ to: "/register", text: t("Create an account") }}
    >
      <form onSubmit={handleSubmit} className="mt-16 flex flex-col gap-4">
        <Input
          type="email"
          placeholder={t("E-mail")}
          error={errors?.email?.message}
          {...register("email")}
        />

        <Input
          type="password"
          placeholder={t("Password")}
          error={errors?.password?.message}
          {...register("password")}
        />

        <Button type="submit" className="mt-6" loading={isLoading}>
          {t("Sign in")}
        </Button>
      </form>
    </FormLayout>
  );
}
