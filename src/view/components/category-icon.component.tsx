import { IconClothes } from "../../assets/icons/categories/expense/clothes.icon";
import { IconEducation } from "../../assets/icons/categories/expense/education.icon";
import { IconExpense } from "../../assets/icons/categories/expense/expense.icon";
import { IconFood } from "../../assets/icons/categories/expense/food.icon";
import { IconFun } from "../../assets/icons/categories/expense/fun.icon";
import { IconGrocery } from "../../assets/icons/categories/expense/grocery.icon";
import { IconHome } from "../../assets/icons/categories/expense/home.icon";
import { IconTransport } from "../../assets/icons/categories/expense/transport.icon";
import { IconTravel } from "../../assets/icons/categories/expense/travel.icon";
import { IconIncome } from "../../assets/icons/income.icon";

const iconsMap = {
  income: {
    default: IconIncome,
  },
  expense: {
    default: IconExpense,
    food: IconFood,
    fun: IconFun,
    grocery: IconGrocery,
    home: IconHome,
    education: IconEducation,
    clothes: IconClothes,
    transport: IconTransport,
    travel: IconTravel,
  },
};

interface CategoryIconProps<T extends keyof typeof iconsMap> {
  type: T;
  category?: keyof (typeof iconsMap)[T];
}

export function CategoryIcon<T extends keyof typeof iconsMap>({
  type,
  category,
}: CategoryIconProps<T>) {
  const Icon = iconsMap[type][category ?? "default"];
  return <Icon />;
}
