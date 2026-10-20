import { test, expect } from '@playwright/test';

// Сценарий 1: вход с верным логином открывает каталог товаров.
test('вход с верным логином открывает каталог', async ({ page }) => {
  // Шаг 1. Открыть страницу входа
  await page.goto('/');

  // Шаг 2. Ввести логин и пароль
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Шаг 3. Нажать «Login»
  await page.getByRole('button', { name: 'Login' }).click();

  // Ожидаемый результат: открылся каталог с заголовком «Products» и товарами
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products')).toBeVisible();
  await expect(page.locator('.inventory_item')).toHaveCount(6);
});
