export const formatPrice = (price: string): string => {
  const test = +price
  return test.toFixed(2)
}