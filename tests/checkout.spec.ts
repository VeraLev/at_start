import { test, expect } from '@playwright/test';
import { loginAsUser } from './helpers';

test.beforeEach(async ({ page }) => {
  // Войти, положить товар в корзину и перейти к оформлению
  await loginAsUser(page);
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('shopping-cart-link').click();
  await page.getByTestId('checkout').click();
});

// Сценарий 7: оформление заказа доходит до страницы «Thank you».
test('оформление заказа проходит до конца', async ({ page }) => {
  await page.getByTestId('firstName').fill('Вера');
  await page.getByTestId('lastName').fill('Тестова');
  await page.getByTestId('postalCode').fill('123456');
  await page.getByTestId('continue').click();

  // Страница проверки заказа: товар на месте
  await expect(page.getByTestId('inventory-item-name')).toHaveText(['Sauce Labs Backpack']);
  await page.getByTestId('finish').click();

  // Ожидаемый результат: благодарность за заказ, корзина пуста
  await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
  await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
});

// Сценарий 8: оформление без заполненных полей показывает ошибку.
test('оформление без заполненных полей показывает ошибку', async ({ page }) => {
  await page.getByTestId('continue').click();

  await expect(page.getByTestId('error')).toHaveText('Error: First Name is required');
});
