import { Button } from "../../components/button.component";
import { Input } from "../../components/input.component";
import { FormLayout } from "../../layouts/form.layout";
import { useController } from "./use-controller.hook";

export function Register() {
  const { errors, handleSubmit, register, isLoading, intlTerm } =
    useController();

  return (
    <FormLayout
      title={intlTerm("Create an account")}
      subtitle={intlTerm("Already have an account?")}
      link={{ to: "/login", text: intlTerm("Sign in") }}
    >
      <form onSubmit={handleSubmit} className="mt-16 flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Nome"
          error={errors?.name?.message}
          {...register("name")}
        />
        <Input
          type="email"
          placeholder="E-mail"
          error={errors?.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          placeholder="Senha"
          error={errors?.password?.message}
          {...register("password")}
        />

        <Button type="submit" className="mt-6" loading={isLoading}>
          {intlTerm("Create account")}
        </Button>
      </form>
    </FormLayout>
  );
}
