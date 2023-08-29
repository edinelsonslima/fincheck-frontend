import { useController } from "./index.controller";

import { FormLayout } from "../../layouts/form.layout";

import { Button } from "../../components/button.component";
import { Input } from "../../components/input.component";

export function Register() {
  const { errors, handleSubmit, register, isLoading } = useController();

  return (
    <FormLayout
      title="Crie sua conta"
      subtitle="Já possui uma conta?"
      link={{ to: "/login", text: "Fazer login" }}
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
          Criar conta
        </Button>
      </form>
    </FormLayout>
  );
}
