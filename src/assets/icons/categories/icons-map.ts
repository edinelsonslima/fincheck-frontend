import { Clothes } from "./expense/clothes.icon";
import { Education } from "./expense/education.icon";
import { Expense } from "./expense/expense.icon";
import { Food } from "./expense/food.icon";
import { Fun } from "./expense/fun.icon";
import { Grocery } from "./expense/grocery.icon";
import { Home } from "./expense/home.icon";
import { Transport } from "./expense/transport.icon";
import { Travel } from "./expense/travel.icon";
import { Income } from "./income/income.icon";

export const iconsMap = {
  income: {
    default: Income,
  },
  expense: {
    default: Expense,
    food: Food,
    fun: Fun,
    grocery: Grocery,
    home: Home,
    education: Education,
    clothes: Clothes,
    transport: Transport,
    travel: Travel,
  },
};
