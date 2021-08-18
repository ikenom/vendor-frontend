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

export const testReceipt = {
  text : "        Star Clothing Boutique\n" +
  "             123 Star Road\n" +
  "           City, State 12345\n" +
  "\n" +
  "Date:MM/DD/YYYY          Time:HH:MM PM\n" +
  "--------------------------------------\n" +
  "SALE\n" +
  "SKU            Description       Total\n" +
  "300678566      PLAIN T-SHIRT     10.99\n" +
  "300692003      BLACK DENIM       29.99\n" +
  "300651148      BLUE DENIM        29.99\n" +
  "300642980      STRIPED DRESS     49.99\n" +
  "30063847       BLACK BOOTS       35.99\n" +
  "\n" +
  "Subtotal                        156.95\n" +
  "Tax                               0.00\n" +
  "--------------------------------------\n" +
  "Total                          $156.95\n" +
  "--------------------------------------\n" +
  "\n" +
  "Charge\n" +
  "156.95\n" +
  "Visa XXXX-XXXX-XXXX-0123\n" +
  "Refunds and Exchanges\n" +
  "Within 30 days with receipt\n" +
  "And tags attached\n",
  fontSize: 25,       //Defaults to 25
  paperWidth: 576,    // options: 384 = 2", 576 = 3", 832 = 4"
  cutReceipt:true, // Defaults to true
  openCashDrawer:true // Defaults to true
  };