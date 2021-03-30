import { navigate } from "gatsby";
import React from "react";
import { OrderStatus } from "../../../models/orders";
import { MOCK_LINE_ITEM_CONTENT } from "../../../store/mockUtils/mockOrderUtils";
import OrderStore from "../../../store/orderStore";
import { LineItemHeaderProps } from "../../atoms/lineItem/header";
import { OrderOrganismLayout } from "../../layouts/order";
import { OrderHeader } from "../../molecules/headers/OrderHeader";
import { HeaderContentProps } from "../../molecules/headers/OrderHeader/HeaderContent";
import { HeaderLabelProps } from "../../molecules/headers/OrderHeader/HeaderLabel";
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
  }
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

  const {customer, lineItems, price, id} = order;

  const customerLabel = `${customer.firstName } ${customer.lastName[0]}.`;
  const contentLabel = `Order #${orderNumber}`;

  const lineItemHeader: LineItemHeaderProps = {
    lineItemHeader: {
      numOfItems: lineItems.length,
      price: price
    }
  }

  const activeTab =  getActiveTabFromOrderStatus(orderStatus)

  const headerModalSubmit = (status: OrderStatus) => {
    switch(status) {
      case "Needs Action": {
        return async (actionType: ActionType) => {
          switch(actionType){
            case "pause": {
              try {
                await orderStore.pauseOrderAsync(id)
                console.log(" Pause Order!");
                navigate(`/app`, {state: {activeTab}})
              } catch(e) {
                console.log("Something went wrong")
              }
            }
            case "cancel": {
              try {
                await orderStore.cancelOrderAsync(id)
                console.log(" Cancel Order");
                navigate(`/app`, {state: {activeTab}})
              } catch(e) {

              }
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
            orderStore.sendToKitchenAsync(id, time)
            console.log(`Sending to kitchen with ${timeInMinutes} to prepare`)
            navigate(`/app`, {state: {activeTab}})
        }
      }
      case "In Kitchen": {
        return async (timeInMinutes: number) => {
            const time = new Date()
            time.setMinutes(time.getMinutes() + timeInMinutes);
            orderStore.extendOrderAsync(id, time)
            console.log(`Extending order by ${timeInMinutes}`)
            navigate(`/app`, {state: {activeTab}})
        }
      }
    }
  }


  const headerLabelProps: HeaderLabelProps = {
    label: customerLabel,
    content: contentLabel
  }

  const headerContentProps: HeaderContentProps = {
    labelProps: headerLabelProps,
    actionProps: {
      modalType: orderStatus,
      modalSubmit: headerModalSubmit(orderStatus)
    }
  }


  return(
    <>
      <OrderOrganismLayout
        path={path}
        header={<OrderHeader
          navProps={{text: "New Orders"}}
          contentProps={headerContentProps}
        />}
        content={<OrderContent
          lineItemContent={MOCK_LINE_ITEM_CONTENT}
          lineItemHeader={lineItemHeader}
          button={{onClick: showModal, label: buttonLabel(orderStatus)}}
        />}
        footer={footer}
      />
      <ButtonModal
        isOpen={isButtonModalVisible}
        onClose={onClose}
        onSubmit={footerButtonSubmit(orderStatus)}
        type={"Send To Kitchen"}
        contentProps={
          {
            modalType: orderStatus === "Needs Action" ? "Send To Kitchen" : "Extension",
            orderDetails: headerLabelProps
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


