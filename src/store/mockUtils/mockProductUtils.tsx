import { LineItemHeaderProps } from "../../components/atoms/lineItem/header";
import { LineItemContentProps } from "../../components/molecules/lineItem/lineItemContent";
import { Product } from "../../models/product";

let details = "";
for (let i = 0; i < 20; i++) {
  details = details.concat("Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum");
}

export const MOCK_PRODUCTS_ONE: Product[] = [
  {
    price: "9.50",
    mealName: "Buffalo Chicken Wings",
    specialIngredient: "Bleu Cheese Dressing",
    lineItemNote: {
      instructions: {title: "Instructions", details},
      additionalComments: {title: "Additional Comments", details}
    }
  },
  {
    price: "2.50",
    mealName: "Sprite",
    lineItemNote: {
      instructions: {title: "Instructions", details: ""},
      additionalComments: {title: "Additional Comments", details: ""}
    }
  }
]

export const MOCK_PRODUCTS_TWO: Product[] = [
  {
    price: "16.39",
    mealName: "Pizza",
    specialIngredient: "Ranch",
    lineItemNote: {
      instructions: {title: "Instructions", details: ""},
      additionalComments: {title: "Additional Comments", details: "Extra Pepperoni Please :)"}
    }
  },
  {
    price: "11.22",
    mealName: "Calzone",
    specialIngredient: "Red Flakes",
    lineItemNote: {
      instructions: {title: "Instructions", details: "No meat"},
      additionalComments: {title: "Additional Comments", details: "Extra Cheese Please"}
    }
  },
  {
    price: "2.50",
    mealName: "Sprite",
    lineItemNote: {
      instructions: {title: "Instructions", details: ""},
      additionalComments: {title: "Additional Comments", details: ""}
    }
  }
]
