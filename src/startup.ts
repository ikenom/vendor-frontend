import UserStore from "./store/userStore"
import OrderStore from "./store/orderStore"
import PrinterStore from "./store/printerStore"

export const startup = async () => {
  await PrinterStore.init()
  await UserStore.init()
  await OrderStore.init()
}