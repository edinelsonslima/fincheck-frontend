import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../app/hooks/use-auth.hook";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuthContext();

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
