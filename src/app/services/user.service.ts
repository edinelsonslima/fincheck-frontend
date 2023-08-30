import { IUserMe } from "../../types/interfaces";
import httpClient, { HttpClient } from "./http-client.service";

export class UserService {
  constructor(private readonly _httpClient: HttpClient) {
    this.me = this.me.bind(this);
  }

  public async me({ signal }: IUserMe.QueryFnProps) {
    const { data } = await this._httpClient.get<IUserMe.Response>("/users/me", {
      signal,
    });

    return data;
  }
}

export const userService = new UserService(httpClient);
