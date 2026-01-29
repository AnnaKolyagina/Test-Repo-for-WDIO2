import LoginPage from '../../tests/page_objects/pages/login.page'
import InventoryPage from '../../tests/page_objects/pages/inventory.page'

describe('SauceDemo UI tests', () => {

  beforeEach(async () => {
    await LoginPage.open()
  })

  it('@smoke should login with valid credentials', async () => {
    await LoginPage.login('standard_user', 'secret_sauce')
    await InventoryPage.waitForPageLoaded()
    await expect(InventoryPage.title).toHaveText('Products')
  })

  it('@negative should show error for invalid login', async () => {
    await LoginPage.login('wrong_user', 'wrong_pass')

    await expect(LoginPage.errorMessage).toBeDisplayed()
    await expect(LoginPage.errorMessage).toHaveText(/Username and password do not match/)
  })

  it('@ui should display inventory items', async () => {
    await LoginPage.login('standard_user', 'secret_sauce')
    await InventoryPage.waitForPageLoaded()
    const items = await $$('.inventory_item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('@cart should add item to cart', async () => {
    await LoginPage.login('standard_user', 'secret_sauce')
    await InventoryPage.waitForPageLoaded()
    await InventoryPage.addToCartButtons[0].click()
    await expect(InventoryPage.cartBadge).toHaveText('1')
  })

  it('@regression should have correct page title', async () => {
    await LoginPage.login('standard_user', 'secret_sauce')
    await InventoryPage.waitForPageLoaded()
    await expect(browser).toHaveTitle(/Swag Labs/)
  })
})
