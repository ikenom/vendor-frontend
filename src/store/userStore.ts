import authClient from '../api/auth_client'

export default class UserStore {

  static init = async () => {
    const userStore = new UserStore()
    await userStore.loginAsync("fake54@fake.com", "password")
  }

  loginAsync = async (email: String, password: String) => {
    const data = await authClient.loginAsync(email, password)
    this.saveToken(data.login.token)
  }

  saveToken = (token: string) => {
    window.localStorage.setItem("token", token);
  }
}