import { LineItemHeaderProps } from "../../components/atoms/lineItem/header";
import { LineItemContentProps } from "../../components/molecules/lineItem/lineItemContent";
import { LineItem } from "../../models/product";

let details = "";
for (let i = 0; i < 20; i++) {
  details = details.concat("Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum");
}

export const MOCK_LINE_ITEMS_ONE: LineItem[] = [
  {
    id: "1",
    price: "9.50",
    mealName: "Buffalo Chicken Wings",
    instructions: details,
    additionalComments: "Additional Comments"
  },
  {
    id:"2",
    price: "2.50",
    mealName: "Sprite",
    instructions: "",
    additionalComments: "",
  }
]

export const MOCK_LINE_ITEMS_TWO: LineItem[] = [
  {
    id:"3",
    price: "16.39",
    mealName: "Pizza",
    instructions: "",
    additionalComments: "Extra Pepperoni Please :)"
  },
  {
    id:"4",
    price: "11.22",
    mealName: "Calzone",
    instructions: "No meat",
    additionalComments: "Extra Cheese Please"
  },
  {
    id: "5",
    price: "2.50",
    mealName: "Sprite",
    instructions: "",
    additionalComments: ""
  }
]
