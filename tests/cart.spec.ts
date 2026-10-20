import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from './helpers';

test.beforeEach(async ({ page }) => {
  await loginAsStandardUser(page);
});

// Сценарий 4: товар добавляется в корзину, счётчик на иконке меняется.
test('товар добавляется в корзину', async ({ page }) => {
  // До добавления счётчика нет
  await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);

  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

  // Ожидаемый результат: на иконке корзины «1», товар есть в корзине
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  await page.getByTestId('shopping-cart-link').click();
  await expect(page.getByTestId('inventory-item-name')).toHaveText(['Sauce Labs Backpack']);
});

// Сценарий 5: товар удаляется из корзины.
test('товар удаляется из корзины', async ({ page }) => {
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('shopping-cart-link').click();

  await page.getByTestId('remove-sauce-labs-backpack').click();

  // Ожидаемый результат: корзина пуста, счётчика нет
  await expect(page.getByTestId('inventory-item')).toHaveCount(0);
  await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
});
