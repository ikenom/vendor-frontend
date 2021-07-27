import { navigate } from "gatsby";
import React from "react";
import { Order, OrderStatus } from "../../../models/orders";
import { LineItem, lineItemToLineItemContentProps } from "../../../models/product";
import { MOCK_LINE_ITEMS_CONTENT, MOCK_LINE_ITEM_HEADER } from "../../../store/mockUtils/mockOrderUtils";
import OrderStore from "../../../store/orderStore";
import PrinterStore from "../../../store/printerStore";
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
  const printerStore = PrinterStore.getInstance();
  const order = orderStore.getOrder(orderNumber);


  const {customer, lineItems, price, id } = order;


  const customerLabel = `${customer.firstName } ${customer.lastName[0]}.`;
  const contentLabel = `Order #${orderNumber}`;

  const lineItemHeader: LineItemHeaderProps = {
    lineItemHeader: {
      numOfItems: lineItems.length,
      price: order.price
    }
  }

  const activeTab =  getActiveTabFromOrderStatus(orderStatus);

  const onCancel = async () => {
    try {
      await orderStore.cancelOrderAsync(id)
      navigate(`/app`, {state: {activeTab}})
    } catch(e) {

    }
  }

  const headerContentButtonSubmit = (status: OrderStatus) => {
    switch(status) {
      case "Ready" : {
        return async () => {
            await orderStore.completeOrderAsync(id)
            navigate(`/app`, {state: {activeTab}})
        }
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

  const footerButtonSubmit = () => {

    switch(orderStatus) {
      case "Needs Action": {
        return async (timeInMinutes: number) => {
            try {
              const time = new Date()
              time.setMinutes(time.getMinutes() + timeInMinutes);
              await printerStore.printOrderInKitchen(order);
              await orderStore.sendToKitchenAsync(id, time);
              navigate(`/app`, {state: {activeTab}})
            } catch(e) {
              console.log(`Failed to submit order to kitchen because: ${JSON.stringify(e)}`)
            }
        }
      }
      case "In Kitchen": {
        return async (timeInMinutes: number) => {
            const time = new Date()
            time.setMinutes(time.getMinutes() + timeInMinutes);
            await orderStore.extendOrderAsync(id, time)
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

  const countOccurances = (lineItemId: string): number => lineItems.filter(l => l.id === lineItemId).length;


  const lineItemsContentProps: LineItemContentProps[] = lineItems.map((l, index) => { 
    return { 
      unavailableOnClick: async () => { 
        await orderStore.removeLineItemAsync(l.id)
        navigate(`/app`, {state: {activeTab}})
      },
       ...lineItemToLineItemContentProps(l, index), 
       occurrences: countOccurances(l.id),
       canRemove: orderStatus !== "Ready"
    }
  })

  return(
    <>
      <OrderOrganismLayout
        path={path}
        header={<OrderHeader
          navProps={{text: getHeaderText(orderStatus)}}
          contentProps={headerContentProps}
        />}
        content={<OrderContent
          lineItemsContent={lineItemsContentProps}
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


