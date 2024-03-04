import { AuthLayout } from "@layouts/auth.layout";
import { Dashboard } from "@pages/dashboard";
import { Login } from "@pages/login";
import { Register } from "@pages/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthGuard } from "./auth-guard.router";

export function Router() {
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
