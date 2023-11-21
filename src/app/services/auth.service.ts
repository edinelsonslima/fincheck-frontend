import { IAuthSignin, IAuthSignup } from "../../types/interfaces";
import httpClient, { HttpClient } from "./http-client.service";

class AuthService {
  constructor(private readonly _httpClient: HttpClient) {
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
  }

  public async signup(params: IAuthSignup.Params) {
    const { data } = await this._httpClient.post<IAuthSignup.Response>(
      "/auth/signup",
      params
    );

    return data;
  }

  public async signin(params: IAuthSignin.Params) {
    const { data } = await this._httpClient.post<IAuthSignin.Response>(
      "/auth/signin",
      params
    );

    return data;
  }
}

export const authService = new AuthService(httpClient);
