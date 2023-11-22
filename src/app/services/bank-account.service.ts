import {
  IBankAccountCreate,
  IBankAccountGetAll,
} from "../../types/interfaces/bank-account.interface";
import httpClient, { HttpClient } from "./http-client.service";

class BankAccountService {
  constructor(private readonly _httpClient: HttpClient) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  public async create(params: IBankAccountCreate.Params) {
    const { data } = await this._httpClient.post<IBankAccountCreate.Response>(
      "/bank-accounts",
      params
    );

    return data;
  }

  public async getAll({ signal }: IBankAccountGetAll.QueryFnProps) {
    const { data } = await this._httpClient.get<IBankAccountGetAll.Response>(
      "/bank-accounts",
      { signal }
    );

    return data;
  }
}

export const bankAccountService = new BankAccountService(httpClient);
