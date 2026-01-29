import { loginElements } from '../elements/login.elements'

class LoginPage {
  async open() {
    await browser.url('https://www.saucedemo.com/')
  }

  get username() {
    return $(loginElements.usernameInput)
  }

  get password() {
    return $(loginElements.passwordInput)
  }

  get loginBtn() {
    return $(loginElements.loginButton)
  }

  get errorMessage() {
    return $(loginElements.errorMessage)
  }

  async login(username: string, password: string) {
    await this.username.waitForDisplayed()
    await this.username.setValue(username)
    await this.password.setValue(password)
    await this.loginBtn.click()
  }
}

export default new LoginPage()
