import { useController } from "./login.controller";

import { FormLayout } from "../../layouts/form.layout";

import { Input } from "../../components/input.component";
import { Button } from "../../components/button.component";

export function Login() {
  const { handleSubmit, register, errors, isLoading } = useController();

  return (
    <FormLayout
      title="Entre em sua conta"
      subtitle="Novo por aqui?"
      link={{ to: "/register", text: "Crie uma conta" }}
    >
      <form onSubmit={handleSubmit} className="mt-16 flex flex-col gap-4">
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
          Entrar
        </Button>
      </form>
    </FormLayout>
  );
}
