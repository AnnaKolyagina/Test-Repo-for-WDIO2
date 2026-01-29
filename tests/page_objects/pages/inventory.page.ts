import { inventoryElements } from '../elements/inventory.elements'

class InventoryPage {
  get title() {
    return $(inventoryElements.title)
  }

  get items() {
    return $$(inventoryElements.inventoryItems)
  }

  get addToCartButtons() {
    return $$(inventoryElements.addToCartButtons)
  }

  get cartBadge() {
    return $(inventoryElements.cartBadge)
  }

  async waitForPageLoaded() {
    await this.title.waitForDisplayed()
  }
}

export default new InventoryPage()
