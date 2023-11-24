import { ITransactions } from "../../types/interfaces/transactions.interface";
import httpClient, { HttpClient } from "./http-client.service";

class TransactionsService {
  constructor(private readonly _httpClient: HttpClient) {
    this.create = this.create.bind(this);
  }

  public async create(params: ITransactions.Create.Params) {
    const { data } = await this._httpClient.post<ITransactions.Create.Response>(
      "/transactions",
      params
    );

    return data;
  }
}

export const transactionsService = new TransactionsService(httpClient);
