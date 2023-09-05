import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { toast } from "react-hot-toast";
import { enLocalStorage } from "../../types/enums/local-storage.enum";
import { LaunchScreen } from "../../view/components/launch-screen.component";
import { useLocalStorage } from "../hooks/use-local-storage.hook";
import { useUserMe } from "../hooks/use-user.hook";
import { languageService } from "../services/language.service";

interface AuthContextValue {
  signedIn: boolean;
  signout: () => void;
  signin: (accessToken: string) => void;
}

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export function AuthProvider({ children }: PropsWithChildren) {
  const { t } = useMemo(() => languageService, []);
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage(
    enLocalStorage.ACCESS_TOKEN,
    ""
  );

  const { isSuccess, isFetching, isError, remove } = useUserMe({
    enabled: !!accessToken,
    staleTime: Infinity,
  });

  const signin = useCallback(
    (accessToken: string) => setAccessToken(accessToken),
    [setAccessToken]
  );

  const signout = useCallback(() => {
    removeAccessToken();
    remove();
  }, [remove, removeAccessToken]);

  useEffect(() => {
    if (!isError) return;
    toast.error(t("Session expired, please login again"));
    signout();
  }, [isError, signout, t]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && !!accessToken,
        signin,
        signout,
      }}
    >
      <LaunchScreen loading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
