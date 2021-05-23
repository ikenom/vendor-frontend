import { LineItemNotes } from "../components/atoms/lineItem/notes";
import { LineItemContentProps } from "../components/molecules/lineItem/lineItemContent";

export interface LineItem {
  id: string;
  price: string;
  mealName: string;
  instructions: string;
  additionalComments: string;
}

export const lineItemToLineItemContentProps = (lineItem: LineItem, position: number): Pick<LineItemContentProps, "lineItemNote" | "lineItemSummary"> => {
  return {
    lineItemNote: {
      additionalComments: {title: "Additional Comment", details: lineItem.additionalComments},
      instructions: lineItem.instructions
    },
    lineItemSummary: {
      price: lineItem.price,
      mealName: lineItem.mealName,
      position
    }
  }
}