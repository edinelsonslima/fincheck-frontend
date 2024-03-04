import { IUser } from "@interfaces/user.interface";
import httpClientService, { HttpClient } from "./http-client.service";

export class UserService {
  constructor(private readonly _httpClient: HttpClient) {
    this.me = this.me.bind(this);
  }

  public async me({ signal }: IUser.Me.QueryFnProps) {
    const { data } = await this._httpClient.get<IUser.Me.Response>("/users/me", {
      signal,
    });

    return data;
  }
}

export const userService = new UserService(httpClientService);
