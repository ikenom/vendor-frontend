import UserStore from "./store/userStore"
import OrderStore from "./store/orderStore2"

export const startup = async () => {
  await UserStore.init()
  await OrderStore.init()
}