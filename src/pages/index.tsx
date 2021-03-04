import * as React from "react";
import BasicLayout from "../components/layouts/basic";
import { AppFooter } from "../components/molecules/AppFooter";
import { OrdersHeader } from "../components/molecules/headers/OrdersHeader";
import { OrderSummaryProps } from "../components/molecules/orderSummary";
import { OrderSummaryList } from "../components/molecules/orderSummaryList";


const IndexPage = () => {
  return (
    <App />
  )
};

export default IndexPage;

/**
 * 
 * Wraps apollo provider around root element of app. This helps ensure reacts DOM doesn't
 * do unnecessary re-renders
 * Resources:
 * -- https://www.youtube.com/watch?v=wNUg1jpj9T0&list=WL&index=7&t=1305s&ab_channel=ApolloGraphQL
 * -- https://www.youtube.com/watch?v=BrBK4yxodXA&ab_channel=Gatsby
 */

const ORDER_SUMMARIES: OrderSummaryProps[] = [
  {
    numOfItems: 6,
    customerName: "Bubba B.",
    orderType: "TAKE OUT",
    timeSinceOrderCreated: "34 min",
    price: "43.49"
  },
  {
    numOfItems: 4,
    customerName: "Jack F.",
    orderType: "TAKE OUT",
    timeSinceOrderCreated: "41 min",
    price: "51.32"
  },
  {
    numOfItems: 1,
    customerName: "Cindy P..",
    orderType: "TAKE OUT",
    timeSinceOrderCreated: "12 min",
    price: "20.32"
  },
]; 

const App = () => {
  return (
    <BasicLayout
      header={<OrdersHeader text="New Orders"/>}
      content={<OrderSummaryList orderSummaries={ORDER_SUMMARIES} onClick={() => {}}/>}
      footer={<AppFooter selectedIcon="order"/>}
    />
  )
};