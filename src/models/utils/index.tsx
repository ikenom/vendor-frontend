import { OrderSummaryProps } from "../../components/molecules/orders/orderSummary";
import { Order } from "../orders";
import { DateTime } from 'luxon';
import { Customer } from "../customer";
import { groupBy, sortBy } from "lodash";

export interface OrdersByDate {
  [date: string]: Order[];
}

export const getDayOfWeekAsText = (dayOfWeek: number) => {
  switch(dayOfWeek) {
    case 1 : return "Monday";
    case 2 : return "Tuesday";
    case 3 : return "Wednesday";
    case 4 : return "Thursday";
    case 5 : return "Friday";
    case 6 : return "Saturday";
    case 7 : return "Sunday";
  }
}

export const orderToOrderSummaryAdapter = (order: Order): Omit<OrderSummaryProps, "onClick"> => {

  const {lineItems, customer, type, createdAt, price, orderNumber, id} = order;
  return {
    id,
    orderNumber: orderNumber,
    numOfItems: lineItems.length,
    customerName: formatCustomerName(customer),
    orderType: type,
    timeSinceOrderCreated: `${getTimeSinceOrderCreated(createdAt)} min`,
    price: price,
    createdAt: createdAt
  }
}

const formatCustomerName = (customer: Customer) => {
  return `${customer.firstName}  ${customer.lastName.charAt(0)}.`
}

const getTimeSinceOrderCreated = (createdAt: string): number => {
  const createdTime = DateTime.fromISO(createdAt);
  const result = DateTime.now().diff(createdTime).as('minutes')
  return Math.round(result);
}

export const partitionOrdersByDate = (orders: Order[]): OrdersByDate => {
  const sortedOrder = sortBy(orders, order => getDateTime(order.createdAt)).reverse()
  return groupBy(sortedOrder, order => getDateTime(order.createdAt).toISODate())
}

export const getDateTime = (createdAt: string): DateTime => {
  return DateTime.fromISO(createdAt);
}