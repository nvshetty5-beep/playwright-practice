import { test, expect } from '../../fixtures/pages.fixtures';

test.describe('Cart', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('user can add an item to the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');

    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();
    await expect(cartPage.itemNames).toHaveText(['Sauce Labs Backpack']);
  });
});