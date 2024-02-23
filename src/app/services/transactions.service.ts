import { ITransactions } from "../../types/interfaces/transactions.interface";
import httpClient, { HttpClient } from "./http-client.service";

class TransactionsService {
  constructor(private readonly _httpClient: HttpClient) {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  public getAll(filters: ITransactions.GetAll.Params) {
    return async ({ signal }: ITransactions.GetAll.QueryFnProps) => {
      const { data } =
        await this._httpClient.get<ITransactions.GetAll.Response>(
          "/transactions",
          {
            params: filters,
            signal,
          }
        );

      return data;
    };
  }

  public async create(params: ITransactions.Create.Params) {
    const { data } = await this._httpClient.post<ITransactions.Create.Response>(
      "/transactions",
      params
    );

    return data;
  }

  public async update({ id, ...params }: ITransactions.Update.Params) {
    const { data } = await this._httpClient.put<ITransactions.Update.Response>(
      `/transactions/${id}`,
      params
    );

    return data;
  }
}

export const transactionsService = new TransactionsService(httpClient);
