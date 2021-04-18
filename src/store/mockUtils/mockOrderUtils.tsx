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
    id: "1",
    orderNumber: "1",
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
    id: "2",
    orderNumber: "2",
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
    id: "3",
    orderNumber: "3",
    lineItems: MOCK_PRODUCTS_ONE,
    customer: {
      firstName: "Bobby",
      lastName: "Larson"
    },
    createdAt: DateTime.now().minus({seconds: 700}).toISO(),
    price: mockOrderPrice(MOCK_PRODUCTS_ONE),
    type: "TAKE OUT",
    status: "Needs Action"
  },{
    id: "4",
    orderNumber: "4",
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
    id: "5",
    orderNumber: "5",
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
    id: "5",
    orderNumber: "7",
    lineItems: MOCK_PRODUCTS_ONE,
    customer: {
      firstName: "Bobby",
      lastName: "Larson"
    },
    createdAt: DateTime.now().minus({seconds: 700}).toISO(),
    price: mockOrderPrice(MOCK_PRODUCTS_ONE),
    type: "TAKE OUT",
    status: "Needs Action"
  },{
    id: "7",
    orderNumber: "7",
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
    id: "8",
    orderNumber: "8",
    lineItems: MOCK_PRODUCTS_TWO,
    customer: {
      firstName: "Sammy",
      lastName: "Smith"
    },
    createdAt: DateTime.now().minus({seconds: 450}).toISO(),
    price: mockOrderPrice(MOCK_PRODUCTS_TWO),
    type: "TAKE OUT",
    status: "Needs Action"
  }
]


let details = "";
for (let i = 0; i < 5; i++) {
  details = details.concat("Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum");
}

const lineItemNote = {
  instructions: details,
  additionalComments: {title: "Additional Comments", details: "Extra Spicy Please!"}
}

const lineItemSummary = {
  price: "9.53",
  mealName: "Buffalo Chicken Wings",
  specialIngredient: "Bleu Cheese Dressing",
  position: 1 
}

const lineItemSummaryTwo = {
  price: "19.50",
  mealName: "Large Pepperoni Pizza",
  specialIngredient: "Bleu Cheese Dressing",
  position: 2
}

export const MOCK_LINE_ITEM_CONTENT: LineItemContentProps = {
  lineItemSummary,
  lineItemNote,
  unavailableOnClick: () => {}
}

export const MOCK_LINE_ITEM_CONTENT_TWO: LineItemContentProps = {
  lineItemSummary: lineItemSummaryTwo,
  lineItemNote,
  unavailableOnClick: () => {}
}

export const MOCK_LINE_ITEMS_CONTENT: LineItemContentProps[] = [MOCK_LINE_ITEM_CONTENT, MOCK_LINE_ITEM_CONTENT_TWO]

export const MOCK_LINE_ITEM_HEADER: LineItemHeaderProps = {
  lineItemHeader: {
    numOfItems: 2, 
    price: "29.03"
  }
}