import { navigate } from "gatsby";
import React from "react";
import { OrderStatus } from "../../../models/orders";
import { lineItemToLineItemContentProps } from "../../../models/product";
import { MOCK_LINE_ITEMS_CONTENT, MOCK_LINE_ITEM_HEADER } from "../../../store/mockUtils/mockOrderUtils";
import OrderStore from "../../../store/orderStore";
import { LineItemHeaderProps } from "../../atoms/lineItem/header";
import { OrderOrganismLayout } from "../../layouts/order";
import { OrderHeader } from "../../molecules/headers/OrderHeader";
import { HeaderContentProps } from "../../molecules/headers/OrderHeader/HeaderContent";
import { HeaderLabelProps } from "../../molecules/headers/OrderHeader/HeaderLabel";
import { LineItemContentProps } from "../../molecules/lineItem/lineItemContent";
import { ActionType } from "../../molecules/modals/needsAction";
import { ContentProps, modalType, TimeUpdateModal } from "../../molecules/modals/timeUpdateModal";
import { OrderContent } from "../../molecules/order";
import { getActiveTabFromOrderStatus } from "../Tabs";

interface OrderOrganismProps {
  footer: JSX.Element;
  path: string;
  orderNumber?: string;
  location?: {
    state: {
      status: OrderStatus;
    }
  };
}

const SEND_TO_KITCHEN = "Send To Kitchen";
const EXTEND_TIME = "Extend Time";
const COMPLETED = "Completed";


export const OrderOrganism = (props: OrderOrganismProps) => {

  const { footer, path, orderNumber, location} = props;

  const orderStatus = location.state.status;

  const [isButtonModalVisible, setIsButtonModalVisible] = React.useState(false);

  const showModal = () => {
    setIsButtonModalVisible(true);
  };

  const onClose = () => {
    setIsButtonModalVisible(false);
  }


  const orderStore = OrderStore.getInstance();
  const order = orderStore.getOrder(orderNumber);

  const {customer, lineItems, price, id } = order;


  const customerLabel = `${customer.firstName } ${customer.lastName[0]}.`;
  const contentLabel = `Order #${orderNumber}`;

  // TODO Making sure UI correctly displays mock data. Update to get data from order once it is provided by backend
  const lineItemHeader: LineItemHeaderProps = MOCK_LINE_ITEM_HEADER

  const activeTab =  getActiveTabFromOrderStatus(orderStatus);

  const onCancel = async () => {
    try {
      await orderStore.cancelOrderAsync(id)
      console.log(" Cancel Order");
      navigate(`/app`, {state: {activeTab}})
    } catch(e) {

    }
  }

  const headerContentButtonSubmit = (status: OrderStatus) => {
    switch(status) {
      case "Ready" : {
        return () => { console.log("Completed on submit") };
      }
      default: {
        return showModal;
      }
    }
  }

  const headerModalSubmit = (status: OrderStatus) => {
    switch(status) {
      case "Needs Action": {
        return async (actionType: ActionType) => {
          switch(actionType){
            case "pause": {
              try {
                await orderStore.pauseOrderAsync(id)
                navigate(`/app`, {state: {activeTab}})
              } catch(e) {
                console.log("Something went wrong") // Sentry goes here
              }
            }
            case "cancel": {
              onCancel()
            }
          }
        }
      }
      default: {
        return (data: any) => {
          console.log(JSON.stringify(data))
        }
      }
    }
  }

  const footerButtonSubmit = (status: OrderStatus) => {
    switch(status) {
      case "Needs Action": {
        return async (timeInMinutes: number) => {
            const time = new Date()
            time.setMinutes(time.getMinutes() + timeInMinutes);
            await orderStore.sendToKitchenAsync(id, time)
            console.log(`Sending to kitchen with ${timeInMinutes} to prepare`)
            navigate(`/app`, {state: {activeTab}})
        }
      }
      case "In Kitchen": {
        return async (timeInMinutes: number) => {
            const time = new Date()
            time.setMinutes(time.getMinutes() + timeInMinutes);
            await orderStore.extendOrderAsync(id, time)
            console.log(`Extending order by ${timeInMinutes}`)
            navigate(`/app`, {state: {activeTab}})
        }
      }
      case "Ready": {
        return async () => {
            await orderStore.completeOrderAsync(id)
            console.log(`Marking order as complete`)
            navigate(`/app`, {state: {activeTab}})
        }
      }
    }
  }


  const headerLabelProps: HeaderLabelProps = {
    label: customerLabel,
    content: contentLabel
  }

  const buttonModalType = (orderStatus === "Needs Action" ? "Send To Kitchen" : "Extension") as modalType

  const contentProps = {
      modalType: buttonModalType,
      orderDetails: headerLabelProps,
      timeRemainingInMinutes: order.timeRemaining
  }

  const headerContentProps: HeaderContentProps = {
    labelProps: headerLabelProps,
    actionProps: {
      modalType: orderStatus,
      modalSubmit: headerModalSubmit(orderStatus),
      modalContentProps: contentProps,
      timeRemainingInMinutes: order.timeRemaining
    }
  }

console.log(lineItems)

  const lineItemsContentProps: LineItemContentProps[] = lineItems.map((l, index) => {return { unavailableOnClick: orderStore.removeLineItem, ...lineItemToLineItemContentProps(l, index)}}) 

  return(
    <>
      <OrderOrganismLayout
        path={path}
        header={<OrderHeader
          navProps={{text: getHeaderText(orderStatus)}}
          contentProps={headerContentProps}
        />}
        content={<OrderContent
<<<<<<< HEAD
          lineItemsContent={lineItems}
=======
          lineItemsContent={lineItemsContentProps}
>>>>>>> 97e0bfcf4fd3d118a3a8e393cb923da87a458d7e
          lineItemHeader={lineItemHeader}
          button={{onClick: headerContentButtonSubmit(orderStatus), label: buttonLabel(orderStatus), onCancel}}
          cancelSubmit={onCancel}
        />}
        footer={footer}
      />
      <ButtonModal
        isOpen={isButtonModalVisible}
        onClose={onClose}
        onSubmit={footerButtonSubmit(orderStatus)}
        type={buttonModalType}
        contentProps={
          {
            modalType: orderStatus === "Needs Action" ? "Send To Kitchen" : "Extension",
            orderDetails: headerLabelProps,
            timeRemainingInMinutes: buttonModalType === "Extension" ? order.timeRemaining : undefined
          }}
      />
    </>
  )
}

const buttonLabel = (status: OrderStatus): string | null => {
  switch(status) {
    case "Needs Action": {
       return SEND_TO_KITCHEN;
    }
    case "In Kitchen": {
       return EXTEND_TIME;
    }
    case "Ready": {
      return COMPLETED;
   }
    default: {
       return
    }
 }
}

const getHeaderText = (status: OrderStatus): string => {
  switch(status) {
    case "Needs Action": {
       return "Needs Action"
    }
    case "In Kitchen": {
       return "In Kitchen"
    }
    case "Ready": {
      return "Ready";
    }
    case "History": {
      return "History"
    }
    default: {
       return
    }
 }
}

interface ButtonModalProps {
  isOpen: boolean;
  onSubmit: (data?: any) => any;
  onClose: () => any;
  type: modalType;
  contentProps: Omit<ContentProps, "onUpdate" | "showTimeRemaining" | "initialTime">;
}

const ButtonModal = (props: ButtonModalProps) => {
  const { isOpen, onSubmit, onClose, type, contentProps } = props;

  return(
    <TimeUpdateModal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} type={type} contentProps={contentProps}/>
  )
}


