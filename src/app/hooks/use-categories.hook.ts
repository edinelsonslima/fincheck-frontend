import { useQuery } from "@tanstack/react-query";
import { enKeys } from "../../types/enums/requests-keys.enum";
import { categoriesService } from "../services/categories.service";
import { ICategories } from "../../types/interfaces/categories.interface";

export function useCategoriesGet(options?: ICategories.Get.QueryOptions) {
  return useQuery(enKeys.categories.get, categoriesService.get, options);
}
