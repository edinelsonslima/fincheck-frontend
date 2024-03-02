import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { toast } from "react-hot-toast";
import { enLocalStorage } from "../../types/enums/local-storage.enum";
import { LaunchScreen } from "../../view/components/launch-screen.component";
import { useLocalStorage } from "../hooks/use-local-storage.hook";
import { useUserMe } from "../hooks/use-user.hook";
import { intlService } from "../services/intl.service";
import { IUser } from "../../types/interfaces";
interface IAuthContextValue {
  signedIn: boolean;
  user: IUser.Me.Response | undefined;
  signout: () => void;
  signin: (accessToken: string) => void;
}

const { t } = intlService;

export const AuthContext = createContext<IAuthContextValue>({
  signedIn: false,
  user: { email: "example@email.com", name: "EX" },
  signout: () => {},
  signin: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage(
    enLocalStorage.ACCESS_TOKEN,
    ""
  );

  const { data, isSuccess, isFetching, isError, remove } = useUserMe({
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
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && !!accessToken,
        user: data,
        signin,
        signout,
      }}
    >
      <LaunchScreen loading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
