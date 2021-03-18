import UserStore from "./store/userStore"

export const startup = async () => {
  await UserStore.init()
}