import { Toast } from "@capacitor/toast";
import { useState } from "@hookstate/core";
import { navigate } from "gatsby";
import { DateTime } from "luxon";
import React from "react";
import { OrderStatus } from "../../../models/orders";
import { lineItemToLineItemContentProps } from "../../../models/product";
import { Restaurant } from "../../../models/restaurant";
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
import { OrderTicketProps, PrinterOrderTicket } from "../../molecules/reciept";
import { DefaultOrganismProps } from "../orders";
import { getActiveTabFromOrderStatus } from "../Tabs";

interface OrderOrganismProps extends DefaultOrganismProps {
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
  const [showPrintedReceipt, setShowPrintedReceipt] = React.useState(false);

  const showModal = () => {
    setShowPrintedReceipt(true);
    setIsButtonModalVisible(true);
  };

  const onClose = () => {
    setIsButtonModalVisible(false);
    setShowPrintedReceipt(false);
  }


  const orderStore = OrderStore.getInstance();
  const printerStore = PrinterStore.getInstance();
  const isAttemptingToPrint = useState(printerStore.getIsAttemptingToPrint())
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
      navigate(`/app/order`, {state: {activeTab}})
    } catch(e) {

    }
  }

  const headerContentButtonSubmit = (status: OrderStatus) => {
    switch(status) {
      case "Ready" : {
        return async () => {
            await orderStore.completeOrderAsync(id)
            navigate(`/app/order`, {state: {activeTab}})
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
                navigate(`/app/order`, {state: {activeTab}})
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
              const printerStore = PrinterStore.getInstance();
              const time = new Date()
              time.setMinutes(time.getMinutes() + timeInMinutes);

              if(printerStore.getIsEnabled() && printerStore.getPrinter()) {
                await printerStore.printOrderInKitchen(order);
              } else {
                await Toast.show({ text: "Not printing order ticket. Printer in kitchen is disabled in settings", duration: 'long'})
              }
              
              await orderStore.sendToKitchenAsync(id, time);
              navigate(`/app/order`, {state: {activeTab}});
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
            navigate(`/app/order`, {state: {activeTab}})
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
        navigate(`/app/order`, {state: {activeTab}})
      },
       ...lineItemToLineItemContentProps(l, index), 
       occurrences: countOccurances(l.id),
       canRemove: orderStatus !== "Ready"
    }
  })

  return(
    <div>
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
        onSubmit={footerButtonSubmit()}
        type={buttonModalType}
        contentProps={
          {
            modalType: orderStatus === "Needs Action" ? "Send To Kitchen" : "Extension",
            orderDetails: headerLabelProps,
            timeRemainingInMinutes: buttonModalType === "Extension" ? order.timeRemaining : undefined
          }}
        isLoading={isAttemptingToPrint.get()}
      />
      {
        showPrintedReceipt 
        ? <PrinterTicketComponent order={order} restaurant={MOCK_RESTAURANT}/>
        : <> </>
      }
    </div>
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
  isLoading?: boolean;
}

const ButtonModal = (props: ButtonModalProps) => {
  const { isOpen, onSubmit, onClose, type, contentProps } = props;

  return(
    <TimeUpdateModal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} type={type} contentProps={contentProps}/>
  )
}

//TODO: Update to real data
const MOCK_RESTAURANT: Restaurant = {
  id: "2",
  name: "Harlem Tavern",
  description: "New York City’s Neighborhood Bar, Restaurant & Beer Garden",
  businessHours: {
    openingTime:  DateTime.fromISO('2020-08-06T09:00:00').toFormat('t'),
    closingTime: DateTime.fromISO('2020-08-06T22:00:00').toFormat('t'),
  },
  location: {
    state: "NY",
    zipCode: "10026",
    street: "2153 Fredrick Douglass Blvd",
    city: "New York"
  },
  phoneNumber: '7702394828',
}

const PrinterTicketComponent = (props: OrderTicketProps) => {
  return (
    <PrinterOrderTicket order={props.order} restaurant={props.restaurant}/>
  )
}


