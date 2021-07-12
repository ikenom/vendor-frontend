import authClient from '../api/auth_client'

export default class UserStore {

  public vendorId: string

  static init = async () => {
    const userStore = new UserStore()
    await userStore.loginAsync("davis_medhurst@tromp.co", "password")
  }

  loginAsync = async (email: String, password: String) => {
    const data = await authClient.loginAsync(email, password)
    this.saveToken(data.login.token)
    this.vendorId = await this.getVendorId(data.login.token)
  }

  saveToken = (token: string) => {
    window.localStorage.setItem("token", token);
  }

  private getVendorId = async (token: string): Promise<string> => {
    // Some query to fytr backend to get vendorId from the jwt token and return it
    return "test-id";
  }
}

export class MockUserStore extends UserStore{
  init = async() => {}
}