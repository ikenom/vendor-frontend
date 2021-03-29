import { navigate } from "gatsby";
import React from "react";
import { OrderStatus } from "../../../models/orders";
import { MOCK_LINE_ITEM_CONTENT } from "../../../store/mockUtils/mockOrderUtils";
import OrderStore from "../../../store/orderStore";
import { LineItemHeaderProps } from "../../atoms/lineItem/header";
import { OrderOrganismLayout } from "../../layouts/order";
import { OrderHeader } from "../../molecules/headers/OrderHeader";
import { HeaderContentProps } from "../../molecules/headers/OrderHeader/HeaderContent";
import { ActionType } from "../../molecules/modals/needsAction";
import { ContentProps, modalType, TimeUpdateModal } from "../../molecules/modals/timeUpdateModal";
import { OrderContent } from "../../molecules/order";

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

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onClose = () => {
    setIsModalVisible(false);
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

  const headerModalSubmit = (status: OrderStatus) => {
    switch(status) {
      case "Needs Action": {
        return async (actionType: ActionType) => {
          switch(actionType){
            case "pause": {
              try {
                await orderStore.pauseOrderAsync(id)
                console.log(" Pause Order!");
              } catch(e) {

              }
            }
            case "cancel": {
              try {
                await orderStore.cancelOrderAsync(id)
                console.log(" Cancel Order");
                navigate("/app")
              } catch(e) {

              }
            }
          }
        }
      }
      case "In Kitchen": {
        return (timeExtensionInMinutes: number) => {
          console.log(`Extend time for ${timeExtensionInMinutes} minutes`);
        }
      }
      default: {
        return (data: any) => {
          JSON.stringify(data)
        }
      }
    }
  }

  const footerButtonSubmit = (status: OrderStatus) => {
    switch(status) {
      case "Needs Action": {
        console.log("Send To Kitchen");
      }
    }
  }


  const headerContentProps: HeaderContentProps = {
    labelProps: { 
      label: customerLabel, 
      content: contentLabel 
    },
    actionProps: {
      modalType: location.state.status,
      modalSubmit: headerModalSubmit(location.state.status)
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
          button={{onClick: () => {}, label: buttonLabel(location.state.status)}}
        />}
        footer={footer}
      />
      {/* <ButtonModal isOpen={isModalVisible} onClose={onClose} onSubmit={}/> */}
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
  contentProps: ContentProps;
}

const ButtonModal = (props: ButtonModalProps) => {
  const { isOpen, onSubmit, onClose, type, contentProps } = props;

  return(
    <TimeUpdateModal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} type={type} contentProps={contentProps}/>
  )
}


