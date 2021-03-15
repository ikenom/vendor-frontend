import { State } from '@hookstate/core';
import { Order } from '../models/orders';
import orderClient from '../api/order_client'
import { DateTime } from 'luxon';
import { LineItemContentProps } from '../components/molecules/lineItem/lineItemContent';
import { LineItemHeaderProps } from '../components/atoms/lineItem/header';

export interface OrderStore {
  orders: Order[];
}

export const getOrdersAsync = async (order: State<OrderStore>, vendorId: String) => {
  let cursor: String = null
  let hasNext = true

  while(hasNext) {
    const result = await orderClient.getOrdersAsync(vendorId, cursor)
    const orders = result.orders.edges.map(edge => ({
      price: edge.node.price,
      createdAt: edge.node.createdAt,
      type: "TAKE OUT",
      lineItems: edge.node.lineItems.map((lineItem: { id: String; }) => ({ id: lineItem.id })),
      customer: {
        firstName: edge.node.customer.firstName,
        lastName: edge.node.customer.lastName,
      }
    }))

    hasNext = result.orders.pageInfo.hasNextPage
    cursor = result.orders.pageInfo.endCursor
    order.orders.merge(orders)
    console.log(order.orders.get())
  }
}

export const FAKE_ORDERS: Order[] = [
  {
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Bubba",
      lastName: "Bud"
    },
    createdAt: DateTime.now().minus({seconds: 400}).toISO(),
    price: "63.42",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Sammy",
      lastName: "Smith"
    },
    createdAt: DateTime.now().minus({seconds: 450}).toISO(),
    price: "34.42",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Bobby",
      lastName: "Larson"
    },
    createdAt: DateTime.now().minus({seconds: 700}).toISO(),
    price: "45.42",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Sammy",
      lastName: "Smith"
    },
    createdAt: DateTime.now().minus({seconds: 1000}).toISO(),
    price: "34.42",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Bubba",
      lastName: "Bud"
    },
    createdAt: DateTime.now().minus({seconds: 1400}).toISO(),
    price: "63.42",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}, {id: "3"}],
    customer: {
      firstName: "Ken",
      lastName: "Lamar"
    },
    createdAt: DateTime.now().minus({seconds: 1540}).toISO(),
    price: "31.45",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}, {id: "4"}, {id: "2"}, {id: "4"}],
    customer: {
      firstName: "Bobby",
      lastName: "Larson"
    },
    createdAt: DateTime.now().minus({seconds: 1700}).toISO(),
    price: "29.31",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}, {id: "2"}, {id: "4"}, {id: "2"}],
    customer: {
      firstName: "Sammy",
      lastName: "Smith"
    },
    createdAt: DateTime.now().minus({seconds: 2000}).toISO(),
    price: "34.42",
    type: "TAKE OUT"
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

export const LINE_ITEM_CONTENT: LineItemContentProps = {
  lineItemSummary,
  lineItemNote
}

export const LINE_ITEM_HEADER: LineItemHeaderProps = {
  lineItemHeader: {
    numOfItems: 1, 
    price: "9.50"
  }
}