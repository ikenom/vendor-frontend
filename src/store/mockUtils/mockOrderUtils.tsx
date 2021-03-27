import { DateTime } from "luxon";
import { LineItemHeaderProps } from "../../components/atoms/lineItem/header";
import { LineItemContentProps } from "../../components/molecules/lineItem/lineItemContent";
import { Order } from "../../models/orders";
import { Product } from "../../models/product";
import { MOCK_PRODUCTS_ONE, MOCK_PRODUCTS_TWO } from "./mockProductUtils";

export const mockOrderPrice = (products: Product[]): string => {
  const totalPrice = products.map(product => parseFloat(product.price))
    .reduce((totalPrice, productPrice) => totalPrice + productPrice)

  const dumbTax = totalPrice * .10;

  return (totalPrice + dumbTax).toFixed(2);
}

export const MOCK_ORDERS: Order[] = [
  {
    lineItems: MOCK_PRODUCTS_ONE,
    customer: {
      firstName: "Bubba",
      lastName: "Bud"
    },
    createdAt: DateTime.now().minus({seconds: 400}).toISO(),
    price: mockOrderPrice(MOCK_PRODUCTS_ONE),
    type: "TAKE OUT",
    status: "Needs Action"
  },
  {
    lineItems: MOCK_PRODUCTS_TWO,
    customer: {
      firstName: "Sammy",
      lastName: "Smith"
    },
    createdAt: DateTime.now().minus({seconds: 450}).toISO(),
    price: mockOrderPrice(MOCK_PRODUCTS_TWO),
    type: "TAKE OUT",
    status: "Needs Action"
  },
  {
    lineItems: MOCK_PRODUCTS_ONE,
    customer: {
      firstName: "Bobby",
      lastName: "Larson"
    },
    createdAt: DateTime.now().minus({seconds: 700}).toISO(),
    price: mockOrderPrice(MOCK_PRODUCTS_ONE),
    type: "TAKE OUT",
    status: "Needs Action"
  }
]


let details = "";
for (let i = 0; i < 20; i++) {
  details = details.concat("Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum");
}

const lineItemNote = {
  instructions: {title: "Instructions", details},
  additionalComments: {title: "Additional Comments", details}
}

const lineItemSummary = {
  price: "9.50",
  mealName: "Buffalo Chicken Wings",
  specialIngredient: "Bleu Cheese Dressing",
  position: 1 
}

export const MOCK_LINE_ITEM_CONTENT: LineItemContentProps = {
  lineItemSummary,
  lineItemNote
}

export const MOCK_LINE_ITEM_HEADER: LineItemHeaderProps = {
  lineItemHeader: {
    numOfItems: 1, 
    price: "9.50"
  }
}