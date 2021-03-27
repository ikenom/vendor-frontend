import { LineItemNotes } from "../components/atoms/lineItem/notes";

export interface Product {
  price: string,
  mealName: string,
  specialIngredient?: string,
  lineItemNote: LineItemNotes
}