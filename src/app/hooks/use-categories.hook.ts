import { enKeys } from "@enums/requests-keys.enum";
import { ICategories } from "@interfaces/categories.interface";
import { categoriesService } from "@services/categories.service";
import { useQuery } from "@tanstack/react-query";

export function useCategoriesGet(options?: ICategories.Get.QueryOptions) {
  return useQuery(enKeys.categories.get, categoriesService.get, options);
}
