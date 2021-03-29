import { OrderSummaryProps } from "../../components/molecules/orders/orderSummary";
import { Order } from "../orders";
import { DateTime } from 'luxon';
import { Customer } from "../customer";

// Class to convert order model to props needed by component
export const orderToOrderSummaryAdapter = (order: Order): Omit<OrderSummaryProps, "onClick"> => {

  const {lineItems, customer, type, createdAt, price, orderNumber, id} = order;
  return {
    id,
    orderNumber: orderNumber,
    numOfItems: lineItems.length,
    customerName: formatCustomerName(customer),
    orderType: type,
    timeSinceOrderCreated: `${getTimeSinceOrderCreated(createdAt)} min`,
    price: price
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