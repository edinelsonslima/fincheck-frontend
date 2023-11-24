import { ICategories } from "../../types/interfaces/categories.interface";
import httpClient, { HttpClient } from "./http-client.service";

class CategoriesService {
  constructor(private readonly _httpClient: HttpClient) {
    this.getAll = this.getAll.bind(this);
  }

  public async getAll({ signal }: ICategories.GetAll.QueryFnProps) {
    const { data } = await this._httpClient.get<ICategories.GetAll.Response>(
      "/categories",
      { signal }
    );

    return data;
  }
}

export const categoriesService = new CategoriesService(httpClient);
