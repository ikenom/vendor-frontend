import { LineItemNotes } from "../components/atoms/lineItem/notes";

export interface Product {
  id: string,
  price?: string,
  mealName?: string,
  specialIngredient?: string,
  lineItemNote?: LineItemNotes
}