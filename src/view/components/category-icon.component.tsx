import { MemoExoticComponent, isValidElement } from "react";
import { IconClothes } from "../../assets/icons/categories/expense/clothes.icon";
import { IconEducation } from "../../assets/icons/categories/expense/education.icon";
import { IconExpense } from "../../assets/icons/categories/expense/expense.icon";
import { IconFood } from "../../assets/icons/categories/expense/food.icon";
import { IconFun } from "../../assets/icons/categories/expense/fun.icon";
import { IconGrocery } from "../../assets/icons/categories/expense/grocery.icon";
import { IconHome } from "../../assets/icons/categories/expense/home.icon";
import { IconTransport } from "../../assets/icons/categories/expense/transport.icon";
import { IconTravel } from "../../assets/icons/categories/expense/travel.icon";
import { IconIncome } from "../../assets/icons/categories/income/income.icon";

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

  if (!category) return <DefaultIcon />;

  const Icon = iconsMap[type][
    category as ICategoriesValid<T>
  ] as MemoExoticComponent<() => JSX.Element>;

  return isValidElement(Icon) ? <Icon /> : <DefaultIcon />;
}
