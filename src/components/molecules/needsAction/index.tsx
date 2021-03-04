import React from 'react';
import 'antd/dist/antd.css';
import { TabElement } from '../../atoms/tabElement';
import { Order } from '../../../models/orders';
import { orderToOrderSummaryAdapter } from '../../../models/utils';
import { OrderSummaryList } from '../orderSummaryList';


interface NeedActionsProps {
  orders: Order[]; 
  onClick: () => any;
}

export const NewActionTabElement = () => <TabElement text="Needs Action" showAttentionIcon={false}/>

export const NewActionTabContent = (props: NeedActionsProps) => {
  const { orders, onClick } = props;

  const orderSummaries = orders.map(order => orderToOrderSummaryAdapter(order))
  return (
    <OrderSummaryList orderSummaries={orderSummaries} onClick={onClick}/>
  )
}

