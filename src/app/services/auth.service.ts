import { IAuth } from "../../types/interfaces";
import httpClient, { HttpClient } from "./http-client.service";

class AuthService {
  constructor(private readonly _httpClient: HttpClient) {
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
  }

  public async signup(params: IAuth.Signup.Params) {
    const { data } = await this._httpClient.post<IAuth.Signup.Response>(
      "/auth/signup",
      params
    );

    return data;
  }

  public async signin(params: IAuth.Signin.Params) {
    const { data } = await this._httpClient.post<IAuth.Signin.Response>(
      "/auth/signin",
      params
    );

    return data;
  }
}

export const authService = new AuthService(httpClient);
