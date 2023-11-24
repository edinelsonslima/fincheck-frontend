import { useQuery } from "@tanstack/react-query";
import { enKeys } from "../../types/enums/requests-keys.enum";
import { categoriesService } from "../services/categories.service";
import { ICategories } from "../../types/interfaces/categories.interface";

export function useCategoriesGetAll(options?: ICategories.GetAll.QueryOptions) {
  return useQuery(enKeys.categories.getAll, categoriesService.getAll, options);
}
