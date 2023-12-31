import { IBankAccount } from "../../types/interfaces/bank-account.interface";
import httpClient, { HttpClient } from "./http-client.service";

class BankAccountService {
  constructor(private readonly _httpClient: HttpClient) {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async getAll({ signal }: IBankAccount.GetAll.QueryFnProps) {
    const { data } = await this._httpClient.get<IBankAccount.GetAll.Response>(
      "/bank-accounts",
      { signal }
    );

    return data;
  }

  public async create(params: IBankAccount.Create.Params) {
    const { data } = await this._httpClient.post<IBankAccount.Create.Response>(
      "/bank-accounts",
      params
    );

    return data;
  }

  public async update({ id, ...params }: IBankAccount.Update.Params) {
    const { data } = await this._httpClient.put<IBankAccount.Update.Response>(
      `/bank-accounts/${id}`,
      params
    );

    return data;
  }

  public async delete(id: IBankAccount.Delete.Params) {
    const { data } = await this._httpClient.delete(`/bank-accounts/${id}`);

    return data;
  }
}

export const bankAccountService = new BankAccountService(httpClient);
