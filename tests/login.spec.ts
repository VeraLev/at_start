import { test, expect } from '@playwright/test';
import { login, loginAsUser } from './helpers';

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

// Сценарий 2: вход с неверным паролем показывает ошибку.
test('вход с неверным паролем показывает ошибку', async ({ page }) => {
  await login(page, 'standard_user', 'wrong_password');

  // Ожидаемый результат: остались на странице входа, видно сообщение об ошибке
  await expect(page.getByTestId('error')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service',
  );
  await expect(page).not.toHaveURL(/inventory\.html/);
});

// Сценарий 3: заблокированный пользователь не может войти.
test('заблокированный пользователь не может войти', async ({ page }) => {
  await login(page, 'locked_out_user');

  await expect(page.getByTestId('error')).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.',
  );
  await expect(page).not.toHaveURL(/inventory\.html/);
});

// Сценарий 9: выход из аккаунта возвращает на страницу входа.
test('выход из аккаунта возвращает на страницу входа', async ({ page }) => {
  await loginAsUser(page);

  // Открыть боковое меню и нажать «Logout»
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByTestId('logout-sidebar-link').click();

  // Ожидаемый результат: снова видна кнопка «Login»
  await expect(page.getByTestId('login-button')).toBeVisible();
  await expect(page).not.toHaveURL(/inventory\.html/);
});
