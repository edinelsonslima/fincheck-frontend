import { IconClothes } from "@icons/categories/expense/clothes.icon";
import { IconEducation } from "@icons/categories/expense/education.icon";
import { IconExpense } from "@icons/categories/expense/expense.icon";
import { IconFood } from "@icons/categories/expense/food.icon";
import { IconFun } from "@icons/categories/expense/fun.icon";
import { IconGrocery } from "@icons/categories/expense/grocery.icon";
import { IconHome } from "@icons/categories/expense/home.icon";
import { IconTransport } from "@icons/categories/expense/transport.icon";
import { IconTravel } from "@icons/categories/expense/travel.icon";
import { IconIncome } from "@icons/income.icon";
import { MemoExoticComponent } from "react";

const iconsMap = {
  INCOME: {
    default: IconIncome,
  },
  EXPENSE: {
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

type IKeyofIconsMap = keyof typeof iconsMap;

type ICategoriesValid<T extends IKeyofIconsMap> = keyof (typeof iconsMap)[T];

interface ICategoryIconProps<T extends IKeyofIconsMap> {
  type: T;
  category?: ICategoriesValid<T> | string;
}

export function CategoryIcon<T extends IKeyofIconsMap>({
  type,
  category,
}: ICategoryIconProps<T>) {
  const DefaultIcon = iconsMap[type].default;
  const selectedIcon = (category ?? "default") as ICategoriesValid<T>;

  const Icon =
    (iconsMap[type][selectedIcon] as MemoExoticComponent<() => JSX.Element>) ||
    DefaultIcon;

  return <Icon />;
}
