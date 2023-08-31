import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "../view/pages/login";
import { Register } from "../view/pages/register";
import { Dashboard } from "../view/pages/dashboard";

import { AuthGuard } from "./auth-guard.router";
import { AuthLayout } from "../view/layouts/auth.layout";
import { enLocalStorage } from "../types/enums/local-storage.enum";
import { useObservable } from "../app/hooks/use-observable.hook";

export function Router() {
  useObservable(enLocalStorage.LANGUAGE);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
