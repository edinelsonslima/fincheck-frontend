import { ICategories } from "../../types/interfaces/categories.interface";
import httpClient, { HttpClient } from "./http-client.service";

class CategoriesService {
  constructor(private readonly _httpClient: HttpClient) {
    this.get = this.get.bind(this);
  }

  public async get({ signal }: ICategories.Get.QueryFnProps) {
    const { data } = await this._httpClient.get<ICategories.Get.Response>(
      "/categories",
      { signal }
    );

    return data;
  }
}

export const categoriesService = new CategoriesService(httpClient);
