import { Page, expect } from '@playwright/test';

// Общий шаг для многих тестов: войти на сайт.
export async function login(page: Page, username = 'standard_user', password = 'secret_sauce') {
  await page.goto('/');
  await page.getByTestId('username').fill(username);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('login-button').click();
}

// Войти и убедиться, что открылся каталог.
export async function loginAsStandardUser(page: Page) {
  await login(page);
  await expect(page).toHaveURL(/inventory\.html/);
}
